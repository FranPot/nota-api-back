const { request } = require('express')
const express= require('express')

const app= express()

app.use(express.json())



let notes = [
    {
      id: 1,
      content: 'Hola',
      date: '2019-05-30T17:30:31.098Z',
      important: true,
    },
    {
      id: 2,
      content: 'Puta',
      date: '2019-05-30T18:39:34.091Z',
      important: false,
    },
    {
      id: 3,
      content: 'Trola',
      date: '2019-05-30T19:20:14.298Z',
      important: true,
    },
]



// const app = http.createServer((request, response) =>{
//     response.writeHead(200, {'Content-Type': 'application/json'})
//     response.end(JSON.stringify(notes))
// })

app.get('/', (request, response)=>{
    response.send('<h1>Hello a todos</h1>')
})

app.get('/api/notes', (request,response)=>{
    response.json(notes)
} )

app.get('/api/notes/:id', (request,response)=>{
  const id= Number(request.params.id)
  const note= notes.find(note => note.id === id)

  if(note){

    response.json(note)
  }
  else{
    response.status(404).end()
  }
} )

app.post('/api/notes', (request,response) =>{
  const note = request.body
  
  const ids= notes.map(note => note.id)
  const maxId= Math.max(...ids)
  
  const newNote= {
    id: maxId +1,
    content: note.content,
    important: true,
    date: new Date().toISOString()
  }
  notes = notes.concat(newNote)
  response.status(201).json(newNote)
})

const PORT = 3000
app.listen(PORT, () =>{
  console.log('Server running on port 3000')
})

