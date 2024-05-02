import path from 'node:path';
import sqlite3 from 'sqlite3';
import { openDb } from '../services/configDatabase.mjs';

const file = path.resolve('../../database.db');
const db = new sqlite3.Database(file);

export async function loadTasks() {
    const db = await openDb();
    const data = await db.all("SELECT * from Tasks;");
    return data;
}


export async function getTaskById(id){
    const database = await openDb();
    console.log("Id:", id);
    let idTask = Object.values(id); 
    console.log("Id Task: ", idTask);
    const sql = 'SELECT * from Tasks where idTask=?';
    const data = await database.run(sql, idTask, (error) => {
        if (error){
            console.error("Mensagem de erro: ", error.message);
            return error.message;
        }
    });
    console.log("Data: ", data);
    return data;
}


export async function updateTask(task){

    openDb().then(db => {
        db.run('UPDATE Tasks SET description=?, dateOfConclusion=? WHERE idTask=?', 
        [task.description, task.dateOfConclusion, task.idTask])
    }, function (error) {
        if (error){
            console.error(error.message);
        }
    });
    //database.run('UPDATE Tasks SET description=?, dateOfConclusion=? WHERE idTask=?', [task.description, task.dateOfConclusion, task.idTask]);
}