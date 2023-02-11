const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://nazraf:nandanaisaloser1@trinit.wyslvwy.mongodb.net/test', { useNewUrlParser: true });

const NGO = mongoose.model('NGO', {
  name: String,
  mission: String,
  email: String,
  history: String,
  impact: String,
  fundingNeeds: String,
  //location: String,
  impactArea: String,
  type: String
});

const Philanthropist = mongoose.model('Philanthropist', {
  name: String,
  email: String,
  donationPreferences: String
});

app.get('/ngos', async (req, res) => {
  const ngos = await NGO.find({});
  res.send(ngos);
});

app.get('/philanthropists', async (req, res) => {
  const philanthropists = await Philanthropist.find({});
  res.send(philanthropists);
});

app.post('/ngos', async (req, res) => {
  const ngo = new NGO(req.body);
  await ngo.save();
  res.send(ngo);
});

app.post('/philanthropists', async (req, res) => {
  const philanthropist = new Philanthropist(req.body);
  await philanthropist.save();
  res.send(philanthropist);
});

app.listen(3000, () => {
  console.log('NGO platform API listening on port 3000!');
});
