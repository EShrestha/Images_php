const req = new XMLHttpRequest();
const server = 'http://pi-bortiz';

// Helper function to make sending requests easier
const sendRequest = (method, url, onload, params) => {
    req.open(method, `${server}/${url}`);
    req.onload = onload;
    if (params) {
        console.log("Sending with params:", params);
        // req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(params);
    } else {
        req.send();
    }
}

const username = document.getElementById("username");
const pwd = document.getElementById("pwd");
const button = document.getElementById('submitBtn').addEventListener('click', login);
const checkLogin = (e) => {
    let res = req.responseText;
    if (res.trim() === 'valid') {
        console.log('hello');
        window.location.href = "index.html";
    } else {
        alert("Invalid, try again");
    }
    console.log("res:", res.trim());
    console.log("valid" === res.trim());
}

function login() {
    sendRequest("GET", `Login.php?username=${username.value}&password=${pwd.value}`, checkLogin);
}