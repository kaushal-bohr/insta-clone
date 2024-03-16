const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 3000

const apiHandler = require('./api')

app.use(bodyParser.json())

app.use('/', apiHandler)

app.use((error, req, res, next) => {
  // if(error instanceof ValidationError){
  //   res.json({message: "schema failed", error})
  // }
  res.json({
    success: false,
    error,
  })
  next(error)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
