import {Todo} from '../models/todo.model';

/**
 * 
 * @param {Todo} todo 
 * @returns 
 */



export const  createTodoHtml=(todo)=>{
    if(!todo ) throw new Error ('A ToDo is requiered');
    const {done,id,description}=todo;//Destructuracion

    const html=`
                <div class="view">
                    <input class="toggle" type="checkbox"${done ? 'checked' : ''}>
                    <label>${description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
                `;
    const liElement=document.createElement('li');
    liElement.setAttribute('data-id',id);
    if(done){
        liElement.classList.add('completed');
    }
    liElement.innerHTML=html;
    return liElement;

}