import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

// Mendefinisikan URL untuk data galeri
const urlgallery = "https://asia-southeast2-blkkalittifaq-426014.cloudfunctions.net/blkkalittifaq/data/gallery";
// Memanggil fungsi getJSON untuk mengambil data dari urlgallery
// "login" dan "" adalah parameter tambahan untuk getJSON (biasanya untuk autentikasi)
getJSON(urlgallery, "login", "", getGalleryFunction);

// Fungsi callback yang akan dijalankan setelah data berhasil diambil
function getGalleryFunction(result) {
   // Menyimpan data galeri dari hasil yang diterima
  let gallery = result.data;
  // Menyimpan HTML galeri yang akan dibuat
  let htmlgallery = "";
  // Iterasi melalui setiap item dalam data galeri
  gallery.forEach(function (gallery) {
    // Mengganti placeholder dalam template figuregallery dengan data aktual
    let tem = figuregallery
      .replace("##foto##", gallery.foto)
      .replace("##judul_kegiatan##", gallery.judul_kegiatan)
      .replace("##tahun##", gallery.tahun);
      // Menambahkan setiap item galeri yang dihasilkan ke dalam variabel htmlgallery.
    htmlgallery += tem;
    // Menampilkan data galeri di konsol untuk debugging
    console.log(gallery);
  });
  // Mengatur konten HTML elemen dengan ID 'gallery' dengan htmlgallery yang dihasilkan
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
