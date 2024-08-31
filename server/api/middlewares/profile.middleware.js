const fs = require('fs')
const multer = require('multer');

// folder generator
const folderGenerator = (req) => {
    let path = `./public/uploads/profiles/${req.user?.username}`

    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }

    return path
}


// storage
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        return cb(null,folderGenerator(req))
    },
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

// profile middleware
const profileMiddleware = multer({storage})

// exports
module.exports = profileMiddleware