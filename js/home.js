const art = {
  sunset(c, w, h) {
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#3a6df0'); g.addColorStop(.6, '#ff4f8b'); g.addColorStop(1, '#ffc93c');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    c.fillStyle = '#ffc93c'; c.beginPath(); c.arc(w * .5, h * .55, 50, 0, 7); c.fill();
    [['#8e44ad', .75, 0], ['#1d1b3a', .88, 1]].forEach(([col, y, o]) => {
      c.fillStyle = col; c.beginPath(); c.moveTo(0, h);
      for (let x = 0; x <= w; x += 10) c.lineTo(x, h * y + Math.sin(x / 45 + o * 2) * 18);
      c.lineTo(w, h); c.fill();
    });
  },
  dots(c, w, h) {
    c.fillStyle = '#fff8ec'; c.fillRect(0, 0, w, h);
    const cols = ['#ff4f8b', '#ffc93c', '#17c3b2', '#3a6df0', '#8e44ad'];
    for (let i = 0; i < 60; i++) { c.fillStyle = cols[i % 5]; c.beginPath(); c.arc((i * 83) % w, (i * 47 + i * i) % h, 8 + (i * 7) % 22, 0, 7); c.fill(); }
  },
  waves(c, w, h) {
    c.fillStyle = '#e6f7ff'; c.fillRect(0, 0, w, h);
    ['#17c3b2', '#3a6df0', '#1d1b3a'].forEach((col, k) => {
      c.strokeStyle = col; c.lineWidth = 8; c.lineCap = 'round';
      for (let j = 0; j < 4; j++) { c.beginPath(); for (let x = 0; x <= w; x += 6) c.lineTo(x, 60 + k * 55 + j * 14 + Math.sin(x / 30 + k + j) * 12); c.stroke(); }
    });
  }
};
document.querySelectorAll('canvas.ex').forEach(cv => art[cv.dataset.art](cv.getContext('2d'), cv.width, cv.height));
