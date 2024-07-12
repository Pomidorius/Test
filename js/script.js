window.addEventListener('DOMContentLoaded', () => {
    const slidesTitleWrapperTitle = document.querySelector('.promo__slider-wrapper'),
        slidesField = document.querySelector('.promo__slider-inner'),
        slidesTitle = document.querySelectorAll('.promo__slide'),
        indicators = document.querySelectorAll('.promo-nav__item'),
        heightTitle = window.getComputedStyle(slidesTitleWrapperTitle).height,
        animatedElements1 = document.querySelectorAll(".promo__slider_animate1"),
        animatedElements2 = document.querySelectorAll(".promo__slider_animate2"),
        animatedElements3 = document.querySelectorAll(".promo__slider_animate3"),
        modal = document.querySelector('.nav-modal'),
        openner = document.querySelector('.nav__shapes'),
        nav = document.querySelector('.nav'),
        closer = document.querySelector('.nav-modal__closer'),
        cursor = document.getElementById('customCursor'),
        hoverElements = document.querySelectorAll('a, button, .btn'),
        firstSection = document.querySelector('.promo'),
        aside = document.querySelector('.sidebar');

    let slideIndex = 1,
        offset = -1,
        dataslidesTitleIndex = 1;

    // Устанавливаем высоту слайдов
    const setSlidesHeight = (elements, height) => {
        elements.forEach(element => {
            element.style.height = height;
        });
    };

    slidesField.style.height = 100 * slidesTitle.length + '%';
    setSlidesHeight(slidesTitle, heightTitle);

    // Функции для работы с анимацией
    const removeAnimationClasses = () => {
        [...animatedElements1, ...animatedElements2, ...animatedElements3].forEach(elem => {
            elem.classList.remove("animated-up");
        });
    };

    const buildAnimationClasses = (index) => {
        let elements;
        if (index == 2) {
            elements = animatedElements1;
        } else if (index == 3) {
            elements = animatedElements2;
        } else if (index == 4) {
            elements = animatedElements3;
        }

        if (elements) {
            elements.forEach(elem => elem.classList.add("animated-up"));
        }
    };

    // Инициализация индикаторов
    indicators.forEach((indicator, i) => {
        indicator.setAttribute('data-slide-to', i + 2);
        if (i === -1) {
            indicator.classList.add("promo-nav__item_active");
        }

        indicator.addEventListener('click', () => {
            const slideTo = +indicator.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = +heightTitle.slice(0, heightTitle.length - 2) * (slideTo - 1);

            removeAnimationClasses();
            buildAnimationClasses(slideTo);

            slidesField.style.transform = `translateY(-${offset}px)`;
            indicators.forEach(ind => ind.classList.remove("promo-nav__item_active"));
            indicator.classList.add("promo-nav__item_active");
        });
    });

    // Событие прокрутки колесика
    window.addEventListener('wheel', (event) => {
        if (slideIndex === slidesTitle.length) return;

        slideIndex += event.deltaY > 0 ? 1 : -1;
        slideIndex = Math.max(1, Math.min(slideIndex, slidesTitle.length));

        offset = +heightTitle.slice(0, heightTitle.length - 2) * (slideIndex - 1);
        slidesField.style.transform = `translateY(-${offset}px)`;

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("promo-nav__item_active", index + 2 === slideIndex);
        });

        removeAnimationClasses();
        buildAnimationClasses(slideIndex);

        document.body.style.overflow = slideIndex === slidesTitle.length ? 'auto' : 'hidden';
    });

    // Обработчики для открытия/закрытия модального окна
    const toggleModal = () => {
        modal.classList.toggle('nav-modal_active');
        nav.classList.toggle('nav_hidden');
    };

    openner.addEventListener('click', toggleModal);
    closer.addEventListener('click', toggleModal);

    // Кастомный курсор
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mousedown', () => cursor.classList.add('active'));
        el.addEventListener('mouseup', () => cursor.classList.remove('active'));
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursor.classList.remove('active');
        });
    });

    // Обработчик прокрутки для изменения класса aside и nav
    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const firstSectionHeight = (firstSection.offsetHeight - (firstSection.offsetHeight / 1.1));

        aside.classList.toggle('negative__aside', scrollTop > firstSectionHeight);
        nav.classList.toggle('negative', scrollTop > firstSectionHeight);
    };

    window.addEventListener('scroll', handleScroll);

    // Обновление активной ссылки в боковой панели
    const getActiveSection = () => {
        const sections = document.querySelectorAll('section');
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                return section.id;
            }
        }
        return null;
    };

    const updateActiveLink = () => {
        const activeSectionId = getActiveSection();
        const links = document.querySelectorAll('.sidebar__wrapper');
        links.forEach(link => {
            link.classList.toggle('sidebar__link_active', link.querySelector('.sidebar__link').getAttribute('href') === `#${activeSectionId}`);
        });
    };

    document.addEventListener('DOMContentLoaded', updateActiveLink);
    window.addEventListener('scroll', updateActiveLink);
});
