document.addEventListener("DOMContentLoaded", () => {
    const starContainers = document.querySelectorAll('.user-star');
    const UserInput = document.querySelector('.TextInput');
    const UserInputName = document.querySelector('.TextInput2');
    const UserInputButton = document.querySelector('.TextButton');
    const modal = document.getElementById('modalUserRewiew');
    const closeModalButton = document.getElementById('closeModalAboutUs');
    const modalInnerText = document.getElementById('modalReviewContent');

    let selectedStars = 0; // Сохраняем количество выбранных звезд

    // Логика выбора звезд
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.ratingItem');

        stars.forEach(star => {
            star.addEventListener('click', () => {
                const selectedValue = parseInt(star.dataset.itemValue);

                stars.forEach(s => {
                    const starValue = parseInt(s.dataset.itemValue);
                    s.style.color = starValue <= selectedValue ? 'gold' : 'black';
                });

                container.dataset.totalValue = selectedValue;
                selectedStars = selectedValue;
                console.log("Star rating:", selectedStars);
            });
        });
    });

    // Логика отправки отзыва
    UserInputButton.addEventListener('click', () => {
        if (selectedStars === 0) {
            alert('Please select a star rating before submitting.');
            return;
        }

        const savedInput = UserInput.value.trim();
        const savedName = UserInputName.value.trim();

        if (savedInput === '') {
            alert('Please enter your review.');
            return;
        }

        // Формируем строку со звездами
        let starIcons = '';
        for (let i = 1; i <= 5; i++) {
            starIcons += i <= selectedStars
                ? '<i class="fa-solid fa-star" style="color: gold;"></i>'
                : '<i class="fa-regular fa-star" style="color: black;"></i>';
        }

        // Формируем текст отзыва
        const reviewText = `
            <p><b>Name and age:</b> ${savedName || 'Anonymous'}</p>
            <p><b>Rating:</b> ${starIcons}</p>
            <p><b>Review:</b> ${savedInput}</p>
        `;

        modalInnerText.innerHTML = reviewText; // Отображаем HTML в модальном окне
        modal.style.display = 'flex'; // Показываем модальное окно

        // Очищаем поля ввода
        UserInput.value = '';
        UserInputName.value = '';
    });

    // Закрытие модального окна
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});
