const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.innerHTML = `<img src="${img.src}" alt="">`;
    lightbox.classList.add('open');
  });
});
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
});
