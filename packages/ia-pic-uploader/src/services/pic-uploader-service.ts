import log from './log';

export type MetadataTask = {
  task_id: number;
  priority: number;
  wait_admin: number;
  color: string;
};

export class PicUploaderService {
  private baseHost: string;
  private fileUploadPath = '/services/post-file.php';

  constructor(baseHost: string) {
    this.baseHost = baseHost;
  }

  getPostFileServiceUrl(identifier: string): string {
    return `https://${this.baseHost + this.fileUploadPath}?identifier=${encodeURIComponent(identifier)}&submit=1`;
  }

  async uploadFile(identifier: string, inputFile: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', inputFile);

    try {
      await fetch(
        `${this.getPostFileServiceUrl(identifier)}&fname=${encodeURIComponent(inputFile.name)}`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        },
      );
    } catch (error) {
      throw new Error(`File uploads failed: ${error}`);
    }
  }

  /**
   * after upload, verify using metadata API if successfully uploaded or not
   * - we fetch metadata in each 2 seconds using MDApi to check if upload tasks has executed
   * - if there is not pending task found for given operation, just clearInterval
   */
  async checkMetadataUntilDone(
    identifier: string,
    onStatusUpdate: (status: string) => void,
  ): Promise<boolean> {
    const now = Math.round(Date.now() / 1000);

    return new Promise(resolve => {
      const metadataApiInterval = setInterval(async () => {
        try {
          onStatusUpdate('Waiting for your tasks to queue.');

          const serviceUrl = `https://${this.baseHost}/metadata/${encodeURIComponent(identifier)}`;
          const response = await fetch(serviceUrl, { method: 'GET' });

          if (!response.ok) {
            throw new Error(`Metadata API returned ${response.status}`);
          }

          const data = await response.json();
          log('Metadata API Response', data);

          const waitCount =
            data.pending_tasks && data.tasks ? data.tasks.length : 0;

          if (waitCount > 0) {
            const adminError = data.tasks.filter(
              (task: MetadataTask) => task.wait_admin === 2,
            ).length;

            if (adminError > 0) {
              onStatusUpdate(
                'Status: task failure — an admin will need to resolve.',
              );
              clearInterval(metadataApiInterval);
              setTimeout(() => resolve(true), 2000);
            } else {
              onStatusUpdate(`Waiting for your ${waitCount} tasks to finish.`);
            }
          } else if (data.item_last_updated < now) {
            onStatusUpdate('Waiting for your tasks to queue.');
          } else {
            clearInterval(metadataApiInterval);
            onStatusUpdate('Reloading page with your image.');
            setTimeout(() => resolve(true), 1000);
          }
        } catch {
          clearInterval(metadataApiInterval);
          onStatusUpdate('Upload succeeded but metadata verification failed.');
          setTimeout(() => resolve(false), 1000);
        }
      }, 2000);
    });
  }

  /**
   * validate the selected file extension and size
   */
  validateImage(
    image: File,
    validFileTypes: string[],
    maxFileSizeInMB: number,
  ): { valid: boolean; error: string } {
    const maxSizeInBytes = maxFileSizeInMB * 1024 * 1024;

    if (!validFileTypes.includes(image.type)) {
      return { valid: false, error: 'Image file must be a JPEG, PNG, or GIF.' };
    }

    if (image.size > maxSizeInBytes) {
      return {
        valid: false,
        error: `Image file must be less than ${maxFileSizeInMB}MB.`,
      };
    }

    return { valid: true, error: '' };
  }
}
