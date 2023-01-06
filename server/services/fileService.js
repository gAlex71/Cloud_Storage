const fs = require('fs')
const path = require('path')
const {File} = require('../models/models')

class FileService {
    //Функция создания папки
    createDir(file){
        const filePath =  path.join(__dirname, `../files/${file.userId}/${file.path}`)
        return new Promise((resolve, reject) => {
            try {
                //Если файла по такому пути не существует, создаем его
                if(!fs.existsSync(filePath)){
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                }else{
                    return reject({message: 'File already exist'})
                }
            } catch (e) {
                console.log(e);
                return reject({message: 'File error'})
            }
        })
    }
}

module.exports = new FileService()