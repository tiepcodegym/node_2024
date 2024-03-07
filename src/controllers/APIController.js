const db = require('../models/index')
let getAllUsers = async (req,res)=>{
    let data = await db.User.findAll();
    return res.status(200).json({
        message:'ok',
        data: data
    })
}

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        if(!firstName || !lastName || !email){
            return res.status(200).json({
                message:'missing required params'
            })
        }
        const newUser = await db.User.create({ firstName, lastName, email });
        return res.status(200).json({
            message: 'create success',
        })
    }catch (e) {
        console.log(">>>>check error: ", e);
        res.status(500).json({
            message: 'error',
            error: e.message
        });
    }
}
const updateUser = async (req,res)=>{
    try {
        await db.User.update(
            {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            },
            {where: {id: req.params.id}}
        )
        return res.status(200).json({
            message: 'update success',
        })
    } catch (err) {
        res.send(err)
        console.log(">>>>check error: ", err);
    }
}
const deleteUser = async (req,res) => {
    await db.User.destroy({
        where: { id: req.params.id }
    })
    return res.status(200).json({
        message:'Delete success',
    })
}

module.exports = {
    getAllUsers,createUser,deleteUser,updateUser
}