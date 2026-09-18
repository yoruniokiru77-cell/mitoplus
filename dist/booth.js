const boothGallery = document.querySelector('.booth-gallery');
if (boothGallery) {
  const track = boothGallery.querySelector('.booth-track');
  const slides = [...boothGallery.querySelectorAll('.booth-slide')];
  const dots = [...boothGallery.querySelectorAll('.booth-dots button')];
  const count = boothGallery.querySelector('.booth-count');
  let current = 0;
  let touchStartX = null;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    count.textContent = `${current + 1} / ${slides.length}`;
  }

  boothGallery.querySelector('[data-slide="prev"]').addEventListener('click', () => showSlide(current - 1));
  boothGallery.querySelector('[data-slide="next"]').addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  boothGallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  boothGallery.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  boothGallery.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].screenX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) > 45) showSlide(current + (delta < 0 ? 1 : -1));
  }, { passive: true });
}
