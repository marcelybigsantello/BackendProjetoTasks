import path from 'node:path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const file = path.resolve('../../database.db');
const db = new sqlite3.Database(file);

export async function openDb() {
    return open({
        filename: path.resolve(process.cwd(), 'database.db'),
        driver: sqlite3.Database,
    })
}