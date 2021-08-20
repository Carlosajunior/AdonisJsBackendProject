"use strict";

const EmpresaController = require("../app/Controllers/Http/EmpresaController");
const UsuarioController = require("../app/Controllers/Http/UsuarioController");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.post("/cadastrarUsuario", "UsuarioController.cadastrarUsuario");
Route.post("/login", "UsuarioController.loginUsuario");

Route.post(
  "/cadastrarEmpresa",
  "EmpresaController.cadastrarEmpresa"
).middleware("auth");
Route.put("/editarEmpresa", "EmpresaController.editarEmpresa").middleware(
  "auth"
);
Route.get(
  "/listarEmpresas/:empresa_user_id",
  "EmpresaController.listarEmpresas"
).middleware("auth");
Route.delete("/excluirEmpresa", "EmpresaController.excluirEmpresa").middleware(
  "auth"
);
