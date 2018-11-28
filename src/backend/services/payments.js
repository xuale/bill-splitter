import Base from './base';

class PaymentMethodService extends Base {
  constructor(path = 'payments') {
    super(path);
  }

  add(method) {
    return this.create(method);
  }

  remove(id) {
    return this.delete(id);
  }
}

export default new PaymentMethodService();
