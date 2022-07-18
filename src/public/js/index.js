const containerTask = document.getElementById('containerTask')
// console.log(containerTask)
containerTask?.addEventListener('click', async (event) => {
  const deleteId = event.target.dataset.delete
  console.log(event.target)
  if (deleteId) {
    const response = await fetch(`/delete/${deleteId}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      const card = event.target.closest('[data-card]')
      card.remove()
    } else {
      alert('Nooooooooo!')
    }
  }
})
