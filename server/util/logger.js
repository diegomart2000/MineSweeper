const chalk = require('chalk');
exports.log = (message, ...props) => console.log(`${chalk.blue('[MINE]')} - ${message}`, ...props);
exports.error = (message, ...props) => console.error(`${chalk.blue('[MINE]')} - ${chalk.red(message)}`, ...props);
