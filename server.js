const express = require('express')
const bodyParser =  require('body-parser')
const app =  express()
const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb://localhost:27017"

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client)=>{
    if (err) return console.log(err)
    db = client.db('crud-nodejs')

    app.listen(3000, function(){
        console.log('Escutando na 3000')
    })
})

app.get('/', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.send(results)
    })
})

app.post('/',(req, res)=>{
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('Salvo com sucesso!')
        res.redirect('/')
    })
})

app.put('/:id', (req, res) =>{
    db.collection('data').findOneAndUpdate({_id: ObjectId(req.params.id)}, 
    {$set: req.body}, (err, result) => {
        if (err) return res.send(err)
        console.log('Atualizado no Banco de Dados')
      })
    res.redirect('/')
})

app.delete('/:id', (req, res) =>{
    db.collection('data').deleteOne({_id: ObjectId(req.params.id)}, 
    (err, result) => {
        if (err) return res.send(err)
        console.log('Removido com sucesso')
      })
    res.redirect('/')
})