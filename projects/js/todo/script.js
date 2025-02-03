document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    
    // storing tasks
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // init
    tasks.forEach(task => renderTasks(task));
    
    // on clickng Add Task button an event should trigger
    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;
    
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
    
        // persist to local storage of browser
        saveTasks();

        renderTasks(newTask);
    
        // for clearing the input field
        todoInput.value = '';
    
        console.log(tasks);
    });
    
    // Add tasks list to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Read tasks from storage
    function renderTasks(task) {
        // console.log(task)
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);

        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
        `;

        li.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') return;

            task.completed = !task.completed;
            li.classList.toggle('completed');

            saveTasks();
        });

        li.querySelector('button').addEventListener('click', (event) => {
            // prevent toggle from firing
            event.stopPropagation();
            tasks.filter((t) => t.id  !== task.id);
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
    }
})