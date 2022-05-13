const express = require('express');

const server = express()

server.use(express.json())

// Query params = ?nome=NodeJS
// Route params = /curso/2
// Request params = { nome: 'node', value: 1 }

// localhost:3000/curso

//CRUD - Create, read, update, delete

let cursos = ['Node.js', 'PHP', 'Express']

//middleware
server.use((req, res, next) => {
  console.log(`url chamada ${req.url}`)
  next()
})

function checkCurso(req, res, next) {
  if (!req.body.name) return res.status(400).json({error: "Nome Obrigatório"})
  return next()
}

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index]
  if (!curso) return res.status(400).json({error: "Curso não existe"})
  return next()
}

server.get('/cursos', (req, res) => {
  return res.json(cursos)
})

server.get('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params
  return res.json(cursos[index])
})

//Criando Curso

server.post('/cursos', checkCurso, (req, res) => {
  const { name } = req.body
  cursos.push(name)
  return res.json(cursos)
})

//Atualizando Curso

server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params
  const { name } = req.body
  
  cursos[index] = name
  
  return res.json(cursos)
})

// Excluindo algum curso

server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
  const { index } = req.params
  cursos.splice(index, 1)
  return res.json(cursos)
})

server.listen(3000)