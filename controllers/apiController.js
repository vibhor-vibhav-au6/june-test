const User = require('../models/User')
const Detail = require('../models/Details')
const Event = require('../models/Events')

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { name, email, password } = req.body
            const user = await new User({ name: name, email: email, password: password })
            await user.save()
            req.session.userId = user._id
            res.redirect('/home')
        }
        catch{
            console.log(err.message)
            res.redirect('/register')
        }

    },
    loginUser: async function (req, res) {
        try {
            var email = req.body.email;
            var password = req.body.password;
            if (!email || !password) throw new Error("Incorrect credentials");
            const user = await User.findByEmailAndPassword(email, password)
            req.session.userId = user._id
            res.redirect('/home')
        }
        catch (err) {
            console.log(err.message)
            res.redirect('/login')
        }
    },

    logOutUser: function (req, res) {
        req.session.destroy();
        return res.redirect("/");
    },
    createEvent: async function (req, res) {
        try {
            const id = req.session.userId
            const name = req.body.name
            const user = await User.findById(id)
            const event = new Event({
                name: req.body.name,
                price: req.body.price,
                available: req.body.available,
                location: req.body.location,
                category: req.body.category,
                owner: id,
                ticketmanager: req.body.ticketmanager,
                date: req.body.time
            })
             await event.save()
             res.redirect('/home')
        }

        catch (err) {
            console.log(err)
            res.redirect('/newevent')
        }

    },
    myevents: async function (req, res) {
        try {
            const id = req.session.userId
            const event = await Event.find({ owner: id }).populate('company')
            const name = await User.findById(req.session.userId)
            res.render('myevents', {
                data: event,
                name: name.name,
                userId: req.session.userId
            })
        }
        catch (err) {
            console.log(err.message)
            res.redirect('/home')
        }

    },
    eventdetails: async function (req, res) {
        try {
            console.log(req)
        }
        catch (err) {
            console.log(err.message)
            res.redirect('/home')
        }
    },
    events: async function (req, res) {
        try {
            const events = await Event.find()
            res.render('events', {
                data: events,
                userId: req.session.userId
            })
        }
        catch (err) {
            console.log(err.message)
            res.redirect('/home')
        }
    },
    buyevent: async function (req, authenticate, res) {
        try {   
            
            console.log(req)
        }
        catch (err) {
            console.log(err)
        }
    },
}