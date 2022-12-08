const express = require('express')
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')
const session = require('express-session')
const bodyParser = require('body-parser')

const db = require('./db/db')
const CONFIG = require('./config/config') //configuration
const userModel = require('./model/user')
const bookRoute = require('./route/book') //route


db.connectURI()

const app = express() //connection, db too goes here


app.use(session({
    secret: CONFIG.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}))
/*session middleware sets duration to the stipulated time a user can stay logged in to the site,
this particular one is set to an hour*/
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize()) //initialize passport middleware
app.use(passport.session()) //initialize passport session middleware

passport.use(userModel.createStrategy()) //uses the user model to create a strategy

passport.serializeUser(userModel.serializeUser()) //serial the user object to the session
passport.deserializeUser(userModel.deserializeUser()) //deserialize user object from the session

//set your ejs
app.set('views', 'views')
app.set('view engine', 'ejs')

//secure route
app.use('/books', connectEnsureLogin.ensureLoggedIn(), bookRoute) /*ensures succefully logged in user
have access to the books route */ //connectensurelogin

app.get('/', (req, res) => {
    res.render('index')
}) //renders the homepage in views folder

//rendering login and sign up pages

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

//to handle errors signing up and logging in

app.post('/signup', (req, res) => {
    const user = req.body
    userModel.register(new userModel({ username: user.username }), user.password, (err, user) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/books')
            })
        }
    })
})

//login existing user and redirect if there's an error
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/books')
})

app.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('something is broken!')
}) //error middleware

app.listen(CONFIG.PORT, () => {
    console.log(`server is on ${CONFIG.PORT}`)
})