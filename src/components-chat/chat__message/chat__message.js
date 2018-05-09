export default class ChatMessage {
  constructor({el, message} = {}) {
    if(!el || !message) throw new Error("incorrect argument values");
    this.el = el;
    this.message = message;
  }

  render() {
    this.el.classList.add('chat__message');
  
    this.el.innerHTML = `
      <div class="chat__message__user-photo">${this.message.userPhoto}</div>
      <div class="chat__message__user-name">${this.message.userName}</div>
      <div class="chat__message__sent-time">${this.message.sentTime.toLocaleString()}</div>
      <div class="chat__message__text">${this.message.text}</div>
      `;
  }
}