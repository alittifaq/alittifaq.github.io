import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/api.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.0/element.js";

// URL untuk data produk
const urlproduct =
  "https://asia-southeast2-blkkalittifaq-426014.cloudfunctions.net/blkkalittifaq/data/product";

// Mendapatkan data produk menggunakan `getJSON`
getJSON(urlproduct, "Authorization", "", getProductFunction);

// Callback untuk memproses data produk setelah diterima
function getProductFunction(result) {
  if (result.status !== 200) {
    console.error("Error fetching product data:", result);
    alert("Gagal mengambil data produk. Silakan coba lagi.");
    return;
  }

  // Data produk yang diterima
  const product = result.data;
  let sayurHtml = "";
  let buahHtml = "";
  let olahanHtml = "";

  // Iterasi melalui setiap item dalam data produk
  product.forEach(function (productItem) {
    // Template produk dengan data aktual
    let tem = figureproduct
      .replace("##foto##", productItem.foto)
      .replace("##nama##", productItem.nama);

    // Memasukkan produk ke dalam kategori yang sesuai
    if (productItem.kategori === "sayur") {
      sayurHtml += tem;
    } else if (productItem.kategori === "buah") {
      buahHtml += tem;
    } else if (productItem.kategori === "olahan") {
      olahanHtml += tem;
    }
  });

  // Render hasil produk ke elemen HTML berdasarkan kategori
  setInner("sayurProduct", sayurHtml);
  setInner("buahProduct", buahHtml);
  setInner("olahanProduct", olahanHtml);
}

// Template HTML untuk setiap item produk
let figureproduct = `
<div class="col-lg-4 col-md-6 col-sm-12 wow fadeIn" data-wow-delay="0.1s">
  <div class="store-item position-relative text-center">
    <img id="foto" class="img-fluid" src="##foto##" alt="" />
    <div class="pt-3">
      <h4 id="nama" class="mb-3 custom-color">##nama##</h4>
    </div>
    <div class="store-overlay">
      <a href="https://id.shp.ee/URU3RVR" class="btn btn-primary rounded-pill py-2 px-4 m-2">
        More Detail <i class="fa fa-arrow-right ms-2"></i>
      </a>
    </div>
  </div>
</div>
`;
