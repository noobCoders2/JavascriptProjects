import { getLocalStorage } from "./saveLocalStorage.js";

let dataUsers = getLocalStorage();
console.log(dataUsers)
const tablesData = document.querySelector('.table'),
    statsHtml = document.querySelector(".stats-grid");


let totalDataUsers  = dataUsers.length;
let activeUser = dataUsers.filter(user => user.status === "active").length;
let pendingUser = dataUsers.filter(user => user.status === "pending").length;
function renderStats() {
    let html = `
        <article class="stat-card">
            <span class="stat-label">Total Users</span>
            <strong>${totalDataUsers}</strong>
        </article>
        <article class="stat-card">
            <span class="stat-label">Active</span>
            <strong>${activeUser}</strong>
        </article>
        <article class="stat-card">
            <span class="stat-label">Pending</span>
            <strong>${pendingUser}</strong>
        </article>
    `;
    statsHtml.innerHTML += html;
}

function renderTableData() {
    let tableHtml = "";

    dataUsers.forEach(data => {
        const html = `
            <tr>
                <td data-label="ID">${data.id}</td>
                <td data-label="Name">
                    <div class="user-cell">
                        <span class="avatar">${data.firstName.toUpperCase().charAt(0)}${data.lastName.toUpperCase().charAt(0)}</span>
                        <span>${data.firstName} ${data.lastName}</span>
                    </div>
                </td>
                <td data-label="Email">${data.email}</td>
                <td data-label="Status"><span class="status active">${data.status}</span></td>
                <td data-label="Actions">
                    <div class="actions">
                        <button type="button">Edit</button>
                        <button class="danger" type="button">Delete</button>
                    </div>
                </td>
            </tr>
        `
        tableHtml += html;
    });
    tablesData.innerHTML = tableHtml;
}

renderStats();
renderTableData()