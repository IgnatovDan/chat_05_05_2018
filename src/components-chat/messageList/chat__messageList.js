import EventEmitter from './../../view/event-emitter.js';
import ChatMessage from './../message/chat__message.js';

export default class MessageList extends EventEmitter {

  constructor({el, queryMessagesAsyncCallback}) {
    if(!el) throw new Error("incorrect arguments");
    super();

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
      if(this.el.childElementCount === 0) {
        this.el.innerText = 'Loading...'; //TODO: change explicit HTML content to 'block modifier' as CSS style
      }
      this._queryMessagesAsyncCallback()
      .then((messages) => {
        if(messages.length === 0) {
          this.el.innerText = 'No messages';
        }
        else {
          const oldMessageListEl = this.messageListEl;
          this.messageListEl = document.createElement('div');
          messages.forEach(message => this.appendMessageElement(message));
          if(oldMessageListEl) {
            this.dispatchEvent({ type: MessageList.EVENTS_REPLACEMESSAGELISTELEMENTBEFORE });
            this.el.replaceChild(this.messageListEl, oldMessageListEl);
            this.dispatchEvent({ type: MessageList.EVENTS_REPLACEMESSAGELISTELEMENTBEFORE });
          }
          else {
            this.el.innerHTML = '';
            this.el.appendChild(this.messageListEl);
            this.dispatchEvent({ type: MessageList.EVENTS_APPENDMESSAGELISTELEMENTAFTER });
          }
        }
        this._nextRenderTimeoutId = setTimeout(() => this.render(), 5000);
      });
    }
  }

  appendMessageElement(message) {
    const messageEl = document.createElement('div');
    this.messageListEl.appendChild(messageEl);

    const chatMessage = new ChatMessage({el: messageEl, data : { message} });
    chatMessage.render();
  }
}

MessageList.EVENTS_REPLACEMESSAGELISTELEMENTBEFORE = 'replaceMessageListElement:before';
MessageList.EVENTS_REPLACEMESSAGELISTELEMENTAFTER = 'replaceMessageListElement:after';
MessageList.EVENTS_APPENDMESSAGELISTELEMENTAFTER = 'appendMessageListElement:after';