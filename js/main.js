(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    // Menjalankan fungsi setelah delay 1 milidetik
    setTimeout(function () {
      // Mengecek apakah elemen dengan id 'spinner' ada di halaman
      if ($("#spinner").length > 0) {
        // Menghapus kelas 'show' dari elemen dengan id 'spinner'
        $("#spinner").removeClass("show");
      }
    }, 1); // Delay 1 milidetik
  };

  // Memanggil fungsi spinner
  spinner();

  // Initiate the wowjs
  // Memulai wow.js untuk animasi saat elemen masuk ke viewport
  new WOW().init();

  // Sticky Navbar
  // Menambahkan efek sticky pada navbar
  $(window).scroll(function () {
    // Jika posisi scroll lebih dari 300px
    if ($(this).scrollTop() > 300) {
      // Menambahkan kelas 'shadow-sm' dan mengatur posisi top menjadi 0px
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      // Menghapus kelas 'shadow-sm' dan mengatur posisi top menjadi -150px
      $(".sticky-top").removeClass("shadow-sm").css("top", "-150px");
    }
  });

  // Back to top button
  // Menampilkan tombol "back to top" saat posisi scroll lebih dari 300px
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      // Menampilkan tombol dengan efek fade in
      $(".back-to-top").fadeIn("slow");
    } else {
      // Menyembunyikan tombol dengan efek fade out
      $(".back-to-top").fadeOut("slow");
    }
  });

  // Menambahkan fungsi klik pada tombol "back to top"
  $(".back-to-top").click(function () {
    // Menggulir halaman kembali ke atas dengan animasi
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false; // Mencegah aksi default dari link
  });

  // Modal Video
  var $videoSrc; // Variabel untuk menyimpan sumber video
  $(".btn-play").click(function () {
    $videoSrc = $(this).data("src");
    console.log($videoSrc);
  });

  $("#videoModal").on("shown.bs.modal", function (e) {
    $("#video").attr(
      "src",
      $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
    );
  });

  $("#videoModal").on("hide.bs.modal", function (e) {
    $("#video").attr("src", $videoSrc);
  });

  // Product carousel
  $(".product-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    items: 1,
    loop: true,
    dots: true,
    nav: false,
  });
})(jQuery);
