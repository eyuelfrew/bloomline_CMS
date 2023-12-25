const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const newsContainer = document.getElementById("news_img");
const news_content = document.getElementById("news_content");
axios
  .get(`http://localhost/Bloomline/admin/rest_api/service.php?id=${id}`)
  .then((res) => {
    const response = res.data;
    if (response.status === 1) {
      const div = document.createElement("div");
      div.className = "row";
      const imagURL = `http://localhost/Bloomline/admin/rest_api/uploads/${response.data.pic}`;
      div.innerHTML = `
            <img src="${imagURL}" class="img-fluid w-100" />
        `;
      newsContainer.appendChild(div);
      const newsDiv = document.createElement("main");
      newsDiv.className = "";
      newsDiv.innerHTML = `${response.data.disc}`;
      news_content.appendChild(newsDiv);
    }
  })
  .catch((err) => {
    console.log(err);
  });
//more services
const newswLink = document.getElementById("Servicelinks");
axios
  .get("http://localhost/Bloomline/admin/rest_api/service.php")
  .then((res) => {
    const response = res.data;
    response.data.forEach((element) => {
      const creatDiv = document.createElement("div");
      creatDiv.className = "d-flex mb-3";

      creatDiv.innerHTML = `
                  <img
                    class="img-fluid w-50"
                    src="http://localhost/Bloomline/admin/rest_api/uploads/${element.pic}"
                    // style="width: 100px; height: 100px; object-fit: cover"
                    alt=""
                  />
                  <a
                    href="./view.html?id=${element.id}"
                    class="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                    >${element.title}
                  </a>
      `;
      newswLink.appendChild(creatDiv);
    });
  })
  .catch((err) => {
    console.log(err);
  });
///diplay links im footer
const serviceFooter = document.getElementById("serviceLinkList");
axios
  .get("http://localhost/Bloomline/admin/rest_api/service.php")
  .then((res) => {
    const response = res.data;
    if (response.status === 1) {
      response.data.forEach((element) => {
        const serviceLinks = document.createElement("p");
        serviceLinks.className = "text-left ";
        serviceLinks.innerHTML = `<i class="fa fa-arrow-circle-o-right"></i>
                <a href="./view.html?id=${element.id}" class="h4 font-weight-bold">${element.title}</a>`;
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
