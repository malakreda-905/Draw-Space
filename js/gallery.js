const grid = document.getElementById('grid'), empty = document.getElementById('empty');
function render() {
  const list = Store.all(); grid.innerHTML = ''; empty.hidden = list.length > 0;
  list.forEach(d => {
    const c = document.createElement('article'); c.className = 'card';
    const img = new Image(); img.src = d.data; img.alt = d.name;
    const info = document.createElement('div'); info.className = 'info';
    const t = document.createElement('span'); t.textContent = d.name;
    const s = document.createElement('small'); s.textContent = new Date(d.date).toLocaleString();
    info.append(t, s);
    const acts = document.createElement('div'); acts.className = 'actions';
    const mk = (label, cls, fn) => { const b = document.createElement('button'); b.className = 'btn ' + cls; b.textContent = label; b.onclick = fn; acts.appendChild(b); };
    mk('Open', '', () => location.href = 'studio.html?id=' + encodeURIComponent(d.id));
    mk('Download', 'ghost', () => downloadImage(d.data, d.name));
    mk('Delete', 'danger', () => { if (confirm('Delete "' + d.name + '"?')) { Store.remove(d.id); render(); } });
    c.append(img, info, acts); grid.appendChild(c);
  });
}
render();
