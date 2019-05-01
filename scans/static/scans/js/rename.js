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

function rename(pk) {
	div = document.createElement("DIV");

	input = document.createElement("INPUT");
	input.classList.add("input-rename");
	input.classList.add("in-normal");

	button_submit = document.createElement("BUTTON");
	button_submit.classList.add("button-sub-name");
	button_submit.innerHTML = "Submit"
	button_submit.addEventListener("click", function (event) {
		csrftoken = getCookie('csrftoken')
		jQuery.post({
			url: '/rename/',
			data: {
				'pk': pk,
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
					p = document.getElementById("name-" + pk);
					p.innerHTML = data.name_return;
					button_cancel.click();
					p.classList.remove("d-none");
				}
			}
		});
		input.value = "";
	});

	button_cancel = document.createElement("BUTTON");
	button_cancel.classList.add("button-sub-cancel");
	button_cancel.innerHTML = "Cancel"
	button_cancel.addEventListener("click", function(event){
		while(div.firstChild) {
			div.removeChild(div.firstChild);
		}
		document.getElementById("name_box-" + pk).removeChild(div);
		document.getElementById("name-" + pk).classList.remove("d-none")
	})
	div.appendChild(input);
	div.appendChild(button_submit);
	div.appendChild(button_cancel);
	document.getElementById("name-" + pk).classList.add("d-none")
	document.getElementById("name_box-" + pk).appendChild(div);
}

// function hideRename(id) {
// 	document.getElementById("input-scan-"+ id).value = "";
// 	document.getElementById("name-" + id).classList.remove("d-none");
// 	document.getElementById("rename-box-" + id).classList.add("d-none");
// }