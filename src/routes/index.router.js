const router = require('express').Router()
const { List } = require('../../db/models')
const { Task } = require('../../db/models')

router
  .route('/')
  .get((req, res) => {
    res.render('index')
  })

router
  .route('/memberTask/:id')
  .get(async (req, res) => {
    const tasks = await Task.findAll({
      where: { listId: req.params.id },
      order: [['createdAt', 'DESC']],
    })
    const list = await List.findOne({ where: { id: req.params.id } })
    res.render('memberTask', { tasks, list })
  })

router
  .delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    try {
      await Task.destroy({ where: { id } })
      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  })

module.exports = router
