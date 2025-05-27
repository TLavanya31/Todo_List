let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const todoList = document.getElementById('todo-list');
const saveTaskBtn = document.getElementById('save-task-btn');
const taskInput = document.getElementById('task-input');

// Render tasks if on index.html
if (todoList) {
    renderTasks();
}

function addTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    window.location.href = "index.html"; // Redirect after saving
}

function removeTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function completeTask(index) {
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const span = document.createElement('span');
        span.textContent = task.description;
        if (task.completed) {
            span.style.textDecoration = 'line-through';
        }

        todoItem.appendChild(span);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeTask(index));

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => completeTask(index));

        todoItem.appendChild(completeBtn);
        todoItem.appendChild(removeBtn);
        todoList.appendChild(todoItem);
    });
}

// Save button listener (only on add-task.html)
if (saveTaskBtn) {
    saveTaskBtn.addEventListener('click', () => {
        const task = {
            description: taskInput.value,
            completed: false
        };
        if (task.description.trim() !== '') {
            addTask(task);
        }
    });
}
