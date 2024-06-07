const jsonServer = require('json-server')
const routes = require('./data/routes')
const { parseRouter } = require('./middlewares/parseRouter')
let server = jsonServer.create()
const data = jsonServer.router(require('./dbLoader.js')())
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)
server.use(
    jsonServer.rewriter({
        ...routes.routes,
    }),
)

server.use(parseRouter(data))

server.listen(
    {
        host: '0.0.0.0',
        port: 3004,
    },
    function () {
        console.log('JSON Server is running on http://0.0.0.0:3004')
    },
)
