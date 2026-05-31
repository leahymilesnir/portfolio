(function () {
  function playVideos(item) {
    item.querySelectorAll("video").forEach(function (video) {
      var promise = video.play();
      if (promise !== undefined) {
        promise.catch(function () {});
      }
    });
  }

  function reveal(item) {
    item.classList.add("is-visible");
    playVideos(item);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".gallery__item").forEach(reveal);
    return;
  }

  var items = document.querySelectorAll(".gallery__item");
  if (!items.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
