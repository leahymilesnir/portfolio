(function () {
  var playerEl = document.getElementById("the-man-youtube");
  var muteBtn = document.querySelector(".youtube-mute");
  if (!playerEl || !muteBtn) return;

  var player;

  function setMutedUI() {
    muteBtn.textContent = "🔇";
    muteBtn.setAttribute("aria-label", "Unmute video");
    muteBtn.setAttribute("aria-pressed", "true");
  }

  function setUnmutedUI() {
    muteBtn.textContent = "🔊";
    muteBtn.setAttribute("aria-label", "Mute video");
    muteBtn.setAttribute("aria-pressed", "false");
  }

  function initPlayer() {
    player = new YT.Player("the-man-youtube", {
      videoId: "WAkPU2SsOGY",
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: "WAkPU2SsOGY",
        controls: 0,
        playsinline: 1,
        modestbranding: 1,
        rel: 0,
        disablekb: 1,
        fs: 0,
      },
      events: {
        onReady: function (event) {
          event.target.playVideo();
        },
      },
    });
  }

  muteBtn.addEventListener("click", function () {
    if (!player || !player.isMuted) return;

    if (player.isMuted()) {
      player.unMute();
      setUnmutedUI();
    } else {
      player.mute();
      setMutedUI();
    }
  });

  if (window.YT && typeof YT.Player === "function") {
    initPlayer();
  } else {
    var previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof previousReady === "function") previousReady();
      initPlayer();
    };
  }
})();
