<style>
.dv-page{
  --dv-bg:#f3eef5;
  --dv-surface:#fffdfd;
  --dv-surface-soft:#ece4ef;
  --dv-surface-deep:#e5d9e9;
  --dv-text:#251e2a;
  --dv-muted:#625768;
  --dv-soft:#897d90;
  --dv-purple:#73507f;
  --dv-purple-dark:#563760;
  --dv-purple-hover:#62436e;
  --dv-lavender:#b9a5c3;
  --dv-border:#d9cddd;
  --dv-gold:#c6ad5c;
  --dv-gold-soft:#f0e6bd;
  max-width:900px;
  margin:0 auto;
  padding:64px 24px 96px;
  font-family:inherit;
  color:var(--dv-text);
  background:var(--dv-bg) !important;
}
.dv-h1{
  position:relative;
  z-index:4;
  text-align:center;
  font-size:clamp(40px,7vw,76px);
  font-weight:800;
  letter-spacing:-.02em;
  margin:0 0 14px;
  line-height:1;
  background:linear-gradient(100deg,#2a222f 0%,#72507f 34%,#b9a5c3 56%,#c6ad5c 76%,#2a222f 100%);
  -webkit-background-clip:text;
  background-clip:text;
  -webkit-text-fill-color:transparent;
  color:transparent !important;
}
.dv-sub{
  position:relative;
  z-index:4;
  text-align:center;
  font-size:18px;
  color:var(--dv-muted) !important;
  max-width:640px;
  margin:0 auto 36px;
  line-height:1.5;
}
.dv-run-pill{
  position:relative;
  z-index:4;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:2px;
  width:fit-content;
  margin:0 auto 40px;
  padding:14px 28px;
  border:1px solid rgba(255,255,255,.28);
  border-radius:20px;
  background:linear-gradient(135deg,var(--dv-purple-dark),var(--dv-purple) 58%,#8d6a99);
  color:#fff !important;
  box-shadow:0 12px 28px rgba(59,38,66,.22);
}
.dv-run-pill-label{
  font-size:12px;
  font-weight:700;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:#eee4f3 !important;
}
.dv-run-pill-count{
  font-size:28px;
  font-weight:800;
  letter-spacing:.01em;
  color:#fff !important;
}

/* CSS-only animated stage fog. It stays inside the top hero section and spans the viewport. */
.dv-fog-wrap{
  position:relative;
  isolation:isolate;
}
.dv-fog{
  position:absolute;
  top:96px;
  bottom:18px;
  left:50%;
  width:100vw;
  transform:translateX(-50%);
  overflow:hidden;
  pointer-events:none;
  z-index:3;
  opacity:.92;
  transition:opacity .7s ease;
  background:
    radial-gradient(ellipse 44% 34% at 14% 76%,rgba(216,197,109,.34) 0%,rgba(216,197,109,.16) 36%,rgba(216,197,109,0) 74%),
    radial-gradient(ellipse 48% 34% at 84% 70%,rgba(116,79,132,.30) 0%,rgba(116,79,132,.14) 38%,rgba(116,79,132,0) 76%),
    linear-gradient(to top,rgba(137,126,145,.20) 0%,rgba(185,165,195,.12) 36%,rgba(185,165,195,0) 74%);
  background-size:120% 100%,120% 100%,100% 100%;
  animation:dvFogBase 16s ease-in-out infinite alternate;
}
.dv-fog::before,
.dv-fog::after{
  content:"";
  position:absolute;
  left:-16%;
  right:-16%;
  bottom:-8%;
  height:72%;
  border-radius:50%;
  filter:blur(34px);
  will-change:transform,opacity;
}
.dv-fog::before{
  background:
    radial-gradient(ellipse at 24% 62%,rgba(217,201,125,.46) 0%,rgba(217,201,125,.20) 33%,rgba(217,201,125,0) 70%),
    radial-gradient(ellipse at 66% 60%,rgba(184,166,197,.32) 0%,rgba(184,166,197,.12) 38%,rgba(184,166,197,0) 72%);
  animation:dvFogDriftOne 18s ease-in-out infinite alternate;
}
.dv-fog::after{
  background:
    radial-gradient(ellipse at 72% 58%,rgba(112,76,128,.38) 0%,rgba(112,76,128,.16) 36%,rgba(112,76,128,0) 72%),
    radial-gradient(ellipse at 34% 70%,rgba(145,137,151,.24) 0%,rgba(145,137,151,.10) 42%,rgba(145,137,151,0) 76%);
  animation:dvFogDriftTwo 23s ease-in-out infinite alternate;
}
.dv-fog.dv-fog-hidden{opacity:0;}
@keyframes dvFogBase{
  0%{background-position:0 0,100% 0,0 0;}
  100%{background-position:8% -2%,-8% -1%,0 0;}
}
@keyframes dvFogDriftOne{
  0%{transform:translate3d(-2%,2%,0) scale(1.02);opacity:.68;}
  100%{transform:translate3d(5%,-2%,0) scale(1.12);opacity:.92;}
}
@keyframes dvFogDriftTwo{
  0%{transform:translate3d(4%,1%,0) scale(1.08);opacity:.54;}
  100%{transform:translate3d(-5%,-3%,0) scale(1.16);opacity:.84;}
}

.dv-gallery-frame{
  background:var(--dv-surface);
  padding:16px;
  border:1px solid var(--dv-border);
  box-shadow:0 1px 2px rgba(37,30,42,.06),0 24px 48px rgba(37,30,42,.14);
  border-radius:4px;
  box-sizing:border-box;
}
.dv-gallery-frame img{
  display:block;
  width:100%;
  height:auto;
  object-fit:contain;
  background:var(--dv-surface-soft);
}
.dv-hero{
  position:relative;
  z-index:2;
  width:100%;
  margin-bottom:56px;
  padding:16px;
  box-sizing:border-box;
  border:1px solid var(--dv-border);
  border-radius:4px;
  background:var(--dv-surface);
  box-shadow:0 1px 2px rgba(37,30,42,.06),0 24px 50px rgba(37,30,42,.16);
}
.dv-hero img{
  display:block;
  width:100%;
  height:auto;
  object-fit:contain;
  background:var(--dv-surface-soft);
}
.dv-story{
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:48px;
  align-items:center;
  margin-bottom:72px;
}
.dv-story h2{
  font-size:28px;
  font-weight:800;
  margin:0 0 16px;
  color:var(--dv-text) !important;
}
.dv-story p{
  font-size:16px;
  line-height:1.7;
  color:var(--dv-muted) !important;
  margin:0 0 14px;
}
.dv-cast{
  list-style:none;
  margin:18px 0 0;
  padding:0;
  display:flex;
  flex-direction:column;
  gap:10px;
}
.dv-cast li{
  font-size:14px;
  color:var(--dv-muted) !important;
  background:var(--dv-surface-soft);
  border:1px solid rgba(115,80,127,.08);
  border-radius:10px;
  padding:10px 14px;
}
.dv-cast strong{color:var(--dv-text) !important;}
.dv-meta{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:18px;
}
.dv-meta span{
  font-size:12px;
  font-weight:600;
  background:var(--dv-surface-soft);
  border:1px solid rgba(115,80,127,.08);
  border-radius:8px;
  padding:6px 10px;
  color:var(--dv-muted) !important;
}
.dv-section-title{
  text-align:center;
  font-size:30px;
  font-weight:800;
  margin:0 0 8px;
  color:var(--dv-text) !important;
}
.dv-section-sub{
  text-align:center;
  color:var(--dv-muted) !important;
  font-size:15px;
  margin:0 auto 36px;
  max-width:620px;
}

.dv-buy-card{
  background:var(--dv-surface);
  border:1px solid var(--dv-border);
  border-radius:20px;
  box-shadow:0 10px 30px rgba(37,30,42,.08);
  padding:32px;
  margin-bottom:64px;
  display:grid;
  grid-template-columns:280px 1fr;
  gap:32px;
}
.dv-buy-img{
  width:100%;
  border-radius:14px;
  overflow:hidden;
  aspect-ratio:4/5;
  background:var(--dv-surface-soft);
}
.dv-buy-img img{
  width:100%;
  height:100%;
  object-fit:contain;
  display:block;
}
.dv-buy-name{
  font-size:24px;
  font-weight:800;
  color:var(--dv-text) !important;
  margin-bottom:4px;
}
.dv-buy-desc{
  font-size:14px;
  color:var(--dv-muted) !important;
  line-height:1.5;
  margin-bottom:10px;
}
.dv-numbered{
  font-size:12px;
  color:var(--dv-soft) !important;
  font-style:italic;
  margin-bottom:4px;
}
.dv-stock{
  font-size:12px;
  font-weight:700;
  color:var(--dv-purple) !important;
  min-height:15px;
  margin-bottom:10px;
}
.dv-price{
  font-size:26px;
  font-weight:800;
  margin-bottom:18px;
  color:var(--dv-text) !important;
}
.dv-price small{
  font-size:14px;
  font-weight:600;
  color:var(--dv-soft) !important;
}

.dv-remarque-fieldset{
  border:none;
  padding:0;
  margin:0 0 18px;
  width:100%;
}
.dv-remarque-legend{
  font-size:12px;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:.04em;
  color:var(--dv-soft) !important;
  margin-bottom:10px;
  display:block;
}
.dv-remarque-option{
  display:flex !important;
  align-items:flex-start;
  gap:10px;
  padding:12px 14px;
  border:1.5px solid var(--dv-border);
  border-radius:12px;
  margin-bottom:8px;
  cursor:pointer;
  transition:border-color .15s ease,background .15s ease,box-shadow .15s ease;
  width:100% !important;
  max-width:none !important;
  box-sizing:border-box;
  float:none !important;
  background:var(--dv-surface);
}
.dv-remarque-option:hover{border-color:var(--dv-lavender);}
.dv-remarque-option.is-checked{
  border-color:var(--dv-purple);
  background:#f2ebf5;
  box-shadow:0 0 0 1px rgba(115,80,127,.05) inset;
}
.dv-remarque-option input{
  margin-top:3px;
  accent-color:var(--dv-purple);
  flex:0 0 auto;
  width:auto !important;
}
.dv-remarque-preview-img{
  flex:0 0 auto !important;
  width:88px !important;
  height:88px !important;
  object-fit:contain;
  background:var(--dv-surface-soft);
  border-radius:8px;
  box-shadow:0 2px 8px rgba(37,30,42,.12);
}
.dv-remarque-option-body{
  flex:1 1 auto !important;
  min-width:0 !important;
  width:auto !important;
}
.dv-remarque-option-title{
  font-size:14px;
  font-weight:700;
  color:var(--dv-text) !important;
  margin-bottom:2px;
  white-space:normal;
}
.dv-remarque-option-desc{
  font-size:12px;
  color:var(--dv-muted) !important;
  line-height:1.4;
  white-space:normal;
}
.dv-remarque-subject{
  margin:8px 0 0 26px;
  display:none;
}
.dv-remarque-subject.is-visible{display:block;}
.dv-remarque-subject select{
  width:100%;
  padding:9px 10px;
  border:1.5px solid var(--dv-border);
  border-radius:8px;
  font-size:13px;
  color:var(--dv-text);
  background:var(--dv-surface);
}
.dv-buybtn{
  width:100%;
  padding:14px 8px;
  border-radius:9px;
  border:none;
  background:var(--dv-purple) !important;
  color:#fff !important;
  font-size:15px;
  font-weight:700;
  cursor:pointer;
  text-align:center;
  transition:background .15s ease,transform .15s ease;
}
.dv-buybtn:hover{
  background:var(--dv-purple-hover) !important;
  transform:translateY(-1px);
}
.dv-buybtn:disabled{
  opacity:.5;
  cursor:not-allowed;
  transform:none;
}

.dv-perks-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:20px;
  margin-bottom:32px;
}
.dv-perk-card{
  background:var(--dv-surface);
  border:1px solid var(--dv-border);
  border-radius:14px;
  padding:20px;
}
.dv-perk-card h4{
  font-size:14px;
  font-weight:800;
  margin:0 0 8px;
  color:var(--dv-text) !important;
}
.dv-perk-card p{
  font-size:13px;
  color:var(--dv-muted) !important;
  line-height:1.5;
  margin:0;
}
.dv-perk-tag{
  display:inline-block;
  font-size:10px;
  font-weight:800;
  letter-spacing:.04em;
  text-transform:uppercase;
  padding:3px 8px;
  border-radius:999px;
  margin-bottom:8px;
}
.dv-perk-tag.std{
  background:var(--dv-surface-soft);
  color:var(--dv-muted) !important;
}
.dv-perk-tag.paid{
  background:#eadff0;
  color:var(--dv-purple-dark) !important;
}
.dv-perk-tag.dlx{
  background:var(--dv-purple-dark);
  color:#fff !important;
}
.dv-perk-frame{margin:10px 0 12px;}
.dv-perk-preview-img{max-height:190px;}

.dv-details{
  background:linear-gradient(180deg,#eee6f1 0%,#e8ddea 100%);
  border:1px solid var(--dv-border);
  border-radius:20px;
  padding:40px 36px;
  margin-bottom:56px;
}
.dv-details h2{
  font-size:24px;
  font-weight:800;
  margin:0 0 18px;
  text-align:center;
  color:var(--dv-text) !important;
}
.dv-detail-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:24px;
}
.dv-detail-grid h4{
  font-size:14px;
  font-weight:700;
  margin:0 0 6px;
  text-transform:uppercase;
  letter-spacing:.04em;
  color:var(--dv-text) !important;
}
.dv-detail-grid p{
  font-size:14px;
  color:var(--dv-muted) !important;
  line-height:1.6;
  margin:0;
}
.dv-artist{
  display:flex;
  align-items:center;
  gap:18px;
  justify-content:center;
  text-align:center;
  flex-direction:column;
}
.dv-artist p{
  max-width:520px;
  font-size:15px;
  color:var(--dv-muted) !important;
  line-height:1.6;
  margin:0 0 16px;
}
.dv-artist a{
  display:inline-block;
  background:var(--dv-purple) !important;
  color:#fff !important;
  padding:11px 24px;
  border-radius:999px;
  font-size:14px;
  font-weight:700;
  text-decoration:none;
}
.dv-artist a:hover{background:var(--dv-purple-hover) !important;}
.dv-float-cart{
  position:fixed;
  top:18px;
  right:18px;
  z-index:99998;
  width:52px;
  height:52px;
  border-radius:50%;
  background:#73507f !important;
  color:#fff !important;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:22px;
  text-decoration:none;
  box-shadow:0 6px 18px rgba(86,55,96,.30);
  cursor:pointer;
}
.dv-float-cart:hover{background:#62436e !important;}
.dv-cart-badge{
  position:absolute;
  top:-3px;
  right:-3px;
  background:#a94d58;
  color:#fff !important;
  font-size:11px;
  font-weight:800;
  min-width:18px;
  height:18px;
  line-height:18px;
  text-align:center;
  border-radius:999px;
  padding:0 4px;
}
@media (max-width:800px){
  .dv-story{grid-template-columns:1fr;}
  .dv-story-imgwrap{order:-1;}
  .dv-buy-card{grid-template-columns:1fr;}
  .dv-buy-img{max-width:220px;margin:0 auto;}
  .dv-fog{top:130px;bottom:28px;opacity:.78;}
}
@media (prefers-reduced-motion:reduce){
  .dv-fog,.dv-fog::before,.dv-fog::after{animation:none !important;}
}
</style>

<a href="#" id="wo-cart-toggle" aria-label="View cart" class="dv-float-cart">
  🛒<span id="wo-cart-badge" class="dv-cart-badge">0</span>
</a>

<section class="dv-page">

  <div class="dv-fog-wrap">
    <h1 class="dv-h1">DOUGVANA</h1>
    <p class="dv-sub">Saturday-morning nostalgia crashes into Seattle grunge in this hand-drawn mashup by Shawn Michael David Warner—now available as a limited-edition print.</p>
    <div class="dv-run-pill">
      <span class="dv-run-pill-label">Limited Run 1 &middot; Preorder Now</span>
      <span class="dv-run-pill-count" data-dv-stock-hero>100/100 Prints Left</span>
    </div>

    <div class="dv-hero">
      <img src="https://s3.amazonaws.com/webflow-prod-assets/65b15ee0228d06647ca7e4ce/6a594b74574a248726ec14ce_WarnerShawn-Scan-DougBandColor-7.26Copy-p-2600.avif" alt="Dougvana original artwork by Shawn Michael David Warner — full color, Doug Funnie and friends reimagined as Nirvana" loading="lazy">
    </div>

    <div class="dv-fog" aria-hidden="true"></div>
  </div>

  <div class="dv-story">
    <div>
      <h2>Bluffington Meets Seattle Grunge</h2>
      <p>Straight out of Bluffington and into a sweaty 1990s gym, Dougvana reimagines Doug and the crew through the raw, loud, beautifully imperfect energy of grunge.</p>
      <p>The original artwork was created entirely by hand using pencil, ink, watercolor, Prismacolor colored pencils, Copic markers, and Ohuhu markers on Bristol board.</p>
      <ul class="dv-cast">
        <li><strong>Doug</strong> takes center stage as Kurt Cobain</li>
        <li><strong>Roger</strong> beats the skins as Dave Grohl</li>
        <li><strong>Skeeter</strong> slaps that bass as Krist Novoselic</li>
      </ul>
      <div class="dv-meta">
        <span>Original Artwork: 14 &times; 17 inches</span>
        <span>Print Size: 12 &times; 18 inches</span>
        <span>Medium: Pencil, ink, watercolor, Prismacolor colored pencils, Copic markers, and Ohuhu markers</span>
        <span>Artist: Shawn Michael David Warner, 2025</span>
      </div>
    </div>
    <div class="dv-story-imgwrap dv-gallery-frame">
      <img src="https://cdn.prod.website-files.com/65b15ee1228d06647ca7e520/690a637a46575b462b0846a0_547081554_10230119004431280_7009541001826243041_n.jpg" alt="Dougvana artwork detail" loading="lazy">
    </div>
  </div>

  <h2 class="dv-section-title">Get Your Print</h2>
  <p class="dv-section-sub">Every print is signed by Shawn Michael David Warner in gold ink and hand-numbered out of 100. Make yours one of a kind by adding an original remarque, drawn directly onto your print.</p>

  <div class="dv-buy-card" id="dv-buy-card">
    <div class="dv-buy-img"><img src="https://s3.amazonaws.com/webflow-prod-assets/65b15ee0228d06647ca7e4ce/6a594b74574a248726ec14ce_WarnerShawn-Scan-DougBandColor-7.26Copy-p-1600.avif" alt="Dougvana — Full Color print" loading="lazy"></div>
    <div>
      <div class="dv-buy-name">Dougvana — Full-Color Print</div>
      <div class="dv-buy-desc">The complete artwork in full color, professionally reproduced as a 12 &times; 18-inch print.</div>
      <div class="dv-numbered">Hand-numbered /100 &middot; Signed in gold ink</div>
      <div class="dv-stock" data-dv-stock></div>
      <div class="dv-price" id="dv-price-display">$25.00</div>

      <fieldset class="dv-remarque-fieldset">
        <span class="dv-remarque-legend">Choose Your Edition</span>

        <div class="dv-remarque-option is-checked" data-dv-option="none">
          <input type="radio" name="dv-remarque" value="none" checked>
          <div class="dv-remarque-option-body">
            <div class="dv-remarque-option-title">Signed Print — $25</div>
            <div class="dv-remarque-option-desc">The limited-edition print, signed in gold ink and hand-numbered out of 100.</div>
          </div>
        </div>

        <div class="dv-remarque-option" data-dv-option="standard">
          <input type="radio" name="dv-remarque" value="standard">
          <div class="dv-remarque-option-body">
            <div class="dv-remarque-option-title">Standard Remarque — Add $15</div>
            <div class="dv-remarque-option-desc">An original hand-drawn remarque added directly to your print. Choose from:</div>
            <div class="dv-remarque-subject" id="dv-remarque-subject-wrap">
              <select id="dv-remarque-subject">
                <option value="doughead">Doug portrait</option>
                <option value="cassette">Cassette tape</option>
                <option value="musicnotes">Music notes</option>
              </select>
            </div>
          </div>
        </div>

        <div class="dv-remarque-option" data-dv-option="deluxe">
          <input type="radio" name="dv-remarque" value="deluxe">
          <img class="dv-remarque-preview-img" src="https://s3.amazonaws.com/webflow-prod-assets/65b15ee0228d06647ca7e4ce/6a594b7178cc695b63f26f57_WarnerShawn-Scan-DougBanjo-7.26Copy-p-500.avif" alt="Doug strumming his banjo — reference art for the deluxe remarque">
          <div class="dv-remarque-option-body">
            <div class="dv-remarque-option-title">Deluxe Remarque — Add $45</div>
            <div class="dv-remarque-option-desc">A larger, more detailed original remarque featuring Doug strumming his banjo, individually drawn directly onto your print. Pictured: the reference piece your remarque is based on.</div>
          </div>
        </div>
      </fieldset>

      <button class="dv-buybtn" id="dv-add-to-cart-btn">Add to Cart</button>
    </div>
  </div>

  <h2 class="dv-section-title">Choose Your Edition</h2>
  <p class="dv-section-sub">Every print is signed in gold ink and hand-numbered out of 100. Add an original hand-drawn remarque to make your print one of a kind.</p>

  <div class="dv-perks-grid">
    <div class="dv-perk-card">
      <span class="dv-perk-tag std">Included</span>
      <h4>Signed Print — $25</h4>
      <p>The limited-edition print, signed in gold ink by Shawn Michael David Warner and hand-numbered out of 100.</p>
    </div>
    <div class="dv-perk-card">
      <span class="dv-perk-tag paid">Optional</span>
      <h4>Standard Remarque — Add $15</h4>
      <p>An original hand-drawn remarque added directly to your print — your choice of Doug portrait, cassette tape, or music notes.</p>
    </div>
    <div class="dv-perk-card">
      <span class="dv-perk-tag dlx">Deluxe</span>
      <h4>Deluxe Remarque — Add $45</h4>
      <div class="dv-gallery-frame dv-perk-frame"><img class="dv-perk-preview-img" src="https://s3.amazonaws.com/webflow-prod-assets/65b15ee0228d06647ca7e4ce/6a594b7178cc695b63f26f57_WarnerShawn-Scan-DougBanjo-7.26Copy-p-1080.avif" alt="Doug strumming his banjo — reference art for the deluxe remarque"></div>
      <p>A larger, more detailed original remarque featuring Doug strumming his banjo, individually drawn directly onto your print. Pictured: the reference piece your remarque is based on.</p>
    </div>
  </div>

  <div style="height:32px;"></div>

  <div class="dv-details">
    <h2>Print Details</h2>
    <div class="dv-detail-grid">
      <div>
        <h4>Limited Run 1</h4>
        <p>Only 100 full-color prints will be produced for Limited Run 1. Every copy will be individually signed, numbered, and tracked. Once all 100 are sold, this exact full-color edition will not be reprinted.</p>
      </div>
      <div>
        <h4>Print size &amp; paper</h4>
        <p>Professionally printed at 12 &times; 18 inches on smooth, high-quality poster stock.</p>
      </div>
      <div>
        <h4>How preorder works</h4>
        <p>Orders will be printed, signed, numbered, remarqued when selected, and shipped in the order received. Your card will be charged when your preorder is placed.</p>
      </div>
      <div>
        <h4>Signing, numbering &amp; remarques</h4>
        <p>Every print is signed in gold ink and hand-numbered by Shawn Michael David Warner. Standard remarque motifs are drawn as selected at checkout; deluxe remarques feature Doug strumming his banjo.</p>
      </div>
      <div>
        <h4>Shipping</h4>
        <p>Free shipping to U.S. addresses. Each print will be carefully rolled and shipped in a protective rigid mailing tube.</p>
      </div>
    </div>
  </div>

  <div class="dv-artist">
    <p>Dougvana began as an original commissioned artwork by Shawn Michael David Warner—the artist behind Walk-Off's comics, card art, illustrations, and gallery pieces. Have an idea you'd like Shawn to bring to life?</p>
    <a href="/commissions">Commission Shawn Michael David Warner</a>
  </div>

</section>

<script>
(function(){
  var BASE_PRICE = 25.00;
  var STANDARD_ADDON = 15.00;
  var DELUXE_ADDON = 45.00;
  var BASE_ID = 'dougvana-color';
  var BASE_NAME = 'Dougvana Print — Full Color';
  var BASE_IMAGE = 'https://s3.amazonaws.com/webflow-prod-assets/65b15ee0228d06647ca7e4ce/6a594b74574a248726ec14ce_WarnerShawn-Scan-DougBandColor-7.26Copy-p-800.avif';

  var SUBJECT_LABELS = { doughead: 'Doug Portrait', cassette: 'Cassette Tape', musicnotes: 'Music Notes' };

  function getSelectedTier(){
    var checked = document.querySelector('input[name="dv-remarque"]:checked');
    return checked ? checked.value : 'none';
  }

  function updateOptionStyling(){
    Array.prototype.forEach.call(document.querySelectorAll('[data-dv-option]'), function(el){
      var input = el.querySelector('input');
      el.classList.toggle('is-checked', input.checked);
    });
    var subjectWrap = document.getElementById('dv-remarque-subject-wrap');
    if(subjectWrap) subjectWrap.classList.toggle('is-visible', getSelectedTier() === 'standard');
  }

  function computePrice(){
    var tier = getSelectedTier();
    if(tier === 'standard') return BASE_PRICE + STANDARD_ADDON;
    if(tier === 'deluxe') return BASE_PRICE + DELUXE_ADDON;
    return BASE_PRICE;
  }

  function updatePriceDisplay(){
    var el = document.getElementById('dv-price-display');
    if(el) el.textContent = '$' + computePrice().toFixed(2);
  }

  Array.prototype.forEach.call(document.querySelectorAll('input[name="dv-remarque"]'), function(radio){
    radio.addEventListener('change', function(){
      updateOptionStyling();
      updatePriceDisplay();
    });
  });

  // .dv-remarque-option is a <div>, not a <label>, so clicking the option body
  // (not just the tiny radio circle) needs its own handler to select it.
  Array.prototype.forEach.call(document.querySelectorAll('.dv-remarque-option'), function(optionEl){
    optionEl.addEventListener('click', function(e){
      if(e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION' || e.target.tagName === 'INPUT') return;
      var radio = optionEl.querySelector('input[type="radio"]');
      if(radio && !radio.checked){
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });

  function buildCartItem(){
    var tier = getSelectedTier();
    if(tier === 'standard'){
      var subject = document.getElementById('dv-remarque-subject').value;
      return {
        id: BASE_ID + '--remarque-standard-' + subject,
        name: BASE_NAME + ' + Standard Remarque (' + SUBJECT_LABELS[subject] + ')',
        price: BASE_PRICE + STANDARD_ADDON,
        image: BASE_IMAGE,
        category: 'posters'
      };
    }
    if(tier === 'deluxe'){
      return {
        id: BASE_ID + '--remarque-deluxe',
        name: BASE_NAME + ' + Deluxe Remarque (Doug Strumming His Banjo)',
        price: BASE_PRICE + DELUXE_ADDON,
        image: BASE_IMAGE,
        category: 'posters'
      };
    }
    return { id: BASE_ID, name: BASE_NAME, price: BASE_PRICE, image: BASE_IMAGE, category: 'posters' };
  }

  function onAddToCart(){
    if(!window.WO || !window.WO.addToCart || !window.WO.getCart || !window.WO.removeFromCart){
      console.warn('[Dougvana] Cart script not ready yet.');
      return;
    }
    // Only one Dougvana line item at a time — swap out any prior variant rather than stacking duplicates.
    var existing = window.WO.getCart().filter(function(i){ return i.id && i.id.indexOf(BASE_ID) === 0; });
    existing.forEach(function(i){ window.WO.removeFromCart(i.id); });
    window.WO.addToCart(buildCartItem());
  }

  document.addEventListener('DOMContentLoaded', function(){
    updateOptionStyling();
    updatePriceDisplay();
    var btn = document.getElementById('dv-add-to-cart-btn');
    if(btn) btn.addEventListener('click', onAddToCart);
  });

  // Fog over the hero fades out once the visitor starts scrolling past it.
  var fogEl = document.querySelector('.dv-fog');
  if(fogEl){
    var updateFog = function(){
      if(window.scrollY > 40){ fogEl.classList.add('dv-fog-hidden'); }
      else { fogEl.classList.remove('dv-fog-hidden'); }
    };
    window.addEventListener('scroll', updateFog, { passive: true });
    updateFog();
  }

  fetch('https://wo-checkout.swarnerauto.workers.dev/api/rundrop-stock?keys=dougvana-color')
    .then(function(r){ return r.json(); })
    .then(function(d){
      if(!d || !d.runs || !d.runs['dougvana-color']) return;
      var info = d.runs['dougvana-color'];
      if(typeof info.remaining !== 'number') return;
      var countText = info.remaining > 0 ? info.remaining + '/' + info.limit + ' Prints Left' : 'Sold Out';
      var stockEl = document.querySelector('[data-dv-stock]');
      if(stockEl) stockEl.textContent = countText;
      var heroEl = document.querySelector('[data-dv-stock-hero]');
      if(heroEl) heroEl.textContent = countText;
      if(info.remaining <= 0){
        var btn = document.getElementById('dv-add-to-cart-btn');
        if(btn){ btn.disabled = true; btn.textContent = 'Sold Out'; }
      }
    })
    .catch(function(){ /* stock lines just stay at their static default if the check fails */ });
})();
</script>
