const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const handleButtonClick = e => {
  const targetSection = e.target.getAttribute("data-section");
  const section = document.querySelector(targetSection);
  targetSection !== "#profile" ?
    card.classList.add("is-active") :
    card.classList.remove("is-active");
  card.setAttribute("data-state", targetSection);
  sections.forEach(s => s.classList.remove("is-active"));
  buttons.forEach(b => b.classList.remove("is-active"));
  e.target.classList.add("is-active");
  section.classList.add("is-active");
};

buttons.forEach(btn => {
  btn.addEventListener("click", handleButtonClick);
});

//timeago

jQuery(document).ready(function () {
  jQuery("time.timeago").timeago();
});

//timezone

settings = {
  clock: {
    id: 'timezone',
    timezone: 8
  }
}

clock(settings.clock.id, settings.clock.timezone);

function clock(e, t) {
  e = document.getElementById(e);
  try {
    return function n() {
      let h, m, s, d = new Date;
      d.setHours(d.getUTCHours() + t),
      h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
      m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
      s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds(),
      e.innerHTML = h + ':' + m + ':' + s + ' UTC+08:00',
      setTimeout(n, 1000);
    }()
  } catch (e) {
    console.log('Error: ' + e + ' in ' + clock.name)
  }
}

//float

function actionToggle() {
  var action = document.querySelector(".action");
  action.classList.toggle("active");
}

//filter

$(function () {

  // postnail click
  $(".post").on("click", function () {
    var newSrc = $(this).attr("src");

    $(".post").removeClass("active");
    $(this).addClass("active");
  });

  // Filter buttons
  $(".filter-btn").on("click", function () {
    var filter = $(this).data("filter");

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    if (filter === "all") {
      $(".post").fadeIn();
    } else {
      $(".post").hide();
      $("." + filter).fadeIn();
    }

    // Auto-select first visible image
    var firstVisible = $(".post:visible").first();
    if (firstVisible.length) {
      firstVisible.click();
    }
  });

});

$(function () {

  $(".filter-btn").on("click", function () {
    var filter = $(this).data("filter");

    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    // Filter gallery
    if (filter === "all") {
      $(".post").fadeIn();
    } else {
      $(".post").hide();
      $("." + filter).fadeIn();
    }

    $(".post:visible").first().trigger("click");

    // Auto-scroll active pill into view
    this.scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });
  });

});

$(function () {

  function applyFilter(filter, pushState = true) {
    $(".filter-btn").removeClass("active");
    $('.filter-btn[data-filter="' + filter + '"]').addClass("active");

    if (filter === "all" || !filter) {
      $(".post").fadeIn();
    } else {
      $(".post").hide();
      $("." + filter).fadeIn();
    }

    $(".post:visible").first().trigger("click");

    if (pushState) {
      const url = new URL(window.location);
      if (filter === "all") {
        url.searchParams.delete("filter");
      } else {
        url.searchParams.set("filter", filter);
      }
      window.history.pushState({ filter }, "", url);
    }
  }

  // Click handler
  $(".filter-btn").on("click", function () {
    const filter = $(this).data("filter");
    applyFilter(filter);
    this.scrollIntoView({ behavior: "smooth", inline: "center" });
  });

  // Load filter from URL on page load
  const params = new URLSearchParams(window.location.search);
  const urlFilter = params.get("filter");

  if (urlFilter && $('.filter-btn[data-filter="' + urlFilter + '"]').length) {
    applyFilter(urlFilter, false);
  } else {
    applyFilter("all", false);
  }

  // Handle back / forward navigation
  window.addEventListener("popstate", function (e) {
    applyFilter(e.state?.filter || "all", false);
  });

});

$(document).ready(function () {
  $('.image-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true
  });
$('.filter-track').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  arrows: false,
  dots: false,
  variableWidth: true,
  swipeToSlide: true,
  touchThreshold: 10
});

});

//click to copy

$(function () {

  let toastTimeout;

  function showToast(message) {
    clearTimeout(toastTimeout);
    const $toast = $("#toast");

    $toast.text(message);
    $toast.addClass("show");

    toastTimeout = setTimeout(() => {
      $toast.removeClass("show");
    }, 1800);
  }

  // Copy page URL
  $(".copy-url").on("click", function () {
    const url = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(() => showToast("Link copied"));
    } else {
      const temp = $("<input>");
      $("body").append(temp);
      temp.val(url).select();
      document.execCommand("copy");
      temp.remove();
      showToast("Link copied");
    }
  });

  // Copy email address
  $(".copy-email").on("click", function () {
    const email = $(this).data("email");

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => showToast("Email copied"));
    } else {
      const temp = $("<input>");
      $("body").append(temp);
      temp.val(email).select();
      document.execCommand("copy");
      temp.remove();
      showToast("Email copied");
    }
  });

});



