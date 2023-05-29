const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017',(err)=>{
  //     if (err) console.log('unable to connect to the server: ${err}');
  //     else
  //     console.log("MongoDB Connected")
// });
// const mongoURI = 'mongodb://127.0.0.1:27017';
// const connectToMongo = async () => {
  //   mongoose.connect(mongoURI, await console.log("Connected to mongo Successful")
  //      );
  //   }
  
  // const mongoURI = 'mongodb://127.0.0.1:27017';
  // const connectToMongo = () => {
    // try {
      // mongoose.connect(mongoURI);
      // console.log("Connected to MongoDB successfully");
      // } catch (error) {
        // console.error("Failed to connect to MongoDB:", error);
        // }
        // };        

connectToMongo();
const app = express()
const port = 5000
app.use(cors())
app.use(express.json())
        
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`KeepNotes Backend listening at localhost:${port}`)
})
