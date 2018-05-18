'use strict';

import Chat from './components-chat/chat.js';
import Store from './store/store.js';
import createTestDataAsync from './store/createTestDataAsync.js';

const store = new Store({rootConnectionString: 'https://chat05052018.firebaseio.com'});

const chat = new Chat({
  el: document.querySelector('.chat-container'), 
  messages : [], 
  isLoading: true,
  storeMessageAsyncCallback: (chatMessage) => store.storeChatMessageAsync(chatMessage)
});

createTestDataAsync(
  { 
    usersJsonUrl: store._getUsersJsonUrl(),
    messagesJsonUrl: store._getMessagesJsonUrl(),
  }
)
.then(() => {
  console.log('createTestDataAsync completed.');
  return store.queryMessagesAsync();
})
.then((messages) => {
  chat._messages = messages;
  chat._isLoading = false;
  chat.render();
})
.catch(error => {
  console.log('Error oocured:');
  console.dir(error);
  alert(error);
});

chat.render();