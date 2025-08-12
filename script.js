// Simple Todo List App in Vanilla JS
// ---------------------------------

// State management
let todos = [];

// Elements
const app = document.createElement('div');
const title = document.createElement('h1');
const input = document.createElement('input');
const addBtn = document.createElement('button');
const list = document.createElement('ul');
const clearBtn = document.createElement('button');

// Setup
title.textContent = 'My Todo List';
input.placeholder = 'Enter a new task';
addBtn.textContent = 'Add Task';
clearBtn.textContent = 'Clear All';

// Append
app.appendChild(title);
app.appendChild(input);
app.appendChild(addBtn);
app.appendChild(list);
app.appendChild(clearBtn);
document.body.appendChild(app);

// Styling
app.style.fontFamily = 'sans-serif';
input.style.marginRight = '8px';
list.style.listStyleType = 'none';
list.style.padding = '0';
clearBtn.style.marginTop = '10px';

// Event: Add todo
addBtn.addEventListener('click', () => {
    const task = input.value.trim();
    if (task) {
        todos.push({ text: task, done: false });
        input.value = '';
        renderTodos();
    }
});

// Event: Enter key adds todo
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Event: Clear all
clearBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
});

// Render todos
function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        const span = document.createElement('span');
        const delBtn = document.createElement('button');

        checkbox.type = 'checkbox';
        checkbox.checked = todo.done;
        span.textContent = todo.text;
        delBtn.textContent = 'Delete';

        // Styles
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '5px';
        span.style.margin = '0 8px';
        delBtn.style.marginLeft = 'auto';

        if (todo.done) {
            span.style.textDecoration = 'line-through';
        } else {
            span.style.textDecoration = 'none';
        }

        // Events
        checkbox.addEventListener('change', () => {
            todos[index].done = checkbox.checked;
            renderTodos();
        });

        delBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            renderTodos();
        });

        // Append
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

// Initial render
renderTodos();

// Bonus: Local storage persistence
window.addEventListener('beforeunload', () => {
    localStorage.setItem('todos', JSON.stringify(todos));
});

window.addEventListener('load', () => {
    const saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
        renderTodos();
    }
});
