const express = require('express')
const router = express()

const authMiddleware = require('../auth_jwt/auth_middlewares');
const {getAllUsers,createUser,deleteUser,updateUser} = require('../controllers/APIController')
const { getAllTask,createTask,deleteTask,updateTask} = require('../controllers/taskController')
const isAuth = authMiddleware.isAuth;

router.get('/users',isAuth,getAllUsers)
router.post('/user/create',isAuth, createUser)
router.put('/user/update/:id',isAuth, updateUser)
router.delete('/user/delete/:id', isAuth,deleteUser)

router.get('/tasks',isAuth,getAllTask)
router.post('/task/create',isAuth, createTask)
router.put('/task/update/:id',isAuth, updateTask)
router.delete('/task/delete/:id',isAuth, deleteTask)
module.exports = router;
