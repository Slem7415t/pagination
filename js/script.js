import {myCards} from './cards.js';

const previewBtn = document.querySelector('.preview__button');
const preview = document.querySelector('.preview');

previewBtn.onclick = () => {
    preview.style.display = 'none';
    document.querySelector('html').classList.remove('no-scroll');
}

function main() {
    const postsData = myCards(); // контент arrData
    let currentPage = 1; // номер-начальной-страницы page
    let rows = 10; // количество элементов на странице rowPerPage
    
    function displayList (arrData, rowPerPage, page) {
        const postsEl = document.querySelector('.cards'); // получаем div-контента
        postsEl.innerHTML = ""; // чистим div-контента от предыдущего контента,
        // перед размещением контента чтоб не накапливался
        page--; // уменьшаем номер-начальной-страницы т.к массив у нас с нуля
    
        const start = rowPerPage * page; // начало среза страницы
        const end = start + rowPerPage; // конец среза страницы
        const paginatedData = arrData.slice(start, end); // срез контента
        // который будет отображен на странице
    
        paginatedData.forEach((el) => {
            let item = document.createElement('div');
            item.classList.add('card');
    
            item.innerHTML = `
            <div class="card-img">
                <img src="${el.images}" alt="image-${el.id}" />
            </div>  
            <div class="card-content">
                <h3 class="card__title">${el.title}</h3>
                <p class="card__description">${el.description}</p>
                <button class="card__button btn" type="button" data-modal-btn="image-${el.id}">Подробнее</button>
            </div>
            `;
    
            document.querySelector('.cards').append(item);
    
            const preview = document.querySelector('.preview');
    
            document.querySelector(`[data-modal-btn="image-${el.id}"]`).addEventListener('click', function(){
    
                    
                let modal = document.querySelector(`[data-modal-img="image-${el.id}"]`);
    
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
                <img src="${el.images}" alt="image-${el.id}" data-modal-img="image-${el.id}" />
            `;
    
            document.querySelector('.preview').append(itemImg);

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
