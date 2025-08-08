const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
document.body.appendChild(lightbox);

let zoomLevel = 1;
let isDragging = false;
let startX = 0, startY = 0, imgX = 0, imgY = 0;

function renderLightbox(src) {
  zoomLevel = 1;
  imgX = 0;
  imgY = 0;
  lightbox.innerHTML = `
    <div style="position:relative; width:100vw; height:100vh;">
      <img src="${src}" alt="" id="lightbox-img"
        style="transition: transform 0.3s; transform: scale(${zoomLevel}) translate(0px, 0px); cursor: grab; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%) scale(${zoomLevel}) translate(${imgX}px, ${imgY}px);" />
      <div style="position:fixed; top:50%; right:20px; transform:translateY(-50%); width:60px; height:120px; background:#fff; border-radius:16px; box-shadow:0 4px 16px rgba(102,166,255,0.18); display:flex; align-items:center; justify-content:center; z-index:10001;">
        <input type="range" id="zoom-slider" min="1" max="5" step="0.01" value="1"
          style="width:100px; height:40px; accent-color:#66a6ff; transform:rotate(270deg);">
      </div>
      <button id="back-btn" style="position:fixed; top:32px; left:32px; background:#fff; color:#66a6ff; border:none; border-radius:50%; width:44px; height:44px; font-size:2rem; box-shadow:0 2px 8px rgba(0,0,0,0.15); cursor:pointer; z-index:10002; display:flex; align-items:center; justify-content:center;">
        &#8592;
      </button>
    </div>
  `;
  lightbox.classList.add('open');

  const img = document.getElementById('lightbox-img');
  const slider = document.getElementById('zoom-slider');
  const backBtn = document.getElementById('back-btn');

  backBtn.innerHTML = `<span style="font-weight:900; font-size:2.4rem; line-height:1;">&#8592;</span>`;
  backBtn.style.background = "rgba(255,255,255,0.0)";
  backBtn.style.color = "#66a6ff";
  backBtn.style.border = "none";
  backBtn.style.borderRadius = "50%";
  backBtn.style.width = "54px";
  backBtn.style.height = "54px";
  backBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
  backBtn.style.display = "flex";
  backBtn.style.alignItems = "center";
  backBtn.style.justifyContent = "center";
  backBtn.style.position = "fixed";
  backBtn.style.top = "32px";
  backBtn.style.left = "32px";
  backBtn.style.cursor = "pointer";
  backBtn.style.zIndex = "10002";

  slider.oninput = function() {
    zoomLevel = parseFloat(this.value);
    img.style.transform = `translate(-50%, -50%) scale(${zoomLevel}) translate(${imgX}px, ${imgY}px)`;
  };

  // Drag to move image
  img.onmousedown = function(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    img.style.cursor = "grabbing";
    e.preventDefault();
  };

  document.onmousemove = function(e) {
    if (isDragging) {
      imgX += (e.clientX - startX) / zoomLevel;
      imgY += (e.clientY - startY) / zoomLevel;
      img.style.transform = `translate(-50%, -50%) scale(${zoomLevel}) translate(${imgX}px, ${imgY}px)`;
      startX = e.clientX;
      startY = e.clientY;
    }
  };

  document.onmouseup = function() {
    if (isDragging) {
      isDragging = false;
      img.style.cursor = "grab";
    }
  };

  // Arrow button closes the lightbox
  backBtn.onclick = function(e) {
    e.stopPropagation();
    lightbox.classList.remove('open');
    document.onmousemove = null;
    document.onmouseup = null;
  };
}

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    renderLightbox(img.src);
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open');
    document.onmousemove = null;
    document.onmouseup = null;
  }
});
