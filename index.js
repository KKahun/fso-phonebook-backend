const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(cors())

morgan.token('body', req => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const numPeople = persons.length
  const now = new Date().toLocaleString()
  console.log(now)
  response.send(`
    <p>Phonebook has info for ${numPeople} people</p>
    <p>${now}</p>
  `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const newId = String(Math.floor(Math.random()*10000))
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'must include both name and number'
    })
  }
  if (persons.map(person => person.name)
      .includes(body.name)) {
    return response.status(400).json({
      error: 'name already exists in phonebook'
    })
  }

  const person = {id: newId, name: body.name, number: body.number}
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})