// import { body, validationResult } from 'express-validator';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.mjs';


// const changeusernameRouter = async(req, res) =>{

//   // Input Validation Result
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     // Concatenate all error messages into a single string
//     const errorMessage = errors.array()
//       .map(err => err.msg)
//       .join(", ");

//     // Send the concatenated error message
//     return res.status(400).json({ message: errorMessage });
//   }

//   // req.body : newUsername, userID
//   const {newUsername} = req.body;

//   // Check if the Authorization header is present
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "Authorization token is missing" });
//   }
  
//   const token = req.headers.authorization.split(' ')[1];
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   const userID = decoded.id;
//   console.log(userID)

//   try{
//     //const wasUpdate = await database.updateUsername(newUserId, newUserName)
//     const user = await User.findOne({ uuid: userID }).select('+password'); 
//     if(user){
//         user.name = newUsername;
//         await user.save();
//         res.status(200).json({message: "Succesfully update username", 
//         user: {
//           uuid: user.uuid,
//           name: user.name,
//           email: user.email
//         }});
//     }
//     else{
//         res.status(400).json({message: "User not found."});
//     }
//   }
//   catch(error){
//     if(error.name === 'JsonWebTokenError') {
//       // Handle invalid token
//       res.status(401).json({message: "Invalid Token"});
//     } else{
//       res.status(500).json({message: "Server error occurred", error})
//     }
//   }

// }


// export default changeusernameRouter;

import axios from 'axios';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// Configure Axios for MongoDB Data API
const axiosMongoDB = axios.create({
  baseURL: process.env.MONGODB_DATA_API,
  headers: {
    'Content-Type': 'application/json',
    'api-key': process.env.MONGODB_API_KEY
  }
});

const changeusernameRouter = async(req, res) => {
  // Input Validation Result
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map(err => err.msg).join(", ");
    return res.status(400).json({ message: errorMessage });
  }

  const { newUsername } = req.body;

  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }
  
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userID = decoded.id;

  try {
    // Fetch the user from MongoDB Data API
    const userResponse = await axiosMongoDB.post('/action/find', {
      collection: 'users',
      database: 'bakerdb',
      dataSource: 'bakerdb',
      filter: { uuid: userID }
    });

    const user = userResponse.data.documents[0];
    
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    // Update the username in MongoDB Data API
    await axiosMongoDB.post('/action/updateOne', {
      collection: 'users',
      database: 'bakerdb',
      dataSource: 'bakerdb',
      filter: { uuid: userID },
      update: { $set: { name: newUsername } }
    });

    res.status(200).json({
      message: "Successfully updated username",
      user: {
        uuid: user.uuid,
        name: newUsername,
        email: user.email
      }
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ message: "Invalid Token" });
    } else {
      res.status(500).json({ message: "Server error occurred", error })
    }
  }
};

export default changeusernameRouter;

