import {
  getJSON,
  postJSON,
} from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

let feedbacks = [];

document.addEventListener("DOMContentLoaded", function () {
  const feedbackUrl =
    "https://asia-southeast2-blkkalittifaq-426014.cloudfunctions.net/blkkalittifaq/data/feedback";

  getJSON(feedbackUrl, "login", "", renderFeedback);

  function renderFeedback(result) {
    feedbacks = result.data;
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
      const newFeedback = {
        rating: parseInt(rating.value),
        content: feedback.value.trim(),
      };

      // Kirim data feedback ke backend
      postJSON(feedbackUrl, "login", newFeedback, function (response) {
        if (response.success) {
          alert("Feedback berhasil dikirim!");
          // Tambahkan feedback baru ke daftar
          feedbacks.push(newFeedback);
          // Render ulang daftar feedback
          renderFeedback({ data: feedbacks });
          // Reset form
          feedbackForm.reset();
        } else {
          alert("Gagal mengirim feedback. Silakan coba lagi.");
        }
      });
    } else {
      alert("Mohon lengkapi rating dan saran Anda!");
    }
  });
});
