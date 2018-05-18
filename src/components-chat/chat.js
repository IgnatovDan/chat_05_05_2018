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
    
    if(this.data.isLoading) {
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
      chatReply.addEventListener(ChatReplay.EVENTS_SENDREPLYMESSAGE, this._chatReply_SendReplyMessageEventHandler.bind(this));
      chatReply.render();
    }
  }

  _chatReply_SendReplyMessageEventHandler(event) {
    if(this.data.storeMessageAsyncCallback != null) {
      chatReply.setIsSending(true);
      this.data.storeMessageAsyncCallback({ text: chatReply.getReplyMessageText()})
      .then((chatMessage) => {
        chatReply.setIsSending(false);
        chatReply.clearReplyMessageText();
        this._showMessage(chatReplyContainerEl, chatMessage);
      })
      .catch((error) => {
        console.log('Error occured:');
        console.dir(error);
        alert(error);
        chatReply.setIsSending(false);
      });
    }
    else {
      throw new Error('data.storeMessageAsyncCallback value is incorrect');
      //this._showMessage({ userPhoto: 'user2_photo', userName: 'You', sentTime: new Date(), text: chatReply.getReplyMessageText() });
    }
  }

  _showMessage(chatReplyContainerEl, chatMessage) {
    this.data.messages.push(chatMessage);

    let rectInitial = chatReplyContainerEl.getBoundingClientRect();
    this.messageList.appendMessageElement(chatMessage);
    let rectCurrent = chatReplyContainerEl.getBoundingClientRect();
    //TODO: there are some 'round' and controls are shifted down by 1px when each new message is added.
    window.scrollBy(0, rectCurrent.y - rectInitial.y); //keep visual position of the Reply section unchanged.
  }
}