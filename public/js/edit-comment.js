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

    const addComment = document.querySelector("#addComment");
    addComment.addEventListener("click" , function() {
        const commentDiv = document.querySelector("#comment-form");
        const articleId = addComment.dataset.articleId;
        const pageIndex =  document.querySelector("#pageIndex").innerHTML;
        console.log(pageIndex);
        commentDiv.innerHTML = `
        <form action="./addComment" method="GET">
            <div id="inpComment-layout">
                <input type="hidden" name="InpPageIndex" value=${pageIndex}>
                <input type="hidden" name="inpArticleId" value=${articleId}>
                <textarea type="text" name="inpComment" id="inpComment" rows="3" cols="50"></textarea>
                <input type="submit" value="Add" id="inpCommentSubmit">
            <div>
        </form>`;
    });

    
    
});

