const KEY = 'gd-meeting-v1';
const state = JSON.parse(localStorage.getItem(KEY) || '{"personas":[],"votes":{},"ws":{}}');
const save = () => localStorage.setItem(KEY, JSON.stringify(state));
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* personas */
const PERSONAS = [
  ['🏋️‍♂️', 'Вже ходить в цей зал (самостійно)', 'Відвідувачі «Інтер Атлетика» ТЦ Глобус', 'Купив абонемент, ходить сам, але плато: немає прогресу або болить поперек. Потрібен погляд профі та програма.', 'Страх: «тренер просто стоятиме над душею»'],
  ['👫', 'Пари та друзі з залу / району', 'Спліт 2 людини', 'Ходять разом або живуть поруч (вул. Яремчука / 33-й / 40-й квартал). Хочуть тренуватись удвох за комфортний бюджет.', 'Страх: «буде занадто дорого вдвох»'],
  ['💼', 'Офісний перезапуск', '25–40 · сидяча робота', 'Болить спина, немає енергії, мало часу. Хоче чіткий план на 3 тренування/тиждень.', 'Страх: «не встигатиму»'],
  ['🌱', 'Перший раз у залі', '18–25 · новачки', 'Не знає, з чого почати, соромиться. Цінує терпіння та пояснення техніки.', 'Страх: «виглядатиму смішно»'],
  ['💪', 'Студенти та спортсмени-аматори', 'Луцька політехніка / волейбол', 'Хочуть набір маси, витривалість, стрибок. Денис для них свій авторитет і однодумець.', 'Страх: «качаюсь, а росту нема»'],
  ['🌸', 'Жінки: тонус і безпека', '20–40 · рельєф без травм', 'Хоче підтягнуте тіло, пружність, поставу. Важлива уважність, коректність та комфортна атмосфера.', 'Страх: «стану масивною»'],
];
const pWrap = $('#personas');
PERSONAS.forEach(([e, t, s, d, f]) => {
  const el = document.createElement('div');
  el.className = 'card persona' + (state.personas.includes(t) ? ' on' : '');
  el.innerHTML = `<div class="emoji">${e}</div><h3>${t}</h3><span class="tag">${s}</span><p>${d}</p><p class="pain mute">${f}</p>`;
  el.onclick = () => {
    el.classList.toggle('on');
    state.personas = el.classList.contains('on') ? [...state.personas, t] : state.personas.filter(x => x !== t);
    save();
  };
  pWrap.appendChild(el);
});

/* votes */
$$('.dir').forEach(d => {
  const id = d.dataset.id, v = $('.vote', d);
  v.innerHTML = '<button aria-label="Подобається">👍</button><button class="no" aria-label="Не подобається">👎</button>';
  const [y, n] = $$('button', v);
  const paint = () => { y.classList.toggle('on', state.votes[id] === 1); n.classList.toggle('on', state.votes[id] === -1); };
  y.onclick = () => { state.votes[id] = state.votes[id] === 1 ? 0 : 1; paint(); save(); };
  n.onclick = () => { state.votes[id] = state.votes[id] === -1 ? 0 : -1; paint(); save(); };
  paint();
});

/* worksheet */
const FIELDS = [
  ['why', 'Чому ти став тренером? Твоя історія'],
  ['best', 'Хто з клієнтів отримав найкращий результат? (кейс)'],
  ['diff', 'Чим ти відрізняєшся від інших тренерів у залі?'],
  ['never', 'З ким ти НЕ хочеш працювати?'],
  ['certs', 'Освіта, сертифікати, спортивні досягнення'],
  ['schedule', 'Графік: дні та години для клієнтів'],
  ['capacity', 'Скільки клієнтів зараз / скільки хочеш?'],
  ['income', 'Цільовий дохід на місяць'],
  ['tone', 'Як звертатись до клієнта: «ти» чи «ви»? Тон?'],
  ['online', 'Цікавить онлайн-супровід? Так / ні / пізніше'],
  ['city', 'Місто, район, адреса залу'],
  ['domain', 'Домен та нікнейм Instagram — обраний варіант'],
];
const ws = $('#ws');
FIELDS.forEach(([k, l]) => {
  const w = document.createElement('div');
  w.innerHTML = `<label for="ws-${k}">${l}</label><textarea id="ws-${k}"></textarea>`;
  const ta = $('textarea', w);
  ta.value = state.ws[k] || '';
  ta.oninput = () => { state.ws[k] = ta.value; save(); };
  ws.appendChild(w);
});
const titleOf = id => $(`.dir[data-id="${id}"] h3`)?.textContent || id;
const summary = () => {
  const liked = Object.entries(state.votes).filter(([, v]) => v === 1).map(([k]) => titleOf(k));
  const disliked = Object.entries(state.votes).filter(([, v]) => v === -1).map(([k]) => titleOf(k));
  return [
    'ПРОФІЛЬ: ДЕНИС ГУСЄВ', '',
    'Аудиторія: ' + (state.personas.join(', ') || '—'),
    'Дизайн 👍: ' + (liked.join(', ') || '—'),
    'Дизайн 👎: ' + (disliked.join(', ') || '—'), '',
    ...FIELDS.map(([k, l]) => `${l}\n→ ${state.ws[k] || '—'}\n`),
  ].join('\n');
};
$('#btnSummary').onclick = () => { $('#summary').textContent = summary(); $('#summaryCard').style.display = 'block'; };
$('#btnExport').onclick = () => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }));
  a.download = 'gusiev-profile.json'; a.click();
};
$('#btnPrint').onclick = () => window.print();
$('#btnReset').onclick = () => { if (confirm('Очистити всі відповіді?')) { localStorage.removeItem(KEY); location.reload(); } };

/* demo form */
$$('#goalChips button').forEach(b => b.onclick = () => b.classList.toggle('on'));
$$('#msgChips button').forEach(b => b.onclick = () => { $$('#msgChips button').forEach(x => x.classList.remove('on')); b.classList.add('on'); });
const phone = $('#fPhone');
phone.addEventListener('input', () => {
  let d = phone.value.replace(/\D/g, '');
  if (d.startsWith('0')) d = '38' + d;
  if (!d.startsWith('380')) d = '380' + d.replace(/^3?8?0?/, '');
  d = d.slice(0, 12);
  const p = [d.slice(0, 3), d.slice(3, 5), d.slice(5, 8), d.slice(8, 10), d.slice(10, 12)].filter(Boolean);
  phone.value = '+' + p.join(' ');
});
$('#sendBtn').onclick = () => {
  const ok = phone.value.replace(/\D/g, '').length === 12;
  phone.style.borderColor = ok ? '#2c7a00' : '#e3201b';
  $('#okMsg').style.display = ok ? 'block' : 'none';
};

/* nav: dots, progress, reveal, keys */
const slides = $$('.slide'), dots = $('#dots'), counter = $('#counter');
slides.forEach((s, i) => { const a = document.createElement('a'); a.href = '#' + s.id; a.title = $('.kicker', s)?.textContent || ''; dots.appendChild(a); });
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const i = slides.indexOf(e.target);
  $$('a', dots).forEach((a, j) => a.classList.toggle('on', i === j));
  counter.textContent = String(i + 1).padStart(2, '0') + ' / ' + slides.length;
}), { threshold: .5 });
slides.forEach(s => io.observe(s));
const rio = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .15 });
$$('.reveal').forEach(r => rio.observe(r));
addEventListener('scroll', () => { $('#progress').style.width = (scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%'; }, { passive: true });
addEventListener('keydown', e => {
  if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
  const cur = slides.findIndex(s => s.getBoundingClientRect().top > -innerHeight / 2);
  if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); slides[Math.min(cur + 1, slides.length - 1)].scrollIntoView(); }
  if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); slides[Math.max(cur - 1, 0)].scrollIntoView(); }
});

/* open demo on mock click */
$$('.dir').forEach(d => $('.mock', d).addEventListener('click', () => window.open('demo.html?t=' + d.dataset.id, '_blank')));
