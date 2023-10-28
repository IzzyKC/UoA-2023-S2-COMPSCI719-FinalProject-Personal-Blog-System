window.addEventListener("load", function(){

    //Each avatar src is stored in a variable

    const ape = "public/images/ape.jpg";
    const cat = "public/images/cat.jpg";
    const dog = "public/images/dog.jpg";
    const fox = "public/images/fox.jpg";
    const koala = "public/images/koala.jpg";
    const lion = "public/images/lion.jpg";
    const rabbit = "public/images/rabbit.jpg";
    const tiger = "public/images/tiger.jpg";

    //Initiate the array

    const avatar = [ape, cat, dog, fox, koala, lion, rabbit, tiger];

    console.log(avatar);

    const imageContainer = document.getElementById("avatar");


    //This displays the avatars on the page from the array
    for (let i = 0; i < avatar.length; i++) {
        const img = document.createElement("img");
        img.src = avatar[i];
        img.alt = "Avatar";
        img.style.width = "150px";
        img.style.padding = "10px";
        img.setAttribute("avatar-id", i); 
        imageContainer.appendChild(img);
      }

      //This function shows the image id when logged of the avatar selected
    imageContainer.addEventListener("click", function(event) {
        if (event.target.tagName === "IMG") {
          const selectedImageId = event.target.getAttribute("avatar-id");
          console.log("Selected image ID:", selectedImageId);
          displayselectedAvatar(selectedImageId);
        }

        //Function to display the selected image where we would like to put it
        function displayselectedAvatar(selectedImageID){
            let avatarContainer = document.querySelector("#profilePic");

            avatarContainer.innerHTML = `<img src = ${avatar[selectedImageID]}>`;
        }
    })
})