/**
 * isValidAudioFile
 * checks string for valid extension
 *
 * @param {string } trackName
 * @returns { boolean }
 */
export const isValidAudioFile = (trackName = '') => !!trackName.match(/(mp3|ogg|flac|m4a|wma|aiff|aac|aa|ra|ram|shn|wav|wave)$/g);

/**
 * isValidImageFile
 * checks string for valid extension
 *
 * @param {string } imageName
 * @returns { boolean }
 */
export const isValidImageFile = (imageName = '') => !!imageName.match(/(png|jpg|jpeg)$/gi);
