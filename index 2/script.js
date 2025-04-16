// script.js
const projects = [
    {
      title: 'ТРК «Гранд Каньон»',
      url: 'https://trk-canyon.ru/',
      image: 'assets/images/project1.jpg',
      type: ['design']
    },
    {
      title: 'Фитнес-клуб «Лидер спорт»',
      url: 'https://lider-sport.ru/',
      image: 'assets/images/project2.jpg',
      type: ['design']
    },
    {
      title: 'АНО «Алашара»',
      url: 'https://alashara.org/',
      image: 'assets/images/project3.jpg',
      type: ['design', 'code']
    },
    {
      title: 'МЦ «Гранд Каньон»',
      url: 'https://mebel-canyon.ru/',
      image: 'assets/images/project4.jpg',
      type: ['design']
    },
    {
      title: 'Автомойка «Гранд Каньон»',
      url: 'https://grandcanyon-auto.ru/',
      image: 'assets/images/project5.jpg',
      type: ['design', 'code']
    },
    {
      title: 'Лэндинг Черная пятница',
      url: 'http://offer.grandcanyon.ru/',
      image: 'assets/images/project6.jpg',
      type: ['design', 'code']
    },
    {
      title: 'Визитка отеля «Гранд Каньон»',
      url: 'https://connect.grandcanyon-hotel.ru/',
      image: 'assets/images/project7.jpg',
      type: ['design', 'code']
    },
    {
      title: 'Складской комплекс «МОРО»',
      url: 'https://moro.spb.ru/',
      image: 'assets/images/project8.jpg',
      type: ['design']
    }
  ];
  
  const tabs = document.querySelectorAll('.tab-button');
  const sections = {
    all: document.getElementById('all'),
    design: document.getElementById('design'),
    code: document.getElementById('code')
  };
  
  // Функция для создания чипов
  function createChips(types) {
    const chipsDiv = document.createElement('div');
    chipsDiv.classList.add('chips');
    
    types.forEach(type => {
      const chip = document.createElement('span');
      chip.classList.add('chip');
      chip.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Начальная заглавная буква
      chipsDiv.appendChild(chip);
    });
  
    return chipsDiv;
  }
  
  // Функция для отрисовки проектов
  function renderProjects() {
    Object.keys(sections).forEach(tab => {
      sections[tab].innerHTML = '';
    });
  
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
  
      // Создаем карточку
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3><a href="${project.url}" target="_blank">${project.title}</a></h3>
      `;
  
      // Создаём и добавляем чипы
      const chips = createChips(project.type);
      card.appendChild(chips);
  
      // Добавляем карточку в соответствующие секции
      sections.all.appendChild(card);
      if (project.type.includes('design')) sections.design.appendChild(card.cloneNode(true));
      if (project.type.includes('code')) sections.code.appendChild(card.cloneNode(true));
    });
  }
  
  // Функция для переключения вкладок
  function switchTab(e) {
    tabs.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    Object.values(sections).forEach(section => section.classList.add('hidden'));
    sections[e.target.dataset.tab].classList.remove('hidden');
  }
  
  // Добавляем обработчик событий на вкладки
  tabs.forEach(tab => tab.addEventListener('click', switchTab));
  
  // Отображаем проекты при загрузке страницы
  renderProjects();
  