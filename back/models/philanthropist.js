const mongodb = require('mongodb');
const getDb = require('../db').getDb;

class philanthropist {
  constructor({ name, email, donationPreferences }) {
    this.name = name;
    this.email = email;
    this.donationPreferences = donationPreferences;
  }

  save() {
    const db = getDb();
    return db.collection('philanthropist').insertOne(this);
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('philanthropist').find().toArray();
  }

  static findById(philId) {
    const db = getDb();
    return db.collection('philanthropist').findOne({ _id: new mongodb.ObjectId(philId) });
  }
}

module.exports = philanthropist;
