export default class ChatMessage {
  constructor({
      el,
      data /*= { message }*/
    }) {

    if(!el || !data) throw new Error("incorrect argument values");

    this.el = el;
    this.data = data;
  }

  render() {
    this.el.classList.add('chat__messageList__message');
  
    this.el.innerHTML = `
      <div class="chat__messageList__message__user-photo">${this.data.message.userPhoto}</div>
      <div class="chat__messageList__message__user-name">${this.data.message.userName}</div>
      <div class="chat__messageList__message__sent-time">${this.data.message.sentTime.toLocaleString()}</div>
      <div class="chat__messageList__message__text">${this.data.message.text}</div>
    `;
  }
}