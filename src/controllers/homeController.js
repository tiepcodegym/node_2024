const db = require('../models/index')
const getHomePage = (req,res) => {
    res.send('aaaaa bbbb')
}
const getABC = (req,res) => {
    res.send('ccccc ddddd')
}

const getUser = async (req,res) => {
    try {
        let data = await db.User.findAll();
        res.render('sample.ejs',{
            data:JSON.stringify(data)
        });
    }catch (e) {
        console.log(e)
    }
}
const createUser = async (req,res) => {
    try {
        const { firstName, lastName, email } = req.body;
        // Tạo người dùng mới trong cơ sở dữ liệu
        const newUser = await User.create({ firstName, lastName, email });

        res.status(201).json(newUser);
    }catch (e) {
        console.log(">>>>check error: ",e)
    }
}

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })
}
module.exports={
    getHomePage,getABC,getUser,createUser
};