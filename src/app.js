
// npm init -y
// npm i mongodb 

///////////////////////////////////////////////////////////////////////////////
// const mongoose = require ('mongoose')

// mongoose.connect('mongodb://localhost:27017/lec-10')

// const Car = mongoose.model('Car' , { type : String} )

// const car1 = new Car ({type : 'audi'})

// car1.save().then(() => console.log('car added'))

///////////////////////////////////////////////////////////////////////////////

// const bcryptjs = require ("bcryptjs")

// const myFunction = async () => {
//     const password = '12345678'
//     const hashedPassword = await bcryptjs.hash(password, 8)
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcryptjs.compare(password, hashedPassword)
//     console.log(isMatch)
// }

// myFunction()
//////////////////////////////////////////////////////////////////////////////
const jwt = require ('jsonwebtoken')

const mytoken = () => {
    const token = jwt.sign({ _id: '123' }, 'Peter20')
    console.log(token)

    const tokenverify = jwt.verify (token , "Peter20")
    console.log(tokenverify)
}

mytoken()




/////////////////////////////////////////////////////
// npm i express 
    
const express = require ('express')

const app = express()

const port = process.env.PORT || 3000


// app.get('/about' , (req,res)=>{
//      res.send('islam mohamed')
// })


///////////////////////////////////////////////////////////



require ('./db/mongoose')
// to parse automatically
app.use(express.json())

const userRouter = require ('./routers/user')
app.use(userRouter)

app.listen(port ,() => {console.log('All Done Successfully')})