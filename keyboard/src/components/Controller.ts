interface keyCup {
  small: string;
  shift: string;
  code:string;
}

interface Imodel{
  keyCups:{ small: string, shift: string, code:string}[] ;
  ruKeys:string[];
  engKeys:string[];
  isCapsLock:boolean;
  isShiftLeft:boolean;
  isAlt:boolean;
  lang:string;
  pressed:Set<String>;
}

interface IView{
  wrapper:HTMLDivElement;
  body:HTMLBodyElement;
  main:HTMLElement;
  textArea:HTMLTextAreaElement;
  changeCaps:()=>void;
  changeRegisterHandler:()=>void;
  checkRegisterHandler:(arg0:keyCup)=>void;
  checkShiftAlt:()=>boolean;
  bindChangeCapsLock:(arg0:()=>void)=>void;
  bindCheckRegister:(arg0:(arg0:keyCup)=>void)=>void;
  setKeys:(arg0:{}[])=>void;
  bindChangeRegister:(arg0:()=>void)=>void;
  bindKeyDown:(arg0:(event:KeyboardEvent)=>void)=>void;
  bindKeyUp:(arg0:()=>void)=>void;
  changeRegister:(arg0:boolean)=>void;
  keys:NodeList;
}

export default class Controller {
  model: Imodel;

  view: IView;

  constructor(model:any, view:any) {
    this.model = model;
    this.view = view;
    this.view.bindCheckRegister(this.handleCheckRegister);
    this.view.setKeys(this.model.keyCups);
    this.view.bindChangeCapsLock(this.handleChangeCaps);
    this.view.bindChangeRegister(this.handleChangeRegister);
    this.view.bindKeyDown(this.handleKeyDown);
    this.view.bindKeyUp(this.handleKeyUp);
    
    // this.view.bindCheckShiftAlt(this.checkShiftAlt);
  }

  checkShiftAlt = () => this.model.isAlt && this.model.isShiftLeft;

  handleKeyUp = () => {
    this.model.pressed.clear();
  };

  handleChangeCaps = () => {
    this.model.isCapsLock = !this.model.isCapsLock;
  };

  handleChangeRegister = () => {
    this.view.changeRegister(this.model.isCapsLock);
  };

  handleCheckRegister = (element:keyCup) => {
    this.view.textArea.value += this.model.isCapsLock ? element.small.toUpperCase() : element.small.toLowerCase();
  };

  handleKeyDown = (event:KeyboardEvent) => {

    this.model.pressed.add(event.code);

    if (this.model.pressed.has('CapsLock')) {
      this.model.isCapsLock = !this.model.isCapsLock;
      this.view.changeRegister(this.model.isCapsLock);
    }

    if (this.model.pressed.has('Tab')) {
      this.view.textArea.value += '    ';
      this.view.textArea.focus();
    }

    if ((this.model.pressed.has('ShiftLeft') && !this.model.pressed.has('AltLeft')) || this.model.pressed.has('ShiftRight')) {
      if (event.repeat) { return; }
      this.model.isCapsLock = !this.model.isCapsLock;
      this.view.changeRegister(this.model.isCapsLock);
    }

    switch (true) {
      case this.model.pressed.has('ArrowUp'):
        this.view.textArea.value += '△';
        event.preventDefault();
        break;
      case this.model.pressed.has('ArrowDown'):
        this.view.textArea.value += '▽';
        event.preventDefault();
        break;
      case this.model.pressed.has('ArrowLeft'):
        this.view.textArea.value += '◁';
        event.preventDefault();
        break;
      case this.model.pressed.has('ArrowRight'):
        this.view.textArea.value += '▷';
        event.preventDefault();
        break;
      default:
        break;
    }
  };
}
