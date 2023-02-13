const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const port = process.env.PORT || 5000; // set our port

const escrows = [{
    address: "0x000",
    arbiter: "0x000",
    beneficiary: "0x000",
    value: 100000
}];

// a GET route for fetching all of the existing contracts!
app.get('/escrows', (req, res) => {
    // console.log(req);
    res.status(200).send(escrows);
});

// A Post route for adding a new contract
app.post('/escrows', (req, res) => {
    escrows.push(req.body);
    res.send(escrows);
});

// Start the server
app.listen(port);
console.log(`Server started on port ${port}`);
