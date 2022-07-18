const socket = io()
const { taskForm } = document.forms
const taskBlok = document.getElementById('containerTask')
console.log(taskBlok)

taskForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const {
    text: {
      value: text,
    },
  } = event.target
  socket.emit('task:outgoing', { text })
  event.target.reset()
})

socket.on('connect', () => {
  socket.on('task:incoming', (payload) => {
    const { text } = payload
    taskBlok.insertAdjacentHTML('afterbegin', `<div data-card class="taska" id="taska">
    <p class="task-text">${text}</p>
    <button type="button" class="delete"><img data-delete={{this.id}} class="deleteIm" src="/image/delete-bin-svgrepo-com.svg"></button>
    </div>`)
  })
})
