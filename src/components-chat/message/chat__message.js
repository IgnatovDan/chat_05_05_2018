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

    // TODO: this approach reuires text encoding, I will use 'innerText' instead:
    //this.el.innerHTML = `
    //   <div class="chat__messageList__message__user-photo">${this.data.message.userPhoto}</div>
    //   <div class="chat__messageList__message__user-name">${this.data.message.userName}</div>
    //   <div class="chat__messageList__message__sent-time">${this.data.message.sentTime.toLocaleString()}</div>
    //   <div class="chat__messageList__message__text">${this.data.message.text}</div>

    this.el.innerHTML = `
      <div class="chat__messageList__message__user-photo"></div>
      <div class="chat__messageList__message__user-name"></div>
      <div class="chat__messageList__message__sent-time"></div>
      <div class="chat__messageList__message__text"></div>
    `;
    const userPhotoEl = this.el.querySelector('.chat__messageList__message__user-photo');
    userPhotoEl.innerText = this.data.message.userPhoto;
    const userNameEl = this.el.querySelector('.chat__messageList__message__user-name');
    userNameEl.innerText = this.data.message.userName;
    const sentTimeEl = this.el.querySelector('.chat__messageList__message__sent-time');
    sentTimeEl.innerText = this.data.message.sentTime.toLocaleString();
    const textEl = this.el.querySelector('.chat__messageList__message__text');
    textEl.innerText = this.data.message.text;
  }
}