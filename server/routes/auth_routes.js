const Router = require('express')
// require('dotenv').config()
const {User} = require('../models/models')
const router = new Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        const candidate = await User.findOne({where: {email}})
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

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return res.status(400).json({message: 'User not found'})
        }
        //Сравниваем пароль пользователя и введенный пароль
        const isPassValid = bcrypt.compareSync(password, user.password)
        if(!isPassValid){
            return res.status(400).json({message: 'Incorrect password'})
        }
        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'})
        //После генерации токена возвращаем данные о пользователе
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (e) {
        console.log(e);
        res.send({message: 'Server error'})
    }
})

module.exports = router