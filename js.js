document.querySelector('#saveBut').addEventListener('click', () => {
    
        document.querySelector('#tasks').innerHTML += `
            <div class="task">

            	
                <span id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <button class="delete">delete
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        let current_tasks = document.querySelectorAll(".delete");
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }

        
         	
    
})
