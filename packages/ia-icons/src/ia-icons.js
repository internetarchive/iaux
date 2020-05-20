import { LitElement } from 'lit-element';
import advance from './icons/advance';
import audio from './icons/audio';
import close from './icons/close';
import donate from './icons/donate';
import ellipses from './icons/ellipses';
import iaLogo from './icons/ia-logo';
import images from './icons/images';
import search from './icons/search';
import software from './icons/software';
import texts from './icons/texts';
import upload from './icons/upload';
import user from './icons/user';
import video from './icons/video';
import web from './icons/web';

class Icon extends LitElement {
  firstUpdated() {
    const fill = this.getAttribute('fill');
    const stroke = this.getAttribute('stroke');
    if (fill) {
      this.shadowRoot.querySelectorAll('.fill-color')
        .forEach(el => el.setAttribute('fill', fill));
    }
    if (stroke) {
      this.shadowRoot.querySelectorAll('.stroke-color')
        .forEach(el => el.setAttribute('stroke', stroke));
    }
  }

  render() {
    return this.template;
  }
}

export class IconAdvance extends Icon {
  constructor() {
    super();
    this.template = advance;
  }
}
export class IconAudio extends Icon {
  constructor() {
    super();
    this.template = audio;
  }
}
export class IconClose extends Icon {
  constructor() {
    super();
    this.template = close;
  }
}
export class IconDonate extends Icon {
  constructor() {
    super();
    this.template = donate;
  }
}
export class IconEllipses extends Icon {
  constructor() {
    super();
    this.template = ellipses;
  }
}
export class IconIALogo extends Icon {
  constructor() {
    super();
    this.template = iaLogo;
  }
}
export class IconImages extends Icon {
  constructor() {
    super();
    this.template = images;
  }
}
export class IconSearch extends Icon {
  constructor() {
    super();
    this.template = search;
  }
}
export class IconSoftware extends Icon {
  constructor() {
    super();
    this.template = software;
  }
}
export class IconTexts extends Icon {
  constructor() {
    super();
    this.template = texts;
  }
}
export class IconUpload extends Icon {
  constructor() {
    super();
    this.template = upload;
  }
}
export class IconUser extends Icon {
  constructor() {
    super();
    this.template = user;
  }
}
export class IconVideo extends Icon {
  constructor() {
    super();
    this.template = video;
  }
}
export class IconWeb extends Icon {
  constructor() {
    super();
    this.template = web;
  }
}
