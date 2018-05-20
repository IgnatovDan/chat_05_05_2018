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
  constructor ({ el, queryMessagesAsyncCallback, storeMessageAsyncCallback }) {
    if(!el) throw new Error("incorrect arguments");

    this.el = el;
    this._storeMessageAsyncCallback = storeMessageAsyncCallback;
    this._queryMessagesAsyncCallback = queryMessagesAsyncCallback;
  }

  render() {
    this.el.classList.add('chat');
    this.el.innerHTML = '';
    
    const messageListEl = document.createElement('div');
    this.el.appendChild(messageListEl);

    this.messageList = new MessageList({ el: messageListEl, queryMessagesAsyncCallback: this._queryMessagesAsyncCallback });
    //this.messageList.addEventListener(MessageList.EVENTS_REPLACEMESSAGELISTELEMENTBEFORE, this._messageList_replaceMessageListElementBefore.bind(this));
    //this.messageList.addEventListener(MessageList.EVENTS_REPLACEMESSAGELISTELEMENTBEFORE, this._messageList_replaceMessageListElementBefore.bind(this));
    //this.messageList.addEventListener(MessageList.EVENTS_REPLACEMESSAGELISTELEMENTBEFORE, this._messageList_replaceMessageListElementBefore.bind(this));
    this.messageList.render();
  
    const chatReplyEl = document.createElement('div');
    this.el.appendChild(chatReplyEl);

    const chatReply = new ChatReplay({el: chatReplyEl});
    chatReply.addEventListener(ChatReplay.EVENTS_SENDREPLYMESSAGE, this._chatReply_SendReplyMessageEventHandler.bind(this));
    chatReply.render();
  }

  _chatReply_SendReplyMessageEventHandler(event) {
    if(this._storeMessageAsyncCallback != null) {
      const chatReply = event.sender;
      
      chatReply.setIsSending(true);
      this._storeMessageAsyncCallback({ text: chatReply.getReplyMessageText()})
      .then((chatMessage) => {
        chatReply.setIsSending(false);
        chatReply.clearReplyMessageText();
        //this._showMessage(chatReplyContainerEl, chatMessage);
        this.messageList.render();
      })
      .catch((error) => {
        console.log('Error occured:');
        console.dir(error);
        alert(error);
        chatReply.setIsSending(false);
      });
    }
    else {
      throw new Error('_storeMessageAsyncCallback value is incorrect');
      //this._showMessage({ userPhoto: 'user2_photo', userName: 'You', sentTime: new Date(), text: chatReply.getReplyMessageText() });
    }
  }

  _showMessage(chatReplyContainerEl, chatMessage) {
    this._messages.push(chatMessage);

    let rectInitial = chatReplyContainerEl.getBoundingClientRect();
    this.messageList.appendMessageElement(chatMessage);
    let rectCurrent = chatReplyContainerEl.getBoundingClientRect();
    //TODO: there are some 'round' and controls are shifted down by 1px when each new message is added.
    window.scrollBy(0, rectCurrent.y - rectInitial.y); //keep visual position of the Reply section unchanged.
  }
}