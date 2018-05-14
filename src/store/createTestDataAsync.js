export default function createTestDataAsync( { usersJsonUrl, messagesJsonUrl} ) {

  const users = [
    { key: 'user1', photo: 'user1_photo', name: 'Ayowa Sonito' },
    { key: 'user2', photo: 'user2_photo', name: 'You' },
    { key: 'user3', photo: 'user3_photo', name: 'John Money' },
    { key: 'user4', photo: 'user4_photo', name: 'Babel Thomas' },
    { key: 'user5', photo: 'user5_photo', name: 'Daniella Thompson' },
  ];
  const messages = [
    {userKey: 'user1', sentDateTime: new Date(new Date().getTime() - 10*60000), text: 'hi!'},
    {userKey: 'user2', sentDateTime: new Date(new Date().getTime() - 9*60000), text: 'xdf'},
    {userKey: 'user3', sentDateTime: new Date(new Date().getTime() - 6*60000), text: 'Hey You, happy to have you here!'},
    {userKey: 'user4', sentDateTime: new Date(new Date().getTime() - 3*60000), text: 'How are you?'},
    {userKey: 'user5', sentDateTime: new Date(), text: 'welcome!!'}
  ]

  return fetch(usersJsonUrl)
    .then((usersResponse) => {
      return usersResponse.json();
    })
    .then((serverUsers) => {
      if(serverUsers) {
        return Promise.resolve('There are users already');
      }
      else {
        return _createUsersAsync({ usersJsonUrl, users });
      }
    })
    .then(() => {
      return fetch(messagesJsonUrl);
    })
    .then((messagesResponse) => {
      return messagesResponse.json();
    })
    .then((serverMessages) => {
      if(serverMessages) {
        return Promise.resolve('There are messages already');
      }
      else {
        return _createMessagesAsync({ usersJsonUrl, users, messagesJsonUrl, messages });
      }
    });
}

function _createUsersAsync({ usersJsonUrl, users }) {
  const promises = [];
  users.forEach(
    (user) => {
      promises.push(
        fetch(usersJsonUrl,
          {
            body: JSON.stringify({ name: user.name, photo: user.photo }),
            cache: 'no-cache',
            headers: { 'content-type': 'application/json' },
            method: 'POST'
          }
        )
      );
    }
  );
  return Promise.all(promises);
}

function _createMessagesAsync({ usersJsonUrl, users, messagesJsonUrl, messages }) {
  return fetch(usersJsonUrl)
    .then((usersResponse) => {
      return usersResponse.json();
    })
    .then((serverUsers) => {
      const promises = [];
      messages.forEach(
        (message) => {
          const serverUserKey = _findUserKey({ clientUserKey: message.userKey, clientUsers: users, serverUsers });
          promises.push(
            fetch(messagesJsonUrl,
              {
                body: JSON.stringify({ userKey: serverUserKey, text: message.text, sentDateTime: message.sentDateTime }),
                cache: 'no-cache',
                headers: { 'content-type': 'application/json' },
                method: 'POST'
              }
            )
          );
        }
      );
      return Promise.all(promises);
    });
}

function _findUserKey({ clientUserKey, clientUsers, serverUsers }) {
  const clientUser = clientUsers.find(item => item.key === clientUserKey);
  if(clientUser) {
    //Object.entries ?
    return Object.getOwnPropertyNames(serverUsers).find(propertyName => serverUsers[propertyName].name === clientUser.name);
  }
  else {
    return;
  }
}