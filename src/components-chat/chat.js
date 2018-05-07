export default function renderChat({el, messages} = {}) {
  if(!el) {
    throw new Error("el");
  }

  if(!messages) {
    throw new Error("messages");
  }

  messages.forEach(
    (item) => {
      const messageEl = document.createElement('div');
      messageEl.innerHTML = 
        `<div class="сhat__message">
          <div class="сhat__message__user-photo">${item.userPhoto}</div>
          <div class="сhat__message__user-name">${item.userName}</div>
          <div class="сhat__message__sent-time">${item.sentTime.toLocaleString()}</div>
          <div class="сhat__message__text">${item.text}</div>
        </div>`;
        chatEl.appendChild(messageEl);
    }
  );

  const replyEl = document.createElement('div');
  replyEl.innerHTML = '<div class="сhat__reply">Reply</div>';
  chatEl.appendChild(replyEl);
}