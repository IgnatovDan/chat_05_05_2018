import renderChatMessage from './chat__message/chat__message.js';
import renderChatReplay from './chat__reply/chat__reply.js';

export default function renderChat({el, messages} = {}) {
  if(!el || !messages) throw new Error("incorrect arguments");

  addChatStyleSheet();
  
  messages.forEach(
    (message) => {
      el.appendChild(
        renderChatMessage({el: document.createElement('div'), message})
      );
    }
  );

  el.appendChild(
    renderChatReplay({el: document.createElement('div')})
  );
  
  return el;
}

function addChatStyleSheet() {
  var head  = document.getElementsByTagName('head')[0];
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = './src/components-chat/chat.css';
  head.appendChild(link);
}