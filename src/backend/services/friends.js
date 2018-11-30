import Base from './base';
import userService from './users';

class FriendService extends Base {
  constructor(path = 'friends') {
    super(path);
  }

  add(userId, email) {
    return new Promise((resolve, reject) => {
      const userParams = {
        field: 'email',
        operator: '==',
        value: email
      };

      userService
        .query(userParams)
        .then(user => {
          if (user.empty) {
            return reject('user does not exist');
          }
          let friend = [];
          user.forEach(doc => {
            const f = doc.data();
            f.id = doc.id;
            friend.push(f);
          });

          const friendId = friend[0].id;
          this.create({
            userId,
            friendId
          })
            .then(id => {
              resolve(id);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getById(id) {
    return this.getById(id);
  }

  getAll(userId) {
    const params = {
      field: 'userId',
      operator: '==',
      value: userId
    };

    return new Promise((resolve, reject) => {
      Promise.all([userService.read(), this.query(params)])
        .then(values => {
          const allUsers = values[0];
          const allFriends = values[1];

          let users = [];
          allUsers.forEach(doc => {
            const f = doc.data();
            f.id = doc.id;
            users.push(f);
          });

          let friends = [];
          allFriends.forEach(doc => {
            const f = doc.data();
            f.id = doc.id;
            friends.push(f);
          });

          let foundFriends = [];
          users.forEach(function(obj) {
            const friend = friends.find(f => f.friendId === obj.id);
            if (obj && friend) {
              foundFriends.push(obj);
            }
          });

          resolve(foundFriends);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  delete(id) {
    return this.delete(id);
  }
}

export default new FriendService();
