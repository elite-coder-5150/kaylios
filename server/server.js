
;
const app = express();
 const bodyParser = require('body-parser');

const port = 3000;
import mysql from 'mysql2/mysql';
import { express } from 'express';
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'portoflio_2023',
});

db.connect((err) => {
    if (err) {
        console.error('error connecting to the database', err);
        return;
    }
    console.log('connected to the datbase');
});

module.exports = db;