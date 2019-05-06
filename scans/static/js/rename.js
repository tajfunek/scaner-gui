// Function called when RENAME button is clicked
function rename(pk) {
    // Preparation of all element to which are to be added to DOM in place of name
    div = document.createElement("DIV");

    input = document.createElement("INPUT");
    input.classList.add("input-rename");
    input.classList.add("in-normal");

    button_submit = document.createElement("BUTTON");
    button_submit.classList.add("button-sub-name");
    button_submit.innerHTML = "Submit"
        // Event listener on submit button
    button_submit.addEventListener("click", function(event) {
        // Safety features on POST request
        csrftoken = getCookie('csrftoken')

        // Sends to server new name, waits for response
        jQuery.post({
            url: '/rename/',
            data: {
                'pk': pk,
                'name': input.value
            },
            headers: {
                'X-CSRFToken': csrftoken
            },
            // On error input border changes colour
            // If succeeded returned name is set in 'p' element
            // Then cancel function is called by clicking 'Cancel' button
            success: function(data) {
                if (data.error != 0) {
                    input.classList.remove("in-normal");
                    input.classList.add("in-red");
                } else {
                    p = document.getElementById("name-" + pk);
                    p.innerHTML = data.name_return;
                    button_cancel.click();
                }
            }
        });
    });
    // End of addEventListener()

    // Setup of 'Cancel' button
    button_cancel = document.createElement("BUTTON");
    button_cancel.classList.add("button-sub-cancel");
    button_cancel.innerHTML = "Cancel";

    // Event listener on 'Cancel' button
    // Removes all elements from DOM and unhides 'p' element on button click
    button_cancel.addEventListener("click", function(event) {
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }
        document.getElementById("name_box-" + pk).removeChild(div);
        document.getElementById("name-" + pk).classList.remove("d-none");
    });

    // All prepared earlier elements are added to DOM and 'p' is hidden
    document.getElementById("name-" + pk).classList.add("d-none")
    div.appendChild(input);
    div.appendChild(button_submit);
    div.appendChild(button_cancel);
    document.getElementById("name_box-" + pk).appendChild(div);
}