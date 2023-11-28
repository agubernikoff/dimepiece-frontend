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
import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { v1 } from "uuid";
import session from "express-session";
import cookieParser from "cookie-parser";
import "dotenv/config";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "SessionCookie",
    genid: function (req) {
      console.log("session id created");
      return v1();
    },
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("You did it! 🥳");
});
app.get("/checkoutId", (req, res) => {
  res.json({ checkoutId: req.session.checkoutId });
});
app.post("/checkoutId", (req, res) => {
  console.log(req.body);
  req.session.checkoutId = req.body.checkoutId;
  req.session.save();
  res.json({ checkoutId: req.session.checkoutId });
});
export const api = functions.https.onRequest(app);
