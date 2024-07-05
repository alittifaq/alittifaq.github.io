import { postJSON } from "https://cdn.jsdelivr.net/gh/jscroot/api@0.0.7/croot.js";
import { setInner } from "https://cdn.jsdelivr.net/gh/jscroot/element@0.1.5/croot.js";

let feedbacks = [];

document.addEventListener("DOMContentLoaded", function () {
  const feedbackUrl =
    "https://asia-southeast2-blkkalittifaq-426014.cloudfunctions.net/blkkalittifaq/data/feedback";

  // Fungsi untuk merender feedback dari server ke dalam HTML
  function renderFeedback() {
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

  // Fungsi untuk menghasilkan bintang rating
  function generateStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return stars;
  }

  // Ambil feedback dari server saat halaman dimuat
  fetch(feedbackUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      feedbacks = data;
      renderFeedback();
    })
    .catch((error) => {
      console.error("Error fetching feedback:", error);
      alert("Gagal mengambil feedback dari server. Silakan coba lagi.");
    });

  // Tangani submit form feedback
  const feedbackForm = document.getElementById("feedbackForm");
  feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked');
    const feedbackContent = document.getElementById("feedback");

    if (rating && feedbackContent.value.trim() !== "") {
      const newFeedback = {
        rating: parseInt(rating.value),
        content: feedbackContent.value.trim(),
      };

      // Kirim data feedback ke backend
      postJSON(feedbackUrl, "login", newFeedback)
        .then((response) => {
          if (response.success) {
            alert("Feedback berhasil dikirim!");
            // Tambahkan feedback baru ke daftar
            feedbacks.push(newFeedback);
            // Render ulang daftar feedback
            renderFeedback();
            // Reset form
            feedbackForm.reset();
          } else {
            alert("Gagal mengirim feedback. Silakan coba lagi.");
          }
        })
        .catch((error) => {
          alert("Gagal mengirim feedback. Silakan coba lagi.");
          console.error("Error posting feedback:", error);
        });
    } else {
      alert("Mohon lengkapi rating dan saran Anda!");
    }
  });
});
