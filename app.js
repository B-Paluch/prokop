const express = require('express');
const app = express();
const router = express.Router();
const tutorial = require('./routes/tutorial');
const test = require('./routes/quiz');
const bodyParser = require("body-parser");
const cors = require("cors");
var corsOptions = {
  origin: ["http://localhost:8081"]
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const path = __dirname + '/views/';
const port = process.env.PORT || 8080;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path));
//app.use('/pytania', questions);
app.use('/api/tutorials', tutorial);
app.use('/api/test', test);
app.use('/images', express.static( 'images'))
const auth = require('./routes/auth')(app);
const user = require('./routes/user')(app);

const mongoose = require('mongoose');
const db = require("./models");
const Role = db.role;

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
};


function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(url, options).then( function() {
  console.log('MongoDB is connected');
})
    .then(() => {
      console.log("Successfully connect to MongoDB.");
      initial();
    })
    .catch( function(err) {
      console.log(err);
    });

app.listen(port, function () {
  console.log(`Example app listening on ${port}!`);
});