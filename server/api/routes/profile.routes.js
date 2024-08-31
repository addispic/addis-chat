const {Router} = require('express');

// middleware
// profile middleware
const profileMiddleware = require('../middlewares/profile.middleware')
// auth middleware
const {privateRoute} = require('../middlewares/auth.middleware')

// controllers
const {
    getAllProfiles,
    addNewProfile,
    deleteProfile,
} = require('../controllers/profile.controllers')

// router
const router = Router();

// get all profiles
router.get('/all-profiles',getAllProfiles)

// add new  profile
router.post('/new-profile',privateRoute,profileMiddleware.single('profile'),addNewProfile)

// delete profile
router.delete('/delete-profile/:_id',privateRoute,deleteProfile)

// exports
module.exports = router;