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
        "empresas_user_id",
      ]);
      const empresa = await Empresa.create(parametros);
      return response.created(empresa);
    } catch (error) {
      return response.unauthorized(error);
    }
  }

  async editarEmpresa({ request, response }) {
    const idEmpresa = request.input("id");
    try {
      if (request.input("nome_dono_da_empresa"))
        await Empresa.query()
          .where("id", idEmpresa)
          .update({
            nome_dono_da_empresa: request.input("nome_dono_da_empresa"),
          });
      if (request.input("razao_social"))
        await Empresa.query()
          .where("id", idEmpresa)
          .update({ razao_social: request.input("razao_social") });
      if (request.input("nome_fantasia"))
        await Empresa.query()
          .where("id", idEmpresa)
          .update({ nome_fantasia: request.input("nome_fantasia") });
    } catch (error) {
      return response.unauthorized(error);
    }
    const empresa = await Empresa.query().where("id", idEmpresa).fetch();
    return response.ok(empresa);
  }

  // async apagarEmpresa({request, response}{

  // })

  async listarEmpresas({ request, response }) {
    const idDonoEmpresa = request.input("empresas_user_id");
    try {
      const listaEmpresas = await Empresa.query()
        .where("empresas_user_id", idDonoEmpresa)
        .fetch();
      return response.ok(listaEmpresas);
    } catch (error) {
      return response.unauthorized(error);
    }
  }

  async excluirEmpresa({ request, response }) {
    const idEmpresa = request.input("idEmpresa");
    try {
      const empresa = await Empresa.find(idEmpresa);
      empresa.delete();
      return response.ok(empresa);
    } catch (error) {
      return response.unauthorized(error);
    }
  }
}

module.exports = EmpresaController;
