const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.set('views','./views')

app.use(express.static('public'))

app.get('/',(req,res)=>res.render('home'))

app.listen(port,()=>console.log(`Server start on port ${port}`))



// NOTE  Server Socket
// const io = require('socket.io')(4000)

// let arrUsers = []

// io.on('connection', socket=>{
//     // console.log(socket.id)
//     let newuser = {}
//     socket.on('NEW_USER',user=>{
//         newuser = {...user,socket:socket.id}
//         console.log(newuser)
//         arrUsers.push(newuser)
//         // socket.emit('LIST_USERS_ONLINE', arrUsers)
//         io.emit('LIST_USERS_ONLINE',arrUsers)
//         io.emit('HAS_NEW_USER',newuser)
//         // for(let i of arrUsers){
//         //     if(i.id !== user.id){
//         //         io.to(i.socket).emit('HAS_NEW_USER',newuser)
//         //     }
//         // }
//     })
// })