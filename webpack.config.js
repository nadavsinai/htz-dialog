// Look in ./config folder for environment based config
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack/prod.config')({env: 'production', root: __dirname});
    break;
  case 'test':
  case 'testing':
    module.exports = require('./config/webpack/test.config')({env: 'test', root: __dirname});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack/dev.config')({env: 'development', root: __dirname});
}
