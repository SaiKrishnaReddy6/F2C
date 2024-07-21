const express = require("express");
const app = express.Router();

app.post("/one", findd); // c g 
app.post("/update",doUpdate);  // c g
app.post("/save-info",doSave); // c g 
app.post("/addItem", doAddItem); // grower