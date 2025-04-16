document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const allProjects = document.querySelector('#all');
    const designProjects = document.querySelector('#design');
    const markupProjects = document.querySelector('#markup');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс с всех вкладок
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Добавляем активный класс на выбранную вкладку
            button.classList.add('active');

            // Скрываем все секции проектов
            allProjects.classList.remove('active');
            designProjects.classList.remove('active');
            markupProjects.classList.remove('active');

            // Показываем только соответствующую вкладку
            if (button.dataset.tab === 'all') {
                allProjects.classList.add('active');
            } else if (button.dataset.tab === 'design') {
                designProjects.classList.add('active');
            } else if (button.dataset.tab === 'markup') {
                markupProjects.classList.add('active');
            }
        });
    });
});
