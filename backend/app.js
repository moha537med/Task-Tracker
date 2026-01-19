import express from 'express';
import fs from "fs/promises";
import cors from "cors";


const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// function to read JSON data from a file
async function readJsonFile() {
    try {
        const data = await fs.readFile("tasks.json", 'utf8');
        const tasks = JSON.parse(data);
        return tasks;
    }catch (error) {
        console.error(`Error reading file from disk: ${error}`);
        throw error;
    }
}

// GET endpoint to fetch tasks
app.get('/tasks', async (req, res) => {
    try{
        const { sort } = req.query;
        let tasks = await readJsonFile();
        // priority sorting
        if (sort === 'priority'|| sort === "") {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }

        // createdAt sorting
        if (sort === 'createdAt') {
            tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        res.json(tasks);
    }catch (error) {
        res.status(500).json({
            message: "Error fetching tasks"
        }); 
    }
});



// POST endpoint to add a new task step 5 backend
app.post("/tasks", async (req,res) => {
    try{
        let newTask = req.body;
        const tasks = await readJsonFile();
        tasks.push({id:tasks.length+1 , ...newTask , createdAt: new Date().toISOString()});
        await fs.writeFile("tasks.json", JSON.stringify(tasks , null, 2));
        res.status(201).json({message: "Task added successfully"});
    }catch (error) {
        res.status(500).json({
            message: "Error adding task"
        });
    }
})

// PATCH endpoint to update task status
app.patch("/tasks", async (req,res) => {
    try{
        const {id, status} = req.body;
        const tasks = await readJsonFile();
        const taskIndex = tasks.findIndex(task => task.id === Number(id));
        if (taskIndex !== -1) {
            tasks[taskIndex].status = status;
            await fs.writeFile("tasks.json", JSON.stringify(tasks , null, 2));
            res.json({message: "Task updated successfully"});

        } else {
            res.status(404).json({message: "Task not found"});
        }
        
    }catch (error) {
        res.status(500).json({
            message: "Error updating task"
        });
    }
}); 

// server run
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});