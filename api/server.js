const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

const publicPath = path.join(__dirname, '../public');

console.log(publicPath)

// Manual routes for static files
server.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});
server.get('/catalog', (req, res) => {
    res.sendFile(path.join(publicPath, 'category.html'));
});
server.get('/product', (req, res) => {
    res.sendFile(path.join(publicPath, 'product.html'));
});
server.get('/cart', (req, res) => {
    res.sendFile(path.join(publicPath, 'cart.html'));
});
// Add additional routes as needed

// Redirect API calls to JSON Server router
server.use('/api', router);

// Start server
server.listen(3000, () => {
    console.log('JSON Server is running');
});

module.exports = server;






// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults({ static: "./front" })

// server.use(middlewares)
// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// module.exports = server
