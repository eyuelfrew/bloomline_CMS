axios
  .get("http://localhost/Bloomline/admin/rest_api/post_news.php")
  .then((result) => {
    const res = result.data;
    console.log(res);
    const cardContainer = document.getElementById("cardContainer");
    if (res.status === 0) {
      const messageHTML = `
                <h1 class="text-center text-danger fs-3">No News Avaialble For Know!</h1>
            `;
      cardContainer.innerHTML = messageHTML;
    } else {
      res.forEach((element) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = " col-sm-12 col-md-4 col-lg-4 col-xl-4"; // Adjust Bootstrap classes as needed

        // Create the card HTML
        const imgUrl = `http://localhost/Bloomline/admin/rest_api/uploads/${element.news_img}`;
        const cardHTML = `
                <div class="card mt-4 h-100">
                    <div class="card-header bg-white border-bottom-0">
                        <img src="${imgUrl}" class="img-fluid"/>
                    </div>
                    <div class="card-title">
                        <h3 class="card-title text-primary mx-3">${
                          element.news_title
                        }</h3>
                    </div>
                    <div class="card-body">
                        
                        <p class="card-text">${element.news_disc.trim()}</p>
                    </div>
                    <div class="card-footer bg-white border-top-0">
                        <a href="" class="fs-4">See more</a>
                    </div>
                </div>
            `;

        cardDiv.innerHTML = cardHTML;
        cardContainer.appendChild(cardDiv);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
