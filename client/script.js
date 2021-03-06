import { io } from 'socket.io-client'
const joinRoomButton = document.getElementById("room-button")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")

// connection between server and client
const socket = io('http://localhost:3000');

// namespace and authentication related code starts here
const userSocket = io('http://localhost:3000/user',{
  auth: {
    token: "chaudhuree"
  }
});
userSocket.on('connect', () => {
  displayMessage("Connected to user namespace: "+ userSocket.id)
}
)

userSocket.on('user-connected', (username) => {
  displayMessage(username + " joined the chat")
}
)

// if token is not given
userSocket.on('connect_error', (error) =>  displayMessage(error) )
 

// namespace and authentication related code ends here

socket.on('connect', () => {
  displayMessage("Connected to server with id: " + socket.id)

})

socket.on('received-message', (message) => displayMessage(message))

// form functionality
form.addEventListener("submit", e => {
  e.preventDefault()
  const message = messageInput.value
  const room = roomInput.value
  if (message === "") return
  // send message to server
  socket.emit("send-message", message, room)
  displayMessage(message)
  messageInput.value = ""
})

// join room functionality
joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value
  socket.emit("join-room", room, message => displayMessage(message))
})

// display message on screen
function displayMessage(message) {
  const div = document.createElement("div")
  div.textContent = message
  document.getElementById("message-container").append(div)
}
