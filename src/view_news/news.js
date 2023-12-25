const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const newsContainer = document.getElementById("news_img");
const news_content = document.getElementById("news_content");
axios
  .get(`http://localhost/Bloomline/admin/rest_api/post_news.php?id=${id}`)
  .then((res) => {
    const response = res.data;
    if (response.status === 1) {
      const div = document.createElement("div");
      div.className = "row";
      const imagURL = `http://localhost/Bloomline/admin/rest_api/uploads/${response.data.news_img}`;
      div.innerHTML = `
          <div>
            <img src="${imagURL}" class="img-fluid" style="width: 100%; max-height: 300px;" />
          </div>
        `;
      newsContainer.appendChild(div);
      const newsDiv = document.createElement("main");
      newsDiv.className = "";
      newsDiv.innerHTML = `${response.data.news_disc}`;
      news_content.appendChild(newsDiv);
    }
  })
  .catch((err) => {
    console.log(err);
  });
// const newswLink = document.getElementById("newsLink");
// axios
//   .get("http://localhost/Bloomline/admin/rest_api/post_news.php")
//   .then((res) => {
//     const response = res.data;
//     response.forEach((element) => {
//       const creatDiv = document.createElement("p");
//       creatDiv.className = "text-start";
//       creatDiv.innerHTML = `
//         <i class="fa-solid fa-arrow-right me-1"></i>
//         <a class=" fw-bold py-0" href="./../view_news/view_news.html?id=${element.id}">${element.news_intro}</a>
//       `;
//       newswLink.appendChild(creatDiv);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//recent blogs

//footer links

//display recent blogs
const recentNews = document.getElementById("recentPosts");
axios
  .get("http://localhost/Bloomline/admin/rest_api/post_news.php?recent=1")
  .then((res) => {
    const response = res.data;
    response.forEach((element) => {
      const creatDiv = document.createElement("div");
      creatDiv.className = "d-flex mb-3";

      creatDiv.innerHTML = `
                  <img
                    class="img-fluid w-50"
                    src="http://localhost/Bloomline/admin/rest_api/uploads/${element.news_img}"
                    // style="width: 100px; height: 100px; object-fit: cover"
                    alt=""
                  />
                  <a
                    href="./view_news.html?id=${element.id}"
                    class="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                    >${element.news_title}
                  </a>
      `;
      recentNews.appendChild(creatDiv);
    });
  })
  .catch((err) => {
    console.log(err);
  });
