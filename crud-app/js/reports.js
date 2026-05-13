import {getLocalStorage, deleteRecord, updatedRecord} from "./saveLocalStorage.js";

let dataUser = getLocalStorage();

let datalength = dataUser.length;
let deletedRecords = deleteRecord();
let updatedRecords = updatedRecord();
console.log("Updated Records:", updatedRecords);
if (updatedRecords.length > 0) {
    console.log("Changes:", updatedRecords[updatedRecords.length - 1].changes);
}
if (deletedRecords.length > 0) {
    console.log(deletedRecords[0].user);
}
function statsGrid(){
    let statsGrid = document.querySelector(".stats-grid");
    let statsGridHTML = `
        <article class="stat-card">
            <span class="stat-label" style="color: #007bff;">Total Users</span>
            <strong style="color: #007bff;">${datalength}</strong>
        </article>
        <article class="stat-card">
            <span class="stat-label" style="color: #28a745;">Updated Records</span>
            <strong style="color: #28a745;">${updatedRecords.length}</strong>
        </article>
        <article class="stat-card">
            <span class="stat-label" style="color: #dc3545;">Deleted Records</span>
            <strong style="color: #dc3545;">${deletedRecords.length}</strong>
        </article>
    `;
    statsGrid.innerHTML = statsGridHTML;
}
function activItyListRender(){
    const activityLogs = document.querySelector('.activity-list');
    if(updatedRecords.length === 0){
        activityLogs.innerHTML = `
            <li>
                <strong>No recent activity</strong>
                <span>No updates available</span>
            </li>
        `;
        return;
    }
    let renderLogsHtml = "";
    const latestThreeChanges = updatedRecords.slice(-3).reverse();


    latestThreeChanges.forEach(latestChange => {
        const fullname = `${latestChange.updatedUser.firstName} ${latestChange.updatedUser.lastName}`;
        const latestChnange = latestChange.changes[latestChange.changes.length - 1];
        const logHtml = `
            <li>
                <strong>${fullname}</strong>
                <span>${latestChnange}</span>
            </li>
        `;
        renderLogsHtml += logHtml;
    });

    activityLogs.innerHTML = renderLogsHtml;
}
function crudActivityListRender(){

    const crudLogs =
        document.querySelector('.crud-activity-list');

    if(
        deletedRecords.length === 0 &&
        updatedRecords.length === 0
    ){

        crudLogs.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;">
                    No recent CRUD activity
                </td>
            </tr>
        `;

        return;
    }

    let crudLogsHtml = "";

    // UPDATED RECORDS
    updatedRecords
        .slice(-3)
        .reverse()
        .forEach(updatedRecord => {

            const fullname =
            `${updatedRecord.updatedUser.firstName}
             ${updatedRecord.updatedUser.lastName}`;

            

            crudLogsHtml += `
                <tr>
                    <td data-label="Date">
                        ${updatedRecord.date}
                    </td>

                    <td data-label="Action">
                        Update
                    </td>

                    <td data-label="User">
                        ${fullname}
                    </td>

                    <td data-label="Result">
                        <span class="status active">
                            Reviewed
                        </span>
                    </td>
                </tr>
            `;
        });

    // DELETED RECORDS
    deletedRecords
        .slice(-3)
        .reverse()
        .forEach(deletedRecord => {

            const fullname =
            `${deletedRecord.user.firstName}
             ${deletedRecord.user.lastName}`;

            crudLogsHtml += `
                <tr>
                    <td data-label="Date">
                        ${deletedRecord.date}
                    </td>

                    <td data-label="Action">
                        Delete
                    </td>

                    <td data-label="User">
                        ${fullname}
                    </td>

                    <td data-label="Result">
                        <span class="status inactive">
                            Removed
                        </span>
                    </td>
                </tr>
            `;
        });

    crudLogs.innerHTML = crudLogsHtml;
}

statsGrid()
activItyListRender()
crudActivityListRender()
