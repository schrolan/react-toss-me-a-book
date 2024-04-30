//Path comes with node so no need to install it
const path = require('path')
const express = require('express')
//This will start up the mongo connection
const connection = require('./config/connection')

//This will use the .env port all caps from heroku or the local host of 3001
const PORT = process.env.PORT || 3001
//This is the express app
const app = express()

//There is differnt ways of sending data on the body of the request. urlencoded is one way of sending data. urlencoded is a middleware.
//The extended false is one setting that you can add to this middleware
app.use(express.urlencoded({ extended: false }))
//This allows us to parse json data
app.use(express.json())

//This sets the build folder as the static directory
if (process.env.NODE_ENV === 'production') {
    //This will set the path to the build folder. .. up then to client folder then to build folder.
    app.use(express.static(path.join(__dirname, "..", "client", "build")))
}

//This is the route for the home route. This serves up the homepage from the compiled react app.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'client', 'index.html'))
})

//We want to use the connection we imported above. This is an event listener on mongoose and you can listen to an event only one time. Inside we start up the express server.
connection.once('open', async () => {
    console.log(`Express server listening on http://localhost:${PORT}`)
})