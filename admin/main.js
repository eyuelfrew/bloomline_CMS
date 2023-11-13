document
  .getElementById("news_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const newsTitle = document.querySelector('input[name="news_title"]').value;
    const newsDiscription = document.querySelector(
      'textarea[name="news_discription"]'
    ).value;
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
//submit certificates to data base

document
  .getElementById("Cert_form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const certificate = document.querySelector('input[name="cert_photo"]');
    const cert_disc = document.querySelector('input[name="cert_disc"]').value;
    console.log(certificate.files[0]);
    console.log(cert_disc);
  });
// const newsImage = document.querySelector('input[name="news_image"]');
