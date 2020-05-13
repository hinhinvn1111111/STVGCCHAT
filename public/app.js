const socket = io('https://serversocketchat.herokuapp.com/')
// window.onload=function(){
//     $('#friendStream').hide()
//     console.log('ajshjksa')
// }
$('.chat').hide()
$('#friendStream').hide()

socket.on('LIST_USERS_ONLINE',arrUsers=>{
    $('.dangki').hide()
    $('.chat').show()
    console.log(arrUsers)
    let me = $('#iduser').text()
    let temp = me.split(' : ')
    for(let newuser of arrUsers){
        if(temp[1] !==newuser.id){
            // alert(`${newuser.usn} vừa online`)
            $('#arrUsers').append(`<li id="${newuser.id}">${newuser.usn}</li><button id="${newuser.socket}">CALL</button>`)
        }else{
            $('#arrUsers').append(`<li id="${newuser.id}">${newuser.usn}</li>`)
        }
        $(`#${newuser.socket}`).click(()=>{
            callFriend(newuser.id)
            // console.log(newuser.socket+'-----'+newuser.id)
        })
    }

    socket.on('HAS_NEW_USER',newuser=>{
        
        console.log(newuser)
        // alert(`${newuser.usn} vừa online`)
        let me = $('#iduser').text()
        let temp = me.split(' : ')
        // console.log('sadjaskd',me)
        if(temp[1] !==newuser.id){
            // alert(`${newuser.usn} vừa online`)
            $('#arrUsers').append(`<li id="${newuser.id}">${newuser.usn}</li><button id="${newuser.socket}">CALL</button>`)
        }else{
            $('#arrUsers').append(`<li id="${newuser.id}">${newuser.usn}</li>`)
        }
        $(`#${newuser.socket}`).click(()=>{
            callFriend(newuser.id)
            // console.log(newuser.socket+'-----'+newuser.id)
        })
    })
})


socket.on('USER_DISCONNECT',user=>{
    console.log('user remove : ',user)
    $(`#${user.id}`).remove()
    $(`#${user.socket}`).remove()
})

function openStream(){
    const config = {audio : true, video : true}
    return navigator.mediaDevices.getUserMedia(config)
}

function playStream(_id, stream){
    const video = document.getElementById(_id)
    video.srcObject = stream
    video.play()
}





const peer = new Peer({key:'peerjs',host:'stvgchatteam.herokuapp.com',secure:true,port:443});

peer.on('open',id=>{
    $('#iduser').append(id)
    $('#btnRegister').click(()=>{
        const usn = $('#usn').val()
        socket.emit('NEW_USER',{id,usn})
    })
})

// NOTE  Caller
$('#btnCall').click(()=>{
    const idFriend = $('#idFriend').val()
    openStream().then(stream=>{
        playStream('audio1',stream)
        playStream('localStream',stream)
        let call = peer.call(idFriend,stream)
        call.on('stream',friendStream=>{
            playStream('audio2',stream)
            playStream('friendStream',friendStream)
        })
        $('#friendStream').show()
    })
})

// NOTE  Answer
peer.on('call',call=>{
    openStream().then(stream=>{
        call.answer(stream)
        playStream('audio1',stream)
        playStream('localStream',stream)
        call.on('stream',friendStream=>{
            playStream('audio2',stream)
            playStream('friendStream',friendStream)
        })
        $('#friendStream').show()
    })
})


// NOTE  WRITE FUNCTION CALL

function callFriend(idFriend){
    openStream().then(stream=>{
        playStream('audio1',stream)
        playStream('localStream',stream)
        let call = peer.call(idFriend,stream)
        call.on('stream',friendStream=>{
            playStream('audio2',stream)
            playStream('friendStream',friendStream)
        })
        $('#friendStream').show()
    })
}


