const mongoose=require('mongoose');
const bcrypt=require('bcrypt');


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    resetTokenExpiry:Date
})

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });


  // Hash reset token before saving
userSchema.pre("save", async function (next) {
    if (this.isModified("resetToken")) {
      this.resetToken = await bcrypt.hash(this.resetToken, 10);
    }
    next();
  });

module.exports=mongoose.model('User',userSchema,'users');