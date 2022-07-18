const router = require('express').Router()
const { List } = require('../../db/models')
const { User } = require('../../db/models')
const { Task } = require('../../db/models')

router
  .route('/')
  .get(async (req, res) => {
    const lists = await List.findAll({
      where: { userId: req.session.userId },
      order: [['createdAt', 'DESC']],
    })
    const memberlist = await List.findAll({
      where: { memberId: req.session.userId },
      order: [['createdAt', 'DESC']],
    })
    // console.log(memberlist)
    res.render('myList', { lists, memberlist })
  })
router
  .route('/new')
  .get(async (req, res) => {
    res.render('addList')
  })
  .post(async (req, res) => {
    const { name, email } = req.body
    try {
      if (name && email) {
        const memberId = await User.findOne({
          where: { email },
        })
        await List.create({ name, userId: req.session.userId, memberId: memberId.id })
      } else {
        await List.create({ name, userId: req.session.userId })
      }
      res.redirect('/list')
    } catch (err) {
      console.error(err)
      res.render('addList')
    }
  })

router
  .route('/:id')
  .get(async (req, res) => {
    const tasks = await Task.findAll({
      where: { listId: req.params.id },
      order: [['createdAt', 'DESC']],
    })
    const list = await List.findOne({ where: { id: req.params.id } })
    res.render('tasks', { tasks, list })
  })

module.exports = router
