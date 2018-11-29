import Base from './base';
import userService from './users';

class FriendService extends Base {
  constructor(path = 'friends') {
    super(path);
  }

  add(userId, friendId) {
    const newFriend = {
      userId,
      friendId
    };

    return this.create(newFriend);
  }

  getById(id) {
    return this.getById(id);
  }

  getAll(userId) {
    const params = {
      field: 'id',
      operator: '==',
      value: userId
    };

    // probably easier way to do this
    return new Promise((resolve, reject) => {
      Promise.all([userService.read(), this.query(params)])
        .then(values => {
          const allUsers = values[0];
          const friends = values[1];

          // probably wont work
          const friendObjs = allUsers.filter(function(obj) {
            const friend = friends.find(f => f.friendId === obj.id);
            return friend === null;
          });

          resolve(friendObjs);
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
