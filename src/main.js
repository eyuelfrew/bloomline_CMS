$(document).ready(function () {
  ("use strict");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      { scrollTop: 0 },
      500,
      "easeInOutExpo",
      function () {
        $(".back-to-top").fadeOut("slow");
      }
    );
    return false;
  });

  // Additional handling for when the user manually scrolls to the top
  $(window).on("scroll", function () {
    if ($(this).scrollTop() === 0) {
      $(".back-to-top").fadeOut("slow");
    }
  });
});
var swiper = new Swiper(".Swiper_me", {
  watchSlidesProgress: true,
  slidesPerView: 1,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    578: {
      slidesPerView: 1,
    },
    478: {
      slidesPerView: 1,
    },
    305: {
      slidesPerView: 1,
    },
  },
});
//get certificates
const getCertificates = () => {
  axios
    .get("./../admin/rest_api/_gallary.php")
    .then((result) => {
      const response = result.data;
      const meetingDiv = document.getElementById("meetingSlider");
      const certificateCard = document.getElementById("ma_swaper");
      if (response.status === 0) {
        const cardDiv = (document.createElement("div").className = "row mt-5");
        cardDiv.innerHTML = `<h1 class="fw-bolder text-center"> No Certificate Avaialble!</h1>`;

        certificateCard.appendChild(cardDiv);
      } else if (response.status === 1) {
        response.data.forEach((element) => {
          if (element.type === "certificate") {
            const cardDiv = document.createElement("div");
            cardDiv.className = "swiper-slide";
            const certificateURL = `./../admin/rest_api/gallary/${element.image}`;
            cardDiv.innerHTML = `<img
                    src="${certificateURL}"
                    alt=""
                    style="width: 100%; max-height: 500px;  margin:20px 20px;"
                  />`;

            certificateCard.appendChild(cardDiv);
          } else if (element.type === "meeting") {
            const imgURL = `http://localhost/Bloomline/admin/rest_api/gallary/${element.image}`;
            const div = document.createElement("div");
            div.className = "swiper-slide  h-100 p-3 round-5";
            div.innerHTML = `
                <div class="bg-white d-flex flex-column align-items-center text-center shadow-lg ">
                  <img class="img-fluid" src="${imgURL}" alt="" />
                
                </div>
                      `;
            meetingDiv.appendChild(div);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
getCertificates();
//statics data number counting animation
const staticsDiv = document.getElementById("stat_Div");
const getStatics = () => {
  axios
    .get("./../admin/rest_api/stat.php")
    .then((res) => {
      const response = res.data;
      if (response.status === 1) {
        const displayData = document.createElement("div");
        displayData.className = "row g-5 justify-content-center p-5";
        displayData.innerHTML = `<div class="col-sm-12 col-md-4">
              <div class="card h-100 shadow border-info" style="border-radius:25px;">
                <div class="card-body text-center mt-5 ">
                  <h1 class="fs-1 text-center"><i class="fa-solid fa-users me-3 text-primary"></i>Employees</h1>
                  <p class="num mx-auto mt-5 fs-1 shadow fw-bold" data-val="${response.data.emp}">00</p>
                </div>
              </div>
            </div>
            <div class="col-sm-12 col-md-4" >
               <div class="card h-100 shadow border-info" style="border-radius:25px;">
                <div class="card-body text-center mt-5 ">
                  <h1 class="fs-1 text-center"><i class="fa-solid fa-face-smile me-3 text-primary"></i>Happy Clients</h1>
                  <p class="num mx-auto mt-5 fs-1 shadow fw-bold" data-val="${response.data.cli}">00</p>
                </div>
              </div>
            </div>`;
        staticsDiv.appendChild(displayData);
        let valuesDisplay = document.querySelectorAll(".num");
        let interval = 3000;
        valuesDisplay.forEach((valuesDisplay) => {
          let startValue = 0;
          let endValue = parseInt(valuesDisplay.getAttribute("data-val"));
          let duration = Math.floor(interval / endValue);
          let counter = setInterval(function () {
            startValue += 1;
            valuesDisplay.textContent = startValue;
            if (startValue == endValue) {
              clearInterval(counter);
            }
          }, duration);
        });
      }
    })
    .catch((err) => {});
};
getStatics();
//recent blogs
const newsDiv = document.getElementById("newsSlide");
axios
  .get("./../admin/rest_api/post_news.php?recent=1")
  .then((res) => {
    const response = res.data;
    console.log(response);
    response.forEach((element) => {
      const imgURL = `./../admin/rest_api/uploads/${element.news_img}`;
      const div = document.createElement("div");
      div.className = "swiper-slide  h-100 p-3 round-5";
      // div.style = "height:30rem;";
      div.innerHTML = `
            <div class="card bg-white d-flex flex-column   h-100">
              <img class="img-fluid" src="${imgURL}" alt="" />
              <p class="mx-1"><i class="fa-solid fa-calendar-days text-primary text-start"></i>${element.post_date}</p>
              <div class="px-4 pb-0">
                <h5 class="text-uppercase mb-1 text-center">${element.news_title}</h5>
                <div class='row w-100'>
                  <p class="text-center text-wrap">
                  ${element.news_intro}akjsdfksfhkjshdfnavlskdjuoifksfhkjshdfnavlskdjuoifksfhkjshdfnavlskdjuoisjdhbtlksjhdflabhksdfjlavkdfn;kflkvldf;akdlsk
                  </p>
                </div>
                <div class='card-footer border-top-0 bg-white'>
                <a
                  class="mt-5 btn btn-sm btn-primary text-white text-uppercase fw-bold link-opacity-100-hover"
                  href="./view_news/view_news.html?id=${element.id}"
                >
                  read more <i class="fa fa-arrow-right"></i>
                </a>
                </div>
              </div>
            </div>
`;
      newsDiv.appendChild(div);
    });
  })
  .catch((res) => {
    console.log(res);
  });

//footers links
const serviceFooter = document.getElementById("serviceLinkList");
const getServiceLinks = () => {
  axios
    .get("http://localhost/Bloomline/admin/rest_api/service.php")
    .then((res) => {
      const response = res.data;
      if (response.status === 1) {
        response.data.forEach((element) => {
          const serviceLinks = document.createElement("p");
          serviceLinks.className = "text-start ";
          serviceLinks.innerHTML = `<i class="fa fa-arrow-circle-o-right"></i>
                <a href="./../service/view.html?id=${element.id}" class="h4 fw-bold text-primary">${element.title}</a>`;
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
};
getServiceLinks();
