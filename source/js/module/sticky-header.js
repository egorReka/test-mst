import { debounce } from '../utils/debounce.js';

const stickyHeader = document.querySelector('[data-sticky-header]');
const stickyContent = document.querySelector('[data-sticky-content]');
const navContainer = document.querySelector('[data-nav-container]');

const initStickyHeader = () => {

  const onScroll = () => {
    const headerBottom = stickyHeader.offsetTop + stickyHeader.offsetHeight;

    if (window.scrollY >= headerBottom) {
      stickyHeader.classList.add('isStickyStarted');
      stickyContent.style.marginTop = `${headerBottom}px`;
      navContainer.style.width = '55%';
      setTimeout(() => {
        stickyHeader.classList.add('isStickyFinished');
      }, 100);

      return;
    }

    stickyHeader.classList.remove('isStickyStarted');
    stickyContent.style.marginTop = '0';
    stickyHeader.classList.remove('isStickyFinished');
    navContainer.style.width = '100%';

  };

  window.addEventListener('scroll', debounce(onScroll));
};


// const breakpoint = window.matchMedia('(min-width:767px)');

// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };

// breakpoint.addEventListener('change', breakpointChecker);

export {initStickyHeader};
