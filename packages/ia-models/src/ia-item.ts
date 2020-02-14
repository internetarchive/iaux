import Metadata from './metadata';
import IAFile from './ia-file';

export default class IAItem {
  metadata?: Metadata
  files: IAFile[] = []
}
