tinymce.init({
  selector: "#news_disc",
  plugins:
    "ai tinycomments mentions anchor autolink charmap codesample emoticons  link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  tinycomments_mode: "embedded",
  tinycomments_author: "Author name",
  ai_request: (request, respondWith) =>
    respondWith.string(() =>
      Promise.reject("See docs to implement AI Assistant")
    ),
  content_css: "",
});
//upload news
document
  .getElementById("news_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const newsTitle = document.querySelector('input[name="news_title"]').value;
    const newsDiscription = tinymce.get("news_disc").getContent();
    const news_intro = document.querySelector(
      'textarea[name="news_intro"]'
    ).value;
    const newsImage = document.querySelector('input[name="news_image"]');

    if (newsTitle === "") {
      document.getElementById("title_error").innerText = "Title is required!";
      return;
    } else {
      document.getElementById("title_error").innerText = "";
    }
    if (news_intro === "") {
      document.getElementById("intro_error").innerText = "Write introdution!";
      return;
    } else {
      document.getElementById("intro_error").innerText = "";
    }
    if (newsDiscription === "") {
      document.getElementById("discription_error").innerText =
        "Discription is required!";
      return;
    } else {
      document.getElementById("discription_error").innerText = "";
    }
    if (newsImage.files.length === 0) {
      document.getElementById("news_image_error").innerText =
        "Photo is required!";
      return;
    } else {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(newsImage.files[0].type)) {
        document.getElementById("news_image_error").innerText =
          "Invalid File format, please select only images!";
        return;
      } else {
        document.getElementById("news_image_error").innerText = "";
        file_type = true;
      }
    }

    if (
      newsTitle !== "" &&
      newsDiscription !== "" &&
      file_type &&
      news_intro !== ""
    ) {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10);
      const formattedTime = now.toTimeString().slice(0, 8);
      const formData = new FormData();
      formData.append("news_title", newsTitle);
      formData.append("news_disc", newsDiscription);
      formData.append("news_image", newsImage.files[0]);
      formData.append("news_intro", news_intro);
      formData.append("post_date", formattedDate);
      formData.append("post_time", formattedTime);

      axios
        .post(
          "http://localhost/Bloomline/admin/rest_api/post_news.php?",
          formData
        )
        .then((res) => {
          const response = res.data;
          console.log(response);
          if (response.status === 1) {
            alert("News has been posted!");
          }
          resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
const resetForm = () => {
  document.getElementById("news_form").reset();
};

//display photo before posting
const imageInput = document.getElementById("imageInput");
const selectedImage = document.getElementById("selectedImage");

imageInput.addEventListener("change", function (event) {
  event.preventDefault();
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    selectedImage.src = reader.result;
  });

  reader.readAsDataURL(file);
});

//save location data
document.getElementById("location_form").addEventListener("submit", (event) => {
  event.preventDefault();
  const location = document.querySelector('textarea[name="location_link"]');
  const formData = new FormData();
  formData.append("location", location.value);
  axios
    .post("http://localhost/Bloomline/admin/rest_api/location.php", formData)
    .then((res) => {
      const response = res.data;
      if (response.status === 1) {
        document.getElementById("location_form").reset();
        mapDiv.innerHTML = "";
        getLocation();
      } else {
        document.getElementById("location_form").reset();
        alert("Map not saved!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//get location or map
const mapDiv = document.getElementById("display_map");
const getLocation = () => {
  axios
    .get("http://localhost/Bloomline/admin/rest_api/location.php")
    .then((res) => {
      const response = res.data;
      const divv = document.createElement("div");
      divv.innerHTML = "";
      if (response.status === 1) {
        divv.className = "row";
        divv.innerHTML = `
        <div><button class="btn btn-danger" onclick="deleteLocation(${response.id})">Remove location</button></div>
            ${response.map}
          `;
        mapDiv.appendChild(divv);
      } else if (response.status === 0) {
        const divv = document.createElement("div");
        divv.className = "row";
        divv.innerHTML = `
            <h4 class="text-danger text-center">No Location Added!</h4>
          `;
        mapDiv.appendChild(divv);
      }
    })
    .catch((err) => [console.log(err)]);
};
getLocation();
//delete or remove location or map
const deleteLocation = (id) => {
  axios
    .delete(`http://localhost/Bloomline/admin/rest_api/location.php?id=${id}`)
    .then((res) => {
      const response = res.data;
      console.log(response);
      if (res.data.status === 1) {
        mapDiv.innerHTML = "";
        getLocation();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
//
// store gallaries in to data base
//
document.getElementById("gallary_form").addEventListener("submit", (event) => {
  event.preventDefault();
  const image = document.querySelector('input[name="gallary_pic"]');
  const gallary_disc = document.querySelector(
    'input[name="gallary_disc"]'
  ).value;
  const option = document.getElementById("opt_select").value;
  const formDadta = new FormData();
  formDadta.append("image", image.files[0]);
  formDadta.append("disc", gallary_disc);
  formDadta.append("option", option);
  axios
    .post("http://localhost/Bloomline/admin/rest_api/_gallary.php", formDadta)
    .then((res) => {
      const response = res.data;
      gallaryCard.innerHTML = "";
      if (response.status === 1) {
        Swal.fire({
          title: "image stored!",
          text: "",
          icon: "success",
          confirmButtonText: "Done!",
        });
        getGallaryData();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
//display gallary pictures
const gallaryCard = document.getElementById("GallaryCard");
const getGallaryData = () => {
  axios
    .get("http://localhost/Bloomline/admin/rest_api/_gallary.php")
    .then((res) => {
      const response = res.data;
      if (response.status === 0) {
        const div = document.createElement("div");
        div.className = "row text-center";
        div.innerHTML = `
        <h3 class="text-danger mt-4">No Gallary Data!</h3>
        `;
        gallaryCard.appendChild(div);
      } else {
        response.data.forEach((element) => {
          const div = document.createElement("div");
          div.className = "col-3";
          const imgURL = `http://localhost/Bloomline/admin/rest_api/gallary/${element.image}`;
          div.innerHTML = `
        <div class="card w-100" style="width: 18rem">
          <img src="${imgURL}" class="card-img-top" alt="..." />
          <div class="card-body">
            <button type="button" onclick="deleteGallary(${element.id})" class="btn btn-danger w-100">Remove</button>
          </div>
        </div>`;
          gallaryCard.appendChild(div);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
getGallaryData();
//delete gallary
const deleteGallary = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to recover!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      // User clicked the "Yes" button
      axios
        .delete(
          `http://localhost/Bloomline/admin/rest_api/_gallary.php?id=${id}`
        )
        .then((res) => {
          const response = res.data;
          if (response.status === 1) {
            gallaryCard.innerHTML = "";
            Swal.fire({
              title: "Image Removed!",
              text: "",
              icon: "success",
              confirmButtonText: "Done!",
            });
            getGallaryData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // User clicked the "No" button or closed the modal
      Swal.fire("Cancelled", "Your file is safe.", "error");
    }
  });
};
//delete all gallary
const clearTable = (tableName) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Deleteing all images!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete all!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      // User clicked the "Yes" button
      axios
        .delete(
          `http://localhost/Bloomline/admin/rest_api/truncatTable.php?gallary=${tableName}`
        )
        .then((res) => {
          const response = res.data;
          if (response.status === 1) {
            gallaryCard.innerHTML = "";
            Swal.fire({
              title: "Image Removed!",
              text: "",
              icon: "success",
              confirmButtonText: "close!",
            });
            getGallaryData();
          } else if (response.status === 0) {
            Swal.fire({
              title: "Table Is Empty!",
              text: "there is no data to cleard!",
              icon: "error",
              confirmButtonText: "Done!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // User clicked the "No" button or closed the modal
      Swal.fire("Cancelled", "Your file is safe.", "error");
    }
  });
};
//
//post service api

//
tinymce.init({
  selector: "#service_disc",
  plugins:
    "ai tinycomments mentions anchor autolink charmap codesample emoticons  link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  tinycomments_mode: "embedded",
  tinycomments_author: "Author name",
  ai_request: (request, respondWith) =>
    respondWith.string(() =>
      Promise.reject("See docs to implement AI Assistant")
    ),
  content_css: "",
});
document
  .getElementById("service_post_form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const servicePicture = document.querySelector('input[name="service_pic"]');
    const serviceTitle = document.querySelector(
      'input[name="service_title"]'
    ).value;
    const serviceDisc = tinymce.get("service_disc").getContent();
    const formData = new FormData();
    formData.append("pic", servicePicture.files[0]);
    formData.append("title", serviceTitle);
    formData.append("disc", serviceDisc);
    axios
      .post("http://localhost/Bloomline/admin/rest_api/service.php", formData)
      .then((res) => {
        const response = res.data;
        if (response.status === 1) {
          serviceDisplayDiv.innerHTML = "";
          Swal.fire({
            title: "Service Added!",
            text: "",
            icon: "success",
            confirmButtonText: "close!",
          });
          getServices();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
//get services from data base
const serviceDisplayDiv = document.getElementById("display_service");
const getServices = () => {
  axios
    .get("http://localhost/Bloomline/admin/rest_api/service.php")
    .then((res) => {
      const response = res.data;
      if (response.status === 1) {
        response.data.forEach((element) => {
          const creatDiv = document.createElement("div");
          creatDiv.className = "row mt-1 mb-1 p-2";
          const imgURL = `http://localhost/Bloomline/admin/rest_api/uploads/${element.pic}`;
          creatDiv.innerHTML = ` 
          <div class="card w-100 bg-info">
                    <div class="row">
                      <div class="col-sm-8 col-md-4 col-lg-4">
                        <img
                          src="${imgURL}"
                          alt=""
                          class="img-fluid w-75"
                        />
                      </div>
                      <div class="col-sm-8 col-md-4 col-lg-4 d-flex align-items-center">
                        <p class="fs-3 w-100">
                          ${element.title}
                        </p>
                      </div>
                      <div class="col-sm-2 col-md-1 col-lg-1">
                        <button onclick="deleteService(${element.id})" class="btn btn-sm btn-danger mt-lg-5 mt-md-5">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                        <button id="button1" onclick="editService(${element.id})" class="btn btn-sm btn-primary mt-lg-2 mt-md-2">
                          <i class="fa-solid fa-pen"></i>
                        </button>
                      </div>
                    </div>
                  </div>
            `;
          serviceDisplayDiv.appendChild(creatDiv);
        });
      } else if (response.status === 0) {
        const creatDiv = document.createElement("div");
        creatDiv.className = "row";
        creatDiv.innerHTML = `<h3 class="text-danger text-center mt-5">No Services availabel!</h3>`;
        serviceDisplayDiv.appendChild(creatDiv);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
getServices();
//delete single service
const deleteService = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Deleteing Service!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(
          `http://localhost/Bloomline/admin/rest_api/service.php?id=${id}`
        )
        .then((res) => {
          const response = res.data;
          if (response.status === 1) {
            serviceDisplayDiv.innerHTML = "";
            Swal.fire({
              title: "Service Removed!",
              text: "",
              icon: "success",
              confirmButtonText: "close!",
            });
            getServices();
          } else if (response.status === 0) {
            Swal.fire({
              title: " Error Deleting!",
              text: "Server Error!",
              icon: "error",
              confirmButtonText: "close!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your file is safe.", "error");
    }
  });
};
const clearService = (service_table) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Deleteing All Services!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete All!",
    cancelButtonText: "No, Cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(
          `http://localhost/Bloomline/admin/rest_api/truncatTable.php?service=${service_table}`
        )
        .then((res) => {
          const response = res.data;
          if (response.status === 1) {
            serviceDisplayDiv.innerHTML = "";
            Swal.fire({
              title: "Service cleared!",
              text: "",
              icon: "success",
              confirmButtonText: "close!",
            });
            getServices();
          } else if (response.status === 0) {
            Swal.fire({
              title: " No service available!",
              text: "Server Error!",
              icon: "error",
              confirmButtonText: "close!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your file is safe.", "error");
    }
  });
};
tinymce.init({
  selector: "#edit_service_disc",
  plugins:
    "ai tinycomments mentions anchor autolink charmap codesample emoticons  link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
  toolbar:
    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  tinycomments_mode: "embedded",
  tinycomments_author: "Author name",
  ai_request: (request, respondWith) =>
    respondWith.string(() =>
      Promise.reject("See docs to implement AI Assistant")
    ),
  content_css: "",
});
//edit service
const editService = (id) => {
  const modalMy = new bootstrap.Modal("#editServiceModal");
  axios
    .get(`http://localhost/Bloomline/admin/rest_api/service.php?id=${id}`)
    .then((res) => {
      const respons = res.data;
      const content = respons.data;
      const serviceTitle = document.getElementById("edit_service_title");
      const servicePic = document.getElementById("edit_service_pic");
      serviceTitle.value = content.title;
      // servicePic.files[0] = `http://localhost/Bloomline/admin/rest_api/uploads/${content.pic}`;
      const serviceDisc = tinymce.get("edit_service_disc");
      serviceDisc.setContent(content.disc);
      modalMy.show();
    })
    .catch();
  document
    .getElementById("service_edit_form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const serviceTitle = document.getElementById("edit_service_title").value;
      const servicePic = document.getElementById("edit_service_pic");
      const serviceDisc = tinymce.get("edit_service_disc").getContent();
      const formData = new FormData();
      // formData.append("pic", servicePic.files[0]);
      formData.append("title", serviceTitle);
      formData.append("disc", serviceDisc);
      formData.append("pic", servicePic.files[0]);
      axios
        .post(
          `http://localhost/Bloomline/admin/rest_api/service.php?id=${id}`,
          formData
        )
        .then((res) => {
          const response = res.data;
          if (response.status === 1) {
            serviceDisplayDiv.innerHTML = "";
            Swal.fire({
              title: "Service Updated!",
              text: "",
              icon: "success",
              confirmButtonText: "close!",
            });
            getServices();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
};
//upload projects
document.getElementById("project_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const porjectImage = document.getElementById("project_img");
  const porjectName = document.getElementById("project_name").value;
  const projectFiled = document.getElementById("project_field").value;
  const projectType = document.getElementById("project_type").value;
  const projectStatus = document.getElementById("status").value;
  const projectLocation = document.getElementById("project_location").value;
  const formData = new FormData();
  formData.append("project_image", porjectImage.files[0]);
  formData.append("project_name", porjectName);
  formData.append("project_field", projectFiled);
  formData.append("project_type", projectType);
  formData.append("status", projectStatus);
  formData.append("location", projectLocation);
  axios
    .post("./../admin/rest_api/project.php", formData)
    .then((res) => {
      const response = res.data;
      console.log(response);
      if (response.status === 1) {
        projectDiv.innerHTML = "";
        $("#project_modal").modal("hide");
        Swal.fire({
          title: "Project Add!",
          text: "",
          icon: "success",
          confirmButtonText: "close!",
        });
        getProjects();
      } else {
        console.log(response);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//get projects
const projectDiv = document.getElementById("projectDiv");
const getProjects = () => {
  axios
    .get("./../admin/rest_api/project.php")
    .then((res) => {
      const response = res.data;
      console.log(response);
      if (response.status === 1) {
        response.data.forEach((element) => {
          const div = document.createElement("div");
          div.className = "col-3";
          const imgURL = `./../admin/rest_api/projects/${element.image}`;
          div.innerHTML = `
        <div class="card w-100 h-100" style="width: 18rem">
          <img src="${imgURL}" class="card-img-top" alt="..." />
          
          <div class="card-body">
            <h6 >Project name: <span class='text-primary'>${element.project_name}</span></h6>
            <h6>Project field: <span>${element.project_field}</span></h6>
            <h6>Project type: <span class='text-success fw-bold'>${element.project_type}</span></h6>

            <h6 id="statusProject">Project status: <span>${element.status}</span></h6>
            
          </div>
          <div class='card-footer bg-white border-top-0'>
           <button type="button" onclick="" class="btn btn-danger w-100">Remove</button>
          </div>
        </div>`;

          projectDiv.appendChild(div);
        });
      } else {
        const div = document.createElement("div");
        div.className = "row text-center";
        div.innerHTML = `
        <h3 class="text-danger mt-4">No Projects Data!</h3>
        `;
        projectDiv.appendChild(div);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
getProjects();
