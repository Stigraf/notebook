
	let taskList = []
	let counter = 0
	updateUI()
	document.getElementById('saveBut').disabled = true
	document.querySelector('#newtask input').addEventListener('change', () => {
		if (document.querySelector('#newtask input').value == '') {
		document.getElementById('saveBut').disabled = true 
	} else {
		document.getElementById('saveBut').disabled = false
	}
	})
	

document.querySelector('#saveBut').addEventListener('click', () => {
   saveButPressed()
})

document.querySelector('#newtask input').addEventListener('keypress', e => {
	if (document.querySelector('#newtask input').value == '') {
		
	} else {
		if (e.key === 'Enter'){
		saveButPressed()
	}
	}
	
})

function cleanInput() {
document.querySelector('#newtask input').value = ""
}

function cleanUI() {
 	document.querySelector('#tasks').innerHTML = ""
 }

function generateTasks() {
		console.log(taskList)
        taskList.map(task => {
        	
        	const deleteId = getDeleteIdByItemId(task.id)
        	const checked = task.isChecked ? 'checked' : ''
        	const checkBoxId = getCheckBoxIdByItemId(task.id)
        	const taskNameId = getTaskNameByItemId(task.id)

        	document.querySelector('#tasks').innerHTML += `
            <div class="task">

            	<input type="checkbox" id="${checkBoxId}" ${checked}>
                <span id="${taskNameId}">
                   ${task.title} 
                </span>
                <button id=${deleteId}>delete
                    <i class="far fa-trash-alt"></i>
                </button>
			`;
			isThrough(task.id)
			

       			
    })

        taskList.map(task => {
			const deleteId = getDeleteIdByItemId(task.id)
			const checkBoxId = getCheckBoxIdByItemId(task.id)
			document.getElementById(checkBoxId).addEventListener('change', e => {
				isCheckedChecked(task.id)
				isThrough(task.id)
		

				 
			}
				)
			



        	document.getElementById(deleteId).addEventListener('click', () => {
        		removeTask(task.id)
        		updateUI()
        	})

        	
        })

}

function getCheckBoxIdByItemId(itemId){
	return`checkBox_${itemId}`
}
function getTaskNameByItemId(itemId){
	return`taskname_${itemId}`
}

function getDeleteIdByItemId(itemId) {
	return  `delete_${itemId}`
}

function isCheckedChecked(id) {
	console.log(`isChecked, id:${id}`)
	
	let result = taskList.find(myId => myId.id ==id)
	let itemId = taskList.indexOf(result)
	console.log(itemId)
	let isChecked = taskList[itemId].isChecked 
	taskList[itemId].isChecked = !isChecked


	
}


function removeTask(id) {
	console.log(`removeTask, id: ${id}`)
	taskList = taskList.filter(function(value, index, arr){
		return value.id != id
	})
}

function updateUI() {
			cleanUI()
        	generateTasks()

}

function saveButPressed() {
	    let text = document.querySelector('#newtask input').value
  
    let task = { title: text, isChecked: false, id: counter }
    taskList.push(task)
    counter += 1

updateUI()
cleanInput()  	
 

}


function setFocusToTextBox() {
document.querySelector('#newtask input').focus();
}

 function isThrough(id) {
 	let result = taskList.find(myId => myId.id == id)
	let itemId = taskList.indexOf(result)
	let isChecked = taskList[itemId].isChecked 
	textId = taskList[itemId].id 
	if (taskList[itemId].isChecked == true){
		document.getElementById(`taskname_${textId}`).classList.add('through')
	} else {
		document.getElementById(`taskname_${textId}`).classList.remove('through')
	}






 // 	if (taskList[task.id].isChecked == true) {
	// document.getElementById(`taskname_${itemId}`).classList.add('through')
	// } else { 
	// document.getElementById(`taskname_${itemId}`).classList.remove('through')
	// }
 }