/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("body-parser");

const FirebaseStore = require("connect-session-firebase")(session);
const firebase = require("firebase-admin");
const ref = firebase.initializeApp({
  credential: firebase.credential.cert(
    "./dimepiece-api-firebase-adminsdk-3aj9d-5c26de87b5.json"
  ),
  databaseURL: "https://dimepiece-api-default-rtdb.firebaseio.com/",
});

const {
  log,
  info,
  debug,
  warn,
  error,
  write,
} = require("firebase-functions/logger");

const app = express();

var whitelist = [
  "http://localhost:3000",
  "https://dimepiece-755d8.web.app" /** other domains if any */,
  "https://dimepiece.co",
];
var corsOptions = {
  // httpOnly: true,
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  session({
    store: new FirebaseStore({
      database: ref.database(),
    }),
    secret: process.env.SESSION_SECRET,
    name: "__session",
    genid: function (req) {
      // console.log("session id created");
      return uuidv4();
    },
    resave: false,
    // proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 10800000,
    },
  })
);

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("You did it! 🥳");
});
app.get("/checkoutId", (req, res) => {
  // functions.logger.log(req.session);
  // console.log(req.session);
  if (req.session.checkoutId) res.json({ checkoutId: req.session.checkoutId });
  else res.json({ checkoutId: "" });
});
app.post("/checkoutId", (req, res) => {
  req.session.checkoutId = req.body.checkoutId;
  res.json({ checkoutId: req.session.checkoutId });
});
exports.api = functions.https.onRequest(app);
