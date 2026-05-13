import { saveLocalStorage, getLocalStorage } from "./saveLocalStorage.js";

const submitBtn = document.querySelector(".submit-button"),
    renderData = document.querySelector(".renderData"),
    profileDisplay = document.querySelector(".profile-grid"),
    modalToggle = document.querySelector(".modal"),
    addUserdata = document.querySelector(".add-user"),
    closeBtnModal = document.querySelector(".close-button"),
    filterRole = document.getElementById("filter-role"),
    filterStatus = document.getElementById("filter-status"),
    searchInput = document.querySelector('input[type="search"]');

addUserdata.addEventListener("click", () => {
    openAdduser();
});

closeBtnModal.addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
});

filterRole.addEventListener("change", () => {
    applyFilters();
});

filterStatus.addEventListener("change", () => {
    applyFilters();
});

let dataUser = getLocalStorage();
console.log(dataUser)
    // search in table
if (searchInput) {
searchInput.addEventListener("input", searchFilter);
searchInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
    searchFilter();
    }
});
}

function searchFilter() {
    const searchTerm = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach((row) => {
        const cells = row.querySelectorAll("td");

        let match = false;

        cells.forEach((cell) => {
        if (cell.textContent.toLowerCase().includes(searchTerm)) {
            match = true;
        }
        });
        row.style.display = match ? "" : "none";
    });
}

// add keyboard event listener for accessibility
document.body.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

// open modal function
function openAdduser() {
    modalToggle.classList.add("active");
    document.body.classList.add("modal-open"); // prevent background scroll when modal is open
}

// close modal function
function closeModal() {
    modalToggle.classList.remove("active");
    document.body.classList.remove("modal-open"); // allow background scroll when modal is closed
}
let editIndex = null;


submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addUser();
});

function renderAllData() {
    renderCardData();
    renderTableData();
}

function renderCardData() {
    let htmldata = "";
    if(dataUser.length === 0){
            profileDisplay.innerHTML = "<article class='profile-card'><div class='profile-top'><p>No user data available.</p></div></article>";
            return;
        }
    dataUser.forEach((data, i) => {
    const htmluserData = `
                    <article class="profile-card">
                        <div class="profile-top">
                            <span class="avatar large">${data.firstName.charAt(0)}${data.lastName.charAt(0)}</span>
                            <span class="status ${data.status.toLowerCase()}">${data.status}</span>
                        </div>
                        <h2>${data.firstName} ${data.lastName}</h2>
                        <p>Archived account</p>
                        <dl>
                            <div>
                                <dt>Email</dt>
                                <dd>${data.email}</dd>
                            </div>
                            <div>
                                <dt>Role</dt>
                                <dd>${data.role ? data.role : "Guest"}</dd>
                            </div>
                        </dl>
                        <div class="actions">
                            <button class="editData" data-id="${i}" type="button">
                                Edit
                            </button>

                            <button class="deleteData danger" data-id="${i}">
                                Delete
                            </button>
                        </div>
                    </article>
                `;
    htmldata += htmluserData;
    });
    profileDisplay.innerHTML = htmldata;
    document.querySelectorAll(".deleteData").forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", () => {
        const index =  deleteBtn.getAttribute("data-id");
        
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {

            let deleteRecords = JSON.parse(localStorage.getItem("deletedRecords")) || [];
            
            deleteRecords.push({ 
                user: dataUser[index],
                date: new Date().toLocaleString()
            });
            // save deleted records to local storage
            localStorage.setItem("deletedRecords", JSON.stringify(deleteRecords));

            dataUser.splice(index, 1);
        }
        saveLocalStorage(dataUser);
        renderAllData();
        });
    });

    document.querySelectorAll(".editData").forEach((editBtn) => {
        editBtn.addEventListener("click", () => {
            const index = editBtn.getAttribute("data-id");
            const userData = dataUser[index];

            // pre-fill the form with existing data
            document.querySelector('input[name="first_name"]').value = userData.firstName;
            document.querySelector('input[name="last_name"]').value = userData.lastName;
            document.querySelector('input[name="email"]').value = userData.email;
            document.querySelector('select[name="Role"]').value = userData.role || "";
            document.querySelector('select[name="status"]').value = userData.status || "";
            editIndex = index; // store the index of the user being edited

            openAdduser(); // open the modal for editing
        })
    })
}

function renderTableData(filteredData = dataUser) {
    let htmlTable = "";
    if (filteredData.length === 0) {
        renderData.innerHTML = "<tr><td colspan='4'>No user data available.</td></tr>";
        return;
    }
    filteredData.forEach((dataTable) => {
        const tableData = `
                        <tr>
                            <td data-label="Name">${dataTable.firstName} ${dataTable.lastName}</td>
                            <td data-label="Email">${dataTable.email}</td>
                            <td data-label="Role">${dataTable.role ? dataTable.role : "Guest"}</td>
                            <td data-label="Status"><span class="status ${dataTable.status.toLowerCase()}">${dataTable.status}</span></td>
                        </tr>
                    `;
        htmlTable += tableData;
        
    });
    renderData.innerHTML = htmlTable;
}

function addUser() {
    const firstname = document.querySelector('input[name="first_name"]'),
        lastname = document.querySelector('input[name="last_name"]'),
        emailin = document.querySelector('input[name="email"]'),
        roles = document.querySelector('select[name="Role"]'),
        statusOp = document.querySelector('select[name="status"]');

    const first_name = firstname.value.trim(),
        last_name = lastname.value.trim(),
        emailVal = emailin.value.trim(),
        rolesval = roles.value.trim(),
        stats = statusOp.value.trim();

    // check if null
    if (
        first_name === "" ||
        last_name === "" ||
        emailVal === "" ||
        rolesval === "" ||
        stats === ""
    ) {
        alert("Please fill the field");
        return;
    }

  // check if data already exist
    const existUserData = dataUser.some((dataExist, index) =>
        editIndex !== index && // exclude the user being edited
        dataExist.firstName === first_name &&
        dataExist.lastName === last_name &&
        dataExist.email === emailVal && 
        dataExist.role === rolesval && 
        dataExist.status === stats
    );
   

    if (existUserData) {
        alert("data already exist");
        clearInputs(firstname, lastname, emailin, roles, statusOp);
        return;
    }

    const userInput = {
        id: Date.now(),
        firstName: first_name,
        lastName: last_name,
        email: emailVal,
        role: rolesval.toLowerCase(),
        status: stats.toLowerCase(),
        Month: new Date().getMonth()
    };

    // dataUser.push(userInput);
    if (editIndex !== null) {
        const oldUserData = dataUser[editIndex];
        let changes = [];
        


        if(oldUserData.firstName !== userInput.firstName) {
            changes.push(
                `First Name changed from "${oldUserData.firstName}" to "${userInput.firstName}"`
                );
        }
        if(oldUserData.lastName !== userInput.lastName) {
            changes.push(
                `Last Name changed from "${oldUserData.lastName}" to "${userInput.lastName}"`
            );
        }
        if(oldUserData.email !== userInput.email) {
            changes.push(
                `Email changed from "${oldUserData.email}" to "${userInput.email}"`
            );
        }
        if(oldUserData.role !== userInput.role) {
            changes.push(
                `Role changed from  "${oldUserData.role}" to "${userInput.role}"`
            );
        }
        if(oldUserData.status !== userInput.status) {
            changes.push(
                `Status changed from  "${oldUserData.status}" to "${userInput.status}"`
                );
        }
        if (changes.length === 0) {
            alert("No changes made.");
            clearInputs(firstname, lastname, emailin, roles, statusOp);
            editIndex = null;
            return;
        }
    
        let updatedRecords = JSON.parse(localStorage.getItem("updatedRecords")) || [];



        updatedRecords.push({
            updatedUser: userInput,
            changes: changes,
            date: new Date().toLocaleString()
        });
        console.log(dataUser)
        localStorage.setItem("updatedRecords", JSON.stringify(updatedRecords));

        dataUser[editIndex] = userInput;
        editIndex = null; // reset edit index after saving
    }else{
        dataUser.push(userInput);
    }

    clearInputs(firstname, lastname, emailin, roles, statusOp);
    saveLocalStorage(dataUser);
    renderAllData();
    closeModal();
}

// filter data
function applyFilters(){
    const roleVal = filterRole.value.toLowerCase();
    const statusVal = filterStatus.value.toLowerCase();

    const filtered = dataUser.filter((user) => {
        return (
        (roleVal === "" || user.role === roleVal) &&
        (statusVal === "" || user.status === statusVal)
        );
    });

    renderTableData(filtered);
}

function clearInputs(firstname, lastname, emailin, roles, statusOp) {
    firstname.value = "";
    lastname.value = "";
    emailin.value = "";
    roles.value = "";
    statusOp.value = "";
}

renderAllData();