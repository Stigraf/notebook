document.getElementById("saveBut").addEventListener("click", save);
function save() {

				document.getElementById('savedText').innerHTML += `<li>${document.getElementById('inputText').value}</li>`;
				document.getElementById('inputText').value = " ";
			}