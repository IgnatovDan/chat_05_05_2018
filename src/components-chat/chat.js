import ChatMessage from './__message/chat__message.js';
import ChatReplay from './__reply/chat__reply.js';

    /*???

    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = './src/components-chat/chat.css';
    head.appendChild(link);

    */
  
export default class Chat {
  constructor ({el, messages} = {}) {
    if(!el || !messages) throw new Error("incorrect arguments");

    this.el = el;
    this.messages = messages;
  }

  _renderMessageAtTheEnd(message) {
    const messageEl = document.createElement('div');
    this.el.appendChild(messageEl);

    const chatMessage = new ChatMessage({el: messageEl, message});
    chatMessage.render();
  }

  render() {
    this.messages.forEach(message => this._renderMessageAtTheEnd(message));
  
    const chatReplyEl = document.createElement('div');
    chatReplyEl.classList.add('chat__reply-container');
    this.el.appendChild(chatReplyEl);

    const chatReply = new ChatReplay({el: chatReplyEl});
    chatReply.addEventListener(ChatReplay.EVENTS_SENDREPLYMESSAGE, 
      (event) => {
        const message = {userPhoto: 'user2_photo', userName: 'You', sentTime: new Date(), text: chatReply.getReplyMessageText()};
        this.messages.push(message);
        this._renderMessageAtTheEnd(message);
      }
    );
    chatReply.render();
  }
}