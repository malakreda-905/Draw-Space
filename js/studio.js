const cv = document.getElementById('canvas'), ctx = cv.getContext('2d');
const $ = id => document.getElementById(id);
let tool = 'brush', drawing = false, last = null, history = [], currentId = null;
const colors = ['#1d1b3a', '#ff4f8b', '#ffc93c', '#17c3b2', '#3a6df0', '#8e44ad', '#ff7a1a', '#2ecc71'];

function blank() { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height); }
function snapshot() { history.push(cv.toDataURL()); if (history.length > 30) history.shift(); }
function pos(e) {
  const r = cv.getBoundingClientRect();
  return { x: (e.clientX - r.left) * cv.width / r.width, y: (e.clientY - r.top) * cv.height / r.height };
}
function line(a, b) {
  ctx.strokeStyle = tool === 'eraser' ? '#fff' : $('color').value;
  ctx.lineWidth = +$('size').value; ctx.lineCap = ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
}
cv.addEventListener('pointerdown', e => {
  e.preventDefault(); cv.setPointerCapture(e.pointerId); snapshot();
  drawing = true; last = pos(e); line(last, last);
});
cv.addEventListener('pointermove', e => { if (!drawing) return; const p = pos(e); line(last, p); last = p; });
['pointerup', 'pointercancel'].forEach(t => cv.addEventListener(t, () => drawing = false));

function setTool(t) {
  tool = t;
  $('brush').setAttribute('aria-pressed', t === 'brush'); $('eraser').setAttribute('aria-pressed', t === 'eraser');
}
function loadImage(src) {
  const img = new Image();
  img.onload = () => { blank(); ctx.drawImage(img, 0, 0, cv.width, cv.height); };
  img.src = src;
}
function say(t) { $('msg').textContent = t; setTimeout(() => $('msg').textContent = '', 2500); }

colors.forEach(c => {
  const b = document.createElement('button'); b.style.background = c; b.setAttribute('aria-label', 'Color ' + c);
  b.onclick = () => { $('color').value = c; setTool('brush'); }; $('swatches').appendChild(b);
});
$('size').oninput = () => $('sizeOut').textContent = $('size').value;
$('brush').onclick = () => setTool('brush');
$('eraser').onclick = () => setTool('eraser');
$('undo').onclick = () => { const s = history.pop(); if (s) loadImage(s); };
$('clear').onclick = () => { if (confirm('Clear the whole canvas?')) { snapshot(); blank(); } };
$('download').onclick = () => downloadImage(cv.toDataURL('image/png'), $('name').value || 'drawspace');
$('save').onclick = () => {
  const d = { id: currentId || 'd' + Date.now(), name: $('name').value.trim() || 'Untitled', date: new Date().toISOString(), data: cv.toDataURL('image/png') };
  if (Store.save(d)) { currentId = d.id; say('Saved to your gallery!'); }
  else say('Storage is full. Delete some drawings in My Gallery.');
};
blank();
const id = new URLSearchParams(location.search).get('id');
if (id && Store.get(id)) { const d = Store.get(id); currentId = id; $('name').value = d.name; loadImage(d.data); }
