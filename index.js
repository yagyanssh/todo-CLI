#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander')


/// initialinzing the path of file that will list all todo's
const filePath = path.join(__dirname, 'todo.json');

// Initialize the to-do file if it doesn't exist
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

// Load existing to-dos from the file
function loadTodos() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Save to-dos to the file
function saveTodos(todos) {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

// initialising the CLI
program
    .name('todo')
    .description('A command line interface that lets you manage your day today tasks directly thru command line.')
    .version('0.0.1')


// add command
program.command('add')
    .description('Add a todo to the list of todos')
    .argument('<task>', 'Task description')
    .action((task) => {
        const todos = loadTodos();
        const newTodo = {
            task, 
            done: false,
        };
        todos.push(newTodo);
        saveTodos(todos);
        console.log(`Added a new task ${task} to the list`)
    })

// delete command
program.command('delete')
    .description('Delete a todo from the list')
    .argument('<index>', 'index of todo that needs to be deleted')
    .action((index) => {
        const todos = loadTodos();
        index = parseInt(index, 10);

        if(index >= 1 && index <= todos.length){
            const removed = todos.splice(index -1, 1);
            saveTodos(todos);
            console.log(`Removed: ${removed[0].task}`);
        } else {
            console.log(`Invalid index.`)
        }
    });

// mark done
program
    .command('done')
    .description('Mark a to-do as done by its index')
    .argument('<index>', 'index of the to-do to mark as done')
    .action((index) => {
        const todos = loadTodos();
        index = parseInt(index, 10); 

        if (index >= 1 && index <= todos.length) {
            todos[index - 1].done = true; // Mark the to-do as done
            saveTodos(todos); // Save the updated to-do list
            console.log(`Marked as done: "${todos[index - 1].task}"`);
        } else {
            console.log('Invalid index.');
        }
    });
    
    
program.parse(process.argv);










