'use strict';

import Chat from './components-chat/chat.js';
import Store from './store/store.js';
import createTestDataAsync from './store/createTestDataAsync.js';

const store = new Store({rootConnectionString: 'https://chat05052018.firebaseio.com'});

let isCreateTestDataAsyncCalled = false;

const tryCreateTestDataAsync = async function() {
  if(isCreateTestDataAsyncCalled) {
    return Promise.resolve();
  }
  else {
    isCreateTestDataAsyncCalled = true;
    return createTestDataAsync(
      { 
        usersJsonUrl: store._getUsersJsonUrl(),
        messagesJsonUrl: store._getMessagesJsonUrl(),
      });
  }
}

const queryMessagesAsync = async function() {
  return tryCreateTestDataAsync()
    .then(() => {
      return store.queryMessagesAsync();
    })
    .then((messages) => {
      return Promise.resolve(messages);
    });
}

const chat = new Chat({
  el: document.querySelector('.chatElement'), 
  queryMessagesAsyncCallback: queryMessagesAsync,
  storeMessageAsyncCallback: (chatMessage) => store.storeChatMessageAsync(chatMessage),
});

chat.render();