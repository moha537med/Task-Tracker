// select HTML elements
const addButton = document.getElementById('add-task');
const taskInput = document.getElementById('title');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');
const filterSpans = document.querySelectorAll('#filter .filter-type span');
const sortSelect = document.getElementById('sort');



let allTasks = [];

let isLoading = false;

// create li element for a new task
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `${task.priority} ${task.status}`;

    li.innerHTML = `
        <span>${task.title}</span>
        <span class="task-priority">${task.priority}</span>
    `;
    // toggle task status when click on task
    li.addEventListener('click', async () => {
        const status = task.status === 'pending' ? 'done' : 'pending';
        try {
            await fetch(`http://localhost:3000/tasks`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    id: task.id,
                    status
                })
            });

            await fetchTasks();
        } catch (error) {
            console.error("Failed to update task status");
        }
    });

    return li;
}


// function to fetch my tasks from the backend
async function fetchTasks(sortType = '') {
    try {
        isLoading = true;
        taskList.innerHTML = '<li class="loading">Loading tasks...</li>';

        const response = await fetch(`http://localhost:3000/tasks?sort=${sortType}`);
        allTasks = await response.json();

        isLoading = false;
        renderTasks(allTasks);
    } catch (error) {
        isLoading = false;
        taskList.innerHTML = '<li class="error">Failed to load tasks</li>';
    }
}


// function to render tasks
function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = createTaskElement(task);
        taskList.appendChild(li);
    });
}

fetchTasks();

// add new task 
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    const priority = priorityInput.value;
    if(!title || !priority) return;

    isLoading = true;
    if(isLoading){
        taskList.innerHTML = '<li class="loading">Adding task...</li>';
    }

    fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ 
            title,
            priority,
            status:'pending' 
        })
    })
    .then(res => res.json())
    .then(() => {
        isLoading = false;
        fetchTasks();
    })
    .catch(err => {
        isLoading = false;
        console.error(err);
    });

    taskInput.value = '';
});

// sort tasks
sortSelect.addEventListener('change', () => {
    fetchTasks(sortSelect.value);
});



// filter tasks
filterSpans.forEach(span => {
    span.addEventListener('click', () => {
        filterSpans.forEach(s => s.classList.remove('active'));
        span.classList.add('active');
        const filter = span.dataset.content;

        isLoading = true;
        if(isLoading){
            taskList.innerHTML = '<li class="loading">Loading tasks...</li>';
        }

        const filteredTasks =
            filter === 'all'
                ? allTasks
                : allTasks.filter(task => task.status === filter);
        
        isLoading = false;
        renderTasks(filteredTasks);
    });
});

