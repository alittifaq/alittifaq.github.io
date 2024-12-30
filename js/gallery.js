import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// URL untuk data galeri
const urlgallery =
  "https://asia-southeast2-blkkalittifaq-426014.cloudfunctions.net/blkkalittifaq/data/gallery";

// Memanggil data galeri menggunakan getJSON
// "Authorization" dan "" digunakan untuk token (dikosongkan di sini)
getJSON(urlgallery, "Authorization", "", getGalleryFunction);

// Callback untuk memproses data galeri setelah diterima
function getGalleryFunction(result) {
  if (result.status !== 200) {
    console.error("Error fetching gallery:", result);
    alert("Gagal mengambil data galeri. Silakan coba lagi.");
    return;
  }

  // Menyimpan data galeri dari hasil yang diterima
  const gallery = result.data;
  let htmlgallery = "";

  // Iterasi melalui setiap item dalam data galeri
  gallery.forEach(function (galleryItem) {
    // Template galeri dengan data aktual
    let tem = figuregallery
      .replace("##foto##", galleryItem.foto)
      .replace("##judul_kegiatan##", galleryItem.judul_kegiatan)
      .replace("##tahun##", galleryItem.tahun);

    // Tambahkan ke HTML galeri
    htmlgallery += tem;

    // Debugging: Tampilkan data di konsol
    console.log("Item Galeri:", galleryItem);
  });

  // Render hasil galeri ke elemen HTML
  setInner("gallery", htmlgallery);
}

// Template HTML untuk setiap item galeri
let figuregallery = `
<figure class="gallery-item">
  <img id="foto" src="##foto##" alt="Kegiatan 1" />
  <figcaption>
    <p id="judul_kegiatan">##judul_kegiatan##</p>
    <p id="tahun">##tahun##</p>
  </figcaption>
</figure>
`;
