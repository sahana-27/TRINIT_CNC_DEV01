var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const session = require('express-session');
const http = require("http");
const { Server } = require("socket.io");

//mongoose.connect('mongodb+srv://nazraf:nandanaisaloser1@trinit.wyslvwy.mongodb.net/test');
mongoose.connect('mongodb+srv://nazraf:nandanaisaloser1@cluster0.6uipfrv.mongodb.net/?retryWrites=true&w=majority'/*,{
  /useNewUrlParser: true,
  useUnifiedTopology: true
}*/).then(() => {
  console.log("Successful connection");
}).catch((err) => {
  console.log("Error in connection");
});

const ngoSchema = require('./schema/ngoschem');
const philSchema = require('./schema/philschema');
const postSchema = require('./schema/postSchema');
const toFind = require("./recommend")
var cors = require('cors');
const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    //origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // socket.on(<events>,<data to be passed>)

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // sending the messageData to the room 
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User with ID: ${socket.id} disconnected`);
  });
});


app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/ngos/create/',async function(req,res) {
    const{name,email,password,type,location,prevWork,mission,impact,funding} = req.body;
    const ngoExists = await ngoSchema.NGO.findOne({email});
    //if user already exists, throw error
    if(ngoExists){
        res.status(400);
        throw new Error("NGO Already exists");
    }
    //if user doesn't exist, save new user to database
    const ngo=await ngoSchema.NGO.create({
        name,
        email,
        password,
        type,
        location,
        prevWork,
        mission,
        impact,
        funding
    });
    if(ngo){
        res.status(201).json({
            _id:ngo._id,
            name:ngo.name,
            email:ngo.email,
            password:ngo.password,
            type:ngo.type,
            location:ngo.location,
            prevWork:ngo.prevWork,
            mission:ngo.mission,
            impact:ngo.impact,
            funding:ngo.funding,
        });    
    }else{
        res.status(400);
        throw new Error("Error")
    }
});

//login ngo
app.post('/ngos/login', async function (req,res) {
    const{email,password} = req.body;  
    const ngo = await ngoSchema.NGO.findOne({email});
     //if passwords don't match, throw error. else, return user info.
    if(ngo && (await ngo.matchPassword(password))){
        res.json({
            _id:ngo._id,
            name:ngo.name,
            email:ngo.email,
            userType:'NGO' 
        })
    }else{
        res.status(400);
        throw new Error("Invalid email or password")
    }
});

// //farzan added this, pls add page 
// app.get('/recommend/' , async (req, res) => {
//   const recommended = await toFind();
//   res.send(recommended);
// });

//farzan added this, pls add page 
app.get('/recommend/:id' , async (req, res) => {
  variable = req.params.id;
  const toFind = async (variable) => {
      let result = [];
      let free = [];
      const data = await ngoSchema.NGO.find({});
    const pdata = await philSchema.Philanthropist.find({});
      data.forEach((i) => {
          temp = {};
          temp.name = i.name;
          temp.type = i.type;
          result.push(temp);
      })
  
      pdata.forEach((i) => {
        if(variable == i._id){
          console.log(variable);
          i.NGOPref.forEach(async (j) => {
            const inputEntity = result.find(e => e.type === j);
                if (!inputEntity) {
            return "Entity not found";
        }
    
      const recommendedEntities = result.filter(
        e => e.category === inputEntity.category && e.type === j
      );
    
      const temp =  recommendedEntities.map(e => e.name);
            free.push(temp);
          })
        }
      })
      const recommended = free;
      console.log(recommended);
      const final = [...new Set(recommended.flat())];
      return final;
    }
      const recommender = await toFind(variable);
      res.send(recommender);
});

//all
app.get('/ngos', function (req, res) {
    ngoSchema.NGO.find({}, function (err, ngos) {
        if (err) return console.error(err);
        res.send(ngos);
    });
});

//get ngo by id
app.get('/ngos/:id', function (req, res) {
    ngoSchema.NGO.find({ _id: req.params.id }, function (err, ngo) {
        if (err) return console.error(err);
        res.send(ngo);
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

//create philanthropist
app.post('/philanthropists/create/',async function(req,res) {
    const{name,email,password,location,NGOPref,pastDonations} = req.body;
    const phil=await philSchema.Philanthropist.create({
        name,
        email,
        password,
        location,
        NGOPref,
        pastDonations
    });
    if(phil){
        res.status(201).json({
            _id:phil._id,
            name:phil.name,
            email:phil.email,
            password:phil.password,
            location:phil.location,
            NGOPref:phil.NGOPref,
            pastDonations:phil.pastDonations
        });    
    }else{
        res.status(400);
        console.log(error);
    }
});

//login philanthropist
app.post('/philanthropists/login', async function (req,res) {
    const{email,password} = req.body;  
    const phil = await philSchema.Philanthropist.findOne({email});
     //if passwords don't match, throw error. else, return user info.
    if(phil && (await phil.matchPassword(password))){
        res.json({
            _id:phil._id,
            name:phil.name,
            email:phil.email,
            userType:'phil' 
        })
    }else{
        res.status(400);
        console.log("Invalid email or password")
    }
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

//create post
app.post('/posts/createPost',async function(req,res) {
    const{name,postText,fundTag} = req.body;
    const post=await postSchema.Post.create({
        name,
        postText,
        fundTag
    });
    if(post){
        res.status(201).json({
            _id:post._id,
            name:post.name,
            postText:post.postText,
            fundTag:post.fundTag
        });    
    }else{
        res.status(400);
        console.log(error);
    }
});

//get all posts
app.get('/posts', function (req, res) {
  postSchema.Post.find({}, function (err, posts) {
      if (err) return console.error(err);
      res.send(posts);
  });
});


// app.set('view engine', 'ejs');



// app.get('/', function(req, res) {
//   res.render('pages/auth');
// });


//google auth stuff
const passport = require('passport');
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

// app.set('view engine', 'ejs');

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '697194402405-cfophtsf3i28auje698ishuur0sbs3vp.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
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
    res.redirect('http://localhost:3000/register');
  });

const port = 8180;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
