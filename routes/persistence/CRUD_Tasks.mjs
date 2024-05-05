import { openDb } from '../services/configDatabase.mjs';

export async function createTasks(newTask){
    console.log("Creating a new task...", newTask);

    let taskData = Object.values(newTask); 
    console.log("TaskData: ", taskData);
    const db = await openDb();
    db.run('INSERT INTO Tasks (idTask, description, dateOfConclusion) VALUES '
    + '($idTask, $description, $dateOfConclusion);', taskData, (error) => {
        if (error) {
            console.error("Mensagem de erro: ", error.message);
            return error;
        }
    });

    return newTask;
}

export async function loadTasks() {
    const db = await openDb();
    const data = await db.all("SELECT * from Tasks;");
    return data;
}

export async function getTaskById(id){
    const database = await openDb();
    const sql = "SELECT * from Tasks where idTask=?";
    return database.get(sql, [id]).then(resp=>resp);
}

export async function updateTask(task){
    const sql = 'UPDATE Tasks SET description=?, dateOfConclusion=? WHERE idTask=?'; 
    openDb().then(db => {
        db.run(sql, [task.description, task.dateOfConclusion, task.idTask])
    }, function (error) {
        if (error){
            console.error(error.message);
        }
    });
}

export async function deleteTask(id){
    const database = await openDb();
    const sql = "DELETE from Tasks where idTask=?";
    return database.get(sql, [id]).then(resp=>resp);
}