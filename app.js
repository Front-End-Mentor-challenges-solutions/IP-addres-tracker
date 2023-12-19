const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("#searchBtn");

const ipAddress = document.querySelector("#ip_address");
const loca = document.querySelector("#location");
const timeZone = document.querySelector("#timezone");
const ISP = document.querySelector("#ISP");
let map;
map = L.map("map").setView([9.026, -38.7439], 17);

const render = (ip = "") => {
  fetch(`https://ipapi.co/${ip}/json`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      ipAddress.innerHTML = data.ip;
      loca.innerHTML = `${data.region}, ${data.country_name}`;
      timeZone.innerHTML = `UTC ${data.utc_offset}`;
      ISP.innerHTML = data.org;
      if (!data.error) {
        searchInput.classList.remove("danger");
        map.setView([data.latitude, data.longitude], 17);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 22,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
      } else {
        searchInput.classList.add("danger");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("some thing went wrong.");
    });
};
searchBtn.addEventListener("click", () => {
  const inputValue = searchInput.value;
  console.log("clicked", inputValue);
  render(inputValue);
});

render();
