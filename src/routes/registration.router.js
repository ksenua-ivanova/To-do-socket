const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../../db/models')

const saltRounds = 10

router
  .route('/')
  .get((req, res) => {
    res.render('registration')
  })
  .post(async (req, res) => {
    const {
      email, password, name,
    } = req.body
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const user = await User.create({
        email, password: hashedPassword, name,
      })
      // тут записываем в сессию
      req.session.userId = user.id
      req.session.userName = user.name
      res.redirect('/')
    } catch (err) {
      console.error(err)
      res.redirect('/registration')
    }
  })

module.exports = router
