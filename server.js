// server.js (kök dizin)
const http = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = false; // production
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res));
  server.listen(port, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`> Ready on http://0.0.0.0:${port}`);
  });
});
