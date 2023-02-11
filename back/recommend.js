const mongoose = require("mongoose");
const schema = require('./schema/ngoschem');
const pschema = require('./schema/philschema');

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
    let free = [];
    const data = await schema.NGO.find({});
  const pdata = await pschema.Philanthropist.find({});
    data.forEach((i) => {
        temp = {};
        temp.name = i.name;
        temp.type = i.type;

        result.push(temp);
    })

    pdata.forEach((i) => {
        i.NGOPref.forEach(async (j) => {
          console.log(j);
          const temp = await recommend(j,result);
          free.push(temp);
        })
    })

    const recommended = free;
    return recommended;
    
}

module.exports = toFind;
