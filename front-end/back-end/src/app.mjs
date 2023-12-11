import express from 'express';
import url from 'url';
import path from 'path';
import multer from "multer";
import cors from 'cors';
import dotenv from 'dotenv';
import "dotenv/config"
import morgan from 'morgan';
import session from 'express-session';
import mongoose from 'mongoose';  
import { body, validationResult }  from 'express-validator';
import jwt from 'jsonwebtoken';
import passport from 'passport'
import CustomJwtStrategy from './config/jwt-config.mjs';
// routes
import loginRouter from './routes/loginRouter.mjs';
import registerRouter from './routes/registerRouter.mjs';
import changeusernameRouter from './routes/changeusernameRouter.mjs';
import forgetpasswordRouter from './routes/forgetpasswordRouter.mjs';
import delaccountRouter from './routes/delaccountRouter.mjs';
import resetpasswordRouter from './routes/resetpasswordRouter.mjs';
import resetemailRouter from './routes/resetemailRouter.mjs';
import searchArtsRouter from './routes/searchArtsRouter.mjs';

import {addFavListRouter,favListRouter, getArts} from './routes/modifyFavListRouter.mjs'

const app = express();

// use the morgan middleware to log all incoming http requests
app.use(morgan("dev"));

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

// serve static files
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.use("/static", express.static(path.join(__dirname, 'public')));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// cors
const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL.replace(/\/$/, ""),
  // origin: 'http://10.19.137.49:5173/',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
}
app.use(cors(corsOptions));

console.log(process.env.CLIENT_URL);
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));

// session to auto-save user data (like id) when they login
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized:true,
  cookie: {httpOnly: true, secure: process.env.NODE_ENV==="production"}
}))
console.log('Session secret:', process.env.SESSION_SECRET);

// jwt strategy
passport.use(CustomJwtStrategy)

// initialize passport
app.use(passport.initialize())

// routes that does not need authentication
// app.post("/getpiece", getpieceRouter);
app.post("/register", registerRouter)
app.post("/login", loginRouter);

// Validation rules for routers
const usernameValidationRules = [
  body('newUsername')
    .trim() // Removes leading and trailing spaces
    .isLength({ min: 3, max: 30 }) // Sets a length range for the username
    .withMessage('Username must be between 3 and 30 characters long.')
    .matches(/^[a-zA-Z0-9_]+$/) // Regular expression to allow letters, numbers, and underscores
    .withMessage('Username must contain only letters, numbers, and underscores.')
];
const emailValidationRules = [
  body('newEmail')
    .trim() // Removes leading and trailing spaces
    .isEmail() // Checks if the input is an email
    .withMessage('Please enter a valid email address.')
    .normalizeEmail() // Optionally, normalize the email address
];
const passwordValidationRules = [
  // Validate new password
  body('newPassword')
    .isLength({ min: 8 }) // Set a minimum length for the new password
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/) // Ensure the password contains a number
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/) // Ensure the password contains a letter
    .withMessage('Password must contain at least one letter')
    // Optionally, include checks for special characters or uppercase letters
];

// routes that needs authentication
// Account routes
app.patch("/changeusername", usernameValidationRules, changeusernameRouter); //Finished
app.patch("/resetemail", emailValidationRules, resetemailRouter); //Finished
app.post("/forget", forgetpasswordRouter);
app.patch("/resetpassword", passwordValidationRules, resetpasswordRouter); //Finished
app.delete("/delaccount", delaccountRouter); //Finished 

// Favorites list routes 
app.post('/addFavorite', addFavListRouter);//finished
app.get('/getfavlist', favListRouter);
app.get('/getArts', getArts);//finished
app.get('/searchArts', searchArtsRouter);
// app.post('/favlist/remove',removeFavListRouter);

// export the express app we created to make it available to other modules
export default app;
