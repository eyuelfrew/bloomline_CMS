// const mainView = document.getElementById("display_main");
const mainView = document.querySelector("main");
const porjectTab = document.getElementById("view_porjects");
const designeCere = document.getElementById("view_design");
const viewCeleb = document.getElementById("view_celeb");
const getAllGallary = () => {
  axios
    .get("http://localhost/Bloomline/admin/rest_api/_gallary.php")
    .then((result) => {
      const response = result.data;
      if (response.length > 0) {
        response.forEach((element) => {
          if (element.opt == "project") {
            const divpro = document.createElement("div");
            divpro.className = "col-sm-6 col-md-6 col-lg-6";
            divpro.innerHTML = `<img
                  src="http://localhost/Bloomline/admin/rest_api/gallary/${element.image}"
                  alt=""
                  class="image-container"
                />`;
            porjectTab.appendChild(divpro);
          }
          if (element.opt == "designe") {
            const divpro = document.createElement("div");
            divpro.className = "col-sm-6 col-md-6 col-lg-6";
            divpro.innerHTML = `<img
                  src="http://localhost/Bloomline/admin/rest_api/gallary/${element.image}"
                  alt=""
                  class="image-container"
                />`;
            designeCere.appendChild(divpro);
          }
          if (element.opt == "celeb") {
            const divpro = document.createElement("div");
            divpro.className = "col-sm-6 col-md-6 col-lg-6";
            divpro.innerHTML = `<img
                  src="http://localhost/Bloomline/admin/rest_api/gallary/${element.image}"
                  alt=""
                  class="image-container"
                />`;
            viewCeleb.appendChild(divpro);
          }
        });
      } else if (response.status === 0) {
        mainView.innerHTML = "";
        const div = document.createElement("div");
        div.className = "row mt-5";
        div.innerHTML = `<h1 class="text-center text-danger">
       <i class="fa-solid fa-face-frown"></i> No gallary avaialbe!</h1>`;
        mainView.appendChild(div);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
getAllGallary();
{
  /* <div class="col-sm-6 col-md-6 col-lg-6">
                <img
                  src="./../../assest/test.jpg"
                  alt=""
                  class="image-container"
                />
              </div>
              <div class="col-sm-6 col-md-6 col-lg-6">
                <img
                  src="./../../assest/test.jpg"
                  alt=""
                  class="image-container"
                />
              </div> */
}
