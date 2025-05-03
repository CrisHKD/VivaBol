function getUserInfo(user) {
  return {
    rol: user.rol_id,
    email: user.email,
    name: user.nombres,
    lastName: user.apellidos,
    country: user.pais,
    ident:user.id,
    foto_perfil:user.foto_perfil
  };
};

module.exports = { getUserInfo };