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
  
  // Создание чипов
  function createChips(types) {
    const chipsDiv = document.createElement('div');
    chipsDiv.classList.add('chips-wrapper');
  
    types.forEach(type => {
      const chip = document.createElement('span');
      chip.classList.add('chip', type); // .design или .code
      chip.textContent = type === 'design' ? 'Дизайн' : 'Вёрстка';
      chipsDiv.appendChild(chip);
    });
  
    return chipsDiv;
  }
  
  // Отрисовка проектов
  function renderProjects() {
    Object.keys(sections).forEach(tab => {
      sections[tab].innerHTML = '';
    });
  
    projects.forEach(project => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = project.url;  // Устанавливаем ссылку на проект
      card.target = "_blank";    // Открывать в новом окне
  
      card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="card-content">
          <h3>${project.title}</h3>
          <div class="card-bottom">
            <div class="chips-wrapper">
              ${project.type.map(type =>
                `<span class="chip ${type}">${type === 'design' ? 'Дизайн' : 'Вёрстка'}</span>`
              ).join('')}
            </div>
            <a class="project-arrow" href="${project.url}" target="_blank" aria-label="Открыть проект">
              <span><svg width="32" height="32" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linejoin="round" stroke-width="2" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg"><path d="M6 12L18 12M18 12L14 8M18 12L14 16"></path></svg></span>
            </a>
          </div>
        </div>
      `;
  
      sections.all.appendChild(card);
      if (project.type.includes('design')) sections.design.appendChild(card.cloneNode(true));
      if (project.type.includes('code')) sections.code.appendChild(card.cloneNode(true));
    });
  }
  
  // Переключение вкладок
  function switchTab(e) {
    tabs.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    Object.values(sections).forEach(section => section.classList.add('hidden'));
    sections[e.target.dataset.tab].classList.remove('hidden');
  }
  
  tabs.forEach(tab => tab.addEventListener('click', switchTab));
  
  renderProjects();
  