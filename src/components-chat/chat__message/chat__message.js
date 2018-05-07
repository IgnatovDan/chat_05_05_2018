export default function renderChatMessage({el, message} = {}) {
  if(!el || !message) throw new Error("incorrect argument values");

  el.classList.add('сhat__message');
 
  el.innerHTML = `
    <div class="сhat__message__user-photo">${message.userPhoto}</div>
    <div class="сhat__message__user-name">${message.userName}</div>
    <div class="сhat__message__sent-time">${message.sentTime.toLocaleString()}</div>
    <div class="сhat__message__text">${message.text}</div>
    `;

  return el;
}