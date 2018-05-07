'use strict';

const chatEl = document.querySelector('.marker-chatEl');
if(chatEl === null) {
  throw new Error("queryElement('.marker-chatEl') returned null.");
}

const messages = [
  {userPhoto: 'user1_photo', userName: 'Ayowa Sonito', sentTime: new Date(new Date().getTime() - 10*60000), text: 'hi!'},
  {userPhoto: 'user2_photo', userName: 'You', sentTime: new Date(new Date().getTime() - 9*60000), text: 'xdf'},
  {userPhoto: 'user3_photo', userName: 'John Money', sentTime: new Date(new Date().getTime() - 6*60000), text: 'Hey You, happy to have you here!'},
  {userPhoto: 'user4_photo', userName: 'Babel Thomas', sentTime: new Date(new Date().getTime() - 3*60000), text: 'How are you?'},
  {userPhoto: 'user5_photo', userName: 'Daniella Thompson', sentTime: new Date(), text: 'welcome!!'},
];

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