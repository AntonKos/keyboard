import keyCupsEn from '../en';
import keyCupsRu from '../ru';

export default class Model {
  keyCups:{ small: string, shift: string, code:string}[] ;

  ruKeys:string[];

  engKeys:string[];

  isCapsLock:boolean;

  isShiftLeft:boolean;

  isAlt:boolean;

  lang:string;

  pressed:Set<String>;

  constructor() {
    this.isCapsLock = false;
    this.lang = window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'en';
    this.keyCups = (this.lang === 'en') ? keyCupsEn : keyCupsRu;
    this.pressed = new Set();
    this.isShiftLeft = false;
    this.isAlt = false;
  }
}
