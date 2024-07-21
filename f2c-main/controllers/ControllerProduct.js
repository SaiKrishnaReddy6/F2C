// const { privateReq } = require( "../../webpack/src/services/axios-config");
const { getProductModel } = require("../models/ModelProduct");
// const User = getProductModel();
const { ProductModel, SignupInfo, ItemLst } = getProductModel();

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const path = require("path");

function doSaveProduct(req, resp) {
    // alert("hii");
    console.log(req.body);
    const info = new ProductModel(req.body);
    info.save().then((ans) => {

        // resp.send(ans); 
        resp.json({ status: true, rec: ans, out: "yay" });
    })
}

// const doValidateTokenWithAxios=()=>{
//     return privateReq.get("/product/token-validation");
// }



// function doSaveProduct(req,resp){
//     console.log(req.query);
//     const info = new User(req.query);
//     info.save().then((ans)=>
//     {
//         // resp.send(ans);
//         resp.json({status: true, rec:ans , out:"yay"});
//     })
// }

function doSave(req, resp) {
    // console.log("hiii there");
    let filename = "nopic.jpg";
    // console.log(req.body);
    // console.log(req.files);
    if (req.files != null) {
        filename = req.files.pic.name;
        // console.log(filename);
        var filepath = path.join(__dirname, "..", "uploads", filename);
        req.files.pic.mv(filepath);
    }
    req.body.picpath = filename;
    // console.log(filename);
    const info = new ProductModel(req.body);
    // console.log(info);
    info.save().then((ans) => {
        console.log(ans);
        resp.set("json");
        resp.json({
            status: true,
            res: ans
        })
    }).catch((err) => {
        resp.json({
            status: false,
            error: err
        })
    })
}

// function doDeleteProduct(req, resp) {
//     console.log(req.body);
//     ItemLst.deleteOne({ email: req.body.email,  items: req.body.items}).then(function (ans) {
//         console.log(ans);
//         // resp.send(ans);
//         if (ans.deletedCount == 1)
//             resp.json({ status: true, mesg: "Deleted" });
//         else
//             resp.json({ status: true, mesg: "invalid item" });
//     }).catch(() => {
//         // resp.send({err:"error"});
//         resp.json({ status: false, err: err.message });
//     })
// }

function doDeleteProduct(req, res) {
    res.set("json");
    ItemLst.deleteOne({ _id: req.body._id }).then((result) => {
        if (result.deletedCount == 1)
            res.json({ status: true, rec: result, msg: "Deleted" });
        else
            res.json({ status: true, rec: result, msg: "Invalid Item" })

    }).catch(function () {
        res.json({ err: "error", msg: "Invalid Item" });
    });
}

function showAll(req, resp) {
    console.log(req.body);
    ProductModel.find().then((result) => {
        resp.json({ status: true, res: result });
    }).catch(function () {
        resp.json({ status: false, res: err.message });
    })
}

function doFindItem(req, resp) {
    ItemLst.find({ email: req.body.email }).then((result) => {
        console.log(result);
        resp.set("json");
        resp.json({ status: true, res: result });
    }).catch(function (err) {
        resp.json({ status: false, res: err.message });
    })
}

function findd(req, resp) {
    console.log("hello");
    console.log(req.body.email);
    ProductModel.find({ email: req.body.email }).then((result) => {
        // console.log(result);
        // var filepath = path.join(__dirname, "..", "uploads", result[0].picpath);
        // result[0].picpath = filepath;
        // console.log(result[0].picpath);
        // var pathh = JSON.parse(result[0].picpath)
        // console.log(pathh);
        resp.set("json");
        resp.json({ status: true, res: result });
    }).catch(function (err) {
        resp.json({ status: false, res: err.message });
    })
}

function findWithToken(req, resp) {
    // console.log("hello");
    console.log(req.query);
    ProductModel.find({ email: req.query.email }).then((result) => {
        resp.set("json");
        resp.json({ status: true, res: result });
    }).catch(function (err) {
        console.log("error");
        console.log(err);
        resp.json({ status: false, res: err.message });
    })
}

function doSaveSignup(req, resp) {
    const info = new SignupInfo(req.body);
    console.log(info);
    info.save().then((ans) => {
        console.log(ans);
        // resp.send(ans);
        resp.json({ status: true, rec: ans, out: "yay" });
    }).catch((err) => {
        console.log(err.message);
        // resp.send(err.message);
    })
}


function doFindCity(req,resp)
{
    console.log(req.body);
    ItemLst.find({category: req.body.category, item: req.body.item }).then((result) => {
        console.log(result);
        resp.set("json");
        resp.json({ status: true, res: result });
    }).catch(function (err) {
        resp.json({ status: false, res: err.message });
    })
}

async function doFindGrower(req, resp)
{
    console.log(req.body);
    const searchQuery = req.body.sitem;
    // console.log(searchQuery);
    try {
        const result = await ItemLst.find({
            category: req.body.category,
            city: req.body.city,
            sitem: { $regex: new RegExp(searchQuery, 'i') }
        })
        console.log("result is ",result);
        resp.json(result);
    } catch (error) {
        console.error('Error in doFindGrower:', error);
        resp.status(500).json({ error: 'Internal Server Error' });
    }

    // const result = await ItemLst.find({
    //     category: req.body.category,
    //     city: req.body.city,
    //   columnName: { $regex: new RegExp(searchQuery, 'i') } // 'i' for case-insensitive search
    // }).toArray();
    // console.log(result);
    // ItemLst.find({ sitem:req.body.sitem}).then((result) => {
    //     console.log(result);
    //     resp.set("json");
    //     resp.json({ status: true, res: result });
    // }).catch(function (err) {
    //     resp.json({ status: false, res: err.message });
    // })
}

async function doAddItem(req, resp) {
    let result;
    let cityy = "";
    try{
        console.log("hi");
        console.log(req.body);
        result = await  ProductModel.find({ email: req.body.email });
        cityy = result[0].city;
        req.body.city = cityy;
        
    }
    catch(err) {
        console.log("error");
    }
    // console.log(result[0].city);

    let filename = "nopic.jpg";
    if (req.files != null) {
        filename = req.files.ppic.name;
        var filepath = path.join(__dirname, "..", "uploads", filename);
        req.files.ppic.mv(filepath);
    }
    req.body.ppicpath = filename;
    const info = new ItemLst(req.body);
    info.save().then((ans) => {
        console.log(ans);
        resp.set("json");
        resp.json({
            status: true,
            res: ans,
            city: cityy
        })
    }).catch((err) => {
        console.log(err);
        resp.json({
            status: false,
            error: err
        })
    })
}

function doLogin(req, resp) {
    console.log(req.body.email);
    SignupInfo.find({ email: req.body.email }).then((result) => {
        console.log(result);
        // creation of web token //
        let seckey = process.env.SEC_KEY;
        let token = jwt.sign({result}, seckey);
        if (result[0].password === req.body.password) {
            console.log("trueeeee");
            resp.json({ status: true, res: "password matches", type: result[0].utype, token: token});
        }
        else {
            console.log("password doesn't match");
            resp.json({ status: false, res: "password doesn't match" });
        }
        // resp.set("json");
    }).catch(function (err) {
        console.log("error");
        resp.json({ status: false, res: err.message });
    })
}

function doUpdate(req, resp) {
    let filename = "nopic.jpg";
    console.log(req.body);
    console.log(req.files);
    if (req.files != null) {
        filename = req.files.pic.name;
        console.log(filename);
        var filepath = path.join(__dirname, "..", "uploads", filename);
        req.files.pic.mv(filepath);
    }
    else {
        filename = req.body.hdn;
    }
    req.body.picpath = filename;
    resp.set("json");
    ProductModel.updateOne({ email: req.body.email }, { $set: req.body }).then((result) => {
        // User.updateOne({ email: req.body.email }, { $set: {fn:req.body.fn , ln:req.body.ln , address:req.body.address,  city:req.body.city ,  state:req.body.state,  country:req.body.country,  idproof:req.body.idproof,  picpath:req.body.picpath} }).then((result) => {
        console.log("here");
        resp.json({ status: true, res: result })
    }).catch(() => {
        resp.json({ status: false, error: err.message })
    })
}

module.exports = { doSaveProduct, doDeleteProduct, showAll,findWithToken,  findd, doUpdate, doSave, doSaveSignup, doLogin, doAddItem, doFindItem, doFindCity, doFindGrower}