// const axios = require("axios");
// const baseURL = "http://localhost:2003";

// const publicAxios = axios.create({baseURL});
// const privateReq = axios.create({ baseURL});

// privateReq.interceptors.request.use((config) => 
// {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// module.exports=  {baseURL,privateReq,publicAxios};


// const axios = require("axios");
import axios from "axios";

// const baseURL="http://localhost:2003";// baseURL is case sensitive-dont change it

const baseURL = "https://g2c-1.onrender.com";

const publicAxios=axios.create({baseURL});


//---------------

const privateReq = axios.create({ baseURL,});

privateReq.interceptors.request.use((config) => 
{
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {publicAxios,baseURL,privateReq};
// module.exports=  {baseURL,privateReq,publicAxios};


