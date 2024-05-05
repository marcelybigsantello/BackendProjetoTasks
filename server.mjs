import express from 'express';
import { createTable } from './routes/services/createTable.mjs';
import { createTasks, getTaskById, loadTasks, updateTask, deleteTask } from './routes/persistence/CRUD_Tasks.mjs';
import { NOT_FOUND, CREATE_TASK_SUCCESS } from './utils/constantMessages.mjs';

const app = express();
app.use(express.json());

createTable();

app.post("/tasks", function (req, resp) {
    const task = createTasks({
        idTask: req.body.idTask,
        description: req.body.description,
        dateOfConclusion: req.body.dateOfConclusion
    })
    resp.json(CREATE_TASK_SUCCESS);
    resp.statusCode = 201;
    resp.status(resp.statusCode).end();
});

app.get("/tasks", async function (req, resp) {
    const tasks = await loadTasks();
    resp.json(tasks);
});

app.get("/tasks/:id", async function (req, resp) {
    let id = req.params.id;
    const task = await getTaskById(id);
    if (task === undefined) {
        resp.json({
            "statusCode": 400,
            message: NOT_FOUND
        })
        resp.status(400).end();
    }
    resp.status(200);
    resp.json(task);
});

app.put("/tasks", function (req, resp) {
    console.log(req.body);
    if (req.body && !req.body.idTask) {
        resp.json({
            "statusCode": 400,
            message: NOT_FOUND
        })
    } else {
        updateTask(req.body);
        resp.json("Tarefa nº " + req.body.idTask + " alterada com sucesso!");
        resp.status(200).end();
    }
});

app.delete("/tasks/:id", async function (req, resp) {
    let id = req.params.id;
    const task = await getTaskById(id);
    if (task === undefined){
        resp.json({
            "statusCode": 400,
            message: NOT_FOUND
        })
    }
    else {
        deleteTask(id);
        resp.status(200);
        resp.json("Tarefa nº " + id + " excluída com sucesso!");
    }
});

app.listen(8888, () => {
    console.log("Node com express em execução na porta 8888");
});