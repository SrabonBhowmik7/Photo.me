const express = require('express')

const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")   //user er user auth er user needs to be same 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

const nodemailer = require ('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))



//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

// router.get('/', (req, res) => {
//     res.send("hello")
// })

//testing purpose
// router.get('/protected',requireLogin,(req,res) =>{
//     res.send("hello user")
// })

router.post('/signup', (req, res) => {
    const { name, email, password,pic } = req.body
    if (!email || !password || !name) {
        return res.status(422).json({ error: "please add all the fields " })
    }
    // res.json({message:"successfuly posted"})
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exists with that email" })
            }
            bcrypt.hash(password, 12) //hash 12 means more secure than 10 deafult 
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password:hashedpassword,
                        name,
                        pic
                        // pic:pic
                    })

                    user.save()
                        .then(user => {
                            transporter.sendMail({
                                to:user.email,
                                from:"photo.me@webname.com",
                                subject:"Signed up Successfully",
                                //text:"Hi, Thanks For joining. Click the following link Link and verify your mail.- Dev 'Photo.Me',
                                html:'<p> Hi, Thanks For joining. Click in <a href="http://localhost:3000/signin" target = "_self">VERIFY E-MAIL</a>  to verify your mail.- Dev <b>Photo.Me</b></p>'
                                
                                // html : '<a href="http://chriscoyier.net" onclick="window.open(this.href); return false;" onkeypress="window.open(this.href); return false;">This link will open in new window/tab</a>'
                            })
                            res.json({ message: "saved successfully.Please verify your email." })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(error => {
            console.log(err)
        })
})

router.post('/signin',(req,res)=>{
    const {email,password} =req.body
    if(!email || !password){
        res.status(422).json({error:"please add eamil or password"})
    }
    User.findOne({email:email})
    .then(savedUser =>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Credential Email or Password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch =>{
            if(doMatch){
                // res.json({message:"successfully signed in "})
                //by token the user can access the protective resources 
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const{_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:" Please confirm your account"})
                //Invalid Email or Password
            }
        })
        .catch(err =>{
            console.log(err)
        })
    })
})

module.exports = router 