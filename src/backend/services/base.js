import { db } from '../db';

class Base {
  constructor(path) {
    this.db = db;
    this.ref = this.db.collection(path);
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.ref
        .add(data)
        .then(doc => {
          resolve(doc.id);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  query(params) {
    const { first, operator, last } = params;
    return new Promise((resolve, reject) => {
      this.ref
        .where(first, operator, last)
        .get()
        .then(docs => {
          resolve(docs);
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
