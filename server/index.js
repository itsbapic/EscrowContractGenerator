const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; // set our port
app.use(cors());
app.use(express.json());


const escrows = [];

// a GET route for fetching all of the existing contracts!
app.get('/escrows', (req, res) => {
    // console.log(req);
    console.log(escrows)
    res.status(200).send(escrows);
});

// A Post route for adding a new contract
app.post('/escrows', (req, res) => {
    try {
        console.log(escrows);
        const { escrow } = req.body
        escrows.push(escrow);
        console.log(escrows);
        res.send({ sucess: true })
    } catch (error) {
        console.error("Error with pushing new escrow onto server", error);
        res.status(400).send()
    }
});

// Start the server
app.listen(port);
console.log(`Server started on port ${port}`);
