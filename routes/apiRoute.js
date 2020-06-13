const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logOutUser, createEvent , buyevent, myevents, events, eventdetails} = require('../controllers/apiController')
const authenticate = require('../middleware/authenticate')
const User = require('../models/User')
const Detail = require('../models/Details')
const Event = require('../models/Events')

router.get('/', (req, res) => {
    if (req.session.userId) {
        res.render('home', {
            userId: req.session.userId
        })
    }
    else {
        res.render('home')
    }
})

router.get('/home', authenticate, async (req, res) => {
    const user = await User.findById(req.session.userId)
    res.render('dashboard', {
        name:user.name
    })
    }

)

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', registerUser)

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/newEvent',authenticate,async(req,res)=>{
    const user = await User.findById(req.session.userId)
    res.render('create',{
        userId: req.session.userId
    })
})

router.post('/newevent',authenticate,createEvent)
router.delete("/logout", authenticate, logOutUser);
router.post('/login', loginUser)
router.get('/allevents', events)
router.get('/eventdetails/:id',authenticate, eventdetails)
router.get('/buyevent/:id',authenticate, buyevent)
router.get('/myevents',authenticate, myevents)


module.exports = router;