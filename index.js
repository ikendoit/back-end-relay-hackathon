const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8181
const fs = require('fs')

app.use(bodyParser.json({ type: 'application/*' }))
app.use(bodyParser.text({ type: 'text/*' }))

// set env PG...
const {Client} = require('pg')
const client = new Client()
client.connect()

/*
const { 
  user_create,
  user_signin, 
  user_signup, 
  get_users,
  schedulability,
} = require('./routes/users')
const {
  get_list_questions,
  get_question,
  questions,
  set_allow_case,
} = require('./routes/questions')
const {
  schedule, 
  get_schedules,
  update_schedules,
} = require('./routes/schedules')
const {
  feed_back,
  get_feed_backs,
} = require('./routes/services')



//set route
const routeConfig =  [
  ['/questions',questions, 'POST'],
  ['/questions_list',get_list_questions, 'GET'],
  ['/question_single/:question_id',get_question, 'GET'],
  ['/allow_case',set_allow_case, 'POST'],
  ['/schedule',schedule, 'POST'],
  ['/schedule/:schedule_id',update_schedules, 'PUT'],
  ['/schedule/:user_id',get_schedules, 'GET'],
  ['/users',get_users, 'GET'],
  ['/signup',user_signup, 'POST'],
  ['/login',user_signin, 'POST'],
  ['/schedulability/:user_id',schedulability, 'GET'],
  ['/feed_back', feed_back, 'POST'],
  ['/get_feed_backs', get_feed_backs, 'GET'],
]
*/

app.get('/', (req, res) => res.send('Hello World!'))

for (let route of routeConfig) {
  app[route[2].toLowerCase()](route[0], async (req, res) => await route[1](req, res, client))
}
//done set route

app.listen(port, () => console.log(`Listening on port ${port}!`))
