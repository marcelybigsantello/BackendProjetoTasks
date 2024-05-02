import express from 'express';
import { createTable } from './routes/services/createTable.mjs';  
import { createTasks } from './routes/tasks/createTask.mjs';
import { getTaskById, loadTasks, updateTask } from './routes/tasks/loadTasks.mjs';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, NUMBER_OF_AFFECTED_ROWS } from './utils/constantMessages.mjs';

const app = express();
app.use(express.json());

console.log("Rodando criação da tabela");
createTable();

app.post("/tasks", async (req, resp) => {
    const task = await createTasks({
        idTask: req.body.idTask,
        description: req.body.description,
        dateOfConclusion: req.body.dateOfConclusion
    })

    //TODO: adicionar o tratamento de exceção caso usuário digite id já existente
    resp.json("Tarefa nº" + task.id + " cadastrada com sucesso!");
    resp.statusCode = 201;
    resp.status(resp.statusCode).end();
})

app.get("/tasks", async(req, resp) => {
    const tasks = await loadTasks();
    resp.json(tasks);
})

app.get("/tasks/:id", async(req, resp) => {
    let id = req.params.id;
    const taskData = await getTaskById(id);
    resp.json(taskData);
})

app.put("/tasks", function(req, resp) {
    console.log(req.body);
    if (req.body && !req.body.idTask){
        resp.json({
            "statusCode": 400,
            message: NOT_FOUND
        })
    } else {
        updateTask(req.body);
        resp.json("Tarefa nº " + req.body.idTask + " alterada com sucesso!");
        resp.status(200).end();
    }    
})

app.listen(8888, () => {
    console.log("Node com express em execução na porta 8888");
});