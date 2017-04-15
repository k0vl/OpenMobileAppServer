var jwt = require('jsonwebtoken');

module.exports = function res_login(user, req, res){
    console.log("user " + user.email + " logged in.");
                        
    var token = jwt.sign(
        { user_id: user.id }, 
        req.app.get('jwt-secret'),
        { expiresIn: '30 days' }
    );

    res.locals.data.jwt = token;
    res.locals.data.id = user.id;
    return res.json(res.locals);
}