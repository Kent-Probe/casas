const fs = require("fs");

const content = [
    {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "edad": 30,
      "email": "juan@example.com"
    },
    {
      "id": 2,
      "nombre": "María",
      "apellido": "Gómez",
      "edad": 25,
      "email": "maria@example.com"
    },
    {
      "id": 3,
      "nombre": "Pedro",
      "apellido": "Rodríguez",
      "edad": 35,
      "email": "pedro@example.com"
    },
    {
      "id": 4,
      "nombre": "Ana",
      "apellido": "Martínez",
      "edad": 28,
      "email": "ana@example.com"
    },
    {
      "id": 5,
      "nombre": "Luis",
      "apellido": "Sánchez",
      "edad": 40,
      "email": "luis@example.com"
    }
  ]

const contentJson = JSON.stringify(content);

fs.writeFile('archivo.json', contentJson, (err) => {
    if (err) {
        console.log("Error writing archivo.txt");
        return;
    };
    console.log('Archivo creado!');
})
/* const file = fs.createWriteStream("file.txt");
 */