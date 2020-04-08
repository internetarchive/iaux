import { Metadata } from './metadata';
import { File } from './file';

class Item {
  metadata: Metadata
  files: File[] = []

  constructor(metadata: Metadata, files: File[] = []) {
    this.metadata = metadata;
    this.files = files;
  }
}

export { Item };
