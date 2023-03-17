// *************** active menu ***************
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", function () {
  let scrollDariAtas = window.scrollY;// sama juga dgn pageYOffset
  sections.forEach(sct => {
    const tinggiElement = sct.offsetHeight;
    const atasDariInduk = sct.offsetTop - 60;//sesuaikan dg tinggi header
    sectionId = sct.getAttribute("id");
    if (scrollDariAtas >= atasDariInduk && scrollDariAtas <= atasDariInduk + tinggiElement) {
      document.querySelector(".navbar a[href*=" + sectionId + "]").classList.add("aktif");
    }
    else {
      document.querySelector(".navbar a[href*=" + sectionId + "]").classList.remove("aktif");
    }
  });
});

// *************** menu ***************
const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.menu');
window.addEventListener("click", e => {
  if (e.target == menu ) {
    navbar.classList.toggle('aktif');
  }
  else{
    navbar.classList.remove('aktif');
  }
});

window.addEventListener("scroll", () => {
  navbar.classList.remove('aktif');
});

// *************** gallery ***************
const gallery  = document.querySelectorAll(".image"),
previewBox = document.querySelector(".preview-box"),
previewImg = previewBox.querySelector("img"),
closeIcon = previewBox.querySelector(".icon"),
currentImg = previewBox.querySelector(".current-img"),
totalImg = previewBox.querySelector(".total-img"),
shadow = document.querySelector(".shadow");
window.onload = ()=>{
    for (let i = 0; i < gallery.length; i++) {
        totalImg.textContent = gallery.length; //passing total img length to totalImg variable
        let newIndex = i; //passing i value to newIndex variable
        let clickedImgIndex; //creating new variable
        
        gallery[i].onclick = () =>{
            clickedImgIndex = i; //passing cliked image index to created variable (clickedImgIndex)
            function preview(){
                currentImg.textContent = newIndex + 1; //passing current img index to currentImg varible with adding +1
                let imageURL = gallery[newIndex].querySelector("img").src; //getting user clicked img url
                previewImg.src = imageURL; //passing user clicked img url in previewImg src
            }
            preview(); //calling above function
    
            const prevBtn = document.querySelector(".prev");
            const nextBtn = document.querySelector(".next");
            if(newIndex == 0){ //if index value is equal to 0 then hide prevBtn
                prevBtn.style.display = "none"; 
            }
            if(newIndex >= gallery.length - 1){ //if index value is greater and equal to gallery length by -1 then hide nextBtn
                nextBtn.style.display = "none"; 
            }
            prevBtn.onclick = ()=>{ 
                newIndex--; //decrement index
                if(newIndex == 0){
                    preview(); 
                    prevBtn.style.display = "none"; 
                }else{
                    preview();
                    nextBtn.style.display = "block";
                } 
            }
            nextBtn.onclick = ()=>{ 
                newIndex++; //increment index
                if(newIndex >= gallery.length - 1){
                    preview(); 
                    nextBtn.style.display = "none";
                }else{
                    preview(); 
                    prevBtn.style.display = "block";
                }
            }
            document.querySelector("body").style.overflow = "hidden";
            previewBox.classList.add("show"); 
            shadow.style.display = "block"; 
            closeIcon.onclick = ()=>{
                newIndex = clickedImgIndex; //assigning user first clicked img index to newIndex
                prevBtn.style.display = "block"; 
                nextBtn.style.display = "block";
                previewBox.classList.remove("show");
                shadow.style.display = "none";
                document.querySelector("body").style.overflow = "scroll";
            }
        }
        
    } 
}

// *************** formulir ***************
const kirim = document.getElementById('kirim');

document.getElementById('formulir')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   // loader tampil
   kirim.innerHTML = 'Sedang diproses ...';

   const serviceID = 'default_service';
   const templateID = 'template_i3ov2dd';

   emailjs.sendForm(serviceID, templateID, this)
    .then( () => {
      // loader hilang
      kirim.innerHTML = 'Langganan';
      alert('Sent!');
    }, (err) => {
      // loader hilang
      kirim.innerHTML = 'Langganan';
      alert(JSON.stringify(err));
    });
});

// *************** footer credit ***************
const tahun = document.querySelector(".tahun");
let date = new Date().getFullYear();
tahun.innerHTML = date;