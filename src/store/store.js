export default class Store {
  constructor({rootConnectionString}) {
    if(!rootConnectionString) throw new Error('Invalid arguments');
    this.rootConnectionString = rootConnectionString;
    this.currentUserKey = null;
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
          this.currentUserKey = Object.getOwnPropertyNames(serverUsers).find(propertyName => serverUsers[propertyName].name === Store.CURRENTUSERNAME);
          this.currentUser = serverUsers[this.currentUserKey];
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
            return this._createChatMessage({
              userPhoto: serverUser.photo,
              userName: serverUser.name,
              sentTime: new Date(Date.parse(item.sentDateTime)),
              text: item.text
            });
          }
        );
        clientMessages.sort((a, b) => a.sentTime - b.sentTime);
        return clientMessages;
      }
    );
  }

  storeChatMessageAsync({ text } = {}) {
    if(!text || !this.currentUserKey || !this.currentUser) throw new Error('Invalid arguments');

    let sentDateTime = new Date();
    return fetch(this._getMessagesJsonUrl(),
      {
        body: JSON.stringify({ userKey: this.currentUserKey, text: text, sentDateTime/*assign on the server side?*/ }),
        cache: 'no-cache',
        headers: { 'content-type': 'application/json' },
        method: 'POST'
      }
    )
    .then(() => {
      return Promise.resolve(
        this._createChatMessage(
          {
            userPhoto: this.currentUser.photo,
            userName: this.currentUser.name,
            sentTime: sentDateTime,
            text
          }
        )
      );
    });
  }

  _getUsersJsonUrl() {
    return this.rootConnectionString + '/users.json';
  }

  _getMessagesJsonUrl() {
    return this.rootConnectionString + '/messages.json';
  }

  _createChatMessage({ userPhoto, userName, sentTime, text } = {}) {
    return { userPhoto, userName, sentTime, text };
  }

}

Store.CURRENTUSERNAME = "You";