import EventEmitter from '../../view/event-emitter.js';

export default class ChatReplay extends EventEmitter {
  constructor({el}) {
    if(!el) throw new Error("incorrect arguments");
    super();
    this.el = el;
  }

  render() {
    this.el.innerHTML = `
      <input class="chat__reply__input" type="text" placeholder="Reply" required="required"/>
      <button class=""><img alt="Send" decoding="async" height="20" width="24" src="./src/components-chat/reply/send__button.png"/></button>
    `;

    const sendButtonEl = this.el.getElementsByTagName('button')[0];
    sendButtonEl.addEventListener('click', (evt) => {
      this.dispatchEvent({type: ChatReplay.EVENTS_SENDREPLYMESSAGE});
    });
  }

  getReplyMessageText() {
    const messageInputEl = this.el.getElementsByTagName('input')[0];
    return messageInputEl.value;
  }
}

ChatReplay.EVENTS_SENDREPLYMESSAGE = 'sendreplymessage';