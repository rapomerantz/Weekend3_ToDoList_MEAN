let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const PORT = 2345;



//BODY_PARSER STUFF
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static files
app.use(express.static('server/public'));






//Spin up server
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
  