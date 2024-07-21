const jwt = require("jsonwebtoken");
const jwtAuthWithNext = (req,res , next) =>{
  console.log(req.query);
    const full_token = req.headers['authorization'];//keyword
    console.log(full_token);

    var ary=full_token.split(" ");

    let actualToken=ary[1];
    let isTokenValid;
try{
     isTokenValid= jwt.verify(actualToken,process.env.SEC_KEY);
}
catch(err)
{
  res.json({status:false,message:"Token Expired"});
  return;
}
    if(isTokenValid)
      {
        console.log("*********************************************");
        const obj = jwt.decode(ary[1]);
        console.log(req.query.email);
        console.log(obj.result[0].email);
        if(req.query.email === obj.result[0].email )
        {
          req.query.email = obj.result[0].email;
          // console.log(req.query.email);
          next()
        }
        else
        {
          console.log("error h");
          res.json({status:false,message:"unauthorized"});
          return;
        }
      }
    else{
        res.json({status:false,message:"unauthorized"});
        return;
    }
}

module.exports=jwtAuthWithNext;
