const cliArgs = process.argv.slice(2);
const PORT = process.env.APP_PORT || 3000;
const ENV = cliArgs.length > 0 ? cliArgs[0]: 'dev'

module.exports = {
    PORT, ENV
}
