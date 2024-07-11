window.addEventListener('DOMContentLoaded', ( )=> {
    const slidesTitleWrapperTitle = document.querySelectorAll('.promo-title__slider-wrapper'),
        slidesField = document.querySelectorAll('.promo-title__slider-inner'),
        slidesTitle = document.querySelectorAll('.promo-title__slide'),
        indicators = document.querySelectorAll('.promo-nav__item'),
        heightTitle = window.getComputedStyle(slidesTitleWrapperTitle[0]).height;

    const slidesDescr = document.querySelectorAll(".promo-descr__slide");
    const promoSection = document.querySelector('#bg-promo');
    const video = document.querySelector('.bg-video');
    const sliderHide = document.querySelector('.slider_hide');
    const videoOveraly = document.querySelector('.video__overlay');

    let slideIndex = 0;
    let offset = 0;
    let dataslidesTitleIndex = 0;

    slidesField.forEach(element => {
        element.style.height = 100 * slidesTitle.length + '%';
        slidesTitle.forEach(slide => {
            slide.style.height = heightTitle;
        });
        element.style.heightTitle = 100 * slidesDescr.length + '%';
        slidesDescr.forEach(slide => {
            slide.style.height = heightTitle;
        });
    });

    indicators.forEach(indicator => {
        dataslidesTitleIndex++;
        indicator.setAttribute('data-slide-to', dataslidesTitleIndex);
        if(dataslidesTitleIndex == 1) {
            indicator.classList.toggle("promo-nav__item_active");
            // promoSection.classList.add(`promo__wrapper_${dataslidesTitleIndex}`);
        }
        indicator.addEventListener('click', (e) => {
            const slideTo = indicator.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +heightTitle.slice(0, heightTitle.length - 2) * (slideTo - 1);

            slidesField.forEach(element => {
                element.style.transform = `translateY(-${offset}px)`;
            });

            indicators.forEach(indicator => {
                indicator.classList.remove("promo-nav__item_active");
            });
            indicator.classList.add("promo-nav__item_active");

            video.classList.add('hide');
            videoOveraly.classList.add('hide');
            sliderHide.classList.remove('slider_hide');
            promoSection.className = 'promo__wrapper';
            promoSection.classList.add(`promo__wrapper_${slideTo}`); 
        });
    });

    const modal = document.querySelector('.nav-modal');
    const openner = document.querySelector('.nav__shapes');
    const nav = document.querySelector('.nav');
    const closer = document.querySelector('.nav-modal__closer');

    openner.addEventListener('click', () => {
        modal.classList.toggle('nav-modal_active'); 
        nav.classList.toggle('nav_hidden'); 
    });
    closer.addEventListener('click', () => {
        modal.classList.toggle('nav-modal_active'); 
        nav.classList.toggle('nav_hidden'); 
    });

    const cursor = document.getElementById('customCursor');

    document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    });

    const hoverElements = document.querySelectorAll('a, button, .btn');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });

        el.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        })

        el.addEventListener('mouseup', () => {
            cursor.classList.remove('active');
        })
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursor.classList.remove('active');
        });
    });

    const firstSection = document.querySelector('.promo'); 
    const aside = document.querySelector('.sidebar');
    const firstSectionHeight = (firstSection.offsetHeight - (firstSection.offsetHeight / 1.1)); 

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > firstSectionHeight) {
            aside.classList.add('negative__aside');
            nav.classList.add('negative');
        } else {
            nav.classList.remove('negative');
            aside.classList.remove('negative__aside');
        }
    }


    window.addEventListener('scroll', handleScroll);

    const asideLinks = aside.querySelectorAll(".sidebar__wrapper");

    asideLinks.forEach(link => {
        link.addEventListener('click', () => {
            asideLinks.forEach(l => l.classList.remove('sidebar__link_active'));

            link.classList.add("sidebar__link_active")
        })
    });

    function getActiveSection() {
        const sections = document.querySelectorAll('section');
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                return section.id;
            }
        }
        return null;
    }
    
    function updateActiveLink() {
        const activeSectionId = getActiveSection();
        const links = document.querySelectorAll('.sidebar__wrapper');
        links.forEach(link => {
            link.classList.remove('sidebar__link_active');
            const anchor = link.querySelector('.sidebar__link');
            if (anchor.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('sidebar__link_active');
            }
        });
    }
    
    document.addEventListener('DOMContentLoaded', updateActiveLink);
    window.addEventListener('scroll', updateActiveLink);

    
});