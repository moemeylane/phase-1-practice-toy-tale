let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyContainer = document.getElementById("toy-collection");
  const toyForm = document.querySelector(".add-toy-form");

  function showToy(toy) {
    console.log(toy)
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes </p>
      `;
    const likeButton = document.createElement("button");
    likeButton.className = "like-btn";
    likeButton.innerText = "Like";
    likeButton.addEventListener("click", () => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: toy.likes + 1 }),
      })
        .then((response) => response.json())
        .then((data) => {
          toy.likes = data.likes;
          toyCard.querySelector("p").innerText = `${data.likes} Likes`;
        });
    });

    toyCard.appendChild(likeButton);
    toyContainer.appendChild(toyCard);
  }

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // ADD A TOY
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const toyName = event.target.name.value;
    const toyImage = event.target.image.value;

    const newToy = {
      name: toyName,
      image: toyImage,
      likes: 0,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((data) => {
        showToy(data);
      });
  });

  // GET ALL TOYS
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((toy) => {
        showToy(toy);
      });
    });
});