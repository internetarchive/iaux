export default class AudioSource {
  url: string;

  mimetype: string;

  constructor(url: string, mimetype: string) {
    this.url = url;
    this.mimetype = mimetype;
  }
}
