const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next()
    }

    try {
        //Получаем токен из заголовка авторизации
        const token = req.headers.autorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: "Error Auth"})
        }
        //Разкодируем токен
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: "Error Auth"})
    }
}