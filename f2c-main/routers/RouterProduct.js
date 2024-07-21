const express = require("express");
const {doSaveProduct,doDeleteProduct,showAll,findd,doUpdate,findWithToken, doSave , doSaveSignup, doLogin,doAddItem,doFindItem,doFindCity,doFindGrower} = require("../controllers/ControllerProduct");

const validateToken= require('../auth/Validate_token')
const validateTokenWithNext = require('../auth/Validate-token-with-next')
const app = express.Router();

app.post("/add-product", doSaveProduct);
app.post("/delete-product", doDeleteProduct);
app.post("/all", showAll);
app.post("/one", findd); // c g 
app.post("/update",doUpdate);  // c g
app.post("/save-info",doSave); // c g 
app.post("/save-signup" ,doSaveSignup); // product
app.post("/dologin", doLogin) // product
app.post("/addItem", doAddItem); // grower
app.post("/finditem", doFindItem); // consumer
app.post("/doFindCity", doFindCity); // consumer
app.post("/doFindGrower", doFindGrower); // consumer


app.get("/token-validation" , validateToken);
app.get("/token-validation-and-search" , validateTokenWithNext , findWithToken);

module.exports = app;
