let btn = document.querySelector("#search-btn");
let input = document.querySelector("#search-input");
let movieGrid = document.querySelector("#movie-grid");
let apiKey = "3532add2";
async function fetchMovies() {
  const search = input.value.trim();
  if (!search) return;
  movieGrid.innerHTML = `<p class="text-center col-span-full text-slate-400">Searching for "${search}"</p>`;
  try {
    const request = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`,
    );
    const data = await request.json();
    console.log(data);
    if (data.Response == "True") {
      let movies = data.Search;
      displayMovie(movies);
    } else {
      movieGrid.innerHTML = `<p class="text-center col-span-full text-slate-400">Searching for "${search}" failed!</p>`;
    }
  } catch (error) {
    console.error("fetch failed!", error);
  }
}
function displayMovie(movies) {
  movieGrid.innerHTML = "";
  movies.forEach((movie) => {
    const card = `<div class="group bg-slate-800/40 rounded-2xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-300">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"}" 
                     alt="${movie.Title}" 
                     class="w-full aspect-2/3 object-cover group-hover:scale-105 transition-transform duration-500">
                <div class="p-4">
                    <h3 class="font-bold text-white truncate">${movie.Title}</h3>
                    <p class="text-slate-400 text-sm mt-1">${movie.Year}</p>
                </div>
            </div>`;
    movieGrid.innerHTML += card;
  });
}
btn.addEventListener("click", fetchMovies);
input.addEventListener("keypress", (x) => {
  if (x.key === "Enter") fetchMovies();
});
