import { Metadata } from './metadata';
import { File } from './file';

/**
 * This represents an Internet Archive Item
 *
 * @export
 * @class Item
 */
export class Item {
  metadata: Metadata;

  files: File[] = [];

  constructor(metadata: Metadata, files: File[] = []) {
    this.metadata = metadata;
    this.files = files;
  }
}
