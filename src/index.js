import http from 'http';
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log('Request:', req.url, req.method, req.headers);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`<h1>Welcome to my REST API!</h1><p> Haettu url ${req.url}</p>`);
});

server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);
});
//npm run dev käynnistää scriptin ja 
// päivittää automaattisesti
// res end haetaan nyt url pyynnöt ja tulostetaan consoleen