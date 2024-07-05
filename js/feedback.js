import { getJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

document.addEventListener("DOMContentLoaded", function () {
  const feedbackUrl =
    "https://asia-southeast2-blkkalittifaq-426014.cloudfunctions.net/blkkalittifaq/data/feedback";

  getJSON(feedbackUrl, "login", "", renderFeedback);

  function renderFeedback(result) {
    let feedbacks = result.data;
    let htmlFeedbacks = "";

    feedbacks.forEach(function (feedback) {
      let feedbackItem = `
        <div class="feedback-item">
          <div class="feedback-rating">${generateStars(feedback.rating)}</div>
          <p class="feedback-content">${feedback.content}</p>
        </div>
      `;
      htmlFeedbacks += feedbackItem;
    });

    setInner("feedbackList", htmlFeedbacks);
  }

  function generateStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return stars;
  }

  const feedbackForm = document.getElementById("feedbackForm");
  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked');
    const feedback = document.getElementById("feedback");

    if (rating && feedback.value.trim() !== "") {
      // Kirim feedback ke backend (contoh sederhana tanpa implementasi API)
      alert("Feedback berhasil dikirim!");
      // Anda bisa tambahkan kode untuk mengirim feedback ke backend di sini
      // Misalnya menggunakan fetch atau XMLHttpRequest
      // Setelah berhasil, tambahkan feedback ke daftar yang ada
      const newFeedback = {
        rating: parseInt(rating.value),
        content: feedback.value.trim(),
      };
      // Simulasi tambah feedback ke daftar
      feedbacks.push(newFeedback);
      // Render ulang daftar feedback
      renderFeedback({ data: feedbacks });
      // Reset form
      feedbackForm.reset();
    } else {
      alert("Mohon lengkapi rating dan saran Anda!");
    }
  });
});
