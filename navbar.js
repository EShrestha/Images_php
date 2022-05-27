const login_element = document.getElementById('login');

async function checkLogin(){
    const response = await fetch(`${server}/GetUserInfo.php`);
    const json = await response.json();

    const isLoggedIn = json.username != null;

    if(isLoggedIn){
        login_element.innerText = 'Logout';
        login_element.addEventListener("click", async() => {
            await fetch(`${server}/Logout.php`).then(result => {
                window.location.replace("index.html");
            });
    });
        console.log(json);
    }
    else{
        login_element.href = 'login.html';
        login_element.innerText = 'Login';
        admin_element.style.display = 'none';
    }
}

checkLogin();
