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
        debugger;
        const message = {userPhoto: 'user2_photo', userName: 'You', sentTime: new Date(), text: chatReply.getReplyMessageText()};
        this.data.messages.push(message);
        this.messageList.appendMessageElement(message);
        chatReplyContainerEl.scrollIntoView(false);
        //window.scrollTo();
        //TODO: The position of the 'reply' section in visible area should kept but it is shifted down: save it before changes and restore after.
      }
    );
    chatReply.render();
  }
}