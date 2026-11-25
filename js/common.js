const KEY = 'drawspace.drawings';
const Store = {
  all() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } },
  write(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch { return false; } },
  get(id) { return this.all().find(d => d.id === id); },
  save(d) { const l = this.all(); const i = l.findIndex(x => x.id === d.id); i >= 0 ? l[i] = d : l.unshift(d); return this.write(l); },
  remove(id) { this.write(this.all().filter(d => d.id !== id)); }
};
function downloadImage(dataUrl, name) {
  const a = document.createElement('a');
  a.href = dataUrl; a.download = (name || 'drawing').replace(/[^\w-]+/g, '_') + '.png'; a.click();
}
const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
document.querySelectorAll('.nav nav a').forEach(a => { if (a.dataset.p === page) a.classList.add('on'); });
