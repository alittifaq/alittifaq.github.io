// Variabel untuk menyimpan feedback
let feedbacks = [];

// Fungsi untuk menampilkan feedback
function showFeedbacks() {
  const feedbackList = document.getElementById("feedbackList");
  feedbackList.innerHTML = ""; // Kosongkan isi sebelum menampilkan ulang

  feedbacks.forEach((feedback, index) => {
    // Buat elemen untuk setiap feedback
    const feedbackItem = document.createElement("div");
    feedbackItem.classList.add("feedback-item");
    feedbackItem.dataset.index = index; // Tambahkan index ke dataset

    // Tampilkan rating dalam bentuk bintang
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= feedback.rating) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }

    feedbackItem.innerHTML = `
            <div class="feedback-rating">${stars}</div>
            <p>${feedback.content}</p>
            ${
              isFeedbackOwner(feedback)
                ? `<button class="btn btn-sm btn-danger delete-btn">Delete</button>
               <button class="btn btn-sm btn-primary edit-btn">Edit</button>`
                : ""
            }
        `;

    // Tambahkan feedback ke dalam daftar
    feedbackList.appendChild(feedbackItem);

    // Tambahkan event listener untuk tombol delete
    const deleteButton = feedbackItem.querySelector(".delete-btn");
    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        if (isFeedbackOwner(feedback)) {
          deleteFeedback(index);
        } else {
          alert("Anda tidak memiliki izin untuk menghapus feedback ini.");
        }
      });
    }

    // Tambahkan event listener untuk tombol edit
    const editButton = feedbackItem.querySelector(".edit-btn");
    if (editButton) {
      editButton.addEventListener("click", () => {
        if (isFeedbackOwner(feedback)) {
          showEditForm(index);
        } else {
          alert("Anda tidak memiliki izin untuk mengedit feedback ini.");
        }
      });
    }
  });
}

// Fungsi untuk mengecek apakah pengguna adalah pemilik feedback
function isFeedbackOwner(feedback) {
  // Gantikan dengan logika autentikasi dan otorisasi yang sesuai
  // Misalnya, bandingkan dengan pengguna yang saat ini login atau memiliki token khusus
  // Contoh sederhana: cek apakah pengguna sudah mengirimkan feedback ini
  return feedback.sender === "nama_pengguna_yang_diizinkan";
}

// Fungsi untuk menampilkan form edit feedback
function showEditForm(index) {
  const feedback = feedbacks[index];
  const feedbackList = document.getElementById("feedbackList");
  const editForm = document.createElement("form");
  editForm.classList.add("edit-form");
  editForm.innerHTML = `
        <div class="star-rating">
            <input id="editStar5" name="editRating" type="radio" value="5" ${
              feedback.rating === 5 ? "checked" : ""
            } />
            <label for="editStar5" title="5 stars">★</label>
            <input id="editStar4" name="editRating" type="radio" value="4" ${
              feedback.rating === 4 ? "checked" : ""
            } />
            <label for="editStar4" title="4 stars">★</label>
            <input id="editStar3" name="editRating" type="radio" value="3" ${
              feedback.rating === 3 ? "checked" : ""
            } />
            <label for="editStar3" title="3 stars">★</label>
            <input id="editStar2" name="editRating" type="radio" value="2" ${
              feedback.rating === 2 ? "checked" : ""
            } />
            <label for="editStar2" title="2 stars">★</label>
            <input id="editStar1" name="editRating" type="radio" value="1" ${
              feedback.rating === 1 ? "checked" : ""
            } />
            <label for="editStar1" title="1 star">★</label>
        </div>
        <br />
        <label for="editFeedback">Saran atau masukan tambahan:</label>
        <textarea id="editFeedback" name="editFeedback" rows="4" cols="50" required>${
          feedback.content
        }</textarea>
        <br />
        <button type="button" class="btn btn-sm btn-success save-btn">Simpan</button>
        <button type="button" class="btn btn-sm btn-secondary cancel-btn">Batal</button>
    `;

  // Sembunyikan tombol edit pada feedback yang sedang diedit
  feedbackList.replaceChild(editForm, feedbackList.childNodes[index]);

  // Tambahkan event listener untuk tombol simpan dan batal
  const saveButton = editForm.querySelector(".save-btn");
  saveButton.addEventListener("click", () => {
    saveEditedFeedback(index);
  });

  const cancelButton = editForm.querySelector(".cancel-btn");
  cancelButton.addEventListener("click", () => {
    cancelEditForm(index);
  });
}

// Fungsi untuk menyimpan feedback yang sudah di-edit
function saveEditedFeedback(index) {
  const editedRating = document.querySelector(
    'input[name="editRating"]:checked'
  ).value;
  const editedFeedback = document.getElementById("editFeedback").value;

  // Update feedback di array
  feedbacks[index].rating = parseInt(editedRating);
  feedbacks[index].content = editedFeedback;

  // Simpan ke local storage
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  // Tampilkan ulang feedback setelah disimpan
  showFeedbacks();
}

// Fungsi untuk membatalkan pengeditan dan kembali ke tampilan normal
function cancelEditForm(index) {
  showFeedbacks(); // Tampilkan ulang feedback tanpa perubahan
}

// Fungsi untuk menghapus feedback
function deleteFeedback(index) {
  feedbacks.splice(index, 1);
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  showFeedbacks(); // Tampilkan ulang feedback setelah dihapus
}

// Fungsi untuk menambahkan feedback baru
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const feedbackContent = document.getElementById("feedback").value;

    // Buat objek feedback baru
    const newFeedback = {
      rating: parseInt(rating),
      content: feedbackContent,
      sender: "nama_pengguna_yang_diizinkan", // Ganti dengan pengguna yang saat ini login atau pengirim feedback
    };

    // Tambahkan feedback ke array
    feedbacks.push(newFeedback);

    // Simpan ke local storage
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    // Tampilkan ulang feedback setelah ditambahkan
    showFeedbacks();

    // Reset form setelah submit
    this.reset();
  });

// Fungsi untuk memuat feedback dari local storage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  // Salin feedback yang disimpan ke dalam array feedbacks
  feedbacks = [...storedFeedbacks];

  // Tampilkan feedback yang sudah ada saat halaman dimuat
  showFeedbacks();
});
