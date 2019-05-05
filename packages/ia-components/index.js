/**
 * Export all of the public components here
 */

// live
//Next line fails webpack - complains Support for the experimental syntax 'classProperties' isn't currently enabled
//If it is needed then please document how to add it to something using this index.js from another package
//or import directory
//export { default as IAUXExampleComponent } from './live/example-react-component/index';

// sandbox
export { default as HorizontalRadioGroup } from './sandbox/selectors/horizontal-radio-group/horizontal-radio-group';
export { default as FlexboxPagination } from './sandbox/pagination/pagination-with-flexbox';

export { default as TheatreTrackList } from './sandbox/theatres/components/track-list/track-list';
export { default as TheatreAudioPlayer } from './sandbox/theatres/components/audio-player/audio-player-main';
export { default as AudioPlayerWithYoutubeSpotify } from './sandbox/theatres/with-youtube-spotify/audio-with-youtube-spotify-main';
export { default as AnchorDetails } from './sandbox/AnchorDetails';
// sandbox tiles
export { default as ParentTileImage } from './sandbox/tiles/ParentTileImg';
export { default as RelatedItems } from './sandbox/tiles/RelatedItems';
export { default as TileComponent } from './sandbox/tiles/TileComponent';
export { TileGrid, ScrollableTileGrid } from './sandbox/tiles/TileGrid';
// details page
export { default as AnchorDownload } from './sandbox/details/AnchorDownload';
export { default as DetailsActionButtons } from './sandbox/details/DetailsActionButtons';
export { default as DetailsCollectionList } from './sandbox/details/DetailsCollectionList';
export { default as DetailsDownloadOptions } from './sandbox/details/DetailsDownloadOptions';
export { default as DetailsFlags } from './sandbox/details/DetailsFlags';
export { AnchorModalGo, ButtonModalGo } from './sandbox/details/ModalGo';
export { default as Tabby} from './sandbox/details/Tabby';
