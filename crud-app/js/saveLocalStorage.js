export function saveLocalStorage(data) {
    localStorage.setItem("dataUser", JSON.stringify(data));
}
export function getLocalStorage() {
    const saveDataUsers = localStorage.getItem("dataUser");

    // check if data exist in local storage
    if (saveDataUsers) {
        return JSON.parse(saveDataUsers);
    } else {
        return [
        {
            id: 1,
            firstName: "Joe",
            lastName: "Jla",
            email: "test@gmail.com",
            role: "student",
            status: "active",
        },
        {
            id: 2,
            firstName: "Test",
            lastName: "hello",
            email: "test2@gmail.com",
            role: "student",
            status: "inactive",
        }
        ];
    }
}

// delete records from local storage

export function deleteRecord(){
    const deletedRecords = JSON.parse(localStorage.getItem("deletedRecords")) || [];
    return deletedRecords;
}

// updated records from local storage
export function updatedRecord(){
    const updatedRecords = JSON.parse(localStorage.getItem("updatedRecords")) || [];
    return updatedRecords;
}

