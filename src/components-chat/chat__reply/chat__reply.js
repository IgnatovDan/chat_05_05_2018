export default class ChatReplay {
  constructor({el} = {}) {
    if(!el) throw new Error("incorrect arguments");
    this.el = el;
  }

  render() {
    this.el.classList.add('сhat__reply');
    this.el.innerText = 'Reply';
  }
}