import { openDb } from '../services/configDatabase.mjs';

export async function createTasks(newTask) {
    let taskData = Object.values(newTask);
    const db = await openDb();
    const sql = "INSERT INTO Tasks (idTask, description, dateOfConclusion) VALUES ($idTask, $description, $dateOfConclusion);"
    return db.run(sql, taskData);
}

export async function loadTasks() {
    const db = await openDb();
    const data = await db.all("SELECT * from Tasks;");
    return data;
}

export async function getTaskById(id) {
    const database = await openDb();
    const sql = "SELECT * from Tasks where idTask=?";
    return database.get(sql, [id]).then(resp => resp);
}

export async function updateTask(task) {
    const database = await openDb();
    const sql = 'UPDATE Tasks SET description=?, dateOfConclusion=? WHERE idTask=?';
    return database.run(sql, [task.description, task.dateOfConclusion, task.idTask])
}

export async function deleteTask(id) {
    const database = await openDb();
    const sql = "DELETE from Tasks where idTask=?";
    return database.get(sql, [id]).then(resp => resp);
}