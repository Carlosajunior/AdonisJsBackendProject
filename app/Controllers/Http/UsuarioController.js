"use strict";

const Usuarios = use("App/Models/Usuario");

class UsuarioController {
  async cadastrarUsuario({ request }) {
    const parametros = request.only([
      "login",
      "email",
      "senha",
      "CPF",
      "telefone",
      "data_nascimento",
    ]);
    const usuario = await Usuarios.create(parametros);
    return usuario;
  }

  async loginUsuario({ request, response, auth }) {
    try {
      const { login, senha } = request.all();
      const token = await auth.attempt(login, senha);
      console.log(token);
      return response(token, 201);
    } catch (error) {
      return response.send(error, 404);
    }
  }
}

module.exports = UsuarioController;
