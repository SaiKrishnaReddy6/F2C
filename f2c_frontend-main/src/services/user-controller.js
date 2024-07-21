import { privateReq } from "./axios-config";

const doValidateTokenWithAxios=()=>{
    return privateReq.get("/product/token-validation");
}

const doValidateAndSearchToken=(email)=>{
    // alert("email is"+ email);
    return privateReq.get("/product/token-validation-and-search?email="+email);
}
export {doValidateTokenWithAxios, doValidateAndSearchToken}