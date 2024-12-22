const mongoose = require ('mongoose')
const validator = require ('validator')

const bcryptjs = require ('bcryptjs')

const userSchema = mongoose.Schema ({
    username : {
        type : String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        required : true,
        trim: true,
        minlength: 8,
        validate(vale){
            let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if (!password.test(vale)) {
                throw new Error ("Password must contain at least lowercase letter, uppercase letter , one number and one special character");
            }
        }
   },
    email :{
        type: String,
        required:true,
        trim: true,
        lowercase: true,
        unique:true,
        validator(val){
            if(!validator.isEmail(val)){
                throw new Error('invalid email')
            }
        }
    },
    age :{
        type: Number,
        default : 18,
        validate(val){
            if(val<0){
                throw new Error('age must be positive')
            }
        }
    },
    city : {
        type: String
    }

})

userSchema.pre('save', async function() {
    const user = this // Document
    console.log(user)
    
    // if (user.isModified('password')) {
    //     user.password = await bcryptjs.hash(user.password, 8)
    // }

    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8)
    }   

})
////////////////////////////////////////////////////////////
// login 

userSchema.statics.findByCredentials = async (em,password) => {
    const user = await User.findOne({email:em})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcryptjs.compare(password,User.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

///////////////////////////////////////////////////////////

userSchema.methods.generateToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'Peter20')
    user.tokens = user.tokens.concat({ token })
    await User.save()
    return token
}




/////////////////////////////////////////////////////////

const User = mongoose.model( 'User' , userSchema)

module.exports = User
 