const express = require('express');

const server = express()

// Query params = ?nome=NodeJS
// Route params = /curso/2
// Request params = { nome: 'node', value: 1 }

// localhost:3000/curso
server.get('/first', (req, res) => {
  let nome = req.query.nome
  return res.json({
    nome: nome
  })
})

server.get('/second/:id', (req, res) => {
    let id = req.params.id
    return res.json({
      id: id
    })
  })

server.listen(3000)