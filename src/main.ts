import './style.scss'

enum Direction {
  Right,
  Left
}

const visibleAtOnce = 4;
const gapRem = 1;
const gapPx = gapRem * 16;

const btnLeft = document.getElementById('btn-left') as HTMLElement;
const btnRight = document.getElementById('btn-right') as HTMLElement;

const carousel = document.querySelector('.carousel .carousel--list') as HTMLElement;
const items = document.querySelectorAll('.carousel--item');
const itemPlaceHolder = document.querySelector('.carousel--item-placeholder') as HTMLElement;

carousel.style.gap = gapRem + 'rem';

const singleItemWidth = items[0].clientWidth;
const visibleWidth = (singleItemWidth * visibleAtOnce) + (gapPx * visibleAtOnce);
const totalWidth = `${visibleWidth}px`;

itemPlaceHolder.style.width = `${singleItemWidth + gapPx}px`;
itemPlaceHolder.style.marginRight = `-${gapPx}px`;

carousel.style.width = totalWidth;

carousel.scrollBy({
  left: singleItemWidth + gapPx,
  behavior: 'instant'
});

itemPlaceHolder.style.display = 'block';

items.forEach((item, idx) => {
  const isLastInView = (idx + 1) % visibleAtOnce === 0;
  item.addEventListener('mouseenter', () => {
    if (isLastInView) {
      itemPlaceHolder.style.width = '0px'
    }
  });

  item.addEventListener('mouseleave', () => {
    if (isLastInView) {
      itemPlaceHolder.style.width = `${singleItemWidth + gapPx}px`;
    }
  });
});

function move(direction: Direction) {
  const itemWidth = carousel.clientWidth || 0;
  const gap = 16;
  const minScroll = singleItemWidth + gapPx;
  
  // Check if scrolling left would show placeholder
  if (direction === Direction.Left && 
      carousel.scrollLeft - (itemWidth + gap) < minScroll) {
    carousel.scrollTo({
      left: minScroll,
      behavior: 'smooth'
    });
    return;
  }

  carousel.scrollBy({
    left: direction === Direction.Right ? itemWidth + gap : -(itemWidth + gap),
    behavior: 'smooth'
  });
}


btnRight.addEventListener('click', () => move(Direction.Right));
btnLeft.addEventListener('click', () => move(Direction.Left));