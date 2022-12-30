const Router = require('express')
const {User} = require('../models/models')
const router = new Router()
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')

//Перед отправкой запроса делаем валидацию
router.post('/registration', 
    [
        check('email', 'Uncorrect email').isEmail(),
        check('password', 'Uncorrect password length').isLength({min: 4, max: 10})
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({message: "Uncorrect request", errors})
        }

        const {email, password} = req.body
        //Проверяем, есть ли такой пользователь в базе
        const candidate = await User.findOne({email})
        if(candidate){
            return res.status(400).json({message: `Пользователь с таким email ${email} уже есть!`})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = User.create({email: email, password: hashPassword})

        return res.json(user)
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'})
    }
})

module.exports = router