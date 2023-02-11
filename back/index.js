var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const session = require('express-session');
mongoose.connect('mongodb+srv://nazraf:nandanaisaloser1@trinit.wyslvwy.mongodb.net/test');
const ngoSchema = require('./schema/ngoschem');
const philSchema = require('./schema/philschema');
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//all
app.get('/ngos', function (req, res) {
    ngoSchema.NGO.find({}, function (err, ngos) {
        if (err) return console.error(err);
        res.send(ngos);
    });
});
//specific location
app.get('/ngos/:location', function (req, res) {
  ngoSchema.NGO.find({ location: req.params.location }, function (err, ngo) {
    if (err)
        return console.log(err);
        res.send(ngo);
  })
});

// specific type
app.get('/ngos/:type', function (req, res) {
  ngoSchema.NGO.find({ type: req.params.type }, function (err, ngo) {
    if (err)
        return console.log(err);
        res.send(ngo);
  })
});


// update the information for ngos
app.put('/ngos/:id', function (req, res) {
  ngoSchema.NGO.findByIdAndUpdate(req.params.id, req.body, function (err, ngo) {
        if (err) return console.error(err);
        res.send('NGO updated successfully');
    });
});

//delete the ngos
app.delete('/ngos/:id', function (req, res) {
  ngoSchema.NGO.findByIdAndRemove(req.params.id, function (err, ngo) {
        if (err) return console.error(err);
        res.send('NGO deleted successfully');
    });
});

//all
app.get('/philanthropists', function (req, res) {
  philSchema.Philanthropist.find({}, function (err, philanthropists) {
      if (err) return console.error(err);
      res.send(philanthropists);
  });
});

// specific id
app.get('/philanthropists/:id', function (req, res) {
  philSchema.Philanthropist.findById(req.params.id, function (err, philanthropists) {
      if (err) return console.error(err);
      res.send(philanthropists);
  });
});


// update the information for philanthropists
app.put('/philanthropists/:id', function (req, res) {
  philSchema.Philanthropist.findByIdAndUpdate(req.params.id, req.body, function (err, philanthropists) {
      if (err) return console.error(err);
      res.send('Philanthropists updated successfully');
  });
});

//delete the philanthropists
app.delete('/philanthropists/:id', function (req, res) {
  philSchema.Philanthropist.findByIdAndRemove(req.params.id, function (err, philanthropists) {
      if (err) return console.error(err);
      res.send('Philanthropists deleted successfully');
  });
});

app.set('view engine', 'ejs');



app.get('/', function(req, res) {
  res.render('pages/auth');
});


//google auth stuff
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = 'encrypt';
const GOOGLE_CLIENT_SECRET = 'encrypt';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8180/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/ngos');
  });

const port = 8180;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
