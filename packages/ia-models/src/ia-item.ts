import { Metadata } from './metadata';
import { IAFile } from './ia-file';

class IAItem {
  metadata: Metadata
  files: IAFile[] = []

  constructor(metadata: Metadata, files: IAFile[] = []) {
    this.metadata = metadata;
    this.files = files;
  }
}

export { IAItem };
