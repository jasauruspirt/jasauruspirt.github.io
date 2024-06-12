// *************** Pencarian ***************
const ikonTelusur = document.querySelector(".search");
const boxTelusur = document.querySelector(".box-search");
const kolomTelusur = document.querySelector(".kolom-telusur");

window.addEventListener("click", e => {
  if ( e.target == ikonTelusur ) {
    boxTelusur.classList.toggle("aktif");
  }
});

kolomTelusur.addEventListener("input", () => {
  const query = kolomTelusur.value.toLowerCase();
  if (query.length > 2) {
    fetchArticles(query);
  } else {
    hasilPencarian.innerHTML = "";
  }
});

async function fetchArticles(query) {
  try {
    const response = await fetch('/artikel.json');
    const data = await response.json();
    const filteredArticles = data.daftar_artikel.filter(article => 
      article.judul.toLowerCase().includes(query) || 
      article.deskripsi.toLowerCase().includes(query)
    );
    displayResults(filteredArticles);
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}

function displayResults(articles) {
  hasilPencarian.innerHTML = articles.map(article => `
    <div class="artikel">
      <img src="${article.alamat_gambar}" alt="${article.judul}">
      <h3><a href="${article.url}">${article.judul}</a></h3>
      <p>${article.deskripsi}</p>
      <span>${new Date(article.tanggal).toLocaleDateString()}</span>
    </div>
  `).join('');
}


// *************** lazy loads ***************
const images = document.querySelectorAll("img");
images.forEach(function(image) {
 image.setAttribute("loading", "lazy");
});


// *************** next header ***************
const nextHeader = document.querySelector('.header').nextElementSibling;
nextHeader.style.marginTop = "60px";


// *************** galeri klien ***************
const klienSlider = new Swiper(".klien-slider", {
  loop: true,
  grabCursor: true,
  spaceBetween: 16,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    500: {
      slidesPerView: 2,
    },
    800: {
      slidesPerView: 3,
    },
  },
  autoplay: {
    delay: 3000,
  },
});


// *************** footer credit ***************
const tahun = document.querySelector(".tahun");
let date = new Date().getFullYear();
tahun.innerHTML = date;


// *************** formulir ***************
const kirim = document.getElementById('kirim');
const loader = document.querySelector('.loader');
const sukses = document.querySelector('.sukses');
const gagal = document.querySelector('.gagal');

document.getElementById('formulir').addEventListener('submit', function(event) {
  event.preventDefault();
  loader.classList.add('aktif');

  const serviceID = 'default_service';
  const templateID = 'template_i3ov2dd';

  emailjs.sendForm(serviceID, templateID, this)
  .then( () => {
    loader.classList.remove('aktif');
    sukses.classList.add('aktif');
    document.getElementById("formulir").reset();
  },
  (err) => {
    loader.classList.remove('aktif');
    gagal.classList.add('aktif');
    document.getElementById("formulir").reset();
  });
});

const tutup = document.querySelectorAll('.btn.tutup');
tutup.forEach( t => {
  t.addEventListener("click", () => {
    t.parentElement.parentElement.classList.remove('aktif');
  })
});


// --------------- anti cheats ---------------
// document.addEventListener("contextmenu", e => {
//  e.preventDefault();
// }, false);
// document.body.addEventListener('keydown', event => {
//   if (event.ctrlKey && 'cvxspwuaz'.indexOf(event.key) !== -1) {
//     event.preventDefault()
//   }
// });