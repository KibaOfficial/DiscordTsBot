// Copyright (c) 2024 KibaOfficial
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import sqlite3 = require('sqlite3')
import fs from 'fs'
import path from 'path'

fs.mkdirSync("./data/", {recursive: true});

export const db = new sqlite3.Database('./data/db.sqlite3');

const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8");

db.exec(schema)
