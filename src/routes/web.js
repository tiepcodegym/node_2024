const express = require('express')
const router = express.Router()

const {getHomePage,getABC,getUser,createUser} = require('../controllers/homeController')

router.get('/', getHomePage)
router.get('/abc', getABC)
router.get('/user', getUser)
router.post('/user/create', createUser)

module.exports = router;
