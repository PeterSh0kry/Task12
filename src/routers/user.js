

const express = require ('express')
const User = require('../models/user')

const router = express.Router()

// post // get  // patch // delete

// router.post('/users' , (req , res) =>{
//     console.log(req.body)
//     const user = new User ({ name : "islam" , age : 26})
//     const user = new User (req.body)
//     user.save()
//     .then((user) => {res.status(200).send(user)})
//     .catch((e) => {res.status(400).send(e)})
// })
//////////////////////////////////////////

// Get
    // router.get ('/users' , (req , res) => {
    //     User.find({}).then((users) => {
    //         res.status(200).send(users)
    //     }).catch((e) => {
    //         res.status(500).send(e)
    //     })
    // })

    ////////////////////////////////////////

    // router.get('/users/:id' , (req,res) => {
    //     // console.log(req.params)
    //     const _id = req.params.id
    //     User.findById(_id).then((user) => {
    //         if(!user){
    //             return res.status(404).send('unable to find user')
    //         }
    //         res.status(200).send(user)
    //     }).catch((e) => {
    //         res.status(500).send(e)
    //     })
    // })

    //////////////////////////////////////

    // Patch

    // router.patch('/users/:id' , (req , res) => {
    //     const _id = req.params.id   
    //     const updates = req.body
    //     User.findByIdAndUpdate(_id , updates , {new : true , runValidators : true}).then((user) => {
    //         if(!user){
    //             return res.status(404).send('unable to find user')
    //         }

    //         updates.forEach((ele) => (user[ele] = req.body[ele]))
            
    //         res.status(200).send(user)
    //     }).catch((e) => {
    //         res.status(500).send(e)
    //     })  
    // })

    ////////////////////////////////////////

    // Delete

    // router.delete('/users/:id' , (req , res) => {
    //     const _id = req.params.id
    //     User.findByIdAndDelete(_id).then((user) => {
    //         if(!user){
    //             return res.status(404).send('unable to find user')
    //         }
    //         res.status(200).send(user)
    //     }).catch((e) => {
    //         res.status(500).send(e)
    //     })
    // })

    //////////////////////////////////////////////////////

    // login
    router.post ("/login" , async (req,res) => {
        try{
            const user = await User.findByCredentials(req.body.email , req.body.password)
            const token = await User.generateToken()

            res.status(200).send({user})
        }catch (e){
            res.status(400).send(e.message)
        }
    })

    //////////////////////////////////////////////////////
    router.post ('/users' , async (req , res) => {
        try {
            const user = new user (req.body)
            const token = await User.generateToken()

            console.log(req.body)

            await user.save()
            res.status(200).send({user , token})
        } catch (e) {
            res.status(400).send(e)
        }
    })

module.exports = router

// https://httpstatuses.com/ 