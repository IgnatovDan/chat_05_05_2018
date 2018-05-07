'use strict';

import renderChat from './components-chat/chat.js';

const messages = [
  {userPhoto: 'user1_photo', userName: 'Ayowa Sonito', sentTime: new Date(new Date().getTime() - 10*60000), text: 'hi!'},
  {userPhoto: 'user2_photo', userName: 'You', sentTime: new Date(new Date().getTime() - 9*60000), text: 'xdf'},
  {userPhoto: 'user3_photo', userName: 'John Money', sentTime: new Date(new Date().getTime() - 6*60000), text: 'Hey You, happy to have you here!'},
  {userPhoto: 'user4_photo', userName: 'Babel Thomas', sentTime: new Date(new Date().getTime() - 3*60000), text: 'How are you?'},
  {userPhoto: 'user5_photo', userName: 'Daniella Thompson', sentTime: new Date(), text: 'welcome!!'},
];

renderChat({el: document.getElementById('chatEl'), messages});