import ChatMessage from './../message/chat__message.js';

export default class MessageList {

  constructor({el, queryMessagesAsyncCallback}) {
    if(!el) throw new Error("incorrect arguments");

    this.el = el;
    this._queryMessagesAsyncCallback = queryMessagesAsyncCallback;
  }

  render() {
    this.el.classList.add('chat__messageList');

    if(this._nextRenderTimeoutId) {
      clearTimeout(this._nextRenderTimeoutId);
    }

    if(!this._queryMessagesAsyncCallback) {
      this.el.innerText = 'queryMessagesAsyncCallback value is incorrect';
    }
    else {
      this.el.innerText = 'Loading...'; //TODO: change explicit HTML content to 'block modifier' as CSS style
      
      this._queryMessagesAsyncCallback()
      .then((messages) => {
        if(messages.length === 0) {
          this.el.innerText = 'No messages';
        }
        else {
          this.el.innerHTML = '';
          messages.forEach(message => this.appendMessageElement(message));
        }
        this._nextRenderTimeoutId = setTimeout(() => this.render(), 5000);
      });
    }
  }

  appendMessageElement(message) {
    const messageEl = document.createElement('div');
    this.el.appendChild(messageEl);

    const chatMessage = new ChatMessage({el: messageEl, data : { message} });
    chatMessage.render();
  }
}