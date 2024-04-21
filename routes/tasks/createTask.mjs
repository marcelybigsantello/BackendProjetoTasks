import { openDb } from './../services/initializeDatabase.mjs';

export async function createTasks(newTask){
    console.log("Creating a new task...", newTask);

    let taskData = Object.values(newTask); 
    console.log("TaskData: ", taskData);
    const db = await openDb();
    db.run('INSERT INTO Tasks (idTask, description, dateOfConclusion) VALUES '
    + '($idTask, $description, $dateOfConclusion);', taskData, (error) => {
        if (error) {
            return console.error("Mensagem de erro: ", error.message);
        }
    });

    return newTask;
}