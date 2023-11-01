window.addEventListener("load", function () {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(function(button) {
        button.addEventListener('click', async function(event) {
            button.classList.toggle('liked');
            const articleId = button.dataset.articleId;
            let result;
            let resultObjResponse;
            if(button.classList.contains('liked')){
                // -> liked, insert user favorite userid, articleId
                resultObjResponse = await fetch(`http://localhost:3000/addUserLike/${articleId}`);
                result = await resultObjResponse.json();
            }else{
                //liked -> , delete user favorite userid, articleId
                resultObjResponse = await fetch(`http://localhost:3000/deleteUserLike/${articleId}`);
                result = await resultObjResponse.json();
                //const deleteItem = document.querySelector(`#li-${articleId}`);
                //deleteItem.remove();
            
            }

            if(!(resultObjResponse.ok)){
                alert(JSON.stringify(result));
            }
        });
    });
    
});

