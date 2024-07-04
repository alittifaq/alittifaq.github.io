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
  feedbackList.innerHTML += `<p>Rating: ${rating} bintang<br>Saran: ${feedback}</p><hr>`;
}

// Tampilkan semua feedback saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.forEach((feedback) => {
    showFeedback(feedback);
  });
});
