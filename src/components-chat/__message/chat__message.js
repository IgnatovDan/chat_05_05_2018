export default class ChatMessage {
  constructor({el, message} = {}) {
    if(!el || !message) throw new Error("incorrect argument values");
    this.el = el;
    this.message = message;
  }

  //completely replaces the innerHTML of the 'ctor(el)' element
  render() {
    this.el.classList.add('chat__message'); //TODO: class is added while content should be completely replaced!!!
  
    this.el.innerHTML = `
      <div class="chat__message__user-photo">${this.message.userPhoto}</div>
      <div class="chat__message__user-name">${this.message.userName}</div>
      <div class="chat__message__sent-time">${this.message.sentTime.toLocaleString()}</div>
      <div class="chat__message__text">${this.message.text}</div>
      `;
  }
}