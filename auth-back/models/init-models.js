var DataTypes = require("sequelize").DataTypes;
var _batallas = require("./batallas");
var _categorias_eventos = require("./categorias_eventos");
var _comentarios_eventos = require("./comentarios_eventos");
var _comentarios_historia = require("./comentarios_historia");
var _entradas = require("./entradas");
var _estados_evento = require("./estados_evento");
var _etnias = require("./etnias");
var _eventos = require("./eventos");
var _favoritos_eventos = require("./favoritos_eventos");
var _momentos_historicos = require("./momentos_historicos");
var _multimedia_eventos = require("./multimedia_eventos");
var _multimedia_historia = require("./multimedia_historia");
var _organizadores = require("./organizadores");
var _pagos = require("./pagos");
var _personajes_historicos = require("./personajes_historicos");
var _preferencias_usuario = require("./preferencias_usuario");
var _presidentes = require("./presidentes");
var _recuperacion_password = require("./recuperacion_password");
var _roles = require("./roles");
var _sesiones = require("./sesiones");
var _usuarios = require("./usuarios");
var _verificacion_cuentas = require("./verificacion_cuentas");
const sequelize = require('../lib/database');

function initModels(sequelize) {
  var batallas = _batallas(sequelize, DataTypes);
  var categorias_eventos = _categorias_eventos(sequelize, DataTypes);
  var comentarios_eventos = _comentarios_eventos(sequelize, DataTypes);
  var comentarios_historia = _comentarios_historia(sequelize, DataTypes);
  var entradas = _entradas(sequelize, DataTypes);
  var estados_evento = _estados_evento(sequelize, DataTypes);
  var etnias = _etnias(sequelize, DataTypes);
  var eventos = _eventos(sequelize, DataTypes);
  var favoritos_eventos = _favoritos_eventos(sequelize, DataTypes);
  var momentos_historicos = _momentos_historicos(sequelize, DataTypes);
  var multimedia_eventos = _multimedia_eventos(sequelize, DataTypes);
  var multimedia_historia = _multimedia_historia(sequelize, DataTypes);
  var organizadores = _organizadores(sequelize, DataTypes);
  var pagos = _pagos(sequelize, DataTypes);
  var personajes_historicos = _personajes_historicos(sequelize, DataTypes);
  var preferencias_usuario = _preferencias_usuario(sequelize, DataTypes);
  var presidentes = _presidentes(sequelize, DataTypes);
  var recuperacion_password = _recuperacion_password(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var sesiones = _sesiones(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var verificacion_cuentas = _verificacion_cuentas(sequelize, DataTypes);

  eventos.belongsTo(categorias_eventos, { as: "categorium", foreignKey: "categoria_id"});
  categorias_eventos.hasMany(eventos, { as: "eventos", foreignKey: "categoria_id"});
  pagos.belongsTo(entradas, { as: "entrada", foreignKey: "entrada_id"});
  entradas.hasMany(pagos, { as: "pagos", foreignKey: "entrada_id"});
  eventos.belongsTo(estados_evento, { as: "estado", foreignKey: "estado_id"});
  estados_evento.hasMany(eventos, { as: "eventos", foreignKey: "estado_id"});
  comentarios_eventos.belongsTo(eventos, { as: "evento", foreignKey: "evento_id"});
  eventos.hasMany(comentarios_eventos, { as: "comentarios_eventos", foreignKey: "evento_id"});
  entradas.belongsTo(eventos, { as: "evento", foreignKey: "evento_id"});
  eventos.hasMany(entradas, { as: "entradas", foreignKey: "evento_id"});
  favoritos_eventos.belongsTo(eventos, { as: "evento", foreignKey: "evento_id"});
  eventos.hasMany(favoritos_eventos, { as: "favoritos_eventos", foreignKey: "evento_id"});
  multimedia_eventos.belongsTo(eventos, { as: "evento", foreignKey: "evento_id"});
  eventos.hasMany(multimedia_eventos, { as: "multimedia_eventos", foreignKey: "evento_id"});
  eventos.belongsTo(organizadores, { as: "organizador", foreignKey: "organizador_id"});
  organizadores.hasMany(eventos, { as: "eventos", foreignKey: "organizador_id"});
  usuarios.belongsTo(roles, { as: "rol", foreignKey: "rol_id"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "rol_id"});
  batallas.belongsTo(usuarios, { as: "creado_por_usuario", foreignKey: "creado_por"});
  usuarios.hasMany(batallas, { as: "batallas", foreignKey: "creado_por"});
  comentarios_eventos.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(comentarios_eventos, { as: "comentarios_eventos", foreignKey: "usuario_id"});
  comentarios_historia.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(comentarios_historia, { as: "comentarios_historia", foreignKey: "usuario_id"});
  entradas.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(entradas, { as: "entradas", foreignKey: "usuario_id"});
  etnias.belongsTo(usuarios, { as: "creado_por_usuario", foreignKey: "creado_por"});
  usuarios.hasMany(etnias, { as: "etnia", foreignKey: "creado_por"});
  favoritos_eventos.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(favoritos_eventos, { as: "favoritos_eventos", foreignKey: "usuario_id"});
  momentos_historicos.belongsTo(usuarios, { as: "creado_por_usuario", foreignKey: "creado_por"});
  usuarios.hasMany(momentos_historicos, { as: "momentos_historicos", foreignKey: "creado_por"});
  organizadores.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasOne(organizadores, { as: "organizadore", foreignKey: "usuario_id"});
  personajes_historicos.belongsTo(usuarios, { as: "creado_por_usuario", foreignKey: "creado_por"});
  usuarios.hasMany(personajes_historicos, { as: "personajes_historicos", foreignKey: "creado_por"});
  preferencias_usuario.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(preferencias_usuario, { as: "preferencias_usuarios", foreignKey: "usuario_id"});
  presidentes.belongsTo(usuarios, { as: "creado_por_usuario", foreignKey: "creado_por"});
  usuarios.hasMany(presidentes, { as: "presidentes", foreignKey: "creado_por"});
  recuperacion_password.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(recuperacion_password, { as: "recuperacion_passwords", foreignKey: "usuario_id"});
  sesiones.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(sesiones, { as: "sesiones", foreignKey: "usuario_id"});
  verificacion_cuentas.belongsTo(usuarios, { as: "usuario", foreignKey: "usuario_id"});
  usuarios.hasMany(verificacion_cuentas, { as: "verificacion_cuenta", foreignKey: "usuario_id"});

  return {
    batallas,
    categorias_eventos,
    comentarios_eventos,
    comentarios_historia,
    entradas,
    estados_evento,
    etnias,
    eventos,
    favoritos_eventos,
    momentos_historicos,
    multimedia_eventos,
    multimedia_historia,
    organizadores,
    pagos,
    personajes_historicos,
    preferencias_usuario,
    presidentes,
    recuperacion_password,
    roles,
    sesiones,
    usuarios,
    verificacion_cuentas,
  };
}

const models =initModels(sequelize);

module.exports = {
  sequelize,    // Exporta la instancia de sequelize
  models,   // Exporta la función de inicialización de modelos
};