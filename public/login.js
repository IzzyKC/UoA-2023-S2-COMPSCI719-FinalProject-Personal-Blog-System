window.addEventListener("load", () => {

        const login = document.querySelector("#login");
        const createAccount = document.querySelector("#create-account");

        document.querySelector("#link-create-account").addEventListener("click", e => {

            e.preventDefault();
            login.classList.add(".form-hidden");
            createAccount.classList.remove(".form-hidden");
        });

        document.querySelector("#link-login").addEventListener("click", e => {

            e.preventDefault();
            login.classList.remove("form-hidden");
            createAccount.classList.add("form-hidden");
        });
});