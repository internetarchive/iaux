/**
 * A data model for defining a zone of music, which is used
 * to skip over the zone if it is enabled.
 *
 * @export
 * @class MusicZone
 */
export default class MusicZone {
  start = 0;

  end = 0;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}
