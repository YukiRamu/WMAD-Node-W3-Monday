/* Task3
Create a Server that hosts just HTTP Sites and upload it to github with a demo on it's usage
 */

const http = require("http");
const port = 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Task 3 Host HTTP sites");
  res.end();
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});