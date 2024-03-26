const xlsx = require("xlsx");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("dotenv").config();

const DB_URL = process.env.DB_URL || "";
mongoose.connect(DB_URL);

const UserSchema = require("./res/models/User");

const workbook = xlsx.readFile("datos.xlsx");

const sheet_list = workbook.SheetNames;
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_list[0]]);

data.forEach((it) => {
    let password = bcrypt.hashSync(it.password, 10);
    it.email = it.email.trim().toLowerCase()
    UserSchema({
        name: it.name,
        lastname: it.lastname,
        email: it.email,
        id: it.id,
        password: password
    }).save()
        .then(() => {
            console.log(`save successfuly: ${it.name} `);
        })
        .catch((err) => {
            console.log(`error in save: ${it.name}`);
        });
});

console.log(data);

/* UserSchema.insertMany(data).then(() => {
    console.log("insert successfuly")
}).catch((err) => {
    console.log("Error inserting")
    console.error(err)
})
 */