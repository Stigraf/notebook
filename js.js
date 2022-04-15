let taskList = []
let counter = 0
const saveButton = document.getElementById('saveButton')
const inputTask = document.querySelector('#new-task input')


updateUI()
saveButton.disabled = true
inputTask.addEventListener('input', (event) => {
    saveButton.disabled = event.target.value.trim() === '';
    document.getElementById('errorAlert').innerHTML = ``
    if (taskList.some(e => e.title === inputTask.value.trim())) {
        errorAlert()
    }

})


saveButton.addEventListener('click', () => {
    saveButPressed()
})

inputTask.addEventListener('keypress', e => {
        if (e.key === 'Enter' && saveButton.disabled === false && inputTask === document.activeElement) {
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
                <input class="task-Class" id="${taskNameId}" value="${task.title}">
                <button class="delete-Button" id=${deleteId}>delete
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
        taskChange(task.id)
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

function taskChange(id) {


    let result = taskList.find(myId => myId.id === id)
    let itemId = taskList.indexOf(result)
    const taskName = document.getElementById(`taskname_${itemId}`)
    const errorAlert = document.getElementById('errorAlert')

    taskName.addEventListener('input', () => {
        if (taskName.value.trim() === '') {
            errorAlert.innerHTML = taskName.value + ` task is empty`
        } else {
            if (taskList.some(e => e.title === taskName.value.trim()) && taskName.value.trim() !== taskList[itemId].title) {
                errorAlert.innerHTML = taskName.value + ` task already exist`

                let itemId2 = taskList.findIndex(e => e.title === taskName.value.trim());
                let textId2 = taskList[itemId2].id;
                if (taskName.value.trim() !== taskList[itemId].title) {
                    document.getElementById(`taskname_${textId2}`).classList.add('red')
                    setTimeout(() => document.getElementById(`taskname_${textId2}`).classList.remove('red'), 1000)
                }
            } else {
                errorAlert.innerHTML = ""
            }
        }
    })
    if (taskName) {
        taskName.addEventListener("change", () => {
            if (taskList.some(e => e.title === taskName.value.trim()) || taskName.value.trim() === '') {
                    updateUI()
            } else {
                taskList[itemId].title = taskName.value.trim()
                updateUI()
            }
            errorAlert.innerHTML = ''
        })

    }
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

function errorAlert() {
    document.getElementById('errorAlert').innerHTML = inputTask.value + ` task already exist`
    let itemId = taskList.findIndex(e => e.title === inputTask.value.trim());
    let textId = taskList[itemId].id;
    document.getElementById(`taskname_${textId}`).classList.add('red')
    setTimeout(() => document.getElementById(`taskname_${textId}`).classList.remove('red'), 1000)
    saveButton.disabled = true
}