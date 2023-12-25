const allProjects = document.getElementById("all_projects");
const onGoingDiv = document.getElementById("on_progress");
const underReseach = document.getElementById("on_reasearch");
const completedProjets = document.getElementById("completed_projects");
const getProjects = () => {
  axios
    .get("./../../admin/rest_api/project.php")
    .then((res) => {
      const response = res.data;
      if (response.status === 1) {
        response.data.forEach((element) => {
          const maDiv = document.createElement("div");
          maDiv.className = "col-xl-4 col-lg-4 col-md-4 portfolio-item first";
          maDiv.innerHTML = `<div class="position-relative portfolio-box">
                          <img
                            class="img-fluid w-100"
                            src="./../../admin/rest_api/projects/${element.image}"
                            alt=""
                          />
                          <a class="portfolio-title shadow-sm">
                            <p class="fs-4 text-uppercase">${element.project_name}</p>
                            <span class="text-body">
                              <i class="fa fa-map-marker-alt text-primary me-2"></i>${element.location}
                            </span>
                          </a>
                          <a
                            class="portfolio-btn"
                            href="./../../admin/rest_api/projects/${element.image}"
                            data-lightbox="project"
                          >
                            <i class="fa fa-eye text-white"></i>
                          </a>
                      </div>;`;
          allProjects.appendChild(maDiv);
          if (element.project_type === "cms") {
            const undersConstructionDiv = document.createElement("div");
            undersConstructionDiv.className =
              "col-xl-4 col-lg-4 col-md-4 portfolio-item first";
            undersConstructionDiv.innerHTML = `<div class="card">
                          <div class=' bg-white position-relative portfolio-box'>
                            <img
                            class="img-fluid w-100 "
                            src="./../../admin/rest_api/projects/${element.image}"
                            alt=""
                            />
                          </div>
                          <div>
                            <a
                            class="portfolio-btn"
                            href="./../../admin/rest_api/projects/${element.image}"
                            data-lightbox="project"
                            >
                              <i class="fa fa-eye text-white"></i>
                            </a>
                          <a class="text-decoration-none" >
                            <p class="fs-4 text-uppercase">${element.project_name}</p>
                            <p class="text-body px-3">
                              <i class="fa fa-map-marker-alt text-primary me-1"></i>
                              Location: <span class='text-success'>${element.location}</span>
                            </p> 
                            <p class="text-body px-3">
                              <i class="fa-solid fa-paperclip text-primary me-1"></i>
                              Project Field: <span class='text-success'>${element.project_field}</span>
                            </p> 
                          </a>
                          </div>
                          <div class=' '>
                            <div class="progress ">
                              <div class="progress-bar"  role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                      </div>`;
            onGoingDiv.appendChild(undersConstructionDiv);
            const progressBar =
              undersConstructionDiv.querySelector(".progress-bar");
            const projectProgress = element.status;

            updateProgressBar(progressBar, projectProgress);
          }
          if (element.project_type === "rmd") {
            const researchDiv = document.createElement("div");
            researchDiv.className =
              "col-xl-4 col-lg-4 col-md-4 portfolio-item first";
            researchDiv.innerHTML = `<div class="position-relative portfolio-box">
                          <img
                            class="img-fluid w-100"
                            src="./../../admin/rest_api/projects/${element.image}"
                            alt=""
                          />
                          <a class="portfolio-title shadow-sm">
                            <p class="fs-4 text-uppercase">${element.project_name}</p>
                            <span class="text-body">
                              <i class="fa fa-map-marker-alt text-primary me-2"></i>${element.location}
                            </span>
                          </a>
                          <a
                            class="portfolio-btn"
                            href="./../../admin/rest_api/projects/${element.image}"
                            data-lightbox="project"
                          >
                            <i class="fa fa-eye text-white"></i>
                          </a>
                      </div>`;
            underReseach.appendChild(researchDiv);
          }

          if (element.status === "100") {
            console.log("works");
            const completedDiv = document.createElement("div");
            completedDiv.className =
              "col-xl-4 col-lg-4 col-md-4 portfolio-item first";
            completedDiv.innerHTML = `<div class="position-relative portfolio-box">
                          <img
                            class="img-fluid w-100"
                            src="./../../admin/rest_api/projects/${element.image}"
                            alt=""
                          />
                          <a class="portfolio-title shadow-sm">
                            <p class="fs-4 text-uppercase">${element.project_name}</p>
                            <span class="text-body">
                              <i class="fa fa-map-marker-alt text-primary me-2"></i>${element.location}
                            </span>
                          </a>
                          <a
                            class="portfolio-btn"
                            href="./../../admin/rest_api/projects/${element.image}"
                            data-lightbox="project"
                          >
                            <i class="fa fa-eye text-white"></i>
                          </a>
                      </div>;`;
            completedProjets.appendChild(completedDiv);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
getProjects();

const updateProgressBar = (progressBar, percentage) => {
  progressBar.style.width = percentage + "%";
  progressBar.setAttribute("aria-valuenow", percentage);
  progressBar.innerText = percentage + "%";
};
(function ($) {
  ("use strict");
  new WOW().init();
  //scrol up button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500, "easeInOutExpo");
    return false;
  });
  //tab animation
  $("#myTabs a").on("click", function (e) {
    e.preventDefault();
    $("#myTabs a").removeClass("active");
    $(this).addClass("active");
    $(".tab-pane").removeClass("flip-animation");
    const target = $(this).attr("href");
    $(target).addClass("flip-animation");
  });
  // Portfolio isotope and filter
  const tabLinks = document.querySelectorAll("#portfolio-flters .nav-link");
  tabLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      WOW.sync();
    });
  });
})(jQuery);
//
