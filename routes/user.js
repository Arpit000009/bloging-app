const {Router} = require('express')
const User = require('../models/user')
const router = Router();

router.get('/signin',(req,res)=>{
    return res.render('signin');
});
router.get('/signup',(req,res)=>{
    return res.render('signup');
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await User.matchPasswordAndGenrateToken(email, password);

        if (!token) {
            // No token, show error page
            return res.render("signin", {
                error: "Invalid email or password",
            });
        }

        // Only send one response
        res.cookie("token", token);
        return res.redirect("/");

    } catch (err) {
        // Log and respond only once
        console.error("Signin error:", err);

        // Safely render error page
        if (!res.headersSent) {
            return res.render("signin", {
                error: "Something went wrong. Try again.",
            });
        }
    }
});



router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/")
})

router.post('/signup',async(req,res)=>{
    const {fullName,email,password} = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
});


module.exports = router;