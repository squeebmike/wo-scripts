/* Set Guide: the Pok\u00e9mon and MTG card viewers on themanapocket.com.
   Mount: <div data-set-guide="pokemon"></div> or data-set-guide="mtg".
   One UI for both games: pick a set, sort and filter, browse as a grid or a
   list, tap a card to open it large and swipe through the set. */
(function () {
  'use strict';
  var WORKER = 'https://still-resonance-4f87.swarnerauto.workers.dev';
  var PAGE = 120;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function money(n) { return n > 0 ? '$' + n.toFixed(2) : '\u2014'; }
  function aff(url) { return url ? 'https://partner.tcgplayer.com/k443Ov?u=' + encodeURIComponent(url) : ''; }
  function numKey(n) { var m = String(n || '').match(/\d+/); return m ? parseInt(m[0], 10) : 1e9; }
  function store(key, value) { try { if (value === undefined) return JSON.parse(localStorage.getItem(key) || 'null'); localStorage.setItem(key, JSON.stringify(value)); } catch (e) { return null; } }
  async function getJson(url) {
    var res = await fetch(url, { cache: 'default' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }

  var POKEMON_RARITY = ['common', 'uncommon', 'rare', 'rare holo', 'double rare', 'illustration rare', 'ultra rare', 'special illustration rare', 'hyper rare', 'ace spec rare', 'shiny rare', 'shiny ultra rare', 'promo'];
  var MTG_RARITY = ['common', 'uncommon', 'rare', 'mythic', 'special', 'bonus'];

  var GAMES = {
    pokemon: {
      label: 'Pok\u00e9mon',
      rarityOrder: POKEMON_RARITY,
      loadSets: async function () {
        var d = await getJson(WORKER + '/public/pokemon/sets');
        return (d.data || []).map(function (s) { return { id: s.name || s.id, name: s.name || s.id, released: s.releaseDate || '', count: Number(s.cardCount || s.total || 0) }; })
          .filter(function (s) { return s.id; })
          .sort(function (a, b) { return String(b.released).localeCompare(String(a.released)); });
      },
      loadCards: async function (set) {
        var d = await getJson(WORKER + '/public/pokemon/set-cards?set=' + encodeURIComponent(set.id));
        return (d.data || []).map(function (c) {
          var p = c.prices || {};
          return {
            name: c.name || c.cardName || '', number: c.cardNumber || c.number || '', rarity: c.rarity || '', artist: c.artist || '',
            image: c.imageCdnUrl400 || c.imageCdnUrl200 || c.imageUrl || '', large: c.imageCdnUrl800 || c.imageCdnUrl || c.imageCdnUrl400 || c.imageUrl || '',
            price: Number(p.market != null ? p.market : c.marketPrice || c.price || 0) || 0, low: Number(p.lowPrice != null ? p.lowPrice : c.lowPrice || 0) || 0, lowLabel: 'low',
            link: aff(c.tcgPlayerUrl || (c.tcgPlayerId ? 'https://www.tcgplayer.com/product/' + encodeURIComponent(c.tcgPlayerId) : '')), colors: [],
          };
        });
      },
    },
    mtg: {
      label: 'MTG',
      rarityOrder: MTG_RARITY,
      colors: true,
      loadSets: async function () {
        var d = await getJson('https://api.scryfall.com/sets');
        var keep = { core: 1, expansion: 1, masters: 1, commander: 1, draft_innovation: 1, duel_deck: 1, starter: 1, box: 1, premium_deck: 1, from_the_vault: 1, masterpiece: 1, spellbook: 1 };
        return (d.data || []).filter(function (s) { return !s.digital && keep[s.set_type] && s.card_count > 0; })
          .map(function (s) { return { id: s.code, name: s.name, released: s.released_at || '', count: s.card_count }; })
          .sort(function (a, b) { return String(b.released).localeCompare(String(a.released)); });
      },
      loadCards: async function (set) {
        var url = 'https://api.scryfall.com/cards/search?q=set:' + encodeURIComponent(set.id) + '&unique=prints&order=collector_number&format=json';
        var cards = [];
        for (var page = 0; url && page < 8; page++) {
          var res = await fetch(url, { cache: 'default' });
          if (!res.ok) { if (res.status === 404) break; throw new Error('HTTP ' + res.status); }
          var d = await res.json();
          cards = cards.concat(d.data || []);
          url = d.has_more ? d.next_page : null;
          if (url) await new Promise(function (r) { setTimeout(r, 80); });
        }
        return cards.map(function (c) {
          var face = (c.card_faces || [])[0] || {};
          var imgs = c.image_uris || face.image_uris || {};
          var tcg = c.purchase_uris && c.purchase_uris.tcgplayer;
          return {
            name: c.name || '', number: c.collector_number || '', rarity: c.rarity || '', artist: c.artist || '',
            image: imgs.normal || imgs.small || '', large: imgs.large || imgs.normal || '',
            price: Number((c.prices || {}).usd || 0), low: Number((c.prices || {}).usd_foil || 0), lowLabel: 'foil',
            link: tcg ? aff(tcg) : (c.scryfall_uri || ''), colors: c.colors || face.colors || [], type: c.type_line || '',
          };
        });
      },
    },
  };

  function SetGuide(root, game) {
    var g = GAMES[game];
    var prefs = store('sg-prefs-v1') || {};
    var st = { sets: [], set: null, cards: [], shown: [], limit: PAGE, view: prefs.view || 'grid', size: prefs.size || 'm', sort: prefs.sort || 'number', filtersOpen: false,
      f: { q: '', artist: '', rarity: '', color: '', min: '', max: '' }, viewer: -1 };

    root.classList.add('sg');
    root.innerHTML =
      '<div class="sg-pick"><select data-set aria-label="Choose a set"><option value="">Loading sets\u2026</option></select>' +
      '<input data-set-search type="search" placeholder="Search sets\u2026" aria-label="Search sets" autocomplete="off"></div>' +
      '<div data-body><div class="sg-empty">Pick a ' + esc(g.label) + ' set above to browse every card.</div></div>';
    var sel = root.querySelector('[data-set]');
    var body = root.querySelector('[data-body]');
    var viewer = document.createElement('div');
    viewer.className = 'sg-viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    document.body.appendChild(viewer);

    function savePrefs() { store('sg-prefs-v1', { view: st.view, size: st.size, sort: st.sort }); }

    function setOptions(list) {
      sel.innerHTML = '<option value="">Choose a set (' + list.length + ')</option>' + list.map(function (s) {
        var year = s.released ? ' (' + String(s.released).slice(0, 4) + ')' : '';
        return '<option value="' + esc(s.id) + '"' + (st.set && st.set.id === s.id ? ' selected' : '') + '>' + esc(s.name) + year + (s.count ? ' \u00b7 ' + s.count : '') + '</option>';
      }).join('');
    }

    async function loadSets() {
      sel.innerHTML = '<option value="">Loading sets\u2026</option>';
      try {
        var cacheKey = 'sg-sets-' + game + '-v1', cached = store(cacheKey);
        st.sets = cached && Date.now() - cached.at < 6 * 3600e3 && cached.sets.length ? cached.sets : await g.loadSets();
        if (!cached || cached.sets !== st.sets) store(cacheKey, { at: Date.now(), sets: st.sets });
        setOptions(st.sets);
        var wanted = new URLSearchParams(location.search).get('set');
        var pick = wanted && st.sets.find(function (s) { return s.id.toLowerCase() === wanted.toLowerCase() || s.name.toLowerCase() === wanted.toLowerCase(); });
        if (pick) { sel.value = pick.id; openSet(pick); }
      } catch (e) {
        sel.innerHTML = '<option value="">Could not load sets</option>';
        body.innerHTML = '<div class="sg-empty">Sets didn\'t load. <br><button class="sg-btn" data-retry-sets>Try again</button></div>';
      }
    }

    async function openSet(set) {
      st.set = set; st.cards = []; st.limit = PAGE;
      st.f = { q: '', artist: '', rarity: '', color: '', min: '', max: '' };
      try { var u = new URL(location.href); u.searchParams.set('set', set.id); history.replaceState(null, '', u); } catch (e) {}
      body.innerHTML = '<div class="sg-empty">Loading ' + esc(set.name) + '\u2026</div>';
      try {
        st.cards = await g.loadCards(set);
        render();
      } catch (e) {
        body.innerHTML = '<div class="sg-empty">Cards didn\'t load (' + esc(e.message) + ').<br><button class="sg-btn" data-retry-cards>Try again</button></div>';
      }
    }

    function rarityRank(r) { var i = g.rarityOrder.indexOf(String(r || '').toLowerCase()); return i < 0 ? 50 : i; }
    function compare(a, b) {
      switch (st.sort) {
        case 'price-desc': return b.price - a.price;
        case 'price-asc': return (a.price || 1e9) - (b.price || 1e9);
        case 'name': return a.name.localeCompare(b.name);
        case 'rarity': return rarityRank(b.rarity) - rarityRank(a.rarity) || b.price - a.price;
        case 'artist': return a.artist.localeCompare(b.artist) || numKey(a.number) - numKey(b.number);
        default: return numKey(a.number) - numKey(b.number) || String(a.number).localeCompare(String(b.number));
      }
    }
    function filtered() {
      var f = st.f, q = f.q.toLowerCase(), artist = f.artist.toLowerCase(), min = Number(f.min) || 0, max = Number(f.max) || 0;
      return st.cards.filter(function (c) {
        if (q && (c.name + ' ' + (c.type || '') + ' ' + c.number).toLowerCase().indexOf(q) < 0) return false;
        if (artist && c.artist.toLowerCase().indexOf(artist) < 0) return false;
        if (f.rarity && c.rarity !== f.rarity) return false;
        if (f.color && (f.color === 'C' ? c.colors.length : c.colors.indexOf(f.color) < 0)) return false;
        if (min && c.price < min) return false;
        if (max && c.price > max) return false;
        return true;
      }).sort(compare);
    }

    function tile(c, i) {
      return '<button type="button" class="sg-tile" data-open="' + i + '"><span class="sg-art">' +
        (c.image ? '<img src="' + esc(c.image) + '" alt="' + esc(c.name) + '" loading="lazy" decoding="async">' : '<span>No image yet</span>') +
        '</span><span class="sg-tile-body"><span class="sg-name">' + esc(c.name) + '</span><span class="sg-sub">#' + esc(c.number) + (c.rarity ? ' \u00b7 ' + esc(c.rarity) : '') + '</span>' +
        '<span class="sg-price">' + money(c.price) + '</span></span></button>';
    }
    function row(c, i) {
      return '<button type="button" class="sg-row" data-open="' + i + '"><span class="sg-thumb">' + (c.image ? '<img src="' + esc(c.image) + '" alt="" loading="lazy" decoding="async">' : '') + '</span>' +
        '<span style="min-width:0"><span class="sg-name">' + esc(c.name) + '</span><span class="sg-sub">#' + esc(c.number) + (c.rarity ? ' \u00b7 ' + esc(c.rarity) : '') + '</span></span>' +
        '<span class="sg-col">#' + esc(c.number) + '</span><span class="sg-col">' + esc(c.rarity || '\u2014') + '</span><span class="sg-col">' + esc(c.artist || '\u2014') + '</span>' +
        '<span class="sg-price">' + money(c.price) + '</span></button>';
    }

    function render() {
      st.shown = filtered();
      var rarities = [], seen = {};
      st.cards.forEach(function (c) { if (c.rarity && !seen[c.rarity]) { seen[c.rarity] = 1; rarities.push(c.rarity); } });
      rarities.sort(function (a, b) { return rarityRank(a) - rarityRank(b); });
      var f = st.f, active = f.q || f.artist || f.rarity || f.color || f.min || f.max;
      var sortOpt = function (v, label) { return '<option value="' + v + '"' + (st.sort === v ? ' selected' : '') + '>' + label + '</option>'; };
      var seg = function (attr, cur, opts) { return '<span class="sg-seg">' + opts.map(function (o) { return '<button type="button" ' + attr + '="' + o[0] + '" aria-pressed="' + (cur === o[0]) + '">' + o[1] + '</button>'; }).join('') + '</span>'; };
      var list = st.shown.slice(0, st.limit);
      body.innerHTML =
        '<div class="sg-bar"><div class="sg-count"><b>' + st.shown.length + '</b> of ' + st.cards.length + ' cards \u00b7 ' + esc(st.set.name) + '</div>' +
        '<select class="sg-sort" data-sort aria-label="Sort cards">' + sortOpt('number', 'Card number') + sortOpt('price-desc', 'Price: high to low') + sortOpt('price-asc', 'Price: low to high') +
          sortOpt('rarity', 'Rarity') + sortOpt('name', 'Name') + sortOpt('artist', 'Artist') + '</select>' +
        seg('data-view', st.view, [['grid', 'Grid'], ['list', 'List']]) +
        (st.view === 'grid' ? seg('data-size', st.size, [['s', 'S'], ['m', 'M'], ['l', 'L']]) : '') +
        '<button type="button" class="sg-btn" data-filters aria-pressed="' + !!(st.filtersOpen || active) + '">Filters' + (active ? ' \u2022' : '') + '</button></div>' +
        '<div class="sg-filters' + (st.filtersOpen ? ' on' : '') + '">' +
          '<input class="sg-wide" data-f="q" type="search" placeholder="Card name" value="' + esc(f.q) + '">' +
          '<input data-f="artist" placeholder="Artist" value="' + esc(f.artist) + '">' +
          '<select data-f="rarity"><option value="">Any rarity</option>' + rarities.map(function (r) { return '<option' + (f.rarity === r ? ' selected' : '') + '>' + esc(r) + '</option>'; }).join('') + '</select>' +
          (g.colors ? '<select data-f="color"><option value="">Any color</option>' + [['W', 'White'], ['U', 'Blue'], ['B', 'Black'], ['R', 'Red'], ['G', 'Green'], ['C', 'Colorless']].map(function (o) { return '<option value="' + o[0] + '"' + (f.color === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join('') + '</select>' : '') +
          '<input data-f="min" type="number" inputmode="decimal" min="0" placeholder="Min $" value="' + esc(f.min) + '">' +
          '<input data-f="max" type="number" inputmode="decimal" min="0" placeholder="Max $" value="' + esc(f.max) + '">' +
          '<button type="button" class="sg-btn" data-clear>Clear</button></div>' +
        (list.length
          ? (st.view === 'list' ? '<div class="sg-list">' + list.map(row).join('') + '</div>' : '<div class="sg-grid" data-size="' + st.size + '">' + list.map(tile).join('') + '</div>')
          : '<div class="sg-empty">No cards match those filters.</div>') +
        (st.shown.length > st.limit ? '<button type="button" class="sg-btn sg-more" data-more>Show more (' + (st.shown.length - st.limit) + ' left)</button>' : '');
    }

    // ----- Card viewer -----
    function openViewer(i) { st.viewer = i; drawViewer(); viewer.classList.add('on'); document.documentElement.style.overflow = 'hidden'; viewer.querySelector('.sg-v-close').focus(); }
    function closeViewer() { st.viewer = -1; viewer.classList.remove('on'); document.documentElement.style.overflow = ''; }
    function step(d) { var n = st.viewer + d; if (n < 0 || n >= st.shown.length) return; st.viewer = n; drawViewer(); }
    function drawViewer() {
      var c = st.shown[st.viewer]; if (!c) return;
      var next = st.shown[st.viewer + 1];
      viewer.innerHTML =
        '<div class="sg-v-top"><span class="sg-v-count">' + (st.viewer + 1) + ' / ' + st.shown.length + '</span><button type="button" class="sg-v-close" data-close aria-label="Close">\u00d7</button></div>' +
        '<div class="sg-v-stage">' + (c.large || c.image ? '<img src="' + esc(c.large || c.image) + '" alt="' + esc(c.name) + '">' : '<div class="sg-empty">No image yet</div>') +
          '<button type="button" class="sg-v-nav sg-v-prev" data-step="-1" aria-label="Previous card"' + (st.viewer ? '' : ' disabled') + '>\u2039</button>' +
          '<button type="button" class="sg-v-nav sg-v-next" data-step="1" aria-label="Next card"' + (next ? '' : ' disabled') + '>\u203a</button></div>' +
        '<div class="sg-v-info"><div class="sg-v-name">' + esc(c.name) + '</div><div class="sg-v-meta">#' + esc(c.number) + [c.rarity, c.artist].filter(Boolean).map(function (x) { return ' \u00b7 ' + esc(x); }).join('') + '</div>' +
          '<div class="sg-v-prices"><span class="sg-price">' + money(c.price) + '</span>' + (c.low > 0 ? '<small>' + c.lowLabel + ' ' + money(c.low) + '</small>' : '') + '</div>' +
          (c.link ? '<a class="sg-v-buy" href="' + esc(c.link) + '" target="_blank" rel="noopener sponsored">View on TCGplayer \u2197</a>' : '') + '</div>';
      if (next && (next.large || next.image)) { var pre = new Image(); pre.src = next.large || next.image; }
    }
    var touch = null;
    viewer.addEventListener('touchstart', function (e) { if (e.touches.length === 1) touch = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
    viewer.addEventListener('touchend', function (e) {
      if (!touch) return;
      var dx = e.changedTouches[0].clientX - touch.x, dy = e.changedTouches[0].clientY - touch.y; touch = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    }, { passive: true });
    viewer.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]') || e.target === viewer) return closeViewer();
      var s = e.target.closest('[data-step]'); if (s) step(Number(s.getAttribute('data-step')));
    });
    document.addEventListener('keydown', function (e) {
      if (st.viewer < 0) return;
      if (e.key === 'Escape') closeViewer(); else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
    });

    // ----- Controls -----
    root.addEventListener('change', function (e) {
      var t = e.target;
      if (t === sel) { var s = st.sets.find(function (x) { return x.id === sel.value; }); if (s) openSet(s); return; }
      if (t.matches('[data-sort]')) { st.sort = t.value; savePrefs(); render(); return; }
      if (t.matches('select[data-f]')) { st.f[t.getAttribute('data-f')] = t.value; st.limit = PAGE; render(); }
    });
    var typing = null;
    root.addEventListener('input', function (e) {
      var t = e.target;
      if (t.matches('[data-set-search]')) {
        var q = t.value.toLowerCase().trim();
        setOptions(q ? st.sets.filter(function (s) { return s.name.toLowerCase().indexOf(q) >= 0; }) : st.sets);
        return;
      }
      if (t.matches('input[data-f]')) {
        st.f[t.getAttribute('data-f')] = t.value; st.limit = PAGE;
        clearTimeout(typing);
        var key = t.getAttribute('data-f'), pos = t.selectionStart;
        typing = setTimeout(function () {
          render();
          var again = root.querySelector('input[data-f="' + key + '"]');
          if (again) { again.focus(); try { again.setSelectionRange(pos, pos); } catch (err) {} }
        }, 250);
      }
    });
    root.addEventListener('click', function (e) {
      var t = e.target.closest('button'); if (!t) return;
      if (t.hasAttribute('data-open')) return openViewer(Number(t.getAttribute('data-open')));
      if (t.hasAttribute('data-view')) { st.view = t.getAttribute('data-view'); savePrefs(); return render(); }
      if (t.hasAttribute('data-size')) { st.size = t.getAttribute('data-size'); savePrefs(); return render(); }
      if (t.hasAttribute('data-filters')) { st.filtersOpen = !st.filtersOpen; return render(); }
      if (t.hasAttribute('data-clear')) { st.f = { q: '', artist: '', rarity: '', color: '', min: '', max: '' }; return render(); }
      if (t.hasAttribute('data-more')) { st.limit += PAGE; return render(); }
      if (t.hasAttribute('data-retry-sets')) return loadSets();
      if (t.hasAttribute('data-retry-cards') && st.set) return openSet(st.set);
    });

    loadSets();
  }

  function boot() {
    document.querySelectorAll('[data-set-guide]').forEach(function (el) {
      if (el.__sg) return;
      var game = el.getAttribute('data-set-guide');
      if (!GAMES[game]) return;
      el.__sg = true;
      SetGuide(el, game);
    });
  }
  window.ManaSetGuide = { boot: boot, games: GAMES };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
