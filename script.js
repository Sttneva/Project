const charList = document.getElementById('list-of-characters');
const charDetail = document.getElementById('character-detail');
const prevButton = document.getElementById('btn-previous');
const nextButton = document.getElementById('btn-next');
const loading = document.getElementById('loading-section');
const pageCounter = document.getElementById('page-counter');


// Отримання поточної сторінки з localStorage або встановлення на 1 за замовчуванням
let curPage = localStorage.getItem('currentPage') ? parseInt(localStorage.getItem('currentPage')) : 1;
// Кеш для зберігання даних, отриманих з API, щоб уникнути повторних запитів
let cache = {};

//Аватарки для персонажів
const avatarMap = {
    'Luke Skywalker': './ect/hero-avatar/Luke Skywalker.jpeg',
    'C-3PO': './ect/hero-avatar/C-3PO.png',
    'R2-D2': './ect/hero-avatar/R2-D2.jpeg',
    'Darth Vader': './ect/hero-avatar/Darth Vader.jpeg',
    'Leia Organa': './ect/hero-avatar/Leia Organa.webp',
    'Owen Lars': './ect/hero-avatar/Owen.png',
    'Beru Whitesun lars': './ect/hero-avatar/Beru.png',
    'R5-D4': './ect/hero-avatar/R5-D4.webp',
    'Biggs Darklighter': './ect/hero-avatar/Biggs Darklighter.webp',
    'Obi-Wan Kenobi': './ect/hero-avatar/Obi-Wan Kenobi.webp',
    'Anakin Skywalker': './ect/hero-avatar/Anakin Skywalker.webp',
    'Wilhuff Tarkin': './ect/hero-avatar/Wilhuff Tarkin.jpeg',
    'Chewbacca': './ect/hero-avatar/Chewbacca.jpeg',
    'Han Solo': './ect/hero-avatar/Han Solo.webp',
    'Greedo': './ect/hero-avatar/Greedo.jpeg',
    'Jabba Desilijic Tiure': './ect/hero-avatar/Jabba Desilijic Tiure.jpeg',
    'Wedge Antilles': './ect/hero-avatar/Wedge Antilles.webp',
    'Jek Tono Porkins': './ect/hero-avatar/Jek Tono Porkins.webp',
    'Yoda': './ect/hero-avatar/Yoda.png',
    'Palpatine': './ect/hero-avatar/Palpatine.webp',
    'Boba Fett': './ect/hero-avatar/Boba Fett.webp',
    'IG-88': './ect/hero-avatar/IG-88.jpeg',
    'Bossk': './ect/hero-avatar/Bossk.jpg',
    'Lando Calrissian': './ect/hero-avatar/Lando Calrissian.webp',
    'Lobot': './ect/hero-avatar/Lobot.webp',
    'Ackbar': './ect/hero-avatar/Ackbar.webp',
    'Mon Mothma': './ect/hero-avatar/Mon Mothma.webp',
    'Arvel Crynyd': './ect/hero-avatar/Arvel Crynyd.webp',
    'Wicket Systri Warrick': './ect/hero-avatar/Wicket Systri Warrick.png',
    'Nien Nunb': './ect/hero-avatar/Nien Nunb.webp',
    'Qui-Gon Jinn': './ect/hero-avatar/Qui-Gon Jinn.webp',
    'Nute Gunray': './ect/hero-avatar/Nute Gunray.webp',
    'Finis Valorum': './ect/hero-avatar/Finis Valorum.webp',
    'Padmé Amidala': './ect/hero-avatar/Padme.png',
    'Jar Jar Binks': './ect/hero-avatar/Jar Jar Binksss.png',
    'Roos Tarpals': './ect/hero-avatar/Roos Tarpals.webp',
    'Rugor Nass': './ect/hero-avatar/Rugor Nass.webp',
    'Ric Olié': './ect/hero-avatar/Ric Olié.webp',
    'Watto': './ect/hero-avatar/Watto.jpeg',
    'Sebulba': './ect/hero-avatar/Sebulba.webp',
    'Quarsh Panaka': './ect/hero-avatar/Quarsh Panaka.webp',
    'Shmi Skywalker': './ect/hero-avatar/Shmi Skywalker.webp',
    'Darth Maul': './ect/hero-avatar/Darth Maul.webp',
    'Bib Fortuna': './ect/hero-avatar/Bib Fortuna.webp',
    'Ayla Secura': './ect/hero-avatar/Ayla Secura.webp',
    'Ratts Tyerel': './ect/hero-avatar/Ratts Tyerel.webp',
    'Dud Bolt': './ect/hero-avatar/Dud Bolt.webp',
    'Gasgano': './ect/hero-avatar/Gasgano.webp',
    'Ben Quadinaros': './ect/hero-avatar/Ben Quadinaros.webp',
    'Mace Windu': './ect/hero-avatar/Mace Windu.webp',
    'Ki-Adi-Mundi': './ect/hero-avatar/Ki-Adi-Mundi.webp',
    'Kit Fisto': './ect/hero-avatar/Kit Fisto.webp',
    'Eeth Koth': './ect/hero-avatar/Eeth Koth.webp',
    'Adi Gallia': './ect/hero-avatar/Adi Gallia.webp',
    'Saesee Tiin': './ect/hero-avatar/Saesee Tiin.webp',
    'Yarael Poof': './ect/hero-avatar/Yarael Poof.webp',
    'Plo Koon': './ect/hero-avatar/Yarael Poof.webp',
    'Mas Amedda': './ect/hero-avatar/Mas Amedda.webp',
    'Gregar Typho': './ect/hero-avatar/Gregar Typho.webp',
    'Cordé': './ect/hero-avatar/Cordé.webp',
    'Cliegg Lars': './ect/hero-avatar/Cliegg Lars.jpeg',
    'Poggle the Lesser': './ect/hero-avatar/Poggle the Lesser.webp',
    'Luminara Unduli': './ect/hero-avatar/Luminara Unduli.webp',
    'Barriss Offee': './ect/hero-avatar/Barriss Offee.webp',
    'Dormé': './ect/hero-avatar/Dormé.webp',
    'Dooku': './ect/hero-avatar/Dookuu.png',
    'Bail Prestor Organa': './ect/hero-avatar/Bail Prestor Organa.jpeg',
    'Jango Fett': './ect/hero-avatar/Jango Fett.webp',
    'Zam Wesell': './ect/hero-avatar/Zam Wesell.webp',
    'Dexter Jettster': './ect/hero-avatar/Dexter Jettster.webp',
    'Lama Su': './ect/hero-avatar/Lama Su.webp',
    'Taun We': './ect/hero-avatar/Taun We.png',
    'Jocasta Nu': './ect/hero-avatar/Jocasta Nu.webp',
    'R4-P17': './ect/hero-avatar/R4-P17.webp',
    'Wat Tambor': './ect/hero-avatar/Wat Tambor.webp',
    'San Hill': './ect/hero-avatar/San Hill.webp',
    'Shaak Ti': './ect/hero-avatar/Shaak Ti.webp',
    'Grievous': './ect/hero-avatar/Grievous.webp',
    'Tarfful': './ect/hero-avatar/Tarfful.webp',
    'Raymus Antilles': './ect/hero-avatar/Raymus Antilles.webp',
    'Sly Moore': './ect/hero-avatar/Sly Moore.webp',
    'Tion Medon': './ect/hero-avatar/Tion Medon.webp',
};

//Функція для отримання даних з кешуванням
async function get(url) {
    if (cache[url]) {
        return cache[url];
    }
    const res = await fetch(url);
    const data = await res.json();
    cache[url] = data; // Зберігає в кеші
    return data;
}
//Функція для отримання персонажів з API
async function getCharacters(page) {
    const api = `https://swapi.dev/api/people/?page=${page}`;
    const data = await get(api);
    return data.results;
}
// Функція для показу деталей про персонажа
function showCharacterInfo(character, films, planet, species) {
    const filmTitles = films.map(film => `<li>${film.title}</li>`).join('');
    const avatarUrl = avatarMap[character.name] || './ect/hero-avatar/anonimus'; //якщо потрібної аватарки немає
    charDetail.innerHTML = `
    <span class="close" id="close-detail">&times;</span>
    <div class="character-header">
        <img src="${avatarUrl}" alt="${character.name}" class="character-avatar">
        <h2>${character.name}</h2>
    </div>
    <div class="character-info">
        <p>Birth Year: ${character.birth_year}</p>
        <p>Gender: ${character.gender}</p>
        <p>Homeworld: ${planet}</p>
        <p>Species: ${species}</p>
        <p>Films:</p>
        <ul>${filmTitles}</ul>
    </div>
`;
    charDetail.classList.add('show');

    // хрестик для закриття інфо о персонажах
    const closeDetailButton = document.getElementById('close-detail');
    closeDetailButton.addEventListener('click', hideCharacterInfo);
}


// Функція для приховування деталей про персонажа
function hideCharacterInfo() {
    charDetail.classList.remove('show');
}



//функція для завантаження персонажів
async function loadCharacters(page) {
    loading.style.display = 'block';
    const characters = await getCharacters(page);
    charList.innerHTML = '';
    characters.forEach(char => {
        const li = document.createElement('li');
        li.textContent = char.name;
        li.onclick = async () => {
            const [films, planet, species] = await Promise.all([
                Promise.all(char.films.map(url => get(url))),
                get(char.homeworld).then(data => data.name),
                char.species.length ? get(char.species[0]).then(data => data.name) : 'Unknown'
            ]);
            showCharacterInfo(char, films, planet, species);
        };
        charList.appendChild(li);
    });
    loading.style.display = 'none';
}

// Функція для оновлення лічильника сторінки
function updatePageCounter() {
    pageCounter.textContent = `${curPage}`;
    localStorage.setItem('currentPage', curPage);

    // Дезактивація кнопки "Next" на 9 сторінці
    if (curPage === 9) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}

// Додавання обробників подій для кнопок "Назад" та "Вперед"
prevButton.addEventListener('click', () => {
    if (curPage > 1) {
        curPage--;
        loadCharacters(curPage);
        updatePageCounter();
    }
});

nextButton.addEventListener('click', () => {
    if (curPage < 9) { // Доп перевірка
        curPage++;
        loadCharacters(curPage);
        updatePageCounter();
    }
});

// Початкове завантаження персонажів і оновлення лічильника сторінки
loadCharacters(curPage).then(() => updatePageCounter());
