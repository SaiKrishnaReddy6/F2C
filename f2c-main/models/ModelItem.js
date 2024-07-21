const mongoose = require("mongoose");
function getItemModel() {

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
    const ItemLst = mongoose.model("Items", itemSchema);
    return  ItemLst;
}
module.exports = { getItemModel }



