import { includes } from 'lodash';

/**
 * YouTube Params Parser
 * Takes the given YouTube URN
 * and returns a body to feed into YouTube iFrame API
 *
 * @param { string } fullID
 * @return { object } ytParams
 * ytParams.videoId - string
 * ytParams.startSeconds - number
 * ytParams.suggestedQuality - 'default'
 * ytParams.hasTimestamp - boolean
 */
export default (fullID) => {
  const URNqueryStart = new RegExp(/\?\=/g);
  const suggestedQuality = 'default';
  const defaultStartSeconds = 0;
  let secondsRetrieved;

  const videoIdPieces = fullID.split(URNqueryStart);
  const hasTimestamp = videoIdPieces.length > 1;
  const videoId = videoIdPieces[0];

  if (!hasTimestamp) {
    return {
      videoId,
      startSeconds: defaultStartSeconds,
      suggestedQuality,
      hasTimestamp
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
    hasTimestamp
  };

  return params;
};
