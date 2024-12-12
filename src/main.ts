import './style.scss'

enum Direction {
  Right,
  Left
}

const btnLeft = document.getElementById('btn-left') as HTMLElement;
const btnRight = document.getElementById('btn-right') as HTMLElement;

const carousel = document.querySelector('.carousel .carousel--list') as HTMLElement;

function move(direction: Direction) {
  console.log('moveRight');
  const itemWidth = carousel.clientWidth || 0;
  const gap = 16; // 1rem = 16px

  carousel.scrollBy({
    left: direction === Direction.Right ? itemWidth + gap : -(itemWidth + gap),
    behavior: 'smooth'
  });
}

btnRight.addEventListener('click', () => move(Direction.Right));
btnLeft.addEventListener('click', () => move(Direction.Left));