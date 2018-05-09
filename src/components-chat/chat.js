import renderChatMessage from './chat__message/chat__message.js';
import renderChatReplay from './chat__reply/chat__reply.js';

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
      this.el.appendChild(
        renderChatMessage({el: document.createElement('div'), message})
      );
    }
  );

  this.el.appendChild(
    renderChatReplay({el: document.createElement('div')})
  );
}