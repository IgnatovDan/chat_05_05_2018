export default function ChatMessage({el, message} = {}) {
  if(!el || !message) throw new Error("incorrect argument values");
  this.el = el;
  this.message = message;
}

ChatMessage.prototype.render = function() {
  this.el.classList.add('сhat__message');
 
  this.el.innerHTML = `
    <div class="сhat__message__user-photo">${this.message.userPhoto}</div>
    <div class="сhat__message__user-name">${this.message.userName}</div>
    <div class="сhat__message__sent-time">${this.message.sentTime.toLocaleString()}</div>
    <div class="сhat__message__text">${this.message.text}</div>
    `;
}