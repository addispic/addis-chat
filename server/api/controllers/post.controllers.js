const fs = require('fs')
// models
const Post = require('../models/post.schema');

// get all posts
const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt: -1});
        return res.status(200).json({posts})
    } catch (err) {
        return res.status(400).json({error: 'get all posts error'});
    }
}

// add new post
const addNewPost = async (req,res) => {
    try{
        const {text} = req.body 
        let files = []
        req.files?.forEach((fileItem => files.push(fileItem.path)))
        const userId = req.user?._id 
        const newPost = await Post.create({userId,text,files})
        return res.status(200).json({newPost})
    }catch(err){
        console.log(err)
        return res.status(400).json({error: 'add new post error'})
    }
}

// update post
const updatePost = async (req,res) => {
    try {
        const postId = req.params._id;
        const userId = req.user?._id;
        const {newText: text} = req.body 
        const post = await Post.findById(postId)
        if(!post){
            return res.status(400).json({error: 'post not exist'});
        }
        if(!post?.userId?.equals(userId)){
            return res.status(400).json({error: 'unauthorized to update post'})
        }
        const updatedPost = await Post.findByIdAndUpdate(postId,{text},{new: true})
        return res.status(200).json({updatedPost})
    } catch (err) {
        return res.status(400).json({error: 'update post error'});
    }
}

// delete post
const deletePost = async(req,res) => {
    try {
        const postId = req.params._id 
        const userId = req.user?._id 
        const post = await Post.findById(postId);
        if(!post){
            return res.status(200).json({error: 'post not exist'});
        }

        if(!post?.userId?.equals(userId)){
            return res.status(400).json({error: 'unauthorized to delete the post'})
        }

        await Post.findByIdAndDelete(postId);
        if(post?.files?.length > 0){
            post?.files?.forEach((filePath)=>{
                if(fs.existsSync(filePath)){
                    fs.unlinkSync(filePath)
                }
            })
        }
        return res.status(200).json({message: 'post deleted successfully',_id: postId})
    } catch (err) {
        console.log(err)
        return res.status(200).json({error: 'delete post error'});
    }
}

// exports
module.exports = {
    getAllPosts,
    addNewPost,
    updatePost,
    deletePost,
}