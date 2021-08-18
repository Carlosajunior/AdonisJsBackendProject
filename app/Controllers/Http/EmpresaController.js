'use strict'
const Axios = require('axios')

class EmpresaController {

    async cadastrarEmpresa({ request, response }) {
    try {
        const brasilAPI =  "https://brasilapi.com.br/api/cnpj/v1/"
        const cnpj = request.input("cnpj");
        const consultaCNPJBrasilAPI = brasilAPI.concat(cnpj)
        const {data} = await Axios.get(consultaCNPJBrasilAPI);
    } catch (error) {
        return response.unauthorized("CNPJ inválido");
    }
    try {
        
    } catch (error) {
        
    }
    return response.created("cadastro validado")
  }
}

module.exports = EmpresaController
