
const isLoggedIn = (req ,res ,next) =>{
    if(!req.cookies.user){
        return res.redirect('/signin');
    }
    next();
};



module.exports = {isLoggedIn};
