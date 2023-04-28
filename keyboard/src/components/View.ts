import keyCupsEn from '../en';
import MainWrapper from '../templates/MainWrapper';
import Page from '../templates/Page';

interface keyCup {
    small: string;
    shift: string;
    code:string;
  }

export default class View {
  wrapper:HTMLDivElement;

  body:HTMLBodyElement;

  main:HTMLElement;

  textArea:HTMLTextAreaElement;

  changeCaps:()=>void;

  changeRegisterHandler:()=>void;

  checkRegisterHandler:(arg0:keyCup)=>void;

  checkShiftAlt:()=>boolean;

  keys:NodeList;

  constructor() {
    this.body = document.querySelector('body');
    this.body.innerHTML = Page();
    this.main = document.querySelector('main');
    this.main.innerHTML = MainWrapper();
    this.wrapper = this.main.querySelector('.main-wrapper');
    this.textArea = this.main.querySelector('.use-keyboard-input');
    this.keys;
  }

  bindChangeCapsLock(handler:()=>void) {
    this.changeCaps = handler;
  }

  bindChangeRegister(handler:()=>void) {
    this.changeRegisterHandler = handler;
  }

  bindCheckRegister(handler:(arg0:keyCup)=>void) {
    this.checkRegisterHandler = handler;
  }

  bindCheckShiftAlt(handler:()=>boolean) {
    this.checkShiftAlt = handler;
  }

  setKeys(alphabet:keyCup[]) {
    const fragment = document.createDocumentFragment();
    alphabet.forEach((element:keyCup) => {
      const key = document.createElement('button');
      const insertLineBreak = ['Backspace', '\\', 'Enter', '?'].indexOf(element.small) !== -1;

      key.setAttribute('type', 'button');
      key.classList.add('keyboard__key');
      key.innerHTML = element.small;

      switch (true) {
        case element.small === 'Backspace':
          key.classList.add('keyboard__key-wide');
          key.addEventListener('click', () => {
            this.textArea.value = this.textArea.value.substring(0, this.textArea.value.length - 1);
          });
          break;

        case element.small === 'Del':
          key.classList.add('keyboard__key-small');
          break;

        case element.small === 'Caps lock':
          key.classList.add('keyboard__key-medium');
          key.addEventListener('click', () => {
            this.changeCaps();
            this.changeRegisterHandler();
          });
          break;

        case element.small === 'Shift':
          if (!fragment.querySelector('.ShiftLeft')) {
            key.classList.add('keyboard__key-medium', 'ShiftLeft');
          } else {
            key.classList.add('keyboard__key-medium', 'ShiftRight');
          }
          break;

        case element.small === 'Enter':
          key.classList.add('keyboard__key-enter');
          key.addEventListener('click', () => {
            this.textArea.value += '\n';
          });

          break;

        case element.small === 'Space':
          key.classList.add('keyboard__key-extra-wide');
          key.addEventListener('click', () => {
            this.textArea.value += ' ';
          });
          break;

        case element.small === 'Tab':
          key.classList.add('keyboard__key-small');
          key.addEventListener('click', () => {
            this.textArea.value += '    ';
          });
          break;

        case element.small === 'Win':
          key.classList.add('keyboard__key-small');
          break;

        case element.small === 'Alt':
          key.classList.add('keyboard__key-small');
          break;

        case element.small === 'Ctrl':
          key.classList.add('keyboard__key-small');
          break;

        case element.small === '&#9651':
          key.classList.add('ArrowUp');
          break;
        case element.small === '&#9665':
          key.classList.add('ArrowLeft');
          break;
        case element.small === '&#9661':
          key.classList.add('ArrowDown');
          break;
        case element.small === '&#9655':
          key.classList.add('ArrowRight');
          break;
        default:
          key.addEventListener('click', () => {
            this.checkRegisterHandler(element);
          });
          break;
      }
      fragment.appendChild(key);
      if (insertLineBreak || key.classList.contains('ShiftRight')) {
        fragment.appendChild(document.createElement('br'));
      }
    });
    this.wrapper.append(fragment);
    this.keys = this.wrapper.querySelectorAll('.keyboard__key');
    
  }

  changeRegister(isCapsLock:boolean) {
    for (let i = 0; i < this.keys.length; i += 1) {
      const key = this.keys[i];
      if (key.textContent.length === 1) {
        key.textContent = isCapsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  }

  bindKeyDown(handler:(event:KeyboardEvent)=>void) {
    this.body.addEventListener('keydown', (event) => {
      handler(event);
    });
  }

  bindKeyUp(handler:()=>void) {
    this.body.addEventListener('keyup', (event) => {
      handler();
    });
  }
}
