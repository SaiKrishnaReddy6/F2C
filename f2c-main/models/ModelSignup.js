const mongoose = require("mongoose");
function getSignupModel() {
    let signupSchema = mongoose.Schema(
        {
            email:{type:String , unique:true, required:true, index:true},
            password: String,
            utype: String
        },
        {
            versionKey: false,
        }
    )
    const SignupInfo = mongoose.model("SignupInfo", signupSchema);
    return SignupInfo;
}
module.exports = { getSignupModel }



