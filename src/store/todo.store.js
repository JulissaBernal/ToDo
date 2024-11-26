import {Todo} from '../todo/models/todo.model'

export const Filters={
    All:"all",
    Completed:"completed",
    Pending:"pending"
}

const state={
    todos:[
        new Todo("gato1"),
    ],
    filter: Filters.All,
}

const initStore=()=>{
    loadStore();
    console.log('initstore');
}
const saveLocalStorage=()=>{
    localStorage.setItem('state',JSON.stringify(state))//para convertir el objeto a un string xq se guarda como string
}
const loadStore=()=>{
    if(!localStorage.getItem('state')) return;//si no hay nada de cambios no hace nada

    const {todos=[],filter=Filters.All}= JSON.parse(localStorage.getItem('state'));//Manten los cambios
    state.todos=todos;
    state.filter=filter;
}
const getTodos=(filter=Filters.All)=>{
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
                return state.todos.filter( todo => !todo.done);
        default:
             throw new Error(`Option ${filter} is not valid`)
    }
    
}

const addTodo=(description)=>{
    if(!description) throw new Error ('Description is required');
        state.todos.push(new Todo(description));
        saveLocalStorage();
}
const toggleTodo=(idTodo)=>{
    state.todos=state.todos.map( todo =>{
        if(todo.id===idTodo){
            todo.done=!todo.done
        }
        return todo
    });
    saveLocalStorage();
}
const deleteTodo=(idTodo)=>{
    state.todos=state.todos.filter(todo => todo.id !== idTodo)// 5 diferente a 5 falso entonces no cumple con la especificacion entones no se queda en el array
    saveLocalStorage();
}
const deleteCompleted=()=>{
    state.todos=state.todos.filter(todo => !todo.done)// true  entonces no cumple con la especificacion entones no se queda en el nuevo array
    saveLocalStorage();
}
const setFilter=(newfilter= Filters.All)=>{
    state.filter=newfilter;
    saveLocalStorage();
}
const getCurrentFilter=()=>{
    return state.filter;
}

export default{
    initStore,
    getTodos,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
}