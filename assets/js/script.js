const api_url = "https://api.jikan.moe/v4";

const searchText = document.querySelector("#searchText");
const searchResults = document.querySelector("#searchResults");

searchText.addEventListener("keyup", function () {
  if (this.value.length > 3) {
    getAnimes(this.value);
  }
});

async function getAnimes(query) {
  const res = await fetch(`${api_url}/anime?q=${query}`);
  const animes = await res.json();

  if (animes.data.length > 0) {
    searchResults.style.display = "block";
    searchResults.innerHTML = ``;
    animes.data.map((anime) => {
      searchResults.innerHTML += `
            <li class='singleAnime' data-image="${anime.images.jpg.image_url}">
                <a href='${anime.url}' target="_blank">${anime.title}</a>
            </li>
  
  `;
    });

    const singleAnimes = Array.from(document.querySelectorAll(".singleAnime"));
    const displayImage = document.querySelector("#displayImage");

    singleAnimes.map((singleAnime) => {
      singleAnime.addEventListener("mouseenter", function () {
        displayImage.style.display = "block";
        displayImage.innerHTML = `<img src="${this.dataset.image}">`;
      });

      singleAnime.addEventListener("mouseout", function () {
        displayImage.style.display = "none";
      });

      singleAnime.addEventListener("click", function () {
        displayImage.style.display = "none";
      });
    });
  }
}

const topTvAnime = document.querySelector("#topTvAnime");
async function getTopAnime() {
  const res = await fetch(`${api_url}/top/anime`);
  const topAnimes = await res.json();
  console.log(topAnimes.data);

  topAnimes.data.map((topAnime) => {
    topTvAnime.innerHTML += `
        <div class="col-lg-3 col-md-6">
            <div class="item">
              <div class="thumb">
                <a href="${topAnime.url}"
                  ><img src="${topAnime.images.jpg.image_url}" alt=""
                /></a>
                <span class="price">${topAnime.score}</span>
              </div>
              <div class="down-content">
                <span class="category">${topAnime.source}</span>
                <h4>${topAnime.title}</h4>
              </div>
            </div>
          </div>
    `;
  });
}
getTopAnime();

/* 

    <div class="col-lg-3 col-md-6">
            <div class="item">
              <div class="thumb">
                <a href="product-details.html"
                  ><img src="assets/images/trending-01.jpg" alt=""
                /></a>
                <span class="price"><em>$28</em>$20</span>
              </div>
              <div class="down-content">
                <span class="category">Action</span>
                <h4>Assasin Creed</h4>
                <a href="product-details.html"
                  ><i class="fa fa-shopping-bag"></i
                ></a>
              </div>
            </div>
          </div>
*/
