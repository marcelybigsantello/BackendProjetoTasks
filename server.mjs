import express from 'express';
import { createTable } from './routes/services/createTable.mjs';
import { createTasks, getTaskById, loadTasks, updateTask, deleteTask } from './routes/persistence/CRUD_Tasks.mjs';
import { NOT_FOUND, CREATE_TASK_SUCCESS, RUN_NODE_WITH_EXPRESS, RUN_APP_HTTPS } from './utils/constantMessages.mjs';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

const app = express();
app.use(express.json());
app.use(cors()); //Evita o erro de Cors no navegador

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
    console.log(RUN_NODE_WITH_EXPRESS);
});

https.createServer({
    cert: fs.readFileSync('routes/SSL/code.crt'),
    key: fs.readFileSync('routes/SSL/code.key')
}, app).listen(8889, () => console.log(RUN_APP_HTTPS));