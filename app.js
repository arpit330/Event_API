const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

var apiroutes = require('./Routes/routes');

// const { Connect } = require('./database/db.js');
// Connect();

app.use('/api/v3/app', apiroutes);

// console.log(Db);
// const insertResult = Db.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// console.log('Inserted documents =>', insertResult);

let port = '8000';

app.listen(port, () =>{
    console.log(`Server running on port ${port} 🔥`);
});