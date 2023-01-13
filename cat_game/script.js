document.addEventListener('DOMContentLoaded', function (){
  const cardField = document.getElementById('cardField');
  const start = document.getElementById('start-game');
  const congrats = document.getElementById('final-game');
  const gameContent = document.querySelectorAll('.game-content'); 
  console.log(gameContent)
  
  // Добавляем массив со всеми картинками
  const images = [
    {
      name: 'img1',
      url:'src/1.jpg'
    },
    {
      name: 'img2',
      url:'src/2.jpg'
    },
    {
      name: 'img3',
      url:'src/3.jpg'
    },
    {
      name: 'img4',
      url:'src/4.jpg'
    },
    {
      name: 'img5',
      url:'src/5.jpg'
    },
    {
      name: 'img6',
      url:'src/6.jpg'
    },
    {
      name: 'img7',
      url:'src/7.jpg'
    },
    {
      name: 'img8',
      url:'src/8.jpg'
    }
  ]; 
  // создаем массив для выбранных карт
  let selectedCard = [];

  // создаем массив для совпавших карт
  let matched = [];

  // создаем массив для нажатых карт
  const currentSelectedCards = [];

  // Запуск игры
  let cardCount = document.getElementById("cardCount");
  const startGameButton = document.querySelectorAll('.button')[0];
  startGameButton.addEventListener('click', startGame);

  function startGame() {
    // задаем количество карточек на поле
    let valueCardCount = cardCount.options[cardCount.selectedIndex].innerHTML;

    /* берем из массива нужное количество картинок (выбрано пользователем), клонируем их
    и добавляем в один массив */
    let imagesArray = images.slice(0, (valueCardCount / 2)).concat(images.slice(0, (valueCardCount / 2)));

    // перемешиваем массив с изображениями
    const shuffle = ([...images]) => {
      let m = images.length;
        while (m) {
          const i = Math.floor(Math.random() * m--);
          [images[m], images[i]] = [images[i], images[m]];
        }
        return images;
      };
      let shuffleImages = shuffle(imagesArray);

    // убираем стартовый блок
    start.classList.add('hidden');
    gameContent[0].classList.remove('hidden');
    document.body.classList.add('game-body'); 

    // добавляем карточки на поле
    for (let i = 0; i < shuffleImages.length; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.classList.add('closed');
      card.setAttribute('data-name', i);
      const img = document.createElement('img');

      img.src = shuffleImages[i].url;
      cardField.append(card);
      card.append(img);
    }

    // начинаем игру
    let cards = document.querySelectorAll('.card'); 

    cards.forEach((card) => {
      // при клике на карту меняем ей класс активный/не активный
      card.addEventListener('click', handleClick);

      function handleClick() {
        // проверяем, что нажали не одну и ту же карту 
        if (currentSelectedCards.includes(card.dataset.name)) return;
        currentSelectedCards.push(card.dataset.name);

        // открываем карту
        card.classList.remove('closed');
        card.classList.add('opened');
        let selectedImg = document.querySelectorAll('.opened');

        //получаем url для сравнения
        let cardImg = card.firstElementChild;
        let urlImg = cardImg.getAttribute('src');
        selectedCard.push(urlImg);
  
        //сравниваем выбранные карты 
        if (selectedCard.length == 2) {
          currentSelectedCards.length = 0;

          // запрещаем дальнейшие щелчки по карточкам
          document.body.style.pointerEvents = "none"; 
          // если url не совпали, то переворачиваем обратно 
          if (selectedCard[0] !== selectedCard[1]) {
            setTimeout(() => {
              selectedImg[0].classList.remove('opened'); 
              selectedImg[0].classList.add('closed'); 
              selectedImg[1].classList.remove('opened');
              selectedImg[1].classList.add('closed'); 
            }, 500);

            // разрешаем щелчки по карточкам
            setTimeout(() => {
              document.body.style.pointerEvents = "auto";
            }, 500);
          }

          // если url совпали, добавляем карточкам класс matched и добавляем url в массив совпавших элементов
          if(selectedCard[0] == selectedCard[1]) { 
            setTimeout(() => {
              selectedImg[0].classList.add('matched'); 
              selectedImg[0].classList.remove('opened'); 
              selectedImg[1].classList.add('matched');
              selectedImg[1].classList.remove('opened'); 
            }, 500);

            // добавляем url в массив совпавших элементов
            matched.push(selectedCard[0]);

            // разрешаем щелчки по карточкам
            setTimeout(() => {
              document.body.style.pointerEvents = "auto";
            }, 500);
              
          }
          selectedCard.splice(0,selectedCard.length);
        }

        // если совпали все карточки, перезапускаем игру
        if (matched.length === shuffleImages.length / 2) {
          congrats.classList.remove('hidden');
          let restartButton = document.querySelectorAll('.button')[1]; 
          restartButton.addEventListener('click', restartGame);
        }
      };
    });

  }

  function restartGame() {
    shuffleImages = [];
    valueCardCount = 0;
    matched = [];
    selectedCard = [];
    cardCount.value = "value1";
    document.getElementById("cardField").innerHTML = "";
    congrats.classList.add('hidden');
    start.classList.remove('hidden');
    gameContent[0].classList.add('hidden');
    document.body.classList.remove('game-body'); 
  }; 

});


