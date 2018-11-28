import Base from './base';
import { ts } from '../db';

class UserService extends Base {
  constructor(path = 'users') {
    super(path);
  }

  register(data) {
    const { firstName, lastName, email, password } = data;

    const newUser = {
      email,
      firstName,
      lastName,
      password,
      timestamp: ts
    };

    return this.create(newUser);
  }

  login(data) {}

  logout() {
    localStorage.clear();
  }
}

export default UserService;
