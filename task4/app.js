/* Task4
Create a Server that hosts just JSON Sites and upload it to github with a demo on it's usage
 */

const http = require("http");
const port = 7070;
const fetch = require('node-fetch');

const server = http.createServer((req, res) => {
  fetch("https://jsonplaceholder.typicode.com/users", {
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      res.write(JSON.stringify(json));
      res.end();
    });
});

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});