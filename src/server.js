const http = require('http');
const url = require('url');
const fs = require('fs');

const jsonResponses = require('./jsonResponses');
const xmlResponses = require('./xmlResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const respond = (req, res, jsonFunc, xmlFunc) => {
    const accept = req.headers.accept || 'application/json';
    if (accept.includes('xml')) {
        xmlFunc(req, res);
    } else {
        jsonFunc(req, res);
    }
};

const onRequest = (req, res) => {
    console.log(req.url);

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    //html
    if (pathname === '/' || pathname === '/client.html') {
        fs.readFile('../client/client.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Internal Server Error');
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                res.end();
            }
        });
        return;
    }


    //css
    if (pathname === '/style.css') {
        fs.readFile('./style.css', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Internal Server Error');
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.write(data);
                res.end();
            }
        });
        return;
    }

    req.query = query;

    switch (pathname) {
        case '/success':
            respond(req, res, jsonResponses.getSuccessJSON, xmlResponses.getSuccessXML);
            break;
        case '/badRequest':
            respond(req, res, jsonResponses.getBadRequestJSON, xmlResponses.getBadRequestXML);
            break;
        case '/unauthorized':
            respond(req, res, jsonResponses.getUnauthorizedJSON, xmlResponses.getUnauthorizedXML);
            break;
        case '/forbidden':
            respond(req, res, jsonResponses.getForbiddenJSON, xmlResponses.getForbiddenXML);
            break;
        case '/internal':
            respond(req, res, jsonResponses.getInternalJSON, xmlResponses.getInternalXML);
            break;
        case '/notImplemented':
            respond(req, res, jsonResponses.getNotImplementedJSON, xmlResponses.getNotImplementedXML);
            break;
        default:
            respond(req, res, jsonResponses.getNotFoundJSON, xmlResponses.getNotFoundXML);
            break;
    }
};

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});