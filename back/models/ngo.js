const mongodb = require('mongodb');
const { connectDB } = require('../db');
const getDb = require('../db').getDb;

class Ngo {
  constructor({ name, email, location, impactArea, type, history, mission, plans, fundingNeeds }) {
    this.name = name;
    this.email = email;
    this.type = type;
    this.history = history;
    this.mission = mission;
    this.plans = plans;
    this.impactArea = impactArea;
    this.fundingNeeds = fundingNeeds;
    //this.location = location;
  }

  save() {
    const db = connectDB();
    return db.collection('ngos').insertOne(this);
  }

  static fetchAll() {
    const db = connectDB();
    return db.collection('ngos').find().toArray();
  }

  static findById(ngoId) {
    const db = connectDB();
    return db.collection('ngos').findOne({ _id: new mongodb.ObjectId(ngoId) });
  }
}

module.exports = Ngo;

