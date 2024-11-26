import {Todo} from '../models/todo.model'
import {createTodoHtml} from './create-todo.html'
/**
 * 
 * @param {String} idTodo 
 * @param {Todo} todos 
 */

let element;

export const renderTodos=(idTodo, todos= [])=>{
    // ToDo referencia
    if(!element){//Parte de la referencia no le entendi
        element=document.querySelector(idTodo);
    }
    if(!element){
        throw new Error(`${idTodo} Not found`)
    }
    element.innerHTML='';
    todos.forEach( todo =>{
        element.append(createTodoHtml(todo))
    } )
}
