import ChatMessage from './chat__message/chat__message.js';
import ChatReplay from './chat__reply/chat__reply.js';

export default function Chat({el, messages} = {}) {
  if(!el || !messages) throw new Error("incorrect arguments");

  /*???

  var head  = document.getElementsByTagName('head')[0];
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = './src/components-chat/chat.css';
  head.appendChild(link);

  */
 
  this.el = el;
  this.messages = messages;
}

Chat.prototype.render = function() {
  this.messages.forEach(
    (message) => {
      const chatMessage = new ChatMessage({el: document.createElement('div'), message});
      chatMessage.render();
      this.el.appendChild(chatMessage.el);
    }
  );

  debugger;
  const chatReply = new ChatReplay({el: document.createElement('div')});
  chatReply.render();
  this.el.appendChild(chatReply.el);
}