require('dotenv').config()
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path = require('path')
const hbs = require('hbs')

const indexRouter = require('./src/routes/index.router')
const registrationRouter = require('./src/routes/registration.router')
const loginRouter = require('./src/routes/login.routes')
const logoutRouter = require('./src/routes/logout.routes')
const myListRouter = require('./src/routes/myList.routes')

const app = express()
const PORT = process.env.PORT || 3001

const sessionConfig = {
  store: new FileStore(),
  key: 'sid',
  secret: process.env.SECRET_KEY || 'secret',
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: { expires: 24 * 60 * 60e3 },
}

const sessionParser = session(sessionConfig)
app.use(sessionParser)

app.set('view engine', 'hbs')
app.set('views', path.join(process.env.PWD, 'src', 'views'))

hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'))
app.use(express.static(path.join(__dirname, 'src', 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  if (req.session) {
    res.locals.userId = req.session.userId
    res.locals.userName = req.session.userName
  }
  next()
})

app.use('/', indexRouter)
app.use('/registration', registrationRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/list', myListRouter)


module.exports = { app, sessionParser }
