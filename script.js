let filter = "";
let item = "";
let counter = 10;
let newArr = [];
const url = "https://swapi.dev/api/";
const btn = document.getElementById("swapi__btn");
const hints = document.querySelectorAll(".swapi__hint-item");
const inputValue = document.getElementById("swapi__input");
const eqeq = document.querySelector(".swapi__output-wrapper");
const showmore = document.querySelector(".swapi__output-btn");

hints.forEach((element) => {
  element.addEventListener("click", (e) => {
    counter = 10;
    inputValue.value = "";
    filter = element.dataset.id;
    hints.forEach((el) => {
      el.classList.remove("active");
    });
    inputValue.placeholder = element.textContent;
    element.classList.add("active");
  });
});

btn.addEventListener("click", () => {
  counter = 10;
  newArr = [];
  console.log(filter);
  filter == "" ? (filter = "people") : "";
  getCharacters(newArr);
});

showmore.addEventListener("click", () => {
  counter += 10;
  getCharacters(newArr);
});

async function getData(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  return respData;
}

async function getCharacters(newArr) {
  newArr = [];
  showmore.classList.add("hidden");
  eqeq.textContent = "";
  item.textContent = "";
  const movie = await getData(`${url}/${filter}/?search=${inputValue.value}`);

  let pages = Math.floor(movie.count / 10);

  if (movie.count % 10 != 0) {
    pages += 1;
  }

  for (let i = 1; i <= pages; i++) {
    wq = await getData(
      `${url}/${filter}/?search=${inputValue.value}&page=${i}`
    );
    newArr.push(wq.results);
  }

  const returnArr = await Promise.all(newArr.flat());

  if (movie.next != null) {
    showmore.classList.remove("hidden");
  } else {
    showmore.classList.add("hidden");
  }

  if (counter >= returnArr.length) {
    showmore.classList.add("hidden");
  } else {
    showmore.classList.remove("hidden");
  }

  if (returnArr.length == 0) {
    eqeq.textContent = "Nothing was found on the request";
  }

  for (let i = 0; i < counter; i++) {
    if (filter == "people") {
      eqeq.innerHTML += `<div class="swapi__output-item">
      <div class="swapi__output-description">
        <p class="swapi__output-name">name:${returnArr[i].name}</p>
        <p class="swapi__output-name">gender:${returnArr[i].gender}</p>
        <p class="swapi__output-name">birth year:${returnArr[i].birth_year}</p>
        <p class="swapi__output-name">skin:${returnArr[i].skin_color}</p>
      </div>
    </div>`;
    } else if (filter == "films") {
      eqeq.innerHTML += `<div class="swapi__output-item">
      <div class="swapi__output-description">
        <p class="swapi__output-name">title:${returnArr[i].title}</p>
        <p class="swapi__output-name">release_date:${returnArr[i].release_date}</p>
        <p class="swapi__output-name">producer:${returnArr[i].producer}</p>
        <p class="swapi__output-name">episode_id:${returnArr[i].episode_id}</p>
      </div>
    </div>`;
    } else if (filter == "planets") {
      eqeq.innerHTML += `<div class="swapi__output-item">
      <div class="swapi__output-description">
        <p class="swapi__output-name">name:${returnArr[i].name}</p>
        <p class="swapi__output-name">gravity:${returnArr[i].gravity}</p>
        <p class="swapi__output-name">terrain:${returnArr[i].terrain}</p>
        <p class="swapi__output-name">climate:${returnArr[i].climate}</p>
      </div>
    </div>`;
    } else if (filter == "species") {
      eqeq.innerHTML += `<div class="swapi__output-item">
      <div class="swapi__output-description">
        <p class="swapi__output-name">name:${returnArr[i].name}</p>
        <p class="swapi__output-name">language:${returnArr[i].language}</p>
        <p class="swapi__output-name">skin_colors:${returnArr[i].skin_colors}</p>
        <p class="swapi__output-name">classification:${returnArr[i].classification}</p>
      </div>
    </div>`;
    } else if (filter == "starships") {
      eqeq.innerHTML += `<div class="swapi__output-item">
      <div class="swapi__output-description">
        <p class="swapi__output-name">name:${returnArr[i].name}</p>
        <p class="swapi__output-name">passengers:${returnArr[i].passengers}</p>
        <p class="swapi__output-name">max_speed:${returnArr[i].max_atmosphering_speed}</p>
        <p class="swapi__output-name">length:${returnArr[i].length}</p>
      </div>
    </div>`;
    } else if (filter == "vehicles") {
      eqeq.innerHTML += `<div class="swapi__output-item">
      <div class="swapi__output-description">
        <p class="swapi__output-name">name:${returnArr[i].name}</p>
        <p class="swapi__output-name">passengers:${returnArr[i].passengers}</p>
        <p class="swapi__output-name">max_speed:${returnArr[i].max_atmosphering_speed}</p>
        <p class="swapi__output-name">length:${returnArr[i].length}</p>
      </div>
    </div>`;
    }
  }

  console.log(counter);
  console.log(`len=> ${returnArr.length}`);
}
