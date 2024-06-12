import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

const urlgallery = "https://www.blkkalittifaq.id/data/gallery.json";
getJSON(urlgallery, "login", "", getGalleryFunction);

function getGalleryFunction(result) {
  let gallery = result.data;
  let htmlgallery = "";
  data.forEach(function (gallery) {
    let tem = figuregallery
      .replace("##foto##", gallery.foto)
      .replace("##judul_kegiatan##", gallery.judul_kegiatan)
      .replace("##tahun##", gallery.tahun);
    htmlgallery += tem;
    console.log(gallery);
  });
  setInner("gallery", htmlgallery);
}

let figuregallery = `
<figure class="gallery-item">
            <img id="foto" src="##foto##" alt="Kegiatan 1" />
            <figcaption>
              <p id="judul_kegiatan">##judul_kegiatan##</p>
              <p id="tahun">##tahun##</p>
            </figcaption>
          </figure>
`;
