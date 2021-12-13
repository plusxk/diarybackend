var jwt = require('jsonwebtoken');
const config = require('../config');
exports.verify = async (req, res, next) => {
    let token = req.headers.authorization;

    jwt.verify(token, config.authenticateJWT , function(err, decode){
        if(err){
            res.status(500).json({msg: '當前用戶未登入'});
        }
        else{
            res.status(200).json({
                email: decode.email,
                msg: '已登入'
            });
            token: jwt.sign({email:user.email}, config.key , {
                expiresIn: "60s"
            });
        }
    })
}