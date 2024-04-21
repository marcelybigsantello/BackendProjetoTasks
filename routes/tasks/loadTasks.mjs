import path from 'node:path';
import sqlite3 from 'sqlite3';
import { openDb } from './../services/initializeDatabase.mjs';

const file = path.resolve('../../database.db');
const db = new sqlite3.Database(file);

export async function loadTasks() {
    const db = await openDb();
    const data = await db.all("SELECT * from Tasks;");
    return data;
    
    /*return [
        {id: 1, description: 'Baixar as dependências necessárias para projeto Node'},
        {id: 2, description: 'Criar o backend'},
        {id: 3, description: 'Testar os endpoints utilizando o PostMan'},
        {id: 4, description: 'Criar o frontend'},
        {id: 5, description: 'Desenhar as telas de acordo com os protótipos do Figma'},
        {id: 6, description: 'Testar comunicação de back com frontend'},
    ]*/
}


export async function loadTaskById(){
    const database = await openDb();
    const data = await database.all("SELECT * from Tasks where id = ", id);
    return data;
}