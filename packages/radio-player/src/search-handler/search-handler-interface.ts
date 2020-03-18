import { TranscriptConfig } from '@internetarchive/transcript-view';

export interface SearchHandlerInterface {
  search(query: string): Promise<TranscriptConfig>;
}
