function auth(req, res, next) {  
  console.log('Authenticating...');
  next(); //call next to move cycle to the middleware - i.e. route
};

module.exports = auth;