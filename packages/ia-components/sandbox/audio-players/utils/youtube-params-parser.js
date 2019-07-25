import { includes } from 'lodash';

/**
 * YouTube Params Parser
 * Takes the given YouTube URN
 * and returns a body to feed into YouTube iFrame API
 *
 * @param { string } fullID
 * @return { object ) ytParams
 * ytParams.videoId - string
 * ytParams.startSeconds - number
 * ytParams.suggestedQuality - 'default'
 */
export default (fullID) => {
  const URNqueryStart = new RegExp(/\?\=/g);
  const suggestedQuality = 'default';
  const defaultStartSeconds = 0;
  let secondsRetrieved;

  const videoIdPieces = fullID.split(URNqueryStart);
  const noTimestamp = videoIdPieces.length < 2;
  const videoId = videoIdPieces[0];

  if (noTimestamp) {
    return {
      videoId,
      startSeconds: defaultStartSeconds,
      suggestedQuality,
    };
  }

  videoIdPieces.forEach((idPiece) => {
    const hasTimeStamp = includes(idPiece, 't=');
    if (hasTimeStamp) {
      const secondsString = idPiece.substring(2);
      secondsRetrieved = parseInt(secondsString, 10);
    }
  });

  const startSeconds = Number.isInteger(secondsRetrieved)
    ? secondsRetrieved
    : defaultStartSeconds;
  const params = {
    videoId,
    startSeconds,
    suggestedQuality,
  };

  return params;
};
