import { Metadata } from './metadata';
import { File } from './file';

export class Item {
  metadata: Metadata
  files: File[] = []

  constructor(metadata: Metadata, files: File[] = []) {
    this.metadata = metadata;
    this.files = files;
  }
}
