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
    var scan_mode_div = document.createElement("DIV");
    scan_mode_div.classList.add("input-div");

    // Container for two buttons under inputs: "Start" and "Cancel"
    var buttons_div = document.createElement("DIV");

    // This button closes all inputs and returns to scans list
    var cancel_btn = document.createElement("BUTTON");
    cancel_btn.classList.add("btn-cancel");
    cancel_btn.innerHTML = "Return to scan list";

    // "Start scan" button
    // Pressing this button is gonna send AJAX request to server
    var start_btn = document.createElement("BUTTON");
    start_btn.classList.add("btn-start");
    start_btn.innerHTML = "Confirm parameters";
    // Appending buttons to their container
    buttons_div.appendChild(start_btn);
    buttons_div.appendChild(cancel_btn);

    // Appending buttons' container to main scan mode container
    scan_mode_div.appendChild(buttons_div);

    //Creating inputs for parameters:
    var inputs = [];
    for (var i = 0; i < parameters.length; i++) {
        inputs.push(document.createElement("INPUT")) // Adding to new input to list
        inputs[i].classList.add("input-rename");
        inputs[i].classList.add("in-normal");
        inputs[i].placeholder = parameters[i]; // Adding background text

        scan_mode_div.appendChild(inputs[i]); // Adding to inputs container
    }

    // Resize of scan-div to fit inputs in it
    document.getElementById("scan-div").style.width = "20em";

    // Appending main scan mode container to DOM and hiding "Enter scan mode" button
    document.getElementById("scan-button").classList.add("d-none");
    document.getElementById("scan-div").appendChild(scan_mode_div);

    var progress_bar;
    var cmd_line;

    // Event listener for click on close button
    // Creating stuff, but in reverse
    cancel_btn.addEventListener("click", function(event) {
        // Removing buttons from their container
        buttons_div.removeChild(cancel_btn);
        buttons_div.removeChild(start_btn);

        // Until "scan_mode_div" has childs remove them in loop
        while (scan_mode_div.firstChild) {
            scan_mode_div.removeChild(scan_mode_div.firstChild);
        }

        // Restore table
        for (i = 0; i < rows.length; i++) {
            rows[i].classList.remove("d-none");
        }

        // Remove "scan_mode_div" and restore "Enter scan mode" button
        document.getElementById("scan-button").classList.remove("d-none");
        document.getElementById("scan-div").removeChild(scan_mode_div);
        document.getElementById("scan-div").style.width = "9em";
        document.getElementById("main").removeChild(cmd_line);
        document.getElementById("main").removeChild(progress_bar);
    });

    // Event listener for click on "Confirm" button
    start_btn.addEventListener("click", function(event) {
        // Saving input
        var values = new Array(parameters.length);
        for (var i = 0; i < values.length; i++) {
            values[i] = inputs[i].value;
        }

        // Creating progress bar to show scanning progress
        progress_bar = document.createElement("PROGRESS");
        progress_bar.max = 100;
        progress_bar.value = 0;
        progress_bar.style.width = "20em";
        progress_bar.style.height = "2em";

        // Console-styled container for output of program sent by server
        cmd_line = document.createElement("DIV");
        cmd_line.classList.add("console");
        cmd_line.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                                Maecenas eget elit eget metus aliquet suscipit."

        scan_mode_div.appendChild(progress_bar);
        document.getElementById("main").appendChild(cmd_line);


    });


}