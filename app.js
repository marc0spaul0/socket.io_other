const app = require('express') ()
const http = require('http').createServer(app)

const io = require('socket.io')(http)
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

io.on('connection', (socket) => {
    console.log('New connection: ', socket.id)
    socket.on('msg', (msg) => {
        console.log(msg)
        socket.broadcast.emit('msg', msg)
        socket.join('count')
        console.log(socket.broadcast)
    })
})



http.listen(port, function() {
    console.log(`Listening on port ${port}`)
})