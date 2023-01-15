const fileService = require('../services/fileService')
const path = require('path')
const fs = require('fs')
const {User, File} = require('../models/models')

//Здесь мы будем работать с запросами
class FileController{
    async createDir(req, res){
        try {
            const {name, type, parent} = req.body
            const file = await File.create({name, type, parent, userId: req.user.id})
            // const parentFile = await File.findOne({where: {id: parent}})
            // if(!parentFile){
            file.path = name
            await fileService.createDir(file)
            // } else {
            //     file.path = `${parentFile.path}\\${file.name}`
            //     await fileService.createDir(file)
            //     parentFile.childs.push(file.id)
            //     await parentFile.save()
            // }
            // await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e);
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res){
        try {
            const {sort} = req.body
            let files
            switch (sort) {
                case 'name':
                    files = await File.findAll({where: {userId: req.user.id}}).sort({name: 1})
                    break
                case 'type':
                    files = await File.findAll({where: {userId: req.user.id}}).sort({type: 1})
                    break
                case 'date':
                    files = await File.findAll({where: {userId: req.user.id}}).sort({date: 1})
                    break
                default:
                    files = await File.findAll({where: {userId: req.user.id}})
                    break;
            }
            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: "Cannot get files"})
        }
    }

    async uploadFiles(req, res){
        try{
            const file = req.files.file
            const parent = await File.findOne({where: {userId: req.user.id}})
            const user = await User.findOne({where: {id: req.user.id}})

            //Если на диске нет свободного места
            if(user.usedSpace + file.size > user.diskSpace){
                return res.status(400).json({message: "There not space on the disk"})
            }

            user.usedSpace = user.usedSpace + file.size

            let pathNew
            if(parent){
                pathNew =  path.join(__dirname, `/${user.id}/${parent.path}/${file.name}`)
            }else{
                pathNew =  path.join(__dirname, `/${user.id}/${file.name}`)
            }

            //Если такой файл уже существует отправляем сообщение об этом
            if(fs.existsSync(pathNew)){
                return res.status(400).json({message: "File already exist"})
            }
            //Переместим файл по раннее созданному пути
            file.mv(pathNew)

            //Разделяем название по точкам, и забираем последний элемент
            const type = file.name.split('.').pop()
            let filePath = file.name
            if(parent){
                filePath = parent.path + '\\' + file.name
            }
            const dbFile = await File.create({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                // parent: parent?.id
                userId: user.id
            })

            res.json(dbFile)
        } catch (e) {
            return res.status(500).json({message: "Error upload"})
        }
    }

    async downloadFile(req, res){
        try {
            //Получаем файл с базы данных по его id и id пользователя
            const file = await File.findOne({where: {id: req.query.id, userId: req.user.id}})
            //Находим путь к этому файлу
            const pathFile = path.join(__dirname, `\\${req.user.id}\\${file.path}\\${file.name}`)
            //Если файл по данному пути существует, то отправляем его обратно на клиент
            if(fs.existsSync(pathFile)){
                return res.download(pathFile, file.name)
            }
            return res.status(400).json({message: "Download error"})
        } catch (e) {
            return res.status(500).json({message: "Download error"})
        }
    }

    async deleteFile(req, res){
        try {
            //Получаем файл с базы данных по его id и id пользователя
            const file = await File.findOne({where: {id: req.query.id, userId: req.user.id}})
            if(!file){
                return res.status(400).json({message: "File not found"})
            }
            fileService.deleteFile(file)
            await file.remove()
            res.status(200).json({message: "File was deleted"})
        } catch (e) {
            return res.status(500).json({message: "Delete error"})
        }
    }

    async searchFile(req, res){
        try {
            const searchName = req.body.search
            let files = await File.findAll({where: {userId: req.user.id}})
            //Если название файла включает в себя строку поиска
            files = files.filter(file => file.name.includes(searchName))
            return res.json(files)
        } catch (e) {
            return res.status(400).json({message: "Search error"})
        }
    }
}

module.exports = new FileController()