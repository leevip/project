const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    if(authHeader){
        jwt.verify(authHeader, process.env.SECRET, (err, user) =>{
            if(err) return res.sendStatus(403);
            next();
        })
    }
}