import Model from './components/Model';
import View from './components/View';
import Controller from './components/Controller';

export default class App {
  model:any;

  view:any;

  controller:any;

  init() {
    this.navigate();
  }

  navigate = () => {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
  };
}
