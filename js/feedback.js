import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

// URL untuk mendapatkan data feedback dari backend
const feedbackUrl =
  "https://asia-southeast2-blkkalittifaq-426014.cloudfunctions.net/blkkalittifaq/data/feedback";

// Memanggil fungsi getJSON untuk mengambil data dari feedbackUrl
// Parameter tambahan "login" dan "" bisa digunakan untuk autentikasi
getJSON(feedbackUrl, "login", "", renderFeedback);

// Fungsi callback untuk menangani data feedback yang diterima
function renderFeedback(result) {
  // Mendapatkan data feedback dari hasil yang diterima
  let feedbacks = result.data;

  // Menyimpan HTML untuk semua feedback
  let htmlFeedbacks = "";

  // Iterasi melalui setiap item dalam data feedback
  feedbacks.forEach(function (feedback) {
    // Mengganti placeholder dalam template feedback dengan data aktual
    let feedbackItem = feedbackTemplate
      .replace("##rating##", generateStars(feedback.rating))
      .replace("##content##", feedback.content);

    // Menambahkan setiap item feedback yang dihasilkan ke dalam variabel htmlFeedbacks
    htmlFeedbacks += feedbackItem;
  });

  // Mengatur konten HTML elemen dengan ID 'feedbackList' dengan htmlFeedbacks yang dihasilkan
  setInner("feedbackList", htmlFeedbacks);
}

// Template HTML untuk setiap item feedback
const feedbackTemplate = `
<div class="feedback-item">
  <div class="feedback-rating">##rating##</div>
  <p class="feedback-content">##content##</p>
</div>
`;

// Fungsi untuk menghasilkan tanda bintang berdasarkan rating
function generateStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }
  return stars;
}
