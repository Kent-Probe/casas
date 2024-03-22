const fs = require('fs');
const express = require('express');
const router = express.Router();

/* const path = require('path');

console.log(path.dirname('index.html')); */

router.get('/read', (req, res) => {
    fs.readFile('archivo.json', 'utf8', function(err, data) {
        if(err){
            res.status(500).send("Error reading archivo.json")
            return;
        }
        res.send(JSON.parse(data));
    })
}) 

router.post('/read', (req, res) => {
    fs.readFile('archivo.json', 'utf8', function(err, data) {
        if(err){
            res.status(500).send("Error reading archivo.json")
            return;
        }
        let result = JSON.parse(data);
        result.push(req.body);
        fs.writeFile('archivo.json', JSON.stringify(result), (errW) => {
            if (err) {
                res.status(500).send("Error writing archivo.json");
                return;
            };
            res.send('Archivo creado!');
        })
    })
}) 



module.exports = router;
