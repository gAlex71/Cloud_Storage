const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware.js')
const fileController = require('../controllers/fileController')

router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFiles)
router.get('', authMiddleware, fileController.getFiles)
router.get('/download', authMiddleware, fileController.downloadFile)

module.exports = router