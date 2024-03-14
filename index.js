/**
 * Expense tracker
 * 
 * Adding a new expense/income : /add-expens [Post]
 * Displaying existing expenses : /get-expense [Get]
 * Editing existing entries : /edit-expense [Patch/Put] we can edit/delete using post,to be more specific we are using put/patch
 * Deleting exenses : /delete-expense [Delete]
 * 
 * Budget reporting
 * Login/SignUp
 * 
 * cors - open source network [Can access from anywhere] 
 * provides all the responses to the origin from different area
 * request sent ->checks origin -> but cors gives access to any origin[cors] -> request handling [post,get,delete,patch]
 * 
 * Previous step before handling the request handling - Middleware
 * Predefined middlewares[cors,body-parse],Custom middlewares - We can create our own middleware
 * 
 * Endpoint - API
 * Intermediatary between client side and database [hotel - server]
 */

const express = require('express')
const mongoos = require('mongoose')
const bodyparser = require('body-parser')
const cors = require('cors')
const {contact} =  require('./schema.js')
const app = express()
app.use(bodyparser.json())
app.use(cors()) // To overcome cross policy error

async function connectDB(){
try{
        await mongoos.connect('mongodb+srv://kanishka:Aqpfk15rpTGS578W@cluster05.pgwmpx4.mongodb.net/Newapp?retryWrites=true&w=majority&appName=Cluster05')
        const port = process.env.PORT || 8000
        console.log('DB Connection Established :)')
        app.listen(port,function(){
            console.log(`Listening on port ${port}`)
        })
    }
  
catch(error){
   console.log(error)
   console.log("Can't Establish Connection")
}
}
connectDB()

app.post('/addcontact',async function(request,response){
    
    try{
        await contact.create({
            'name' : request.body.name,
            'email' : request.body.email,
            'phoneNumber' : request.body.phoneNumber
        })
        response.status(201).json({'status' : 'inserted successfully','message' : 'one entry created'})
    }
    catch(error){
        response.status(500).json({'status' : 'Failure','message' : 'entry not created','error' : error})
    }
    
})

app.get('/getcontact',async function(request,response){
   try{
      const data = await contact.find()
       response.status(200).json(data)
   }
   catch(error){
       response.status(500).json({'status' : 'failure','message' : 'entry not found','error' : error})
   }
})

app.delete('/deletecontact/:id',async function(request,response){
    try{
       const data = await contact.findById(request.params.id)
       if(data){
        await contact.findByIdAndDelete(request.params.id)
        response.status(200).json({'status' : 'success','message' : 'entry deleted'})
       }
       else{
        response.status(404).json({'status' : 'failure','message' : 'file not found'})
       }
    }
    catch(error){
        response.status(500).json({'status' : 'failure','message' : 'could not delete entry','error' : error})
    }
})

app.patch('/editcontact/:id',async function(request,response){
    try{
      const data = await contact.findById(request.params.id)
      if(data){
        await data.updateOne({
         'name' : request.body.name,
         'email' : request.body.email,
         'phoneNumber' : request.body.phoneNumber
        })
        response.status(404).json({'status' : 'success','message' : 'entry updated'})
      }
      else{
        response.status(404).json({'status' : 'failure','message' : 'file not found'})
      }
    }
    catch(error){
        response.status(500).json({'status' : 'failure','message' : 'could not update entry','error' : error})
    }
})