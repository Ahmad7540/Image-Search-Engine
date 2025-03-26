let accesskey = `CTHqmjc5fHtoVbqGYMRBO49XOsdEkZ3mIl_scwZcbWg`;
const searchBox = document.querySelector("#searchBox");
const searchBtn = document.querySelector("#searchBtn");
const imagecontainer = document.querySelector("#imagecontainer");
const showMoreBtn = document.querySelector("#showMoreBtn");
const errorMsg = document.querySelector(".error");

let keyword = "";
let page = 1;
let per = false;
async function showImage(e) {
  keyword = searchBox.value;
  if (per) {
    page = 1;
  }
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=12&client_id=${accesskey}`;
  errorMsg.style.display = "none";
  let response = await fetch(url);
  let data = await response.json();
  let results = data.results;

  if (results.length == 0) {
    imagecontainer.innerHTML = "";
    errorMsg.style.display = "block";
    showMoreBtn.style.display = "none";
  } else {
    showMoreBtn.style.display = "block";
    results.forEach((element) => {
      let image = document.createElement("img");
      image.src = element.urls.small;
      let anchor = document.createElement("a");
      anchor.href = element.links.download;
      anchor.target = "_blank";
      anchor.appendChild(image);

      imagecontainer.appendChild(anchor);
    });
  }
}
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  imagecontainer.innerHTML = "";
  per = true;
  showImage();
});

showMoreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page++;
  per = false;
  showImage();
});
