const express = require('express')


default_public_route = '/ugle-index'




module.exports = {
    route: (route) => {
        default_public_route = route
    },
    express: (app) => {
        app.use(default_public_route, express.static(`${__dirname}/src/public`))
    }
}