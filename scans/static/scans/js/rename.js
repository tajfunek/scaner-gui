function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function submitName(id) {
	csrftoken = getCookie('csrftoken')
	var input = document.getElementById("input-scan-"+ id);
	jQuery.post({
		url: '/rename/',
		data: {
			'pk': id,
			'name': input.value
		},
		headers: {
			'X-CSRFToken': csrftoken
		},
		success: function(data) {
			if(data.error != 0) {
				input.classList.remove("in-normal");
				input.classList.add("in-red");
			} else {
				p = document.getElementById("name-" + id);
				p.innerHTML = data.name_return;
				p.classList.remove("d-none");
				document.getElementById("rename-box-" + id).classList.add("d-none");
			}
		}
	});
	input.value = "";
}

function showRename(id) {
	document.getElementById("name-" + id).classList.add("d-none");
	document.getElementById("rename-box-" + id).classList.remove("d-none");
}

function hideRename(id) {
	document.getElementById("input-scan-"+ id).value = "";
	document.getElementById("name-" + id).classList.remove("d-none");
	document.getElementById("rename-box-" + id).classList.add("d-none");
}