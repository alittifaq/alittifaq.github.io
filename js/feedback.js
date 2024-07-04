document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const feedback = document.getElementById("feedback").value;

    // Simpan rating dan feedback ke local storage untuk demo
    // (Harusnya simpan ke database)
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push({ rating, feedback });
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    // Tampilkan feedback
    showFeedback({ rating, feedback });
    document.getElementById("feedbackForm").reset();
  });

function showFeedback({ rating, feedback }) {
  const feedbackList = document.getElementById("feedbackList");

  // Menentukan bintang untuk rating
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }

  // Membuat elemen feedback
  const feedbackItem = document.createElement("div");
  feedbackItem.classList.add("feedback-item");
  feedbackItem.innerHTML = `
        <div class="feedback-rating">${stars}</div>
        <p>${feedback}</p>
    `;

  // Memasukkan feedback ke dalam daftar
  feedbackList.appendChild(feedbackItem);
}

// Tampilkan semua feedback saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.forEach((feedback) => {
    showFeedback(feedback);
  });
});
