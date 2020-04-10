/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * This represents an Internet Archive File
 *
 * @export
 * @class File
 */
export class File {
  name: string;

  source: string;

  btih: string;

  md5: string;

  format: string;

  mtime: string;

  crc32: string;

  sha1: string;

  original: string;

  constructor(json: any) {
    this.name = json.name;
    this.source = json.source;
    this.btih = json.btih;
    this.md5 = json.md5;
    this.format = json.format;
    this.mtime = json.mtime;
    this.crc32 = json.crc32;
    this.sha1 = json.sha1;
    this.original = json.original;
  }
}
