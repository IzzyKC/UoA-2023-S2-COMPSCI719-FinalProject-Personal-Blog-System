window.addEventListener("load", function () {
    const txtUsername = document.querySelector("#txtUsername");
    var validUsername = false;

    txtUsername.addEventListener("change", async function(event) {
        console.log(event.target.value);
        console.log(txtUsername.value);
        await checkDuplicatedUsername(txtUsername.value);
    });

    
    const newAccountForm = document.querySelector("#new-account-form");
    newAccountForm.addEventListener("submit", function(event) {
        if(validUsername && verifyPassword()){
            return true;
        }else{
            event.preventDefault();
        }
    });
    

    /*
    const createAccountBtn = document.querySelector("#create-account");
    createAccountBtn.addEventListener("click", function(event) {
        
        console.log(verifyPassword());
        if(verifyPassword()){
            return true;
        }else{
            event.preventDefault();
        }
    }) ;
    */
    
    
    async function checkDuplicatedUsername(username) {
        const resultMsg = document.querySelector("#username-check");
        const responseObj = await fetch(`http://localhost:3000/checkDuplicatedUsername/${username}`);
        console.log(responseObj)
        const responseJson = await responseObj.json();
        console.log(JSON.stringify(responseJson));
        resultMsg.innerText = JSON.stringify(responseJson);
        if (responseObj.ok) {
            let message = null;
            if(responseJson.result){
                message = `${username} has been taken`;
                alert(message);
                validUsername =  false;
            }else {
                message = `${username} is ok to use`;
                validUsername =  true;
            }
            resultMsg.innerText = message;
        }else{
            alert(`${JSON.stringify(responseJson.result)}`); 
            validUsername = false;
        }
        //return result;
    }

    function verifyPassword() {
        var password = document.getElementById("txtPassword").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
    
        if (password !== confirmPassword) {
            alert("Passwords do not match.  Please re-enter.");
            return false;
        }
        return true;
    }

});