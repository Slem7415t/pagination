async function getData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    return data;
} //получаем посты

async function main() {
    const postsData = await getData(); // контент arrData
    let currentPage = 1; // номер-начальной-страницы page
    let rows = 10; // количество элементов на странице rowPerPage

    function displayList (arrData, rowPerPage, page) {
        const postsEl = document.querySelector('.posts'); // получаем div-контента
        postsEl.innerHTML = ""; // чистим div-контента от предыдущего контента,
        // перед размещением контента чтоб не накапливался
        page--; // уменьшаем номер-начальной-страницы т.к массив у нас с нуля

        const start = rowPerPage * page; // начало среза страницы
        const end = start + rowPerPage; // конец среза страницы
        const paginatedData = arrData.slice(start, end); // срез контента
        // который будет отображен на странице

        paginatedData.forEach((el) => {
            const postEl = document.createElement("div"); // создаем div-элемента
            postEl.classList.add("post"); // добавляем класс div-элемента 
            postEl.innerText = `${el.title}`; // добавляем в div-элемент контент
            postsEl.appendChild(postEl); // добавляем div-элемента в div-контента
        }); // циклом добавляем все div-элемента в div-контента
    } // выводит контент в пределах среза

    function displayPagination (arrData, rowPerPage) {
        const paginationEl = document.querySelector('.pagination'); // получаем div-кнопок
        const pagesCount = Math.ceil(arrData.length / rowPerPage); // получаем количество кнопок в блоке
        const ulEl = document.createElement("ul"); // создаем контейнер-кнопок
        ulEl.classList.add('pagination__list') // добавляем класс контейнеру-кнопок

        for (let i = 0; i < pagesCount; i++) {
            const liEl = displayPaginationBtn(i + 1); // вызываем кнопку и присваиваем ей номер
            ulEl.appendChild(liEl) // добавляем кнопку в контейнер-кнопок
        } // циклом присваиваем каждой кнопке значение и добавляем её в контейнер-кнопок

        paginationEl.appendChild(ulEl) // добавляем контейнер-кнопок в div-кнопок
    } // выводит блок с кнопками 

    function displayPaginationBtn (page) {
        const liEl = document.createElement("li"); // создаем кнопку
        liEl.classList.add('pagination__item'); // присваиваем кнопке класс 
        liEl.innerText = page // присваиваем кнопке значение аргумента

        if (currentPage == page) liEl.classList.add('pagination__item_active'); //условие
        //если значение кнопки и номер-начальной-страницы совпадают ей добавляется класс active

        // событие(при нажатии на кнопку)
        liEl.addEventListener('click', () => {
            currentPage = page; // номеру-начальной-страницы присваивается значение-кнопки
            displayList(postsData, rows, currentPage); // получаем контент в пределах среза

            let currentItemLi = document.querySelector('li.pagination__item_active'); // получаем
            // кнопку с классом active
            currentItemLi.classList.remove('pagination__item_active'); // убираем класс active,
            // с полученной кнопки
            liEl.classList.add('pagination__item_active'); // добавляем класс active,
            // кнопке на которую нажали
        }) // вешаем событие на кнопку

        return liEl; // возвращаем кнопку в функцию
    } // создаем кнопку

    displayList(postsData, rows, currentPage); // вызываем контент в пределах среза
    displayPagination(postsData, rows); // вызываем блок с кнопками
} // блок с пагинацией

main(); // вызываем блок с пагинацией

const cards = [
    {
        "id": 1,
        "images" : "images/cards/image-1.jpg",
        "title" : "picture-1-title",
        "description" : "picture-1-description"
    },
    {
        "id": 2,
        "images" : "images/cards/image-2.jpg",
        "title" : "picture-2-title",
        "description" : "picture-2-description"
    },
    {
        "id": 3,
        "images" : "images/cards/image-3.jpg",
        "title" : "picture-3-title",
        "description" : "picture-3-description"
    }
];

const previewBtn = document.querySelector('.preview__button');
const preview = document.querySelector('.preview');

previewBtn.onclick = () => {
    preview.style.display = 'none';
    document.querySelector('html').classList.remove('no-scroll');
}

function createCard(selector, array) {
    for (let i = 0; i <= array.length; i++) {
        let item = document.createElement('div');
        item.classList.add('card');
        
        item.innerHTML = `
        <div class="card-img">
            <img src="${array[i]['images']}" alt="image-${array[i]['id']}" />
        </div>  
        <div class="card-content">
            <h3 class="card__title">${array[i]["title"]}</h3>
            <p class="card__description">${array[i]["description"]}</p>
            <button class="card__button btn" type="button" data-modal-btn="image-${array[i]['id']}">Подробнее</button>
        </div>
        `;

        document.querySelector(selector).append(item);

        const preview = document.querySelector('.preview');

        let btns = document.querySelectorAll("*[data-modal-btn]");

        btns[i].addEventListener('click', function(){

            let name = btns[i].getAttribute('data-modal-btn');
            let modal = document.querySelector("[data-modal-img='" + name + "']");

            let imgs = document.querySelectorAll(".preview__img img");    
            
            for (let itemImgs of imgs) {
                itemImgs.style.display = "none";
            }

            preview.style.display = "flex";
            modal.style.display = "flex";
            document.querySelector('html').classList.add('no-scroll');
        });

        let itemImg = document.createElement('div');
        itemImg.classList.add('preview__img');

        itemImg.innerHTML = `
            <img src="${array[i]['images']}" alt="image-${array[i]['id']}" data-modal-img="image-${array[i]['id']}" />
        `;

        document.querySelector('.preview').append(itemImg);

    }

}
createCard('.cards', cards);
