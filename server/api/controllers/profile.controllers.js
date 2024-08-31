const fs = require('fs')
// model
// profile
const Profile = require('../models/profile.schema')

// get all profiles
const getAllProfiles = async (req,res) => {
    try {
        const profiles = await Profile.find().sort({createdAt: -1})
        return res.status(200).json({profiles})
    } catch (err) {
        return res.status(400).json({error: 'get all profiles failed'})
    }
}

// add new profile
const addNewProfile = async (req,res) => {
    try {
        const newProfile = await Profile.create({userId: req.user?._id,path: req.file.path})
        return res.status(200).json({newProfile})
    } catch (err) {
        return res.status(400).json({error: 'new profile failed'})
    }
}

// delete profile
const deleteProfile = async (req,res) => {
    try {
        const isProfile = await Profile.findById(req.params?._id)
        if(!isProfile){
            return res.status(400).json({error: 'profile not found'})
        }

        if(!isProfile?.userId?.equals(req.user?._id)){
            return res.status(400).json({error: 'unauthorized to delete profile'})
        }

        if(fs.existsSync(isProfile?.path)){
            fs.unlinkSync(isProfile?.path)
        }
        await isProfile.deleteOne()
        return res.status(200).json({message: 'profile deleted',_id: req.params?._id})
    } catch (err) {
        console.log(err)
        return res.status(200).json({error: 'delete profile failed'})
    }
}

// exports
module.exports = {
    getAllProfiles,
    addNewProfile,
    deleteProfile,
}