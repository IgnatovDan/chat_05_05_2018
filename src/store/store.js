import _createTestDataAsync from './createTestDataAsync.js';

export default class Store {
  constructor({rootConnectionString}) {
    if(!rootConnectionString) throw new Error('Invalid arguments');
    this.rootConnectionString = rootConnectionString;
  }

  createTestDatabaseAsync() {
    return _createTestDataAsync(
      { 
        usersJsonUrl: this._getUsersJsonUrl(),
        messagesJsonUrl: this._getMessagesJsonUrl(),
      }
    );
  }

  queryMessagesAsync() {
    let serverUsers, serverMessages;
    return Promise.all(new Array(
      fetch(this._getUsersJsonUrl())
        .then((usersResponse) => {
          return usersResponse.json();
        })
        .then((_serverUsers) => {
          serverUsers = _serverUsers;
          return Promise.resolve();
        }),
      fetch(this._getMessagesJsonUrl())
        .then((messagesResponse) => {
          return messagesResponse.json();
        })
        .then((_serverMessages) => {
          serverMessages = _serverMessages;
          return Promise.resolve();
        }))
    )
    .then(
      (serverData) => {
        //TODO: convert serverMessage to clientMessages
        //new Array(serverData.users)
        //new Array(serverData.messages)
        const messages = [
          {userPhoto: 'user1_photo', userName: 'Ayowa Sonito', sentTime: new Date(new Date().getTime() - 10*60000), text: 'hi!'},
          {userPhoto: 'user2_photo', userName: 'You', sentTime: new Date(new Date().getTime() - 9*60000), text: 'xdf'},
          {userPhoto: 'user3_photo', userName: 'John Money', sentTime: new Date(new Date().getTime() - 6*60000), text: 'Hey You, happy to have you here!'},
          {userPhoto: 'user4_photo', userName: 'Babel Thomas', sentTime: new Date(new Date().getTime() - 3*60000), text: 'How are you?'},
          {userPhoto: 'user5_photo', userName: 'Daniella Thompson', sentTime: new Date(), text: 'welcome!!'},
        ];
        return messages;
      }
    );
  }

  _getUsersJsonUrl() {
    return this.rootConnectionString + '/users.json';
  }
  _getMessagesJsonUrl() {
    return this.rootConnectionString + '/messages.json';
  }
}