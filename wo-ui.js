/**
 * WO UI v7 — Comprehensive full-site theme engine
 * Covers: navbar, hero, promo strip, body, sections, cards,
 *         trust strip, product pages, shop, checklists, footer
 *
 * Strategy:
 * 1. `:root` tokens — one source of truth, everything references these
 * 2. Targeted class overrides with `!important` for specificity
 * 3. Contrast-safe text: auto white/black based on bg luminance
 * 4. Hover/focus states for accessibility
 * 5. Smooth 0.3s transitions on all color props
 */
(function(){
'use strict';
if(window.__WO_UI__)return;
window.__WO_UI__=true;

var WO=window.WO=window.WO||{};
var TABS=['mlb','nfl','nba','nhl','pokemon','mtg'];
var LBL={mlb:'MLB',nfl:'NFL',nba:'NBA',nhl:'NHL',pokemon:'Pokémon',mtg:'MTG'};
var LS='wo-team-v2';
var S={lg:'nfl',cw:'home',team:null};

// ─── PERSIST ────────────────────────────────────────────────────────────────
WO.save=function(t,cw,lg){
  try{localStorage.setItem(LS,JSON.stringify({k:t.k,n:t.n,hp:t.hp,ap:t.ap,lg:lg,cw:cw}));}catch(e){}
};
WO.load=function(){
  try{var d=localStorage.getItem(LS);return d?JSON.parse(d):null;}catch(e){return null;}
};

// ─── COLOR MATH ─────────────────────────────────────────────────────────────
function hexToRgb(h){
  var c=(h||'').replace('#','');
  if(c.length===3)c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  if(c.length!==6)return[20,20,30];
  return[parseInt(c.substr(0,2),16),parseInt(c.substr(2,2),16),parseInt(c.substr(4,2),16)];
}
function lum(hex){
  var rgb=hexToRgb(hex);
  var r=rgb[0]/255,g=rgb[1]/255,b=rgb[2]/255;
  r=r<=0.03928?r/12.92:Math.pow((r+0.055)/1.055,2.4);
  g=g<=0.03928?g/12.92:Math.pow((g+0.055)/1.055,2.4);
  b=b<=0.03928?b/12.92:Math.pow((b+0.055)/1.055,2.4);
  return 0.2126*r+0.7152*g+0.0722*b;
}
function on(hex){
  // WCAG-compliant text color for given background
  return lum(hex)>0.179?'#111111':'#ffffff';
}
function rgba(h,a){
  var rgb=hexToRgb(h);
  return'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+a+')';
}
function shade(h,pct){
  var rgb=hexToRgb(h);
  var r=Math.min(255,Math.max(0,Math.round(rgb[0]*(1+pct))));
  var g=Math.min(255,Math.max(0,Math.round(rgb[1]*(1+pct))));
  var b=Math.min(255,Math.max(0,Math.round(rgb[2]*(1+pct))));
  return'#'+(r<16?'0':'')+r.toString(16)+(g<16?'0':'')+g.toString(16)+(b<16?'0':'')+b.toString(16);
}
function mix(h1,h2,t){
  var a=hexToRgb(h1),b=hexToRgb(h2);
  var r=Math.round(a[0]*(1-t)+b[0]*t);
  var g=Math.round(a[1]*(1-t)+b[1]*t);
  var bv=Math.round(a[2]*(1-t)+b[2]*t);
  return'#'+(r<16?'0':'')+r.toString(16)+(g<16?'0':'')+g.toString(16)+(bv<16?'0':'')+bv.toString(16);
}
function contrastRatio(fg,bg){
  var l1=lum(fg)+0.05,l2=lum(bg)+0.05;
  return l1>l2?l1/l2:l2/l1;
}

// ─── DERIVE COLOR SYSTEM FROM TEAM COLORS ────────────────────────────────────
function buildPalette(primary,accent){
  var isDark=lum(primary)<0.12;
  var isMidtone=lum(primary)>=0.12&&lum(primary)<0.35;
  var isLight=lum(primary)>=0.35;

  // Page background: always very dark or very light, never midtone clashing
  var pageBg=isDark ? shade(primary,-0.35) : (isLight ? '#f4f4f8' : '#0a0a14');
  // Ensure page bg is sufficiently dark for dark teams
  if(isDark && lum(pageBg)>0.04) pageBg=shade(primary,-0.5);

  // Surface (cards, panels): slightly lifted from pageBg
  var surface=isDark ? shade(primary,-0.05) : (isLight ? '#ffffff' : shade(primary,-0.2));
  var surfaceRaised=isDark ? shade(primary,0.2) : (isLight ? '#f0f0f5' : shade(primary,0.05));

  // Borders
  var border=isDark ? rgba(primary,0.25) : (isLight ? 'rgba(0,0,0,0.1)' : rgba(primary,0.3));
  var borderStrong=isDark ? rgba(accent,0.5) : rgba(primary,0.4);

  // Text hierarchy
  var textPrimary=on(pageBg);  // high contrast main text
  var textSecondary=isDark ? rgba('#ffffff',0.55) : rgba('#000000',0.45);
  var textMuted=isDark ? rgba('#ffffff',0.35) : rgba('#000000',0.3);
  var textOnPrimary=on(primary);
  var textOnAccent=on(accent);

  // Accent on background must be legible
  var displayAccent=accent;
  if(contrastRatio(accent,pageBg)<3){
    // Too low contrast — lighten or darken accent
    displayAccent=lum(pageBg)<0.5 ? shade(accent,0.4) : shade(accent,-0.3);
  }

  // Navigation
  var navBg=primary;
  var navText=textOnPrimary;
  var navScrollBg=rgba(primary,0.15);

  // Hero / sections with bg image
  var heroOverlay=rgba('#000000',0.45);

  // Buttons
  var btnPrimaryBg=accent;
  var btnPrimaryText=textOnAccent;
  var btnPrimaryHoverBg=shade(accent,0.15);
  var btnDarkBg=isDark ? surfaceRaised : '#111111';
  var btnDarkText=on(btnDarkBg);

  // Footer
  var footerBg=isDark ? shade(primary,-0.4) : shade(primary,-0.05);
  if(footerBg==='#000000')footerBg='#080814';
  var footerText=on(footerBg);
  var footerMuted=rgba(footerText,0.5);
  var footerLink=displayAccent;

  // Trust strip
  var trustBg=isDark ? mix(primary,'#000000',0.6) : mix(primary,'#ffffff',0.92);
  var trustBorder=isDark ? rgba('#ffffff',0.07) : rgba('#000000',0.06);
  var trustText=isDark ? rgba('#ffffff',0.45) : rgba('#000000',0.4);
  var trustIcon=displayAccent;

  // Promo strip
  var promoBg=accent;
  var promoText=textOnAccent;

  // Cards (shop, checklist, product)
  var cardBg=surface;
  var cardBorder=border;
  var cardHoverBorder=accent;
  var cardHoverShadow='0 8px 32px '+rgba(primary,0.35);
  var cardText=textPrimary;
  var cardMeta=textSecondary;

  // Checklist specifics
  var checklistHeaderBg=primary;
  var checklistHeaderText=textOnPrimary;
  var checklistSectionBg=isDark ? shade(primary,-0.08) : shade(primary,0.95);
  var checklistSectionBorder=border;
  var checklistTitleColor=displayAccent;

  return{
    // Core tokens
    primary,accent,pageBg,surface,surfaceRaised,
    border,borderStrong,
    textPrimary,textSecondary,textMuted,textOnPrimary,textOnAccent,
    displayAccent,
    // Components
    navBg,navText,navScrollBg,
    heroOverlay,
    btnPrimaryBg,btnPrimaryText,btnPrimaryHoverBg,
    btnDarkBg,btnDarkText,
    footerBg,footerText,footerMuted,footerLink,
    trustBg,trustBorder,trustText,trustIcon,
    promoBg,promoText,
    cardBg,cardBorder,cardHoverBorder,cardHoverShadow,cardText,cardMeta,
    checklistHeaderBg,checklistHeaderText,checklistSectionBg,checklistSectionBorder,checklistTitleColor,
  };
}

// ─── CSS INJECTION ──────────────────────────────────────────────────────────
WO.applyTheme=function(team,cw){
  var home=cw!=='away';
  var primary=team[home?'hp':'ap']||'#001a72';
  var accent=team[home?'ap':'hp']||'#69be28';
  var p=buildPalette(primary,accent);

  var TRANSITION='transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;';

  var css=[
    /* === TOKENS === */
    ':root{',
    '  --wo-primary:'+p.primary+';',
    '  --wo-accent:'+p.accent+';',
    '  --wo-page-bg:'+p.pageBg+';',
    '  --wo-surface:'+p.surface+';',
    '  --wo-surface-raised:'+p.surfaceRaised+';',
    '  --wo-border:'+p.border+';',
    '  --wo-border-strong:'+p.borderStrong+';',
    '  --wo-text:'+p.textPrimary+';',
    '  --wo-text-secondary:'+p.textSecondary+';',
    '  --wo-text-muted:'+p.textMuted+';',
    '  --wo-on-primary:'+p.textOnPrimary+';',
    '  --wo-on-accent:'+p.textOnAccent+';',
    '  --wo-display-accent:'+p.displayAccent+';',
    '  --wo-nav-bg:'+p.navBg+';',
    '  --wo-footer-bg:'+p.footerBg+';',
    /* Webflow Checklist design variables (by CSS name: variable name lowercased, spaces→hyphens) */
    '  --checklist---primary:'+p.checklistHeaderBg+';',
    '  --checklist---accent:'+p.checklistTitleColor+';',
    '  --checklist---background:'+p.checklistSectionBg+';',
    '  --checklist---border:'+p.checklistSectionBorder+';',
    '  --checklist---text:'+p.checklistHeaderText+';',
    '}',

    /* === GLOBAL TRANSITIONS (applied sparingly to avoid janky page load) === */
    '*, *::before, *::after{',
    '  transition: background-color 0.3s ease, color 0.2s ease, border-color 0.3s ease;',
    '}',

    /* === PAGE WRAPPER === */
    '.page-wrapper-2, #page-wrapper, [class*="page-wrapper"]{',
    '  background-color:'+p.pageBg+' !important;',
    '  color:'+p.textPrimary+' !important;',
    '}',
    '.page-content, [id*="page-content"]{background-color:'+p.pageBg+' !important;}',

    /* === HERO / DARK SECTIONS === */
    '.section-hero, .Section-hero, .Slider-3{background-color:'+shade(p.primary,-0.4)+' !important;}',
    '.Section-3, .section-3{background-color:'+p.pageBg+' !important;}',
    /* Hero text lives on a dark photo — keep white */
    '.slide-intro, .Slide-intro{color:#ffffff !important;}',
    '.slide-heading, .Slide-heading{color:#ffffff !important;}',

    /* === PROMO STRIP === */
    '.promo-strip, .Promo-strip, .Rotating-promo-text{',
    '  background-color:'+p.promoBg+' !important;',
    '  color:'+p.promoText+' !important;',
    '}',
    '.promo-strip *, .Promo-strip *{color:'+p.promoText+' !important;}',

    /* === TRUST STRIP === */
    '.trust-strip{',
    '  background-color:'+p.trustBg+' !important;',
    '  border-top-color:'+p.trustBorder+' !important;',
    '  border-bottom-color:'+p.trustBorder+' !important;',
    '}',
    '.trust-strip__item{color:'+p.trustText+' !important;}',
    '.trust-strip__icon, .trust-strip__item svg{color:'+p.trustIcon+' !important;fill:'+p.trustIcon+' !important;}',

    /* === NAVBAR === */
    '#navbarID{background-color:'+p.navBg+' !important;}',
    '#navbarID.scrolled, #navbarID.w--scrolled{',
    '  background-color:'+rgba(p.primary,0.12)+' !important;',
    '  backdrop-filter:blur(16px) saturate(180%) !important;',
    '  -webkit-backdrop-filter:blur(16px) saturate(180%) !important;',
    '}',
    '.navbar6_component,.navbar6_container,[class*="navbar6"]{background-color:'+p.navBg+' !important;}',
    '.navbar6_link, .navbar6_link-text{color:'+p.navText+' !important;}',
    '.navbar6_link:hover, .navbar6_link.w--current{color:'+p.accent+' !important;}',
    '.navbar6_dropdown-link{color:'+p.primary+' !important;}',
    '.navbar6_dropdown-link:hover{color:'+p.accent+' !important;}',
    /* hamburger icon */
    '.menu-icon_line-top,.menu-icon_line-middle,.menu-icon_line-middle-inner,.menu-icon_line-bottom{',
    '  background-color:'+p.navText+' !important;',
    '}',
    /* mobile overlay */
    '.w-nav-overlay .navbar6_menu, .w-nav-overlay .navbar6_container{',
    '  background-color:'+p.primary+' !important;',
    '}',
    '.w-nav-overlay .navbar6_link{color:'+p.navText+' !important;}',

    /* === BUTTONS === */
    /* Primary CTA (accent filled) */
    '.Button-3, .button-3, [class*="Button 3"]{',
    '  background-color:'+p.btnPrimaryBg+' !important;',
    '  color:'+p.btnPrimaryText+' !important;',
    '}',
    '.Button-3:hover, .button-3:hover{background-color:'+p.btnPrimaryHoverBg+' !important;}',
    /* Dark filled button */
    '.Button-3.dark, .Dark{background-color:'+p.btnDarkBg+' !important;color:'+p.btnDarkText+' !important;}',
    /* Generic .Button class */
    '.Button,.btn,.btn--primary{background-color:'+p.btnPrimaryBg+' !important;color:'+p.btnPrimaryText+' !important;}',
    /* CTA text buttons */
    '.Underline-link, .underline-link{color:'+p.textMuted+' !important;}',
    '.Underline-link:hover, .underline-link:hover{color:'+p.displayAccent+' !important;}',
    '.Underline-link.light, .Light{color:rgba(255,255,255,0.85) !important;}',
    /* body display (muted text sections) */
    '.body-display, [class*="body display"]{color:'+p.textSecondary+' !important;}',

    /* === CONTENT HEADINGS (on light backgrounds) === */
    '.Heading, .heading{color:'+p.textPrimary+' !important;}',

    /* === FEATURE SECTION BACKGROUNDS === */
    /* Only target sections that have solid dark bg */
    '.Action-section{background-color:'+p.primary+' !important;color:'+p.textOnPrimary+' !important;}',

    /* === SECTION EYEBROWS / LABELS === */
    '.Mini-Title,.Mini-Title-White,.section-header__eyebrow,.eyebrow{color:'+p.displayAccent+' !important;}',

    /* === PRICES / HIGHLIGHTS === */
    '.Price,.PriceColor,[class*="price"]{color:'+p.displayAccent+' !important;}',

    /* === SHOP CARDS / PRODUCT CARDS === */
    '.product-card,.ProductCard,.w-commerce-commercecartcontainerinner{',
    '  background-color:'+p.cardBg+' !important;',
    '  border-color:'+p.cardBorder+' !important;',
    '}',
    '.product-card:hover,.ProductCard:hover{',
    '  border-color:'+p.cardHoverBorder+' !important;',
    '  box-shadow:'+p.cardHoverShadow+' !important;',
    '}',
    '.product-card__title,.product-card__name{color:'+p.cardText+' !important;}',
    '.product-card__price,.product-card__meta{color:'+p.cardMeta+' !important;}',

    /* === ADD TO CART / CHECKOUT === */
    '.Add-to-Cart,.Add-to-Cart-Button,.add-to-cart,.w-commerce-commerceaddtocartbutton{',
    '  background-color:'+p.btnPrimaryBg+' !important;',
    '  color:'+p.btnPrimaryText+' !important;',
    '  border-color:'+p.btnPrimaryBg+' !important;',
    '}',
    '.Checkout-Button,.Checkout-Button-2,.w-commerce-commercecartcheckoutbutton{',
    '  background-color:'+p.btnPrimaryBg+' !important;',
    '  color:'+p.btnPrimaryText+' !important;',
    '}',

    /* === BADGES === */
    '.badge--in-stock,.is-green,[class*="in-stock"]{',
    '  background-color:'+p.btnPrimaryBg+' !important;',
    '  color:'+p.btnPrimaryText+' !important;',
    '}',

    /* === SLIDER ARROWS (dark version for light sections) === */
    '.dark-slide-arrow, [class*="dark slide arrow"]{background-color:'+p.surfaceRaised+' !important;}',
    '.dark-slide-arrow svg, [class*="dark slide arrow"] svg{color:'+p.textPrimary+' !important;}',

    /* === FOOTER === */
    '.Footer,.Footer-2,.Footer-3,.Footer-Section,.footer,[class*="Footer"]{',
    '  background-color:'+p.footerBg+' !important;',
    '  color:'+p.footerText+' !important;',
    '}',
    '.Footer-Link,.footer-link,[class*="Footer-Link"]{color:'+p.footerMuted+' !important;}',
    '.Footer-Link:hover,[class*="Footer-Link"]:hover{color:'+p.displayAccent+' !important;}',
    '.Footer-Notice-Text,.Footer-Notice,.Legal-text,.Legal-link{color:'+p.footerMuted+' !important;}',
    '.Legal-link:hover{color:'+p.displayAccent+' !important;}',
    /* Semi-footer if used */
    '[class*="SemiFooter"] { background-color:'+p.footerBg+' !important; color:'+p.footerText+' !important;}',

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* === CHECKLIST INDEX PAGE === */
    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    '.shop-hero-section{background-color:'+shade(p.primary,-0.25)+' !important;}',

    '.checklist-card{',
    '  background-color:'+p.cardBg+' !important;',
    '  border-color:'+p.cardBorder+' !important;',
    '}',
    '.checklist-card:hover{',
    '  border-color:'+p.cardHoverBorder+' !important;',
    '  box-shadow:'+p.cardHoverShadow+' !important;',
    '}',
    '.checklist-card__title{color:'+p.cardText+' !important;}',
    '.checklist-card__meta,.checklist-count{color:'+p.cardMeta+' !important;}',
    '.checklist-card__footer{border-top-color:'+p.border+' !important;}',
    '.checklist-card__sport{color:'+p.displayAccent+' !important;}',
    '.checklist-sport-badge{',
    '  background-color:'+rgba(p.primary,0.2)+' !important;',
    '  color:'+p.displayAccent+' !important;',
    '  border-color:'+rgba(p.displayAccent,0.4)+' !important;',
    '}',
    '.checklist-view-btn{background-color:'+p.btnPrimaryBg+' !important;color:'+p.btnPrimaryText+' !important;}',

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* === CHECKLIST DETAIL PAGE (CMS Template) === */
    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    '.checklist-header{',
    '  background-color:'+p.checklistHeaderBg+' !important;',
    '  color:'+p.checklistHeaderText+' !important;',
    '}',
    '.checklist-title{color:'+p.checklistHeaderText+' !important;}',
    '.checklist-subtitle{color:'+rgba(p.checklistHeaderText,0.7)+' !important;}',
    '.checklist-section{',
    '  background-color:'+p.checklistSectionBg+' !important;',
    '  border-bottom-color:'+p.checklistSectionBorder+' !important;',
    '}',
    '.checklist-section-title{color:'+p.checklistTitleColor+' !important;}',
    '.checklist-container{color:'+p.textPrimary+' !important;}',
    /* Rich text within checklists */
    '.checklist-section .w-richtext, .checklist-section p{color:'+p.textSecondary+' !important;}',
    '.checklist-section .w-richtext a, .checklist-section a{color:'+p.displayAccent+' !important;}',
    '.checklist-section .w-richtext h1,.checklist-section .w-richtext h2,.checklist-section .w-richtext h3{color:'+p.textPrimary+' !important;}',
    '.checklist-section table{border-color:'+p.border+' !important;}',
    '.checklist-section th{background-color:'+rgba(p.primary,0.15)+' !important;color:'+p.textPrimary+' !important;}',
    '.checklist-section td{color:'+p.textSecondary+' !important;border-color:'+p.border+' !important;}',
    '.checklist-section tr:hover td{background-color:'+rgba(p.accent,0.07)+' !important;}',

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* === CATEGORY / PRODUCT TEMPLATE PAGES === */
    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    '.w-commerce-commerceorderconfirmationcontainer, .w-commerce-commercecheckoutemptystate{',
    '  background-color:'+p.pageBg+' !important;',
    '}',
    '.w-commerce-commercecartcontainerinner{background-color:'+p.surface+' !important;}',
    '.w-commerce-commercecartitem{border-bottom-color:'+p.border+' !important;}',

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* === BLOG / GUIDE PAGES === */
    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    '.blog-post-header, [class*="blog-header"]{background-color:'+p.primary+' !important;color:'+p.textOnPrimary+' !important;}',
    '.w-richtext h1,.w-richtext h2,.w-richtext h3,.w-richtext h4{color:'+p.textPrimary+' !important;}',
    '.w-richtext p, .w-richtext li{color:'+p.textSecondary+' !important;}',
    '.w-richtext a{color:'+p.displayAccent+' !important;}',
    '.w-richtext a:hover{color:'+shade(p.displayAccent,0.2)+' !important;}',

    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    /* === FORMS (contact, buylist) === */
    /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
    'input,textarea,select{',
    '  background-color:'+p.surface+' !important;',
    '  color:'+p.textPrimary+' !important;',
    '  border-color:'+p.border+' !important;',
    '}',
    'input::placeholder,textarea::placeholder{color:'+p.textMuted+' !important;}',
    'input:focus,textarea:focus,select:focus{',
    '  border-color:'+p.accent+' !important;',
    '  outline-color:'+rgba(p.accent,0.4)+' !important;',
    '  box-shadow:0 0 0 3px '+rgba(p.accent,0.2)+' !important;',
    '}',
    'label{color:'+p.textSecondary+' !important;}',
    '.w-form-fail{background-color:'+rgba('#ff4444',0.15)+' !important;}',
    '.w-form-done{background-color:'+rgba(p.accent,0.15)+' !important;color:'+p.textPrimary+' !important;}',
  ].join('\n');

  var el=document.getElementById('wo-theme');
  if(!el){el=document.createElement('style');el.id='wo-theme';document.head.appendChild(el);}
  el.textContent=css;
};

// ─── MODAL PALETTE (for modal UI) ────────────────────────────────────────────
function modalPal(){
  if(!S.team)return{bg:'#13161c',acc:'#69BE28',txt:'#fff',mut:'rgba(255,255,255,0.45)',border:'rgba(255,255,255,0.08)'};
  var home=S.cw!=='away';
  var bg=S.team[home?'hp':'ap']||'#13161c';
  var acc=S.team[home?'ap':'hp']||'#69BE28';
  var L=lum(bg);
  var txt=L>0.179?'#111':'#fff';
  var mut=L>0.179?'rgba(0,0,0,0.45)':'rgba(255,255,255,0.45)';
  var border=L>0.179?'rgba(0,0,0,0.1)':'rgba(255,255,255,0.08)';
  return{bg,acc,txt,mut,border};
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
var OVL=null,BOX=null,GRID=null;

function imgUrl(lg,k){
  if(lg==='pokemon')return'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+k+'.png';
  if(lg==='mtg')return'https://svgs.scryfall.io/card-symbols/'+k+'.svg';
  return'https://a.espncdn.com/i/teamlogos/'+lg+'/500/'+k+'.png';
}

function paint(){
  var p=modalPal();
  if(BOX){BOX.style.background=p.bg;BOX.style.borderTop='2px solid '+p.acc;}
  var ttl=document.getElementById('wo-ttl');if(ttl){ttl.style.color=p.txt;}
  var sub=document.getElementById('wo-sub');if(sub){sub.style.color=p.mut;}
  var done=document.getElementById('wo-done');
  if(done){done.style.background=p.acc;done.style.color=on(p.acc);}

  document.querySelectorAll('[data-cw]').forEach(function(b){
    var active=b.dataset.cw===S.cw;
    b.style.borderColor=active?p.acc:p.border;
    b.style.color=active?p.acc:p.mut;
    b.style.background=active?rgba(p.acc,0.15):'transparent';
    b.style.fontWeight=active?'800':'600';
  });
  document.querySelectorAll('[data-tab]').forEach(function(b){
    var active=b.dataset.tab===S.lg;
    b.style.background=active?p.acc:'transparent';
    b.style.color=active?on(p.acc):p.mut;
    b.style.border=active?'none':'1px solid transparent';
  });
  document.querySelectorAll('.wo-tile').forEach(function(tile){
    var isSelected=S.team&&tile.dataset.k===S.team.k&&tile.dataset.lg===S.lg;
    tile.style.borderColor=isSelected?p.acc:p.border;
    tile.style.background=isSelected?rgba(p.acc,0.15):rgba('#ffffff',0.03);
    tile.style.boxShadow=isSelected?'0 0 0 1px '+p.acc+', 0 4px 16px '+rgba(p.acc,0.3):'none';
    var label=tile.querySelector('.wo-label');
    if(label)label.style.color=isSelected?p.acc:p.mut;
  });
}

function buildUI(){
  if(OVL)return;

  OVL=document.createElement('div');
  OVL.id='wo-portal';
  OVL.style.cssText='position:fixed;inset:0;z-index:2147483647;display:flex;align-items:flex-end;justify-content:center;background:rgba(0,0,0,0);pointer-events:none;transition:background 0.3s;font-family:system-ui,-apple-system,sans-serif;';
  OVL.addEventListener('click',function(e){if(e.target===OVL)closeModal();});

  BOX=document.createElement('div');
  BOX.style.cssText='width:100%;max-width:700px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;border-radius:20px 20px 0 0;box-shadow:0 -24px 80px rgba(0,0,0,0.95);transform:translateY(102%);transition:transform 0.38s cubic-bezier(0.32,0.72,0,1);background:#13161c;';

  // Drag handle
  var hdl=document.createElement('div');
  hdl.style.cssText='flex-shrink:0;padding:12px 0 0;display:flex;justify-content:center;cursor:pointer;';
  var pip=document.createElement('div');
  pip.style.cssText='width:44px;height:5px;border-radius:3px;background:rgba(255,255,255,0.18);';
  hdl.appendChild(pip);hdl.addEventListener('click',closeModal);

  // Header row
  var hdr=document.createElement('div');
  hdr.style.cssText='flex-shrink:0;padding:10px 20px 0;';

  var topRow=document.createElement('div');
  topRow.style.cssText='display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;';

  var ttl=document.createElement('div');ttl.id='wo-ttl';
  ttl.style.cssText='font-size:18px;font-weight:900;color:#fff;letter-spacing:-0.01em;';
  ttl.textContent='Theme';

  var sub=document.createElement('div');sub.id='wo-sub';
  sub.style.cssText='font-size:12px;color:rgba(255,255,255,0.4);margin-top:2px;';
  sub.textContent='Pick your team — home or away colors';

  var titleBlock=document.createElement('div');
  titleBlock.appendChild(ttl);titleBlock.appendChild(sub);

  var done=document.createElement('button');done.id='wo-done';
  done.style.cssText='all:unset;box-sizing:border-box;font-size:13px;font-weight:800;cursor:pointer;padding:8px 24px;border-radius:100px;background:#69BE28;color:#fff;letter-spacing:0.02em;flex-shrink:0;';
  done.textContent='Done';
  done.addEventListener('click',closeModal);
  topRow.appendChild(titleBlock);topRow.appendChild(done);

  // Home / Away toggle
  var cwRow=document.createElement('div');
  cwRow.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px;';
  ['home','away'].forEach(function(k){
    var b=document.createElement('button');b.dataset.cw=k;
    b.style.cssText='all:unset;box-sizing:border-box;padding:10px;border:2px solid rgba(255,255,255,0.1);border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;background:transparent;color:rgba(255,255,255,0.4);text-align:center;transition:all 0.2s;';
    b.innerHTML='<span style="font-size:16px">'+(k==='home'?'🏠':'✈️')+'</span>&nbsp;&nbsp;'+(k==='home'?'Home Colors':'Away Colors');
    b.addEventListener('click',function(){
      S.cw=this.dataset.cw;
      if(S.team){WO.applyTheme(S.team,S.cw);WO.save(S.team,S.cw,S.lg);}
      paint();
    });
    cwRow.appendChild(b);
  });

  // Tab bar
  var tabRow=document.createElement('div');
  tabRow.style.cssText='display:flex;gap:6px;overflow-x:auto;padding:12px 0 0;scrollbar-width:none;-webkit-overflow-scrolling:touch;';
  tabRow.innerHTML='<style>*::-webkit-scrollbar{display:none}</style>';
  TABS.forEach(function(lg){
    var b=document.createElement('button');b.dataset.tab=lg;
    b.style.cssText='all:unset;box-sizing:border-box;padding:7px 16px;border-radius:100px;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap;background:transparent;color:rgba(255,255,255,0.4);border:1px solid transparent;letter-spacing:0.03em;transition:all 0.2s;';
    b.textContent=LBL[lg];
    b.addEventListener('click',function(){S.lg=this.dataset.tab;render();paint();});
    tabRow.appendChild(b);
  });

  hdr.appendChild(topRow);hdr.appendChild(cwRow);hdr.appendChild(tabRow);

  // Grid
  GRID=document.createElement('div');
  GRID.style.cssText='flex:1;overflow-y:auto;padding:14px 20px 28px;display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.1) transparent;';

  BOX.appendChild(hdl);BOX.appendChild(hdr);BOX.appendChild(GRID);
  OVL.appendChild(BOX);
  document.body.appendChild(OVL);
}

function render(){
  if(!GRID)return;
  GRID.innerHTML='';
  var p=modalPal();
  var src=window['WO_'+S.lg.toUpperCase()];
  if(!src||!src.length){
    var msg=document.createElement('p');
    msg.style.cssText='color:rgba(255,255,255,0.35);font-size:13px;grid-column:1/-1;text-align:center;padding:30px 0;';
    msg.textContent='No teams loaded for '+LBL[S.lg]+'. Make sure the team data script is included.';
    GRID.appendChild(msg);return;
  }
  src.forEach(function(team){
    var tile=document.createElement('div');
    tile.className='wo-tile';
    tile.dataset.k=team.k;tile.dataset.lg=S.lg;
    tile.style.cssText='display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 4px 8px;border-radius:12px;border:1px solid rgba(255,255,255,0.07);cursor:pointer;transition:all 0.18s ease;background:rgba(255,255,255,0.03);';

    var img=document.createElement('img');
    img.src=imgUrl(S.lg,team.k);
    img.style.cssText='width:46px;height:46px;object-fit:contain;';
    img.onerror=function(){this.style.display='none';};

    var label=document.createElement('div');
    label.className='wo-label';
    label.textContent=team.n;
    label.style.cssText='font-size:9.5px;text-align:center;color:rgba(255,255,255,0.35);line-height:1.3;font-weight:600;max-width:72px;word-break:break-word;';

    tile.appendChild(img);tile.appendChild(label);
    tile.addEventListener('click',function(){
      S.team=team;
      WO.applyTheme(team,S.cw);
      WO.save(team,S.cw,S.lg);
      paint();
    });
    tile.addEventListener('mouseenter',function(){
      if(!(S.team&&this.dataset.k===S.team.k))this.style.borderColor=rgba(p.acc,0.4);
    });
    tile.addEventListener('mouseleave',function(){
      if(!(S.team&&this.dataset.k===S.team.k))this.style.borderColor=p.border;
    });
    GRID.appendChild(tile);
  });
  paint();
}

function openModal(){
  if(!OVL)buildUI();
  OVL.style.background='rgba(0,0,0,0.72)';
  OVL.style.pointerEvents='auto';
  BOX.style.transform='translateY(0)';
  render();paint();
}
function closeModal(){
  OVL.style.background='rgba(0,0,0,0)';
  OVL.style.pointerEvents='none';
  BOX.style.transform='translateY(102%)';
}

WO.openTheme=function(){openModal();};

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',function(){
  var saved=WO.load();
  if(saved){
    S.team={k:saved.k,n:saved.n,hp:saved.hp,ap:saved.ap};
    S.cw=saved.cw||'home';
    S.lg=saved.lg||'nfl';
    WO.applyTheme(S.team,S.cw);
  }
  document.querySelectorAll('[data-wo-theme],[data-theme-trigger]').forEach(function(el){
    el.addEventListener('click',openModal);
  });
});

})();
