// *************** lazy loads ***************
const images = document.querySelectorAll("img");
images.forEach(function(image) {
 image.setAttribute("loading", "lazy");
});

// *************** next header ***************
const nextHeader = document.querySelector('.header').nextElementSibling;
nextHeader.style.marginTop = "60px";

// *************** Pencarian ***************
const ikonTelusur = document.querySelector(".search");
const boxTelusur = document.querySelector(".box-search");
const kolomTelusur = document.querySelector(".kolom-telusur");
const hasilPencarian = document.querySelector(".hasil-pencarian");

window.addEventListener("click", e => {
  if ( e.target === ikonTelusur ) {
    boxTelusur.classList.toggle("aktif");
    if ( boxTelusur.classList.contains("aktif") ) {
      ikonTelusur.classList.add("fa-times");
    }
    else{
      ikonTelusur.classList.remove("fa-times");
    }
  }
});

kolomTelusur.addEventListener("input", () => {
  const query = kolomTelusur.value.toLowerCase();
  // console.log('Masukan terakhir :', query);
  if (query.length > 0) {
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
      article.judul.toLowerCase().includes(query)
    );
    displayResults(filteredArticles);
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil artikel:', error);
  }
}

function displayResults(articles) {
  if (articles.length > 0) {
    hasilPencarian.innerHTML = articles.map(article => `
      <a href="${article.url}" class="ditemukan">
        <img src="${article.alamat_gambar}" alt="${article.judul}" title="${article.judul}">
        <b>${article.judul}</b>
      </a>
    `).join('');
  } else {
    hasilPencarian.innerHTML = "<p>Tidak ada artikel yang cocok dengan pencarian.</p>";
  }
}


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


// *************** footer credit ***************
const tahun = document.querySelector(".tahun");
let date = new Date().getFullYear();
tahun.innerHTML = date;


// *************** anti cheats ***************
// document.addEventListener("contextmenu", e => {
//  e.preventDefault();
// }, false);
// document.body.addEventListener('keydown', event => {
//   if (event.ctrlKey && 'cvxspwuaz'.indexOf(event.key) !== -1) {
//     event.preventDefault()
//   }
// });


// *************** aside artikel ***************
fetch('/artikel.json')
  .then(response => response.json())
  .then(data => {
    const artikelBaru = document.querySelector('.artikel-baru');
    let html = '';

    // Membalik urutan array daftar_artikel dan mengambil 5 elemen terakhir
    const reversedArticles = data.daftar_artikel.reverse().slice(0, 5);

    reversedArticles.forEach(artikel => {
      html += `
        <div>
          <a href="${artikel.url}">${artikel.judul}</a>
        </div>`;
    });
    artikelBaru.innerHTML = html;
  })
  .catch(error => {
    console.error('Error:', error);
  });
