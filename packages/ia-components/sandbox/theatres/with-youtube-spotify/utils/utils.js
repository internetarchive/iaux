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

/**
 * isOlderDerivedMP3
 * Older derived MP3s can still exist, and this causes double
 * checks string for valid extension
 *
 * @param {string } trackName
 * @returns { boolean }
 */
export const isOlderDerivedMP3 = (trackName = '') => !!trackName.match(/_vbr.mp3$/g);

/**
 * isValidSegmentFile
 * Segment files are what IA uses to break down longer audio files to smaller ones
 * They are created by IA's internal CD & LP ripping software
 * checks string for valid extension
 *
 * @param {string } fileName
 * @returns { boolean }
 */
export const isValidSegmentFile = (fileName = '') => !!fileName.match(/_segments.(json|xml)$/gi);
