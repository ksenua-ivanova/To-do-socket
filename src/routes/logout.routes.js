const router = require('express').Router()

router.get('/', (req, res) => {
  try {
    req.session.destroy()
    res.clearCookie('sid')
    res.redirect('/')
  } catch (err) {
    console.error(err)
    res.end()
  }
})

module.exports = router
