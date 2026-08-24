import {
  TranscriptConfig,
  TranscriptEntryConfig
} from '@internetarchive/transcript-view';
import { AudioSource } from '@internetarchive/audio-element';

import RadioPlayer from './lib/src/radio-player.d';
import SearchResultsSwitcher from './lib/src/search-results-switcher.d';
import MusicZone from './lib/src/models/music-zone.d';
import RadioPlayerConfig from './lib/src/models/radio-player-config.d';
import { SearchHandler } from './lib/src/search-handler/search-handler.d';
import { LocalSearchBackend } from './lib/src/search-handler/search-backends/local-search-backend/local-search-backend.d';
import { FullTextSearchBackend } from './lib/src/search-handler/search-backends/full-text-search-backend/full-text-search-backend.d';
import { TranscriptIndex } from './lib/src/search-handler/transcript-index.d';
import {
  FullTextSearchResponse,
  FullTextSearchResponseDoc
} from './lib/src/search-handler/search-backends/full-text-search-backend/full-text-search-response.d';
import { FullTextSearchServiceInterface } from './lib/src/search-handler/search-backends/full-text-search-backend/full-text-search-service-interface.d';
import { SearchBackendInterface } from './lib/src/search-handler/search-backends/search-backend-interface.d';
import { SearchHandlerInterface } from './lib/src/search-handler/search-handler-interface.d';

export {
  RadioPlayer,
  SearchResultsSwitcher,
  MusicZone,
  RadioPlayerConfig,
  TranscriptConfig,
  TranscriptEntryConfig,
  AudioSource,
  SearchHandler,
  LocalSearchBackend,
  FullTextSearchBackend,
  TranscriptIndex,
  FullTextSearchResponse,
  FullTextSearchResponseDoc,
  FullTextSearchServiceInterface,
  SearchBackendInterface,
  SearchHandlerInterface
};
