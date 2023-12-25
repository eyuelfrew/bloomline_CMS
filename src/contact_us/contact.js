const mapView = document.getElementById("map_view");
axios
  .get("http://localhost/Bloomline/admin/rest_api/location.php")
  .then((res) => {
    const response = res.data;
    if (response.status === 1) {
      const myDiv = document.createElement("div");
      myDiv.className = "row h-100";
      myDiv.innerHTML = `
          ${response.map}
          `;
      mapView.appendChild(myDiv);
    } else if (response.status === 0) {
    }
  })
  .catch((err) => {
    console.log(err);
  });
document.getElementById("contact_form").addEventListener("submit", (event) => {
  event.preventDefault();
  const firstName = document.querySelector('input[name="first_name"]').value;
  const lastName = document.querySelector('input[name="last_name"]').value;
  const addres = document.querySelector('input[name="address"]').value;
  const message = document.querySelector('textarea[name="message"]').value;
  const phoneNumber = document.querySelector(
    'input[name="phone_number"]'
  ).value;
  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("address", addres);
  formData.append("message", message);
  formData.append("phoneNumber", phoneNumber);
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
