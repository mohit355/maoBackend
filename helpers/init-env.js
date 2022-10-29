const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const initEnv = () => {
  const myEnv = dotenv.config();
  dotenvExpand.expand(myEnv);
};

module.exports = initEnv;
