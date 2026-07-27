
// ==========================================
// Gas Meter Management System V2.0
// Part-3.1
// ==========================================

// Variables
let totalMeter = 28;
let editRow = null;

const table = document.getElementById("customerTable");
const modal = document.getElementById("customerModal");

// Load Saved Data
if (localStorage.getItem("customerTable")) {

    table.innerHTML = localStorage.getItem("customerTable");
    totalMeter = Number(localStorage.getItem("totalMeter"));

}  else {

    // Default 28 Meter List
    for (let i = 1; i <= 28; i++) {

        table.innerHTML += `
        <tr>
            <td>${i}</td>
            <td>Customer ${i}</td>
            <td>-</td>
            <td>Flat ${i}</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>Active</td>
            <td>
                <button class="editBtn">✏ Edit</button>
                <button class="deleteBtn">🗑 Delete</button>
            </td>
        </tr>
        `;
    }

}



// Dashboard
document.getElementById("totalMeter").innerText = totalMeter;
document.getElementById("activeCustomer").innerText = totalMeter;
document.getElementById("customerListTitle").innerText =
    `Customer List (${totalMeter} Meters)`;
// =========================
// Save Function
// =========================
function saveData() {
    localStorage.setItem("customerTable", table.innerHTML);
    localStorage.setItem("totalMeter", totalMeter);
}


// Open Modal
document.getElementById("addCustomerBtn").onclick = function () {

    editRow = null;

    modal.style.display = "flex";

};

// Close Modal
document.getElementById("closeModal").onclick = function () {
modal.style.display = "none";
saveData();
};

// Save All Data
localStorage.setItem("customerTable", table.innerHTML);
localStorage.setItem("totalMeter", totalMeter);

// Print
document.getElementById("printBtn").onclick = function () {

    window.print();

};

// Search
document.getElementById("searchBox").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let rows = table.getElementsByTagName("tr");

    for (let row of rows) {

        row.style.display =
            row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";
    }

});
// ==========================================
// Part-3.2
// Save Customer
// ==========================================

document.getElementById("saveCustomer").onclick = function () {

    let meter = document.getElementById("meterNo").value.trim();
    let name = document.getElementById("customerName").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let flat = document.getElementById("flatNo").value.trim();

    let previous = Number(document.getElementById("previousReading").value) || 0;
    let current = Number(document.getElementById("currentReading").value) || 0;
    let rate = Number(document.getElementById("gasRate").value) || 0;

    

    let status = document.getElementById("status").value;

    if (meter === "" || name === "" || flat === "") {
        alert("Please fill all required fields.");
        return;
    }

    let usedUnit = current - previous;

    if (usedUnit < 0) {
    alert("Current Reading cannot be less than Previous Reading.");
    return;
    }

    let bill = usedUnit * rate;

    if (editRow) {

        editRow.cells[0].innerText = meter;
        editRow.cells[1].innerText = name;
        editRow.cells[2].innerText = mobile;
        editRow.cells[3].innerText = flat;
        editRow.cells[4].innerText = previous;
        editRow.cells[5].innerText = current;
        editRow.cells[6].innerText = usedUnit;
        editRow.cells[7].innerText = rate;
        editRow.cells[8].innerText = bill;
        editRow.cells[9].innerText = status;

        editRow = null;
        saveData();

    } else {

        table.innerHTML += `
        <tr>
            <td>${meter}</td>
            <td>${name}</td>
            <td>${mobile}</td>
            <td>${flat}</td>
            <td>${previous}</td>
            <td>${current}</td>
            <td>${usedUnit}</td>
            <td>${rate}</td>
            <td>${bill}</td>
            <td>${status}</td>
            <td><button class="editBtn">✏ Edit</button>
            <button class="deleteBtn">🗑 Delete</button>
            </td>
        </tr>
        `;

        totalMeter++;
        document.getElementById("totalMeter").innerText = totalMeter;
        document.getElementById("activeCustomer").innerText = totalMeter;

        document.getElementById("customerListTitle").innerText =
    `    Customer List (${totalMeter} Meters)`;    
        document.getElementById("totalMeter").innerText = totalMeter;
        document.getElementById("activeCustomer").innerText = totalMeter;
        document.getElementById("customerListTitle").innerText =
            `Customer List (${totalMeter} Meters)`;
    }

    document.getElementById("meterNo").value = "";
    document.getElementById("customerName").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("flatNo").value = "";
    document.getElementById("previousReading").value = "";
    document.getElementById("currentReading").value = "";
    document.getElementById("gasRate").value = "";
    document.getElementById("status").selectedIndex = 0;

    modal.style.display = "none";


// Save All Data
localStorage.setItem("customerTable", table.innerHTML);
localStorage.setItem("totalMeter", totalMeter);
};
// ==========================================
// Part-3.3
// Edit Customer
// ==========================================

document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("editBtn")) return;

    editRow = e.target.closest("tr");

    document.getElementById("meterNo").value = editRow.cells[0].innerText;
    document.getElementById("customerName").value = editRow.cells[1].innerText;
    document.getElementById("mobile").value = editRow.cells[2].innerText;
    document.getElementById("flatNo").value = editRow.cells[3].innerText;
    document.getElementById("previousReading").value = editRow.cells[4].innerText;
    document.getElementById("currentReading").value = editRow.cells[5].innerText;
    document.getElementById("gasRate").value = editRow.cells[7].innerText;
    document.getElementById("status").value = editRow.cells[9].innerText;

    modal.style.display = "flex";

});


// ==========================================
// Start New Month
// ==========================================

document.getElementById("newMonthBtn").onclick = function () {

    if (!confirm("Start a new month?")) {
        return;
    }

    let rows = table.getElementsByTagName("tr");

    for (let row of rows) {

        let currentReading = Number(row.cells[5].innerText);

        // Previous Reading = Current Reading
        row.cells[4].innerText = currentReading;

        // Reset Monthly Data
        row.cells[5].innerText = "";
        row.cells[6].innerText = 0;
        row.cells[7].innerText = 0;
        row.cells[8].innerText = 0;
    }

    alert("New Month Started Successfully.");

};

document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("deleteBtn")) return;

    if (!confirm("Are you sure you want to delete this customer?")) return;

    let row = e.target.closest("tr");
    row.remove();

    totalMeter--;

    document.getElementById("totalMeter").innerText = totalMeter;
    document.getElementById("customerListTitle").innerText =
        `Customer List (${totalMeter} Meters)`;

});


document.getElementById("newMonthBtn").onclick = function () {

    if (!confirm("Start a new month?")) return;

    let rows = document.querySelectorAll("#customerTable tr");

    rows.forEach(function(row){

        let cells = row.getElementsByTagName("td");

        if(cells.length < 10) return;

        // Previous Reading = Current Reading
        cells[4].innerText = cells[5].innerText;

        // Current Reading = 0
        cells[5].innerText = 0;

        // Used Unit = 0
        cells[6].innerText = 0;

        // Bill = 0
        cells[8].innerText = 0;

    });



    saveData();   // ← এই লাইন যোগ করুন

    alert("New Month Started Successfully.");

};



document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("deleteBtn")) return;

    if (!confirm("Are you sure you want to delete this customer?")) return;

    let row = e.target.closest("tr");
    row.remove();

    totalMeter--;

    document.getElementById("totalMeter").innerText = totalMeter;
    document.getElementById("customerListTitle").innerText =
        `Customer List (${totalMeter} Meters)`;

});
