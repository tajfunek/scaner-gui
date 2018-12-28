function submitName(id) {
	var input = document.getElementById("input-scan-"+ id)
	$.ajax({
		url: '/rename',
		data: {
			'pk': id,
			'name': input.value
		},
		dataType: 'json',
		success: function(data) {
			if(data.error != 0) {
				input.classList.remove("in-normal")
				input.classList.add("in-red")
			} else {
				p = document.getElementById("name-" + id)
				p.innerHTML = data.name_return
				p.classList.remove("d-none")
				document.getElementById("rename-box-" + id).classList.add("d-none")
			}
		}
	})
	input.value = ""
}

function showRename(id) {
	document.getElementById("name-" + id).classList.add("d-none")
	document.getElementById("rename-box-" + id).classList.remove("d-none")
}

function hideRename(id) {
	document.getElementById("name-" + id).classList.remove("d-none")
	document.getElementById("rename-box-" + id).classList.add("d-none")
}