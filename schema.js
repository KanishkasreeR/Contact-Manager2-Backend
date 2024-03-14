/**
 * We can create multiple schema
 * Create a schema with different variable name and create seperate model for that schema
 * module.exports = {Expense , new Schema Model} - export it like this
 * 
 * required keyword - we have to fill the field without fail
 * we can define schema to not allow duplicate values
 */

const mongoose = require('mongoose')
const contactSchema =  mongoose.Schema({
      name: {
        type : String,
        required : true
      },
      email: {
        type : String,
        required : true
      },
      phoneNumber: {
        type : Number,
        required : true
      }
})

const contact = mongoose.model('contactlist',contactSchema) //1st parameter - collection name 2nd parameter - schema name

//Exporting
module.exports = {contact}