"use strict";
const Axios = require("axios");
const Empresa = use("App/Models/Empresa");

class EmpresaController {
  async cadastrarEmpresa({ request, response }) {
    try {
      const brasilAPI = "https://brasilapi.com.br/api/cnpj/v1/";
      const cnpj = request.input("cnpj");
      const consultaCNPJBrasilAPI = brasilAPI.concat(cnpj);
      const { data } = await Axios.get(consultaCNPJBrasilAPI);
    } catch (error) {
      return response.unauthorized("CNPJ inválido");
    }
    try {
      const parametros = request.only([
        "nome_dono_da_empresa",
        "cnpj",
        "razao_social",
        "nome_fantasia",
      ]);
      const empresa = await Empresa.create(parametros);
      return response.created(empresa);
    } catch (error) {
      return response.unauthorized(error);
    }
  }
}

module.exports = EmpresaController;
