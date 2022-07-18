const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../../db/models')

router
  .route('/')
  .get((req, res) => {
    res.render('login')
  })

  .post(async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await User.findOne({
        where: { email },
      })
      if (!user) {
        throw Error('No such login')
      }
      const isPassValid = await bcrypt.compare(password, user.password)
      if (!isPassValid) {
        throw Error('No such password')
      }
      req.session.userId = user.id
      req.session.userName = user.name
      res.redirect('/')
    } catch (err) {
      console.error(err)
      res.redirect('/login')
    }
  })

module.exports = router
