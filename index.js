const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) =>{
  try {
    const data = await fs.readFile('./index.html');
    res.writeHead(200, {'Content-Type': 'text/HTML; charset=utf-8'});
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(err.message);
  }
});
server.listen(8000)

server.on('listening', () => {
  console.log('8000번 포트에서 서버 대기중입니다!');
});
server.on('error', (error) => {
  console.log(error);
});