export default class ChatMessage {
  constructor({
      el,
      data /*= { message }*/
    }) {

    if(!el || !data) throw new Error("incorrect argument values");

    this.el = el;
    this.data = data;
  }

  //completely replaces the innerHTML of the 'ctor(el)' element
  render() {
    this.el.classList.add('chat__message'); //TODO: class is added while content should be completely replaced!!!
  
    this.el.innerHTML = `
      <div class="chat__message__user-photo">${this.data.message.userPhoto}</div>
      <div class="chat__message__user-name">${this.data.message.userName}</div>
      <div class="chat__message__sent-time">${this.data.message.sentTime.toLocaleString()}</div>
      <div class="chat__message__text">${this.data.message.text}</div>
    `;
  }
}