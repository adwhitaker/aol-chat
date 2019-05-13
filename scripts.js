document.addEventListener('DOMContentLoaded', onLoaded)

const messages = document.getElementById('messages')
const textarea = document.getElementById('new-message')
const sendButton = document.getElementsByClassName('message-actions__send')[0]

sendButton.addEventListener('click', onSend)

let socket
let userId = new Date().getTime()

function onLoaded(event) {
    socket = new WebSocket('ws://localhost:8080')
    console.log('socket', socket)

    socket.addEventListener('open', () => {
        console.log('open')
    })

    socket.addEventListener('message', event => {
        console.log(`Message from server: ${event.data}`)
        appendMessage(JSON.parse(event.data))
    })

    // appendMessage({
    //     message: 'test message',
    //     userId
    // })
    //
    // appendMessage({
    //     message: 'another message',
    //     userId: new Date().getTime()
    // })
}

function onSend(event) {
    const message = textarea.value

    if (!message.length) {
        return
    }
    sendMessage(message, userId)
    textarea.value = ''
}

function sendMessage(message, userId) {
    socket.send(
        JSON.stringify({
            message,
            userId,
        }),
    )
}


function appendMessage(data) {
    const li = document.createElement('li')


    if (data.userId === userId) {
        li.classList.add('message--user-message')
    }

    const author = document.createTextNode(data.userId + ': ')
    const span = document.createElement('span')
    span.classList.add('message__author')
    span.appendChild(author)
    li.appendChild(span)


    const text = document.createTextNode(data.message)
    const messageSpan = document.createElement('span')
    messageSpan.appendChild(text)
    li.appendChild(messageSpan)
    messages.appendChild(li)
}