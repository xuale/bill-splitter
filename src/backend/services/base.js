import { db, ts } from '../db';

class Base {
  constructor(path) {
    this.db = db;
    this.ref = this.db.collection(path);
  }

  create(data) {
    data['createdAt'] = ts;

    return new Promise((resolve, reject) => {
      this.ref
        .add(data)
        .then(doc => {
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.ref
        .doc(id)
        .then(doc => {
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  read() {
    return new Promise((resolve, reject) => {
      this.ref
        .get()
        .then(docs => {
          resolve(docs);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  query(params) {
    const { field, operator, value } = params;
    return new Promise((resolve, reject) => {
      this.ref
        .where(field, operator, value)
        .get()
        .then(docs => {
          resolve(docs);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  compoundQuery(firstParam, secondParam) {
    const { firstField, firstOperator, firstValue } = firstParam;
    const { secondField, secondOperator, secondValue } = secondParam;
    return new Promise((resolve, reject) => {
      this.ref
        .where(firstField, firstOperator, firstValue)
        .where(secondField, secondOperator, secondValue)
        .get()
        .then(docs => {
          return resolve(docs);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  update(id, change) {
    const ref = this.ref.doc(id);
    return new Promise((resolve, reject) => {
      ref
        .update(change)
        .then(doc => {
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.ref
        .doc(id)
        .delete()
        .then(doc => {
          resolve(doc);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default Base;
