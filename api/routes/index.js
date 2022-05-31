const bodyParser = require('body-parser')
const pessoasRoute = require('./pessoasRoute')
const niveisRoute = require('./niveisRoute')
const turmasRoute = require('./turmasRoute')

module.exports = app => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false}),
        pessoasRoute,
        niveisRoute,
        turmasRoute
    )
}