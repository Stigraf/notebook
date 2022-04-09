let taskList = []
let counter = 0
const saveButton = document.getElementById('saveBut')
const inputTask = document.querySelector('#newtask input')


updateUI()
saveButton.disabled = true
inputTask.addEventListener('input', (event) => {
    saveButton.disabled = event.target.value === '';
    document.getElementById('errorAlert').innerHTML = `<br>`
    if (taskList.some(e => e.title === inputTask.value.trim())) {
        document.getElementById('errorAlert').innerHTML = inputTask.value + ` task already exist`
        let itemId = taskList.findIndex(e => e.title === inputTask.value.trim())
        let textId = taskList[itemId].id
        document.getElementById(`taskname_${textId}`).classList.add('red')
        setTimeout(() => document.getElementById(`taskname_${textId}`).classList.remove('red'), 1000)
        saveButton.disabled = true
    }

})


saveButton.addEventListener('click', () => {
    saveButPressed()
})

inputTask.addEventListener('keypress', e => {
    if (e.key === 'Enter' && saveButton.disabled === false) {

        saveButPressed()

    }


})


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
                <button class="delBut" id=${deleteId}>delete
                    <i class="far fa-trash-alt"></i>
                </button>
                <hr>
			`;
        isThrough(task.id)
        saveButton.disabled = true
        setFocusToTextBox()


    })

    taskList.map(task => {
        const deleteId = getDeleteIdByItemId(task.id)
        const checkBoxId = getCheckBoxIdByItemId(task.id)
        document.getElementById(checkBoxId).addEventListener('change', () => {
                isCheckedChecked(task.id)
                isThrough(task.id)
                updateUI()


            }
        )


        document.getElementById(deleteId).addEventListener('click', () => {
            removeTask(task.id)
            updateUI()
        })


    })

}

function getCheckBoxIdByItemId(itemId) {
    return `checkBox_${itemId}`
}

function getTaskNameByItemId(itemId) {
    return `taskname_${itemId}`
}

function getDeleteIdByItemId(itemId) {
    return `delete_${itemId}`
}

function cleanInput() {
    inputTask.value = ""
}

function isCheckedChecked(id) {
    console.log(`isChecked, id:${id}`)

    let result = taskList.find(myId => myId.id === id)
    let itemId = taskList.indexOf(result)
    console.log(itemId)
    let isChecked = taskList[itemId].isChecked
    taskList[itemId].isChecked = !isChecked


}


function removeTask(id) {
    console.log(`removeTask, id: ${id}`)
    taskList = taskList.filter(function (value) {
        return value.id !== id
    })
}

function updateUI() {
    taskList.sort(function (a, b) {
        return (a.isChecked - b.isChecked);
    })
    cleanUI()
    generateTasks()

}

function saveButPressed() {


    let text = inputTask.value.trim()

    let task = {title: text, isChecked: false, id: counter}
    taskList.push(task)
    counter += 1

    updateUI()
    cleanInput()


}


function setFocusToTextBox() {
    inputTask.focus();
}

function isThrough(id) {
    let result = taskList.find(myId => myId.id === id)
    let itemId = taskList.indexOf(result)

    let textId = taskList[itemId].id
    if (taskList[itemId].isChecked === true) {
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