const db = require('../models/index')
let getAllTask= async (req,res)=>{
    let data = await db.Task.findAll();
    return res.status(200).json({
        message:'ok',
        data: data
    })
}

const createTask = async (req, res) => {
    try {
        const title = req.body.title;
        const desc = req.body.desc;
        await db.Task.create({
            title:title,
            desc:desc
        });
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
const updateTask = async (req,res)=>{
    try {
        await db.Task.update(
            {
                title: req.body.title,
                desc: req.body.desc
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
const deleteTask = async (req,res) => {
    await db.Task.destroy({
        where: { id: req.params.id }
    })
    return res.status(200).json({
        message:'Delete success',
    })
}

module.exports = {
    getAllTask,createTask,deleteTask,updateTask
}