/* eslint-disable */
// const chalk = require('chalk')
const delay = function(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

const utils = {
    delay
}

module.exports = utils

process.on('unhandledRejection', reason => {
    // console.log(chalk.red(reason))
    // console.error(reason.stack)
    process.exit(1)
})