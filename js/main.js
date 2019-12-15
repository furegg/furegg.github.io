(function () {
  'use strict';

  const headerTop = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const navMenu = document.getElementById('navMenu');
  const headerToggle = document.querySelector('.header__toggle');
  const headerToggleBtn = document.querySelector('.header__toggle-btn');
  const pageOverlay = document.getElementById('pageOverlay');
  const navItemA = document.querySelectorAll('.header__nav-item a');
  const pageHeight = window.innerHeight;
  const headerHeight = headerTop.offsetHeight;
  const portfolioItem = document.querySelectorAll('.portfolio__list-item');
  let i = 0;

  const openMenu = event => {
    if (navMenu.classList == 'header__nav active') {
      navMenu.classList.remove('active');
      navMenu.classList.add('close-anim');
      setTimeout(() => {
        navMenu.classList.remove('close-anim');
      });
      headerToggleBtn.classList.remove('close-btn');
    } else {
      navMenu.classList.add('active');
      headerToggleBtn.classList.add('close-btn');
    }
  };

  const scrollDown = () => {
    console.log(i);

    if (i == 0) {
      document.body.style.transform = 'translate3d(0px, -' + pageHeight + 'px, 0px)';
      headerTop.style.transform = 'translate3d(0px, ' + pageHeight + 'px, 0px)';
    } else {
      document.body.style.transform = 'translate3d(0px, -' + pageHeight * i + 'px, 0px)';
      headerTop.style.transform = 'translate3d(0px, ' + pageHeight * i + 'px, 0px)';
    }

    if (i == 3) {
      document.body.style.transform = 'translate3d(0px, -260vh, 0px)';
      headerTop.style.transform = 'translate3d(0px, 260vh, 0px)';
      footer.classList.add('active');
    }
  };

  const scrollUp = () => {
    console.log(i);

    if (i == 0) {
      document.body.style.transform = 'translate3d(0px, 0px, 0px)';
      headerTop.style.transform = 'translate3d(0px, 0px, 0px)';
    } else {
      document.body.style.transform = 'translate3d(0px, -' + pageHeight * i + 'px, 0px)';
      headerTop.style.transform = 'translate3d(0px, ' + pageHeight * i + 'px, 0px)';
    }
  };

  if (window.innerWidth > 769) {
    document.addEventListener('mousewheel', function (e) {
      console.log(e.deltaY);

      if (e.deltaY > 0) {
        i++;

        if (i > 3) {
          i = 3;
        }

        scrollDown();
      } else {
        i--;

        if (i < 0) {
          i = 0;
        }

        scrollUp();
      }

      if (i == 1) {
        document.querySelector('.about__text-wrap .container').classList.add('active');
      } else {
        document.querySelector('.about__text-wrap .container').classList.remove('active');
      }

      if (i == 2) {
        document.querySelector('.portfolio').classList.add('active');
      } else {
        document.querySelector('.portfolio').classList.remove('active');
      }

      if (i == 3) {
        footer.classList.add('active');
      } else {
        footer.classList.remove('active');
      }
    });
    document.addEventListener('keyup', function (e) {
      console.log(e.key);

      if (e.key == 'ArrowDown') {
        i++;

        if (i > 3) {
          i = 3;
        }

        scrollDown();
      }

      if (e.key == 'ArrowUp') {
        i--;

        if (i < 0) {
          i = 0;
        }

        scrollUp();
      }

      if (i == 1) {
        document.querySelector('.about__text-wrap .container').classList.add('active');
      } else {
        document.querySelector('.about__text-wrap .container').classList.remove('active');
      }

      if (i == 2) {
        document.querySelector('.portfolio').classList.add('active');
      } else {
        document.querySelector('.portfolio').classList.remove('active');
      }

      if (i == 3) {
        footer.classList.add('active');
      } else {
        footer.classList.remove('active');
      }
    });
    navItemA.forEach((item, index) => {
      item.addEventListener('click', e => {
        e.preventDefault();
        i = item.getAttribute('data-href');
        console.log(i);
        scrollUp();

        if (i == 1) {
          document.querySelector('.about__text-wrap .container').classList.add('active');
        } else {
          document.querySelector('.about__text-wrap .container').classList.remove('active');
        }

        if (i == 2) {
          document.querySelector('.portfolio').classList.add('active');
        } else {
          document.querySelector('.portfolio').classList.remove('active');
        }

        if (i == 3) {
          document.body.style.transform = 'translate3d(0px, -260vh, 0px)';
          headerTop.style.transform = 'translate3d(0px, 260vh, 0px)';
          footer.classList.add('active');
          footer.classList.add('active');
        } else {
          footer.classList.remove('active');
        }
      });
    });
  }

  if (window.innerWidth < 769) {
    document.querySelector('.about__text-wrap .container').classList.add('active');
    document.querySelector('.portfolio').classList.add('active');
    footer.classList.add('active');
  }

  headerToggle.addEventListener('click', openMenu);
  portfolioItem.forEach((item, index) => {
    item.addEventListener('click', () => {
      let pItem = item.getAttribute('data-index');
      localStorage.setItem('itemIndex', pItem);
      location.assign("/project.html?id=" + pItem);
    });
  });

}());
