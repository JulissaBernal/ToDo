import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store'//puede ser cualquier otro nombre todoStore?
import {renderTodos} from './usesCases/render'
import {renderPending} from './usesCases'

const ElementsIDs={
    ToDoList: '.todo-list',
    NewToDoInput: '#new-todo-input',
    ClearCompleted:'.clear-completed',
    TodoFilters:'.filtro',
    PendingCountLabel:'#pending-count',


}
/**
 * 
 * @param {string} id 
 */

export const App=(id)=>{

    const displayTodos=()=>{
        const todos=todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementsIDs.ToDoList,todos);
        updatePendingCount();
    }
    const updatePendingCount=()=>{
        renderPending(ElementsIDs.PendingCountLabel);
    }

    (()=>{
        const app=document.createElement('div');
        app.innerHTML=html;
        document.querySelector(id).append(app);
        displayTodos();
    })();

    //Referencias HTML se ponen despues del App
    const newDescripToDo=document.querySelector(ElementsIDs.NewToDoInput);
    const toDoListUl=document.querySelector(ElementsIDs.ToDoList);
    const ButtonClearCompleted=document.querySelector(ElementsIDs.ClearCompleted);
    const FiltersUl=document.querySelectorAll(ElementsIDs.TodoFilters);

    //eventos
    newDescripToDo.addEventListener('keyup',(event)=>{
        if(event.keyCode !== 13) return;//no entendi
        if(event.target.value.trim().lenght === 0 ) return;//no entendi

        todoStore.addTodo(event.target.value)
        displayTodos();
        event.target.value='';
    })
    toDoListUl.addEventListener('click',(event)=>{
        let elementID=event.target.closest('[data-id]')//para que busca el id mas cercano data-id es un atributo
        todoStore.toggleTodo(elementID.getAttribute('data-id'));
        displayTodos();
    })
    toDoListUl.addEventListener('click',(event)=>{
        let isDestroyed=event.target.className === 'destroy';
        let elementID=event.target.closest('[data-id]')//para que busca el id mas cercano data-id es un atributo
        if(!elementID || !isDestroyed) return //si el elementID no esta o clase no se encuentra entonces no hagas nada
        todoStore.deleteTodo(elementID.getAttribute('data-id'));
        displayTodos();
    })
    ButtonClearCompleted.addEventListener('click',()=>{
        todoStore.deleteCompleted();
        displayTodos();
    })
    FiltersUl.forEach(element =>{
        element.addEventListener('click',(element)=>{
            FiltersUl.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected')
            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                    break;
                case 'Pendientes':
                        todoStore.setFilter(Filters.Pending)
                     break;
                case 'Completados':
                        todoStore.setFilter(Filters.Completed)
                     break;

            }
            displayTodos();
        })
    })

    
}