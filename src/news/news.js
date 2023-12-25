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
      res.data.forEach((element) => {
        // Adjust Bootstrap classes as needed
        const cardDiv = document.createElement("div");
        cardDiv.className = "mt-4 col-sm-12 col-md-4 col-lg-4 col-xl-4";
        // Create the card HTML
        const imgUrl = `http://localhost/Bloomline/admin/rest_api/uploads/${element.news_img}`;
        const cardHTML = `
                <div class="card  h-100 w-100 shadow">
                    <div class="card-header bg-white border-bottom-0">
                        <img src="${imgUrl}" class="img-fluid "/>
                        <div>
                      <p class="bg-success text-white">post date ${element.post_date}</p>
                    </div>
                    </div>
                    
                    <div class=" mt-0">
                        <h4 class="card-title text-primary mx-3">${element.news_title}</h4>
                        <p class="  mx-3 fs-5"><i class="fa-solid fa-quote-left"></i>${element.news_intro}. . .<i class="fa-solid fa-quote-right"></i></p>
                    </div>
                    <div class="card-footer bg-white border-top-0">
                        <a href="./../view_news/view_news.html?id=${element.id}" class="_see_more ">Read more</a>
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
//footer service link
const serviceFooter = document.getElementById("serviceLinkList");
axios
  .get("http://localhost/Bloomline/admin/rest_api/service.php")
  .then((res) => {
    const response = res.data;
    if (response.status === 1) {
      response.data.forEach((element) => {
        const serviceLinks = document.createElement("p");
        serviceLinks.className = "text-start ";
        serviceLinks.innerHTML = `<i class="fa fa-arrow-circle-o-right"></i>
                <a href="./../view_news/view_news.html?id=${element.id}"" class="h4 fw-bold text-primary">${element.title}</a>`;
        serviceFooter.appendChild(serviceLinks);
      });
    } else if (response.status === 0) {
      const div = document.createElement("h1");
      div.className = "text-danger text-center mt-5";
      div.innerHTML = `No Services available!`;
      serviceFooter.appendChild(div);
    }
  })
  .catch((err) => {
    console.log(err);
  });
