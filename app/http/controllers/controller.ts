import autoBind from "auto-bind";

class Controller {
  constructor() {
    autoBind(this);
  }
  testMode() {
    return "Test String";
  }
}

export default Controller;
