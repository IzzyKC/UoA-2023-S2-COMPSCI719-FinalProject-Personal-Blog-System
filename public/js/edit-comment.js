window.addEventListener("load", function () {
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            button.classList.toggle('liked');
            const articleId = button.dataset.articleId;
            console.log(articleId);
            console.log(button.classList);
            console.log(button.classList.contains('liked'));
            // -> liked, insert user favorite userid, articleId
            //liked -> , delete user favorite userid, articleId
        });
    });
    
});

