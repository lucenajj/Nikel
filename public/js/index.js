const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

// LOGAR NO SISTEMA
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

   const account = getAccount(email)
   
   // Verifica se existe conta cadastrada para este usuário
   if(!account){
    alert("Usuário ou Senha inválidos!")
    return;
    }

    if(account){
        if(account.password !== password){
            alert("Usuário ou Senha inválidos!")
            return;
        }

        saveSession(email, checkSession);

        // Se tem uma conta abre a página HOME
        window.location.href = "home.html"

    }

})

// Criar Conta
document.getElementById("create-form").addEventListener("submit" , function(e){
    e.preventDefault();
    
    const email = document.getElementById("email-create-input").value;
    const password = document.getElementById("password-create-input").value;

    if(email.length < 5){
    alert("Preencha o campo com um e-mail válido")
    return;
    }

    if(password.length < 4){
        alert("Preencha a senha com no mínimo 4 digitos")
    }

    saveAccount({
        login: email,
        password : password,
        transactions: []
    })

    myModal.hide();
    alert("Conta criada com sucesso.")
});

function checkLogged(){
    if (session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html"
    }

}

function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession){
    if(saveSession){
        localStorage.setItem("session", data)
    }

    sessionStorage.setItem("logged", data)
}

function getAccount(key){
    const account = localStorage.getItem(key);
   
    if(account){
        return JSON.parse(account);
    }

    return "";            
}