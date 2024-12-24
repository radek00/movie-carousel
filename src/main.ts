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

// document.querySelectorAll('.main-image').forEach(element => {
//   console.log(element)
//   element.addEventListener('transitionend', (e) => {
//     console.log('transitionend', e);
//     if (e.propertyName === 'opacity' && element instanceof HTMLElement) {
//       element.style.display = 'none';
//     }
//   });
// });

// document.querySelectorAll('.carousel--item').forEach(element => {
//   element.addEventListener('mouseover', (e) => {
//     console.log('mouseover', e);
//     const target = e.target as HTMLElement;
//     const image = target.querySelector('.main-image') as HTMLElement;
//     if (image) {
//       //image.style.display = 'block';
//       image.style.opacity = '0';
//     }
//   });
//   element.addEventListener('mouseout', (e) => {
//     console.log('mouseout', e);
//     const target = e.target as HTMLElement;
//     const image = target.querySelector('.main-image') as HTMLElement;
//     if (image) {
//       //image.style.display = 'none';
//       image.style.opacity = '1';
//     }
//   }
//   );
// })  

document.querySelectorAll('.carousel--item').forEach(element => {
  // Handle hover on the item itself
  const mainImage = element.querySelector('.main-image') as HTMLElement;
  let isExpanded = false;
  element.addEventListener('transitionend', (e) => {
    console.log('transitionend', e);
    if (e.propertyName === 'width' && mainImage) {
      isExpanded = !isExpanded;
      mainImage.style.display = isExpanded ? 'none' : 'block';
    }
  });
  element.addEventListener('mouseenter', () => {
    const expandedImage = element.querySelector('.expanded-image') as HTMLElement;
    
    if (mainImage) {
      mainImage.style.opacity = '0';
    }
    if (expandedImage) {
      expandedImage.style.opacity = '1';
      //expandedImage.style.visibility = 'visible';
    }
  });

  element.addEventListener('mouseleave', () => {
    const mainImage = element.querySelector('.main-image') as HTMLElement;
    const expandedImage = element.querySelector('.expanded-image') as HTMLElement;
    
    if (mainImage) {
      mainImage.style.display = 'block';
      mainImage.style.opacity = '1';
    }
    if (expandedImage) {
      expandedImage.style.opacity = '0';
    }
  });
});

btnRight.addEventListener('click', () => move(Direction.Right));
btnLeft.addEventListener('click', () => move(Direction.Left));