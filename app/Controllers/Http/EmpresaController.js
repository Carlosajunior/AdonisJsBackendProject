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

  async editarEmpresa({ request, response }) {
    try {
      if (request.input("nome_dono_da_empresa"))
        await Empresa.query()
          .where("id", request.input("id"))
          .update({
            nome_dono_da_empresa: request.input("nome_dono_da_empresa"),
          });
      if (request.input("razao_social"))
        await Empresa.query()
          .where("id", request.input("id"))
          .update({ razao_social: request.input("razao_social") });
      if (request.input("nome_fantasia"))
        await Empresa.query()
          .where("id", request.input("id"))
          .update({ nome_fantasia: request.input("nome_fantasia") });
    } catch (error) {
      return response.unauthorized(error);
    }
    const empresa = await Empresa.query()
      .where("id", request.input("id"))
      .fetch();
    return response.ok(empresa);
  }

  // async apagarEmpresa({request, response}{

  // })

  async listarEmpresas({ request, response }) {
    const idDonoEmpresa = request.input("id");
    const listaEmpresas = await Empresa.find("id");
  }
}

module.exports = EmpresaController;
