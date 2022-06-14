import { io } from 'socket.io-client'
const joinRoomButton = document.getElementById("room-button")
const messageInput = document.getElementById("message-input")
const roomInput = document.getElementById("room-input")
const form = document.getElementById("form")

// connection between server and client
const socket = io('http://localhost:3000');
socket.on('connect', () => {
  displayMessage("Connected to server with id: " + socket.id)
})
// send data from client
socket.emit('client-data', 'a', 1, { a: 2, c: 3 })



// form functionality
form.addEventListener("submit", e => {
  e.preventDefault()
  const message = messageInput.value
  const room = roomInput.value
  if (message === "") return
  displayMessage(message)
  messageInput.value = ""
})
joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value
})
function displayMessage(message) {
  const div = document.createElement("div")
  div.textContent = message
  document.getElementById("message-container").append(div)
}
