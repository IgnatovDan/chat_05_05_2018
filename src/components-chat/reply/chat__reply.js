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
      <span class="chat__reply__sendingText">Sending...</span>
    `;

    this._getSendButtonEl().addEventListener('click', (evt) => {
      //if(this.getReplyMessageText()) {
        this.dispatchEvent({type: ChatReplay.EVENTS_SENDREPLYMESSAGE, sender: this});
      //}
    });

    this.setIsSending(false);
  }

  getReplyMessageText() {
    return this._getReplyMessageEl().value;
  }

  clearReplyMessageText() {
    return this._getReplyMessageEl().value = '';
  }

  setIsSending(isSending) {
    //TODO: migrate to css styles on the 'chat__reply' element
    if(isSending) {
      this._getSendButtonEl().disabled = true;
      this._getReplyMessageEl().disabled = true;
      this._getSendingTextEl().classList.remove('chat__reply__sendingText_isSending');
    }
    else {
      this._getReplyMessageEl().disabled = false;
      this._getSendButtonEl().disabled = false;
      this._getSendingTextEl().classList.add('chat__reply__sendingText_isSending');
    }
  }

  _getSendButtonEl() {
    if(!this._sendButtonEl) this._sendButtonEl = this.el.getElementsByTagName('button')[0];
    return this._sendButtonEl;
  }

  _getReplyMessageEl() {
    if(!this._replyMessageEl) this._replyMessageEl = this.el.getElementsByTagName('input')[0];
    return this._replyMessageEl;
  }

  _getSendingTextEl() {
    if(!this.sendingTextEl) this.sendingTextEl = this.el.querySelector('.chat__reply__sendingText');
    return this.sendingTextEl;
  }
}

ChatReplay.EVENTS_SENDREPLYMESSAGE = 'sendreplymessage';