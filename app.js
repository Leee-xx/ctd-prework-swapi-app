const express = require('express')
const path = require('path')
const { readFileSync } = require('fs')

const app = express()

const htmlTemplate = '' + readFileSync('./public/template.html')
const peopleTemplate = '' + readFileSync('./public/people.html')
const port = 3000

app.use(express.static('./public'))
app.use(express.json())

app.get('/planets', (req, res) => {
  let output = htmlTemplate.replaceAll(/{%RESOURCE_TYPE%}/g, 'planets')
  res.status(200).end(output)
})

app.get('/people', (req, res) => {
  let output = htmlTemplate.replaceAll(/{%RESOURCE_TYPE%}/g, 'people')
  res.status(200).end(output)
})

app.get('/people/:userId', (req, res) => {
  //let output = htmlTemplate.replaceAll(/{%RESOURCE_TYPE%}/g, 'people')
  let output = 
  res.status(200).end('hello')
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.listen(port, console.log(`Listening on port ${port}...`))
