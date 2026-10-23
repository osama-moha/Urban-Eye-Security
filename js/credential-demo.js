/* Native controls remain usable if JavaScript is unavailable. */
(() => {
  document.querySelectorAll('[data-credential-demo]').forEach((player) => {
    const video = player.querySelector('video');
    const button = player.querySelector('.credential-demo-play');
    if (!video || !button) return;
    button.hidden = false;
    video.addEventListener('play', () => { button.hidden = true; });
    button.addEventListener('click', () => {
      button.hidden = true;
      video.focus();
      const playback = video.play();
      if (playback && typeof playback.catch === 'function') {
        playback.catch(() => { button.hidden = false; });
      }
    });
  });
})();
