require('dotenv').config()
const sequelize = require('./db')
const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth_routes')
const fileRouter = require('./routes/file_routes')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
//Для парсинга json, по дефолту отсутствует
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async() => {
    try{
        //Подключение к бд
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    }catch(e){
        console.log(e);
    }
}

start()