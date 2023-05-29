// const {MongoClient} = require('mongodb')
// const url = 'mongodb://127.0.0.1:27017?directConnection=true';
// const client= new MongoClient(url);



// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// const mongoose = require('mongoose');

// var mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mgwgzxk.mongodb.net/test' 

// const connectToMongo =  () => {
//      mongoose.connect(mongoURI)
//      .then( ()=>
//         console.log("Connected to mongo Successful")
//     )
// }
const mongoose= require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/keepnotes';
const connectToMongo = async () => {
try {
await mongoose.connect(mongoURI);
console.log("Connected to MongoDB successfully");
} catch (error) {
console.error("Failed to connect to MongoDB:", error);
}
};
module.exports = connectToMongo;
