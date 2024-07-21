const mongoose = require("mongoose");

function getProductModel() {
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

    let itemSchema = mongoose.Schema(
        {
            email: String,
            category: String,
            city:String,
            sitem:String,
        },
        {
            versionKey: false,
        }
    )

    let mySchema = mongoose.Schema(
        {
            email:{type:String , unique:true, required:true, index:true},
            fn: String,
            ln: String,
            address: String,
            city: String,
            state: String,
            category:String,
            aadharcardnumber:String,
            picpath:String
        },
        {
            versionKey: false,
        }
    )
    const ProductModel = mongoose.model("Information", mySchema);
    const SignupInfo = mongoose.model("SignupInfo", signupSchema);
    const ItemLst = mongoose.model("Items", itemSchema);
    return {ProductModel,SignupInfo, ItemLst};
}
module.exports = { getProductModel }



