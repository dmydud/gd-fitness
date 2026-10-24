const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const THEMES = {
  brutal:    { name: '01 · Brutal Mono',   img: 'assets/trainer-cutout.png', h: 'Гусєв.<br>Сила без зайвого' },
  vintage:   { name: '02 · Vintage Film',  img: 'assets/stock-trainer.jpg',  h: 'Спорт —<br>мій стиль життя' },
  neon:      { name: '03 · Neon Athletic', img: 'assets/trainer-cutout.png', h: 'Тіло, яке <span>працює</span> на тебе' },
  swiss:     { name: '04 · Swiss Editorial', img: 'assets/stock-trainer.jpg', h: 'Сила —<br>це система.' },
  signature: { name: '05 · Signature',     img: 'assets/trainer-cutout.png', h: 'ДЕНИС<br><span>ГУСЄВ</span>' },
  data:      { name: '06 · Sport Tech',    img: 'assets/trainer-cutout.png', h: 'Прогрес, який можна виміряти' },
  soft:      { name: '07 · Soft Wellness', img: 'assets/stock-trainer.jpg',  h: 'Сильне тіло без стресу і болю' },
  zine:      { name: '08 · Street Zine',   img: 'assets/stock-trainer.jpg',  h: 'Тренуйся <span>гучно</span>' },
  cine:      { name: '09 · Cinematic',     img: 'assets/stock-coaching.jpg', h: '«Моя місія — не тільки змінювати тіло, а й надихати»' },
};

const sel = $('#themeSel');
Object.entries(THEMES).forEach(([k, v]) => sel.add(new Option(v.name, k)));

function apply(t) {
  if (!THEMES[t]) t = 'signature';
  document.body.className = 't-' + t;
  $('.hero-img').src = THEMES[t].img;
  $('#headline').innerHTML = THEMES[t].h;
  sel.value = t;
  history.replaceState(null, '', '?t=' + t);
}
sel.onchange = () => apply(sel.value);
apply(new URLSearchParams(location.search).get('t'));

/* demo slots (would come from Google Calendar) */
const DAYS = [['Вівторок', ['08:00', '10:00', '17:00', '18:00', '19:00']], ['Четвер', ['08:00', '10:00', '17:00', '18:00', '19:00']], ['Субота', ['09:00', '10:00', '11:00', '12:00']], ['Неділя', ['09:00', '10:00', '11:00']]];
const BUSY = new Set(['Вівторок 08:00', 'Вівторок 18:00', 'Четвер 17:00', 'Четвер 18:00', 'Субота 11:00', 'Неділя 09:00']);
const TYPE = { '10:00': 'паралельно · вільно 1 місце', '11:00': 'спліт для пари', '17:00': 'паралельно · вільно 2 місця', '19:00': 'паралельно · вільно 1 місце' };
const grid = $('#slotGrid');
DAYS.forEach(([d, times]) => {
  const col = document.createElement('div');
  col.className = 'day';
  col.innerHTML = `<h3>${d}</h3>` + times.map(t => {
    const busy = BUSY.has(`${d} ${t}`);
    return `<button type="button" class="slot ${busy ? 'busy' : 'free'}" ${busy ? 'disabled' : ''} data-v="${d}, ${t}">${t}<small>${busy ? 'зайнято' : TYPE[t] || 'персонально'}</small></button>`;
  }).join('');
  grid.appendChild(col);
});
grid.addEventListener('click', e => {
  const b = e.target.closest('.slot.free');
  if (!b) return;
  $$('.slot.sel').forEach(x => x.classList.remove('sel'));
  b.classList.add('sel');
  $('#s').value = b.dataset.v;
  $('#book').scrollIntoView();
});

/* form */
$$('#fmt button').forEach(b => b.onclick = () => { $$('#fmt button').forEach(x => x.classList.remove('on')); b.classList.add('on'); });
const p = $('#p');
p.addEventListener('input', () => {
  let d = p.value.replace(/\D/g, '');
  if (d.startsWith('0')) d = '38' + d;
  if (d && !d.startsWith('380')) d = '380' + d.replace(/^3?8?0?/, '');
  d = d.slice(0, 12);
  p.value = d ? '+' + [d.slice(0, 3), d.slice(3, 5), d.slice(5, 8), d.slice(8, 10), d.slice(10, 12)].filter(Boolean).join(' ') : '';
});
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const ok = p.value.replace(/\D/g, '').length === 12;
  p.classList.toggle('err', !ok);
  $('#ok').style.display = ok ? 'block' : 'none';
  if (!ok) p.focus();
});
