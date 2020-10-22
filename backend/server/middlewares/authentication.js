// JWT
const jwt = require('jsonwebtoken');

exports.authentication = async (req, res, next) => {
    const token = req.get('authorization');
    if(token){
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                ok: false,
                msg: "The token is invalid"
            });
        }
    } else {
        return res.status(400).json({
            ok: false,
            msg: "The token is necessary"
        });
    }
}