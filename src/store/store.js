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
    return Promise.all([
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
        })]
    )
    .then(
      () => {
        const clientMessages = Object.values(serverMessages).map(
          (item) => {
            const serverUser = serverUsers[item.userKey];
            return {
              userPhoto: serverUser.photo,
              userName: serverUser.name,
              sentTime: new Date(Date.parse(item.sentDateTime)),
              text: item.text
            };
          }
        );
        clientMessages.sort((a, b) => a.sentTime - b.sentTime);
        return clientMessages;
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