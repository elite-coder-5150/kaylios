// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// const express = require('express');
import express from 'express';
// const mysql = require('mysql');
import mysql from 'mysql2'
const app = express();
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser';

const port = 3000;

import * as noteRoutes from './routes/notes.mjs';
import * as searchRoutes from './routes/search.mjs';
import * as userRoutes from './routes/user.mjs'

app.use('/notes',  noteRoutes);
app.use('/api', userRoutes);
app.use('/search', searchRoutes);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
export const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'kaylios',
});

db.connect((err) => {
    if (err) {
        console.error('error connecting to the database', err);
        return;
    }
    console.log('connected to the datbase');
});

