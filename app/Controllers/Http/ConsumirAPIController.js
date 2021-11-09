"use strict";
const Axios = require("axios");

class ConsumirAPIController{
    async obterJSON({response}){
        try {
            const { data } = await Axios.get("http://consensofeira.ddns.net:3100/obterJSON");
            return response.ok(data);
        } catch (error) {
            console.log(error);
        }
    }
    
    async escreverJSON({req, response}){
        try {
            const { data } = await Axios.post("http://consensofeira.ddns.net:3100/escreverJSON", req);
            return response.created(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ConsumirAPIController