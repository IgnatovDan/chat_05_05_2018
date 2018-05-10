import ChatMessage from './../message/chat__message.js';

export default class MessageList {

  constructor({el, data}) {
    if(!el || !data) throw new Error("incorrect arguments");

    this.el = el;
    this.data = data;
  }

  render() {
    this.el.innerHTML = '';
    this.data.messages.forEach(message => this.appendMessageElement(message));
  }

  appendMessageElement(message) {
    const messageContainerEl = document.createElement('div');
    messageContainerEl.classList.add('chat__messageList__message-container');
    this.el.appendChild(messageContainerEl);

    const chatMessage = new ChatMessage({el: messageContainerEl, data : { message} });
    chatMessage.render();
  }
}