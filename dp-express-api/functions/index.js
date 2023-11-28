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
var genuuid = require("uuid");
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
  databaseURL: "https://dimepiece-api.web.app",
});
console.log(ref.database());
console.log(FirebaseStore);
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    store: new FirebaseStore({
      database: ref.database(),
    }),
    secret: process.env.SESSION_SECRET,
    name: "__session",
    genid: function (req) {
      console.log("session id created");
      return genuuid();
    },
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, sameSite: "Lax" },
  })
);
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("You did it! 🥳");
});
app.get("/checkoutId", (req, res) => {
  if (req.session.checkoutId) res.json({ checkoutId: req.session.checkoutId });
  else res.json({ checkoutId: "" });
});
app.post("/checkoutId", (req, res) => {
  console.log(req.body);
  req.session.checkoutId = req.body.checkoutId;
  req.session.save();
  res.json({ checkoutId: req.session.checkoutId });
});
exports.api = functions.https.onRequest(app);
