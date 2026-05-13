const loginBtn = document.querySelector('.loginBtn');
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    login();
});

function login(){
    console.log(loginBtn.ATTRIBUTE_NODE)
}