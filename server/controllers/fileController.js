const fileService = require('../services/fileService')
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
            const files = await File.findAll({where: {userId: req.user.id}})
            return res.json(files)
        } catch (e) {
            return res.status(500).json({message: "Cannot get files"})
        }
    }
}

module.exports = new FileController()