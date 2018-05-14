'use strict';

import Chat from './components-chat/chat.js';
import Store from './store/store.js';

const chat = new Chat({
  el: document.querySelector('.chat-container'), 
  data : { messages : [], state: Chat.STATE_LOADING } 
});

const store = new Store({rootConnectionString: 'https://chat05052018.firebaseio.com'});

store.createTestDatabaseAsync()
.then(() => {
  console.log('createTestDatabaseAsync completed.');

  return store.queryMessagesAsync();
})
.then((messages) => {
  chat.data.messages = messages;
  chat.data.state = null;
  chat.render();
})
.catch(error => {
  console.log('createTestDatabaseAsync error:');
  console.dir(error);
  alert(error);
});

chat.render();