// @ts-check
import { getLocalStorageValue, setLocalStorageValue } from './utils';
/**
 * @type {HTMLInputElement}
 */
const input = document.querySelector('#input');
const clearButton = document.querySelector('.clear');
const addButton = document.querySelector('.add');
const render = document.querySelector('.render');
const editForm = document.querySelector('form');
/**
 * @type {HTMLInputElement}
 */
const editFormCheckbox = editForm.querySelector('input[type="checkbox"]');
/**
 * @type {HTMLInputElement}
 */
const editFormInput = editForm.querySelector('input[type="text"]');
const editFormLabel = editForm.querySelector('label');

clearButton.addEventListener('click', () => {
    input.value = '';
});

editForm.addEventListener('submit', e => {
    e.preventDefault();
    // @ts-ignore
    const todo = getLocalStorageValue().find(todo => todo.id === +e.target.dataset.activeid);
    console.log(todo);

    const updatedTodo = {
        ...todo,
        title: editFormInput.value,
        completed: editFormCheckbox.checked,
    };
    console.log(updatedTodo);
    const updatedTodos = getLocalStorageValue().map(todo => {
        if (updatedTodo.id === todo.id) {
            return Object.assign(todo, updatedTodo);
        }
        return todo;
    });

    setLocalStorageValue(updatedTodos);
    renderToDos(getLocalStorageValue());
    // @ts-ignore
    e.target.classList.remove('visible');
});
/**
 *
 * @param {import('./utils').Todo[]} todos
 */
const renderToDos = todos => {
    render.innerHTML = todos
        .map(todo => {
            return `<div class="items" data-id=${todo.id}>
            <label class= 'label ${todo.completed ? 'visible' : ''}'>${todo.title}</label>
            <button class="done"> Done</button>
            <button class="edit">Edit</button>
            <button class= "del">Delete</button>
        </div>`;
        })
        .join('');

    const doneButtons = document.querySelectorAll('.done');
    doneButtons.forEach(done => {
        done.addEventListener('click', e => {
            // @ts-ignore
            const neededId = Number(e.target.parentElement.dataset.id);
            setLocalStorageValue(
                todos.map(todo => {
                    if (neededId === todo.id) {
                        return { ...todo, completed: true };
                    }
                    return todo;
                })
            );
            renderToDos(getLocalStorageValue());
        });
    });

    const delButtons = document.querySelectorAll('.del');
    delButtons.forEach(delButton => {
        delButton.addEventListener('click', e => {
            // @ts-ignore
            const Id = +e.target.parentElement.dataset.id;
            console.log(Id);
            const check = todos.filter(todo => todo.id !== Id);
            console.log(check);
            setLocalStorageValue(check);

            renderToDos(getLocalStorageValue());
        });
    });
    const editButtons = document.querySelectorAll('.edit');
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', e => {
            // @ts-ignore
            const neededId = e.target.parentElement.dataset.id;
            console.log(neededId);
            editForm.setAttribute('data-activeid', neededId);
            const { title, completed } = getLocalStorageValue().find(
                todo => todo.id === Number(neededId)
            );
            editFormInput.value = title;
            editFormCheckbox.checked = completed;
            editForm.classList.add('visible');
            editFormLabel.innerText = completed ? 'Mark as Incomplete' : 'Mark as Completed';
        });
    });
};

addButton.addEventListener('click', () => {
    const newTodo = {
        title: input.value,
        completed: false,
        id: new Date().getTime(),
    };
    const todos = getLocalStorageValue() || [];
    input.value
        ? setLocalStorageValue([...todos, newTodo])
        : alert('Please dont put empty input');

    renderToDos(getLocalStorageValue());
    console.log(todos);

    input.value = '';
});

window.addEventListener('load', () => renderToDos(getLocalStorageValue()));
