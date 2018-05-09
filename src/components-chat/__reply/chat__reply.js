export default class ChatReplay {
  constructor({el} = {}) {
    if(!el) throw new Error("incorrect arguments");
    this.el = el;
  }

  render() {
    this.el.innerHTML = `
      <input class="chat__reply__input" type="text" placeholder="Reply" required="required"/>
    `;
  }
}