'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', ()=>{
  section1.scrollIntoView({ behavior: 'smooth' });
});



navLinks.addEventListener('click', (e)=>{
  console.log(e.target)
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const section = document.querySelector(`${e.target.getAttribute('href')}`);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

// page navigation

tabsContainer.addEventListener('click', (e)=>{
  console.log(e.target.closest('.operations__tab'));
  const clicked = e.target.closest('.operations__tab');
  if (!clicked){
    return;
  }
  tabs.forEach(t=>{t.classList.remove('operations__tab--active')});
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach((tab)=>{tab.classList.remove('operations__content--active');});
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

const handleOver = function(e,opacity){
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img')

  siblings.forEach(sibling=>{
    if(sibling !== link){
      sibling.style.opacity = opacity;
    }
  })
  logo.style.opacity = opacity;
}


nav.addEventListener('mouseover', (e)=>{handleOver(e,0.5)})
nav.addEventListener('mouseout', (e)=>{handleOver(e,1)})

// const initialCoords = section1.getBoundingClientRect();
//
// console.log(initialCoords);
//
// window.addEventListener('scroll', e => {
//   console.log(window.scrollY);
//   if(window.scrollY>initialCoords.top){nav.classList.add('sticky');}
//   else{nav.classList.remove('sticky');}
// })


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function  (entries) {
  const [entry] = entries
  console.log(entry)

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
}

const obsOptions = {
  root: null,
  threshold : 0,
  rootMargin : `${navHeight}px`,
}

const observer = new IntersectionObserver(stickyNav, obsOptions);

observer.observe(header)


const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // Ensure section is visible

    const id = entry.target.id;
    if (id && document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.remove('section--hidden');

      observer.unobserve(entry.target); // Optional: stop observing once revealed
    } else {
      console.warn("Missing or invalid ID on:", entry.target);
    }
  });
};
const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold : 0.15
});

const sections = document.querySelectorAll('.section');
sections.forEach(section=>{sectionObserver.observe(section)})

// lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]')
console.log(imgTargets)

const imgObserver = new IntersectionObserver((e,o)=>{
  const [entry] = e;
  console.log(entry)
  if (!entry.isIntersecting) return; // Ensure section is visible
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img');
  })
  o.unobserve(entry.target);
  console.log(entry.target.src)
},{root:null,threshold:0,rootMargin:"-200px"})

imgTargets.forEach((entry)=>{imgObserver.observe(entry)})
// let currSlide = 0;
// const slides = document.querySelectorAll('.slide');
// let maxSlide = slides.length;
// console.log(slides)
// slides.forEach(((s,i)=>{
//   s.style.transform = `translateX(${100*i}%)`;
// }))
//
// const nextSlide =(e)=>{
//   console.log(e.target)
//   if (currSlide === maxSlide-1){
//     currSlide = 0;
//   } else {
//     currSlide ++;
//   }
//
//   slides.forEach(((s,i)=>{
//     s.style.transform = `translateX(-${100*(i-currSlide)}%)`;
//   }))
// }
// const btnRight = document.querySelector('.slider__btn--right');
// btnRight.addEventListener('click',nextSlide )
//
//
//
// const prevSlide = (e)=>{
//   console.log(e.target)
//   if (currSlide === 0){
//     currSlide = maxSlide-1
//   } else {
//     currSlide --;
//   }
//
//   slides.forEach(((s,i)=>{
//     s.style.transform = `translateX(-${100*(i-currSlide)}%)`;
//   }))
// }
//
// const btnLeft = document.querySelector('.slider__btn--left');
// btnLeft.addEventListener('click',prevSlide)
//
// document.addEventListener('keydown', (e)=>{
//   if (e.key === 'ArrowLeft'){prevSlide(e)
//   }
//   if (e.key === 'ArrowRight'){nextSlide(e)}
// })
// const dotContainer = document.querySelector('.dots');
// const createDots = function(){
//   slides.forEach(function(_,i){
//     dotContainer.insertAdjacentHTML('beforeend',`
//     <button class="dots__dot" data-slide="${i}"></button>` )
//   })
// }
// createDots();
//
// const activateDot = function(slide){
//   document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
//   document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
// }
// activateDot(0);
// dotContainer.addEventListener('click', function(e){
//   if(e.target.classList.contains("dots__dot")){
//     currSlide = Number(e.target.dataset.slide)
//     activateDot(currSlide)
//     console.log(currSlide)
//     slides.forEach(((s,i)=>{
//       s.style.transform = `translateX(-${100*(i-currSlide)}%)`;
//     }))
//   }
//
// });

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
          'beforeend',
          `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // BUG in v2: This way, we're not keeping track of the current slide when clicking on a slide
      // const { slide } = e.target.dataset;

      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};
slider();