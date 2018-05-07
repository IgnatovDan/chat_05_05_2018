import renderChatMessage from './chat__message/chat__message.js';
import renderChatReplay from './chat__reply/chat__reply.js';

export default function renderChat({el, messages} = {}) {
  if(!el || !messages) throw new Error("incorrect arguments");

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