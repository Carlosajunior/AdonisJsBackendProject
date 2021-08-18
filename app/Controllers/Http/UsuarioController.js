"use strict";

const Users = use("App/Models/User");

class UsuarioController {
  async cadastrarUsuario({ request, response }) {
    const parametros = request.only([
      "email",
      "password",
      "username",
      "telefone",
      "data_nascimento",
      "cpf",
    ]);
    try {
      const usuario = await Users.create(parametros);
      return response.created(usuario);
    } catch (error) {
      return response.unauthorized("Dados incorretos");
    }
  }

  async loginUsuario({ request, response, auth }) {
    try {
      const { email, password } = request.all();
      const token = await auth.attempt(email, password);
      return token;
    } catch (error) {
      return response.unauthorized("Credenciais inválidas");
    }
  }
}

module.exports = UsuarioController;
