import { TranscriptConfig } from '@internetarchive/transcript-view';

/**
 * Interface for defining Search Handler objects.
 *
 * Search Handlers are injected into the Radio Player to do the actual search work.
 */
export interface SearchHandlerInterface {
  search(query: string): Promise<TranscriptConfig>;
}
