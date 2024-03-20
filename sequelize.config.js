// Workaround to use config.ts instead of js. due to sequelize calls files that end in .js
require('ts-node/register'); // Enable TypeScript execution
const config = require('./config/config.ts').default;

module.exports = config; // Export the result of the function
