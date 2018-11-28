import Base from './base';

class TransactionService extends Base {
  constructor(path = 'transactions') {
    super(path);
  }

  pay() {}

  getAll(userId) {}

  // create transaction
  // get all user transactions
}

export default TransactionService;
