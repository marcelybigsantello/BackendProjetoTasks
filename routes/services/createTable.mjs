import { openDb } from './configDatabase.mjs';

export async function createTable() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Tasks (idTask INTEGER PRIMARY KEY, description TEXT, dateOfConclusion TEXT); ")
    });
}