const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const schema = require('./schema/ngoschem');

// connecting to database
connectDB();


function recommend(entityName, result) {

    const inputEntity = result.find(e => e.type === entityName);
    if (!inputEntity) {
      return "Entity not found";
    }
  
    const recommendedEntities = result.filter(
      e => e.category === inputEntity.category && e.type === entityName
    );
  
    return recommendedEntities.map(e => e.name);
  }

const toFind = async () => {
    let result = [];
    const data = await schema.NGO.find({});

    data.forEach((i) => {
        temp = {};
        temp.name = i.name;
        temp.type = i.type;

        result.push(temp);
    })

    const recommended = await recommend('idk', result);
    return recommended;
    
}

module.exports = toFind;




  
  
  