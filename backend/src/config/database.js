require('dotenv').config({ path: './.env' });

const mongodbURI = () => {
  const MONGODB_DATABASE = process.env.MONGODB_DATABASE;
  const MONGODB_HOST = process.env.MONGODB_HOST;
  const MONGODB_PASS = process.env.MONGODB_PASS;
  const MONGODB_USER = process.env.MONGODB_USER;
  const MONGODB_PORT = process.env.MONGODB_PORT;

  return `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
};
module.exports = {
  uri: mongodbURI(),
};
