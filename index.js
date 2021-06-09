require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2020-01-10T17:30:31.098Z",
//     important: true
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     date: "2020-01-10T18:39:34.091Z",
//     important: false
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2020-01-10T19:20:14.298Z",
//     important: true
//   }
// ]

app.get('/', (request, response) => {
  response.send('<h1>Hello Beauty!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    // id: generateId(),
  })

  note.save().then(savedNote => {
    response.json(note)
  })
  .catch(error => next(error))
})

app.get('/api/notes/:id', (request, response) => {
  // const note = notes.find(note => note.id === id)
  console.log(request.params.id)
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))

  // if (note) {
  //   response.json(note)
  // } else {
  //   response.status(404).end()
  // }
})

app.delete('/api/notes/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // notes = notes.filter(note => note.id !== id)
  Note.findByIdAndRemove(request.params.id).then(note => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body
  // console.log('body:', body)
  // console.log('id: ', request.params.id)
  const note = {
    content: body.content,
    important: body.important,
  }
  // console.log(note)

  Note.findByIdAndUpdate(request.params.id, note, { new: true })  // new: true call event handler with new document
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

//--------- Unknown endpoint -----------
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//--------- Error handler -------------
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError')
  {
    return response.status(400).json({ error: error.message})
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})