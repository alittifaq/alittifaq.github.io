import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

const urlproduct =
  "https://asia-southeast2-blkkalittifaq-426014.cloudfunctions.net/blkkalittifaq/data/product";
getJSON(urlproduct, "login", "", getProductFunction);

function getProductFunction(result) {
  let product = result.data;
  let sayurHtml = "";
  let buahHtml = "";
  let olahanHtml = "";

  product.forEach(function (product) {
    let tem = figureproduct
      .replace("##foto##", product.foto)
      .replace("##nama##", product.nama);

   if (product.kategori === "sayur") {
            sayurHtml += tem;
        } else if (product.kategori === "buah") {
            buahHtml += tem;
        } else if (product.kategori === "olahan") {
            olahanHtml += tem;
        }
    });

    setInner("sayurProduct", sayurHtml);
    setInner("buahProduct", buahHtml);
    setInner("olahanProduct", olahanHtml);
}

let figureproduct = `
<div class="col-lg-4 col-md-6 col-sm-12 wow fadeIn" data-wow-delay="0.1s">
            <div class="store-item position-relative text-center">
              <img id="foto"class="img-fluid" src="##foto##" alt="" />
              <div class="pt-3">
                <h4 id="nama" class="mb-3 custom-color">##nama##</h4>
              </div>
              <div class="store-overlay">
                <a href="https://id.shp.ee/URU3RVR" class="btn btn-primary rounded-pill py-2 px-4 m-2"
                  >More Detail <i class="fa fa-arrow-right ms-2"></i
                ></a>
              </div>
            </div>
          </div>
`;
