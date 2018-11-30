import Base from './base';

class PaymentMethodService extends Base {
  constructor(path = 'payments') {
    super(path);
  }

  add(method) {
    return this.create(method);
  }

  getAll(userId) {
    // return this.getById(userId);
    return new Promise((resolve, reject) => {
      const params = {
        field: 'id',
        operator: '==',
        value: userId
      };
      this.query(params)
        .then(docs => {
          let cards = [];
          docs.forEach(doc => {
            cards.push(doc.data());
          });
          resolve(cards);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  remove(id) {
    return this.delete(id);
  }
}

export default new PaymentMethodService();
