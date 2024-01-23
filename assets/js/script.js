const api_url = "https://api.jikan.moe/v4";

const searchText = document.querySelector("#searchText");

searchText.addEventListener("keyup", function () {
  if (this.value.length > 3) {
    getAnimes(this.value);
  }
});

async function getAnimes(query) {
  const res = await fetch(`${api_url}/anime?q={query}`);
  const animes = await res.json();
  console.log(animes.data);
}
