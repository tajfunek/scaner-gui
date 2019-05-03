document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("scan-button").addEventListener("click", enterScanMode);
});
// List of parameters which are passed to scaner program
// There will be created 'input' element for every parameter
// Prefered template
var parameters = [
    "Name of scan (default: 'pk'):"
];

function enterScanMode(event) {
    // Hiding all rows
    rows = document.getElementsByClassName("row");
    for (i = 0; i < rows.length; i++) {
        rows[i].classList.add("d-none");
    }
    // Hiding buttow which enters 'Scan Mode', but it still takes some space

    // Container for all inputs
    div_parameters = document.createElement("DIV");
    div_parameters.classList.add("input-div");

    //Creating inputs for parameters:
    var inputs = [];
    for (var i = 0; i < parameters.length; i++) {
        inputs.push(document.createElement("INPUT")) // Adding to new input to list
        inputs[i].classList.add("input-rename");
        inputs[i].classList.add("in-normal");
        inputs[i].placeholder = parameters[i]; // Adding background text

        div_parameters.appendChild(inputs[i]); // Adding to inputs container
    }

    // Container for two buttons under inputs: "Start" and "Cancel"
    buttons_div = document.createElement("DIV");
    // buttons_div.classList.add("btn-div");

    // This button closes all inputs and returns to scans list
    cancel_btn = document.createElement("BUTTON");
    cancel_btn.classList.add("btn-cancel");
    cancel_btn.innerHTML = "Return to scan list";

    // "Start scan" button
    // Pressing this button is gonna send AJAX request to server
    start_btn = document.createElement("BUTTON");
    start_btn.classList.add("btn-start");
    start_btn.innerHTML = "Confirm parameters";
    // Appending buttons to their container
    buttons_div.appendChild(start_btn);
    buttons_div.appendChild(cancel_btn);

    // Appending buttons' container to main scan mode container
    div_parameters.appendChild(buttons_div);

    // Resize of scan-div to fit inputs in it
    document.getElementById("scan-div").style.width = "20em";

    // Appending main scan mode container to DOM and hiding "Enter scan mode" button
    document.getElementById("scan-button").classList.add("d-none");
    document.getElementById("scan-div").appendChild(div_parameters);

    // Event listener for click on close button
    // Creating stuff, but in reverse
    cancel_btn.addEventListener("click", function(event) {
        // Removing buttons from their container
        buttons_div.removeChild(cancel_btn);
        buttons_div.removeChild(start_btn);

        // Until "div_parameters" has childs remove them in loop
        while (div_parameters.firstChild) {
            div_parameters.removeChild(div_parameters.firstChild);
        }

        // Restore table
        for (i = 0; i < rows.length; i++) {
            rows[i].classList.remove("d-none");
        }

        // Remove "div_parameters" and restore "Enter scan mode" button
        document.getElementById("scan-button").classList.remove("d-none");
        document.getElementById("scan-div").removeChild(div_parameters);
        document.getElementById("scan-div").style.width = "9em";
    });

    // Event listener for click on "Confirm" button
    start_btn.addEventListener("click", function(event) {
        for (;;);
    });

}