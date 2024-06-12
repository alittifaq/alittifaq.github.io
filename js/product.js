import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

const urlproduct = "https://www.blkkalittifaq.id/data/produk.json";
getJSON(urlproduct, "login", "", getProductFunction);

function getproductFunction(result) {
  let product = result.data;
  let htmlproduct = "";
  product.forEach(function (product) {
    let tem = figureproduct
      .replace("##foto##", product.foto)
      .replace("##nama##", product.nama);
    htmlproduct += tem;
    console.log(product);
  });
  setInner("product", htmlproduct);
}

let figureproduct = `
<div class="col-lg-4 col-md-6 wow fadeIn" data-wow-delay="0.1s">
            <div class="store-item position-relative text-center">
              <img id="foto"class="img-fluid" src="img/kukis.jpg" alt="" />
              <div class="pt-3">
                <h4 id="nama" class="mb-3 custom-color">Vanilla Chocochips Muffin</h4>
              </div>
              <div class="store-overlay">
                <a href="" class="btn btn-primary rounded-pill py-2 px-4 m-2"
                  >More Detail <i class="fa fa-arrow-right ms-2"></i
                ></a>
              </div>
            </div>
          </div>
`;
