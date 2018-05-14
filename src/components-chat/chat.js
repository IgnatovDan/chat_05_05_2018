import MessageList from './messageList/chat__messageList.js';
import ChatReplay from './reply/chat__reply.js';

    /*???

    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = './src/components-chat/chat.css';
    head.appendChild(link);

    */
  
export default class Chat {
  constructor ({el, data}) {
    if(!el || !data) throw new Error("incorrect arguments");

    this.el = el;
    this.data = data;
  }

  render() {
    this.el.innerHTML = '';
    
    if(this.data.state === Chat.STATE_LOADING) {
      this.el.innerHTML = 'Loading...';
    }
    else if(this.data.messages.length === 0) {
      this.el.innerHTML = 'No messages.';
    }
    else {
      const messageListContainerEl = document.createElement('div');
      messageListContainerEl.classList.add('chat__messageList-container');
      this.el.appendChild(messageListContainerEl);

      this.messageList = new MessageList({ el: messageListContainerEl, data: { messages: this.data.messages }});
      this.messageList.render();
    
      const chatReplyContainerEl = document.createElement('div');
      chatReplyContainerEl.classList.add('chat__reply-container');
      this.el.appendChild(chatReplyContainerEl);

      const chatReply = new ChatReplay({el: chatReplyContainerEl});
      chatReply.addEventListener(ChatReplay.EVENTS_SENDREPLYMESSAGE, 
        (event) => {
          let rectInitial = chatReplyContainerEl.getBoundingClientRect();
          const message = {userPhoto: 'user2_photo', userName: 'You', sentTime: new Date(), text: chatReply.getReplyMessageText()};
          this.data.messages.push(message);
          this.messageList.appendMessageElement(message);
          let rectCurrent = chatReplyContainerEl.getBoundingClientRect();
          window.scrollBy(0, rectCurrent.y - rectInitial.y); //keep visual position of the Reply section unchanged.
        }
      );
      chatReply.render();
    }
  }
}

Chat.STATE_LOADING = 'Loading';