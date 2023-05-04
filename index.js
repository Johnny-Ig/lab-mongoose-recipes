const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Asado",
      level: "Amateur Chef",
      ingredients: [
        "Costilla",
        "Chorizo",
        "Entraña",
        "Chinchulines",
      ],
      cuisine: "Argentina",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Johnny"
    })
    
  })
  .then(()=>{
    return Recipe.insertMany(data)
  })

  .then(()=>{
    return Recipe.findOneAndUpdate(
     
      {title:"Rigatoni alla Genovese"},{
        duration:
        100} )
  })
  
 

  .catch(error => {
    console.error('Error connecting to the database', error);
    
    
  });
