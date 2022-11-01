const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, resp) => {
  //   if (req.url === '/') {
  //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
  //       if (err) throw err;
  //       resp.writeHead(200, { 'Content-Type': 'text/html' });
  //       resp.end(data);
  //     });
  //   }
  //
  //   if (req.url === '/about') {
  //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {
  //       if (err) throw err;
  //       resp.writeHead(200, { 'Content-Type': 'text/html' });
  //       resp.end(data);
  //     });
  //   }
  //
  //For APIs
  //   if (req.url === '/api/users') {
  //     const users = [
  //       { name: 'Bob Smith', age: 30 },
  //       { name: 'John Doe', age: 40 },
  //     ];
  //     resp.writeHead(200, { 'Content-Type': 'application/json' });
  //     resp.end(JSON.stringify(users));
  //   }

  //Build file path
  let filePath = path.join(
    __dirname,
    'public', //look in 'public' folder
    req.url === '/' ? 'index.html' : req.url
  );

  //Extention of file
  let extname = path.extname(filePath);

  //Initial content type
  let contentType = 'text/html';

  //Check ext and set contentType
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  //Read file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // Page not found, ENOENT means page not found
      if (err.code == 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
          resp.writeHead(200, { 'Content-Type': 'text/html' });
          resp.end(data, 'utf-8');
        });
      } else {
        //Soem server error
        resp.writeHead(500);
        resp.end(`Server error: ${err.code}`);
      }
    } else {
      //Success
      resp.writeHead(200, { 'Content-Type': contentType });
      resp.end(data, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 5000; //host server determines the port, hence we don't assign our own port specifically

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
