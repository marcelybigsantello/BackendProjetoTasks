import express from 'express';
import { createTasks } from './routes/tasks/createTask.mjs';
import { loadTaskById, loadTasks } from './routes/tasks/loadTasks.mjs';

const app = express();

app.use(express.json());

app.post('/tasks', async (req, resp) => {
    const task = await createTasks({
        id: req.body.id,
        description: req.body.description,
        dateOfConclusion: req.body.dateOfConclusion
    })

    //TODO: adicionar o tratamento de exceção caso usuário digite id já existente
    resp.json("Tarefa nº" + task.id + " cadastrada com sucesso!");
    resp.statusCode = 201;
    resp.status(resp.statusCode).end();
})

app.get('/tasks', async(req, resp) => {
    const tasks = await loadTasks();
    resp.json(tasks);
})

app.get('', (req, resp) => {
    resp.send("Hello World");
})

app.get('/tasks/{id}', async(req, resp) => {
    const taskById = await loadTaskById();
    resp.json(taskById)
})

app.listen(8888, () => {
    console.log("Node com express em execução na porta 8888");
});