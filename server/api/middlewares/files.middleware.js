const fs = require('fs')
const multer = require('multer')

// path generator
const pathGenerator = (req,file) => {
    let path = `./public/uploads/post/${req.user?.username}/${file?.mimetype?.split('/')[0]}`
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}


// storage
const storage = new multer.diskStorage({
    destination: (req,file,cb) => {
        return cb(null,pathGenerator(req,file))
    },
    filename: (req,file,cb) =>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})


// files middleware
const filesMiddleware = multer({storage})

// exports
module.exports = filesMiddleware