function getUserInfo(user) {
  return {
    email: user.email,
    name: user.nombres,
    lastName: user.apellidos,
    country: user.pais,
    id: user.id  
  };
};

module.exports = { getUserInfo };