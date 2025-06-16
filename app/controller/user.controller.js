const service = require('../service/user.service');

const addUser = async(req, res, next) => {
    const {uid, email,  provider, mobile, zipcode, address, username} = req.body;
    
    try{
        const user = await service.addUser({uid, email, provider, mobile, zipcode, address, username});
        res.json(user);
    }catch(err){
        console.error(err);
    };
}

const getUser = async(req, res, next) => {
    // let duplicated = false;
    let user = null;

    try{
        const {email} = req.params;
        const result = await service.getUser(email);

        if(result.length >= 1){
            user = result[0];
        }

        res.json({"user":user})

        // res.json(user[0]);
        // if(Array.isArray(user) ? user.length >= 1 : user){
        //     duplicated = true;
        // }

        // res.json({"duplicated":duplicated});
    }catch(err){
        console.error(err);
    }
}

module.exports = {
    addUser,
    getUser,
}