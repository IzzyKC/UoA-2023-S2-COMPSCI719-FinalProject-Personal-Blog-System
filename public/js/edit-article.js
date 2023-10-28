window.addEventListener("load", function () {
    const fontSizeArr = ['12px','14px','16px','18px','20px','30px','40px'];
    var Size = Quill.import('attributors/style/size');
    Size.whitelist = fontSizeArr;
    Quill.register(Size, true);
    var toolbarOptions = [
        [{ 'font': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{'size': fontSizeArr}],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
        ['clean']
    ];

    var quill = new Quill('#quill-editor', {
        modules: {
            toolbar: toolbarOptions
        },
        placeholder: 'enter your content',
        readOnly: false,
        theme: 'snow'
    });
    
    const inputFile = document.querySelector("#inpFile");
    inputFile.addEventListener("change", function (event) {
        const input = document.querySelector("#inpFile");
        const output = document.querySelector("#fileList");
        const preview = document.querySelector(".preview-image");
        const dt = new DataTransfer();
        preview.innerHTML = "";
        let children = "";
        for (var i = 0; i < input.files.length; ++i) {
            const file = input.files.item(i);
            if(!checkInpImageType(file.name)){
                alert(`${input.files.item(i).name} : File type not supported!`);
                children += `<li  style="color:red;">${file.name} : File type not supported! </li>` ;
                continue;
            }
            dt.items.add(file);
            children += `<li> ${file.name} </li>`;
            //preview image
            var image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            preview.appendChild(image);
            image.addEventListener('load', function(event) {
                URL.revokeObjectURL(image.src) // free memory
            });
        }
        input.files = dt.files;
        output.innerHTML = `<ul> ${children} </ul>`;
    });

    function checkInpImageType(filename){
        const allowedFileTypes = [".bmp", ".jpg", ".jpeg", ".png", ".gif"];
        const extension = filename.toLowerCase().substring(filename.lastIndexOf("."));
        return allowedFileTypes.includes(extension);
    }

    var form = document.querySelector("#save-article");
    form.addEventListener("submit", function(event) {
        var article = document.querySelector('input[name=article]');
        article.value = quill.root.innerHTML;

        var deleteImgs = document.querySelector('input[name=deleteImgs]');
        const imgCheckboxes = document.querySelectorAll(".imgcheckbox");
        console.log(imgCheckboxes);
        for(let imgCheckbox of imgCheckboxes){
            if(imgCheckbox.checked == true){
                deleteImgs.value += `${imgCheckbox.value},`;
            }
        }
        
        console.log("Submitted", $(form).serialize(), $(form).serializeArray());

        // No back end to actually submit to!
        alert('Open the console to see the submit data!')
        return false;

    });

    initializeEditContent();

    async function initializeEditContent() {
        if(document.querySelector("#action").innerText != "EDIT")
            return;
        const articleId = document.querySelector("#articleId").value;
        //console.log(articleId);
        const articleInfo = await fetchArticleByArticleId(articleId);
        //console.log(articleInfo);
        document.querySelector("#title").value = articleInfo.title;
        document.querySelector("#theme").value = articleInfo.themeId;
        quill.root.innerHTML = articleInfo.content;
    }

    async function fetchArticleByArticleId(articleId) {
        const articleResponseObj = await fetch(`http://localhost:3000/getArticleInfo/${articleId}`);
        //console.log(articleResponseObj)
        const articleJson = await articleResponseObj.json();
        if (articleResponseObj.ok) {
          //console.log(`article JSON: ${JSON.stringify(articleJson)}`);
          return articleJson;
        } else {
          alert(`Error ${articleResponseObj.status}: ${JSON.stringify(articleJson.result)}`);
        }
    }
    
});