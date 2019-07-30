import youTubeParamsParser from './youtube-params-parser';
/**
 * YouTube Full Album Registry
 * checks playlist and if:
 * - all IDs are the same
 * - has timestamp
 * it will create a dictonary { trackNumber: {videoID, timestamp} }
 * @return { object | null } dictionary
 */
export default (playlist) => {
  let mainVideoID = '';
  const directory = playlist.reduce((dir, track) => {
    const thisTrack = track.youtube || track;
    const { trackNumber } = track;
    const isAlbum = trackNumber === 0;
    const { videoId, startSeconds } = youTubeParamsParser(thisTrack.id);
    if (isAlbum) {
      mainVideoID = videoId;
    }
    const fullVideoSegment = mainVideoID === videoId;
    if (fullVideoSegment) {
      dir.push({
        videoId,
        startSeconds,
        trackNumber,
      });
    }
    return dir;
  }, []);
  return directory.length ? directory : null;
};
