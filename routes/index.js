const { productsApi } = require("../components/products/index");
const { cartApi } = require("../components/carts/index");

const serverRouter = app =>{
    productsApi(app);
    cartApi(app);
    //
    const initializePassport = require('../passportConfig').initialize()
    initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
    )

    const users = []

    app.set('view engine', 'ejs')
    app.use(flash())
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(methodOverride('_method'))

    app.get('/', checkAuthenticated, (req, res) => {
        res.render('../views/index.ejs', { name: req.user.name })
    })
    app.get('/login', checkNotAuthenticated, (req, res) => {
        res.render('login.ejs')
    })
    app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/register', checkNotAuthenticated, (req, res) => {
        res.render('register.ejs')
    })
    app.post('/register', checkNotAuthenticated, async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            users.push({
                id: Date.now().toString(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            res.redirect('/login')
        } catch (error) {
            res.redirect('/register')
        }
        console.log(users)
    })

    app.delete('/logout', (req, res) => {
        req.logOut()
        res.redirect('/login')
    })
    
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login')
    }

    function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        next()
    }

    app.get("*",(req,res,next)=>{
        const route = req.baseUrl + req.path;
        res.json({"error": -2, "description":`The route ${route} wasn't implemented`});
    });
}

module.exports = {
    serverRouter
}