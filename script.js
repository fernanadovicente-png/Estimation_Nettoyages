function $(id){return document.getElementById(id)}
const i18n={fr:{client:'Nom client',date:'Date',type:'Type de nettoyage',pieces:'Pièces (pré-definitions)',add_custom:'Ajouter pièce personnalisée',list:'Liste des pièces',total:'Total estimé :',remarks:'Remarques :',presets_title:'Pré-définir pièces',first_tip:'💬 Conseil : utilisez le bouton 🔷 pour définir vos pièces personnalisées (une seule fois).',add_type:'Créer un type personnalisé'},en:{client:'Client name',date:'Date',type:'Cleaning type',pieces:'Rooms (presets)',add_custom:'Add custom room',list:'Rooms list',total:'Estimated total:',remarks:'Remarks:',presets_title:'Predefine rooms',first_tip:'💬 Tip: use the 🔷 button to set your custom rooms (one time).',add_type:'Create a custom type'}};
let lang=localStorage.getItem('est_lang')||'fr';function setLang(l){lang=l;localStorage.setItem('est_lang',l);translateAll();}
function translateAll(){document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(i18n[lang]&&i18n[lang][k])el.textContent=i18n[lang][k];});$('langSelect').value=lang;$('clientName').placeholder=(lang==='fr'?'Nom du client':'Client name');$('remarks').placeholder=(lang==='fr'?'Remarques...':'Remarks...');}translateAll();
const defaultPresets={
  "Fin de chantier":[{name:"Cuisine",time:3},{name:"Salle de bain",time:2},{name:"WC",time:0.5},{name:"Salon / Séjour",time:2.5},{name:"Chambre",time:1.8},{name:"Fenêtres",time:0.5}],
  "Fin de bail -":[{name:"Cuisine",time:4},{name:"Salle de bain",time:3},{name:"WC",time:1.5},{name:"Salon / Séjour",time:3},{name:"Chambre",time:2},{name:"Fenêtres",time:0.4}],
  "Fin de bail +":[{name:"Cuisine",time:6},{name:"Salle de bain",time:4.5},{name:"WC",time:2},{name:"Salon / Séjour",time:4.2},{name:"Chambre",time:2.8},{name:"Fenêtres",time:0.55}],

  // Nouveaux types (vides par défaut — tu ajoutes tes pièces/temps dans Paramètres)
  "Vitres & Stores":[],
  "Méthodes":[],
  "Entretien régulier - Administration":[],
  "Entretien régulier - Hôpital":[],
  "Entretien régulier - Écoles":[],
  "Entretien régulier - Résidence":[],
  "Entretien régulier - Médico-social":[]
  ,
  // ✅ Entretien - Résidence : pièces unitaires (en plus des lignes M²)
  "Entretien régulier - Résidence__pieces":[]
};

function migrateLegacyKeys(obj){
  // Renomme les anciens noms pour éviter d'afficher "très sale" au client.
  if(obj && typeof obj==='object'){
    if(obj["Fin de bail (moyen)"] && !obj["Fin de bail -"]){
      obj["Fin de bail -"]=obj["Fin de bail (moyen)"];
      delete obj["Fin de bail (moyen)"];
    }
    if(obj["Fin de bail (très sale)"] && !obj["Fin de bail +"]){
      obj["Fin de bail +"]=obj["Fin de bail (très sale)"];
      delete obj["Fin de bail (très sale)"];
    }
  }
  return obj;
}

function loadPresets(){
  const raw=localStorage.getItem('est_presets_v4');
  if(raw){
    try{
      const parsed=migrateLegacyKeys(JSON.parse(raw));
      // Ajoute les clés manquantes sans écraser l'existant.
      Object.keys(defaultPresets).forEach(k=>{ if(!(k in parsed)) parsed[k]=defaultPresets[k]; });
      localStorage.setItem('est_presets_v4',JSON.stringify(parsed));
      return parsed;
    }catch(e){}
  }
  localStorage.setItem('est_presets_v4',JSON.stringify(defaultPresets));
  return JSON.parse(localStorage.getItem('est_presets_v4'));
}
let presets=loadPresets();

// ================================
// ✅ Entretien - Résidence : pièces unitaires (liste séparée)
// ================================
const RES_PIECES_KEY = 'Entretien régulier - Résidence__pieces';

function residencePiecesArr(){
  presets[RES_PIECES_KEY] = presets[RES_PIECES_KEY] || [];
  return presets[RES_PIECES_KEY];
}

function normalizeResidencePiece(p){
  return { name: (p&&p.name)||'', time: +(p&&p.time)||0 };
}

function renderResidencePieceList(){
  const wrap = $('resPiecesWrap');
  const list = $('resPieceList');
  if(!wrap || !list) return;
  const isRes = (activeTab() === 'Entretien régulier - Résidence');
  wrap.classList.toggle('hidden', !isRes);
  if(!isRes) return;

  list.innerHTML = '';
  residencePiecesArr().map(normalizeResidencePiece).forEach((p,i)=>{
    const d=document.createElement('div');
    d.className='preset-item';
    d.innerHTML=`<div><strong>${p.name}</strong><div><small>${(p.time||0)} h</small></div></div><div><button type="button" onclick="editResidencePiecePreset(${i})">✏️</button> <button type="button" onclick="removeResidencePiecePreset(${i})">🗑️</button></div>`;
    list.appendChild(d);
  });
}

function addResidencePiecePreset(){
  const name = $('resPieceName')?.value.trim();
  const time = parseFloat($('resPieceTime')?.value);
  if(!name || isNaN(time)) return alert('Nom et temps requis');
  residencePiecesArr().push({ name, time:+time });
  $('resPieceName').value='';
  $('resPieceTime').value='';
  renderResidencePieceList();
}

function editResidencePiecePreset(i){
  const p = normalizeResidencePiece(residencePiecesArr()[i]);
  const nn = prompt('Nom', p.name);
  if(!nn) return;
  const nt = parseFloat(prompt('Temps (h)', p.time));
  if(isNaN(nt)) return;
  residencePiecesArr()[i] = { name: nn, time:+nt };
  renderResidencePieceList();
  renderStandardList();
}

function removeResidencePiecePreset(i){
  if(!confirm('Supprimer?')) return;
  residencePiecesArr().splice(i,1);
  renderResidencePieceList();
  renderStandardList();
}

function isM2HTypeForPresets(t){
  return t==='Méthodes' || (t||'').startsWith('Entretien régulier');
}

function isVitresStoresTab(t){
  return t==='Vitres & Stores';
}

function syncPresetAddFields(){
  const t=activeTab();
  const isM=isM2HTypeForPresets(t);
  const isV=isVitresStoresTab(t);
  const name=$('presetName');
  const time=$('presetTime');
  const m2=$('presetM2');
  const kind=$('presetKind');
  if(!name||!time||!m2) return;

  // reset
  if(kind) kind.classList.add('hidden');

  // Pour Méthodes & Entretien: on enregistre "Nom + M²" (capacité)
  time.classList.toggle('hidden', isM);
  m2.classList.toggle('hidden', !isM);

  // ✅ Vitres & Stores: 2 sources (Unités / M²)
  if(isV){
    if(kind) kind.classList.remove('hidden');
    const k = kind?.value || 'unit';
    time.classList.toggle('hidden', k!=='unit');
    m2.classList.toggle('hidden', k!=='m2');
    name.placeholder = k==='unit' ? 'Nom (ex: Vitre 1x1)' : 'Nom (ex: Grande façade)';
    time.placeholder = 'Temps par unité (h)';
    m2.placeholder = 'Capacité (m²/h)';
    return;
  }

  name.placeholder = isM ? 'Nom (ex: Méthode spray)' : 'Nom pièce (ex: Cuisine)';
}
if(!localStorage.getItem('est_first_tip')){localStorage.setItem('est_first_tip','1');$('firstTip')?.classList.remove('hidden');setTimeout(()=>$('firstTip')?.classList.add('hidden'),6000);}
function openPresets(){
  $('presetsModal').classList.remove('hidden');
  renderPresetList();
  syncPresetAddFields();
  renderResidencePieceList();
  try{ b_currentCatId=null; b_renderAll(); }catch(e){}
}
function closePresets(){$('presetsModal').classList.add('hidden');}
function activeTab(){return document.querySelector('.tab-btn.active')?.getAttribute('data-tab')||'Fin de chantier'}
function switchTab(t){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.getAttribute('data-tab')===t));
  renderPresetList();
  syncPresetAddFields();
  renderResidencePieceList();
  try{ b_currentCatId=null; b_renderAll(); }catch(e){}
}
function normalizePresetItem(t,p){
  // Sécurise les presets existants si l'utilisateur avait des anciens formats.
  if(isM2HTypeForPresets(t)){
    const m2 = (p && typeof p.m2==='number') ? p.m2 : (p && typeof p.time==='number' ? p.time : 0);
    return { name: (p&&p.name)||'', m2: +m2 };
  }
  // ✅ Vitres & Stores : 2 modes (unités / m²)
  if(isVitresStoresTab(t)){
    const kind = (p && (p.kind==='m2' || p.kind==='unit'))
      ? p.kind
      : (p && typeof p.cap==='number') ? 'm2' : 'unit';
    if(kind==='m2'){
      const cap = (p && typeof p.cap==='number') ? p.cap : (p && typeof p.m2==='number' ? p.m2 : (p && typeof p.time==='number' ? p.time : 0));
      return { name: (p&&p.name)||'', kind:'m2', cap:+cap };
    }
    const time = (p && typeof p.time==='number') ? p.time : 0;
    return { name: (p&&p.name)||'', kind:'unit', time:+time };
  }
  return { name: (p&&p.name)||'', time: +(p&&p.time)||0 };
}

function renderPresetList(){
  const t=activeTab();
  const list=$('presetList');
  list.innerHTML='';
  (presets[t]||[]).map(p=>normalizePresetItem(t,p)).forEach((p,i)=>{
    const d=document.createElement('div');
    d.className='preset-item';
    let sub = '';
    if(isM2HTypeForPresets(t)){
      sub = `<div><small>${(p.m2||0)} m²</small></div>`;
    } else if(isVitresStoresTab(t)){
      if(p.kind==='m2') sub = `<div><small>M² • ${(p.cap||0)} m²/h</small></div>`;
      else sub = `<div><small>Unités • ${(p.time||0)} h/u</small></div>`;
    } else {
      sub = `<div><small>${(p.time||0)} h</small></div>`;
    }
    d.innerHTML=`<div><strong>${p.name}</strong>${sub}</div><div><button onclick="editPreset('${t}',${i})">✏️</button> <button onclick="removePreset('${t}',${i})">🗑️</button></div>`;
    list.appendChild(d);
  });
  renderResidencePieceList();
  try{ b_renderAll(); }catch(e){}
}

function addPreset(){
  const t=activeTab();
  const name=$('presetName').value.trim();
  const isM=isM2HTypeForPresets(t);
  if(isM){
    const m2=parseFloat($('presetM2').value);
    if(!name||isNaN(m2)||m2<=0) return alert('Nom et M² requis');
    presets[t]=presets[t]||[];
    presets[t].push({name,m2:+m2});
    $('presetName').value='';
    $('presetM2').value='';
    renderPresetList();
    return;
  }

  // ✅ Vitres & Stores : Unités ou M² (capacité)
  if(isVitresStoresTab(t)){
    const k = $('presetKind')?.value || 'unit';
    presets[t]=presets[t]||[];
    if(k==='unit'){
      const time=parseFloat($('presetTime').value);
      if(!name||isNaN(time)) return alert('Nom et temps requis');
      presets[t].push({name, kind:'unit', time:+time});
      $('presetName').value='';
      $('presetTime').value='';
    } else {
      const cap=parseFloat($('presetM2').value);
      if(!name||isNaN(cap)||cap<=0) return alert('Nom et capacité requis');
      presets[t].push({name, kind:'m2', cap:+cap});
      $('presetName').value='';
      $('presetM2').value='';
    }
    renderPresetList();
    refreshVitresSelects();
    return;
  }

  // resto (comportement ancien)
  const time=parseFloat($('presetTime').value);
  if(!name||isNaN(time)) return alert('Nom et temps requis');
  presets[t]=presets[t]||[];
  presets[t].push({name,time:+time});
  $('presetName').value='';
  $('presetTime').value='';
  renderPresetList();
}

function editPreset(t,i){
  const isM=isM2HTypeForPresets(t);
  const p=normalizePresetItem(t,presets[t][i]);
  const nn=prompt('Nom / Name',p.name);
  if(!nn) return;
  if(isM){
    const nm2=parseFloat(prompt('M²',p.m2));
    if(isNaN(nm2)||nm2<=0) return;
    presets[t][i]={name:nn,m2:+nm2};
  }
  else if(isVitresStoresTab(t)){
    if(p.kind==='m2'){
      const ncap=parseFloat(prompt('Capacité (m²/h)', String(p.cap||0)));
      if(isNaN(ncap)||ncap<=0) return;
      presets[t][i]={name:nn, kind:'m2', cap:+ncap};
    } else {
      const nt=parseFloat(prompt('Temps par unité (h)', String(p.time||0)));
      if(isNaN(nt)) return;
      presets[t][i]={name:nn, kind:'unit', time:+nt};
    }
  }
  else {
    const nt=parseFloat(prompt('Temps (h) / Time (h)',p.time));
    if(isNaN(nt)) return;
    presets[t][i]={name:nn,time:+nt};
  }
  renderPresetList();
  renderStandardList();
  refreshMethodSelect();
  refreshVitresSelects();
}
function removePreset(t,i){
  if(!confirm('Supprimer?'))return;
  presets[t].splice(i,1);
  renderPresetList();
  renderStandardList();
  if(isVitresStoresTab(t)) refreshVitresSelects();
}
function savePresets(){
  localStorage.setItem('est_presets_v4',JSON.stringify(presets));
  alert(lang==='fr'?'Pré-définitions enregistrées':'Presets saved');
  closePresets();
  renderStandardList();
  refreshMethodSelect();
  refreshVitresSelects();
}
function clearAllPresets(){
  if(!confirm('Tout effacer?'))return;
  presets=JSON.parse(JSON.stringify(defaultPresets));
  localStorage.setItem('est_presets_v4',JSON.stringify(presets));
  renderPresetList();
  renderStandardList();
  refreshMethodSelect();
  refreshVitresSelects();
}
function createCustomType(){const name=$('newTypeName').value.trim();if(!name)return;if(!presets[name])presets[name]=[];const sel=$('cleanType');const opt=document.createElement('option');opt.value=name;opt.textContent=name;sel.insertBefore(opt, sel.querySelector('option[value="__custom__"]'));sel.value=name;$('newTypeName').value='';renderStandardList();alert(lang==='fr'?'Type créé':'Type created');}
let pieces=[];let total=0;
function toggleAdjuster(){const a=$('adjuster');const b=$('toggleAdjuster');a.classList.toggle('hidden');b.textContent=a.classList.contains('hidden')?'+ Ajuster':'- Ajuster';}
function isM2HType(t){return t==='Méthodes' || (t||'').startsWith('Entretien régulier');}

// ================================
// ✅ Méthodes / Entretien : plusieurs lignes
// H = Surface / M² (capacité)
// ================================
function m2hOptionsForType(t){
  return (presets[t]||[]).map(p=>normalizePresetItem(t,p)).filter(p=>p.name);
}

function ensureOneM2HLine(){
  const c=$('m2hLines');
  if(!c) return;
  if(!c.children.length) addM2HLine();
}

function addM2HLine(){
  const c=$('m2hLines');
  if(!c) return;

  const line=document.createElement('div');
  line.className='m2h-line';
  line.innerHTML=`
    <select class="m2h-method"></select>
    <input class="m2h-surface" type="number" min="0" step="0.1" placeholder="Surface (m²)">
    <input class="m2h-hours" type="number" readonly placeholder="H">
    <button class="m2h-del" type="button" title="Supprimer">🗑️</button>
  `;

  line.querySelector('.m2h-del').addEventListener('click', ()=>{
    line.remove();
    ensureOneM2HLine();
    updateTotal();
  });
  line.querySelector('.m2h-method').addEventListener('change', ()=>{ updateM2HLine(line); updateTotal(); });
  line.querySelector('.m2h-surface').addEventListener('input', ()=>{ updateM2HLine(line); updateTotal(); });

  c.appendChild(line);
  refreshMethodSelect();
  updateM2HLine(line);
  updateTotal();
}

function updateM2HLine(line){
  const t=$('cleanType')?.value||'';
  if(!isM2HType(t)) return;
  const sel=line.querySelector('.m2h-method');
  const surf=line.querySelector('.m2h-surface');
  const out=line.querySelector('.m2h-hours');
  if(!sel||!surf||!out) return;

  const opts=m2hOptionsForType(t);
  const picked=opts.find(o=>o.name===sel.value);
  const surface=parseFloat(surf.value||'0')||0;
  const cap=picked ? (parseFloat(picked.m2)||0) : 0;

  const h = (surface>0 && cap>0) ? (surface / cap) : 0;
  out.value = h>0 ? h.toFixed(2) : '';
}

function getM2HExtraItems(){
  const t=$('cleanType')?.value||'';
  if(!isM2HType(t)) return [];
  const c=$('m2hLines');
  if(!c) return [];
  const opts=m2hOptionsForType(t);
  return Array.from(c.children).map(line=>{
    const sel=line.querySelector('.m2h-method');
    const surf=line.querySelector('.m2h-surface');
    const out=line.querySelector('.m2h-hours');
    const name=sel?.value||'';
    const picked=opts.find(o=>o.name===name);
    const surface=parseFloat(surf?.value||'0')||0;
    const cap=picked ? (parseFloat(picked.m2)||0) : 0;
    const h=(surface>0 && cap>0) ? (surface/cap) : 0;
    return {name, surface, cap, hours:+(h||0)};
  }).filter(it=>it.name && it.surface>0 && it.hours>0);
}

function extraHours(){
  return getM2HExtraItems().reduce((s,it)=>s+it.hours,0);
}

function toggleM2H(){
  const t=$('cleanType').value;
  const row=$('m2hRow');
  if(!row) return;
  row.classList.toggle('hidden', !isM2HType(t));
  const title=$('m2hTitle');
  if(title) title.textContent = t==='Méthodes' ? 'Méthodes' : 'Entretien régulier';
  if(isM2HType(t)) ensureOneM2HLine();
  refreshMethodSelect();
  updateTotal();
}

// ✅ Vitres & Stores : afficher module Unités + M² (et cacher la liste standard)
function toggleVitresStores(){
  const t=$('cleanType')?.value||'';
  const wrap=$('vitresWrap');
  const std=$('standardList');
  if(!wrap||!std) return;
  const on = (t==='Vitres & Stores');
  wrap.classList.toggle('hidden', !on);
  std.classList.toggle('hidden', on);
  if(on){
    refreshVitresSelects();
    applyVitresPresetToInputs();
  }
}
function onTypeChange(){
  const v=$('cleanType').value;
  if(v==='__custom__'){openPresets();setTimeout(()=>$('newTypeName').focus(),50);}else{renderStandardList();}
  toggleM2H();
  toggleVitresStores();
}
function currentArr(){
  const t=$('cleanType').value;
  if(!presets[t]||!presets[t].length){return defaultPresets[t]||[]}
  return presets[t];
}

// ✅ Bibliothèque apenas para 3 tipos
function isBiblioType(t){
  return t==='Fin de chantier' || t==='Fin de bail -' || t==='Fin de bail +';
}

let _stdRendered = [];

function renderStandardList(){
  const t=$('cleanType').value;
  const c=$('standardList');
  c.innerHTML='';

  // ✅ Entretien - Résidence: mostra peças (unités) + mantém M² (m2hRow)
  if(t==='Entretien régulier - Résidence'){
    _stdRendered = residencePiecesArr().map(normalizeResidencePiece);
    _stdRendered.forEach((p,i)=>{
      const d=document.createElement('div');
      d.className='std-item';
      d.innerHTML=`<span class="std-name">${p.name}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${i})'>Ajouter</button>`;
      c.appendChild(d);
    });
    updateTotal();
    return;
  }

  // Méthodes / autres Entretien = seulement M²
  if(isM2HType(t)){
    const d=document.createElement('div');
    d.className='std-item';
    d.innerHTML=`<span class="std-name">${lang==='fr'?'Utilise la ligne Méthode + M² pour calculer le temps.':'Use Method + m² line to calculate time.'}</span>`;
    c.appendChild(d);
    updateTotal();
    return;
  }

  // ✅ Page principale organizada por categorias (click-to-open) para os 3 tipos
  if(isBiblioType(t)){
    renderStandardListFromBiblio(t, c);
    updateTotal();
    return;
  }

  // resto = comportamento antigo
  _stdRendered = currentArr();
  _stdRendered.forEach((p,i)=>{
    const d=document.createElement('div');
    d.className='std-item';
    d.innerHTML=`<span class="std-name">${p.name}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${i})'>Ajouter</button>`;
    c.appendChild(d);
  });
  updateTotal();
}

function renderStandardListFromBiblio(t, container){
  const tab = (typeof BIBLIO !== 'undefined' && BIBLIO && BIBLIO[t]) ? BIBLIO[t] : null;
  const cats = tab?.categories || [];

  if(!cats.length){
    _stdRendered = (defaultPresets[t] || []);
    _stdRendered.forEach((p,i)=>{
      const d=document.createElement('div');
      d.className='std-item';
      d.innerHTML=`<span class="std-name">${p.name}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${i})'>Ajouter</button>`;
      container.appendChild(d);
    });
    return;
  }

  _stdRendered = [];

  cats.forEach(cat=>{
    if(!(cat.items||[]).length) return;

    const details = document.createElement('details');
    details.className = 'std-cat';
    details.open = false;

    const summary = document.createElement('summary');
    summary.className = 'std-cat-title';
    summary.innerHTML = `<strong>${cat.label}</strong>`;
    details.appendChild(summary);

    const inner = document.createElement('div');
    inner.className = 'std-cat-inner';

    (cat.items||[]).forEach(it=>{
      const idx = _stdRendered.length;
      const p = { name: it.label, time: Number(it.time)||0 };
      _stdRendered.push(p);

      const d=document.createElement('div');
      d.className='std-item';
      d.innerHTML=`<span class="std-name">${p.name}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${idx})'>Ajouter</button>`;
      inner.appendChild(d);
    });

    details.appendChild(inner);
    container.appendChild(details);
  });
}

function addStandard(i){
  const arr = (_stdRendered && _stdRendered.length) ? _stdRendered : currentArr();
  const p = arr[i];
  if(!p) return;

  const items=document.querySelectorAll('.std-item');
  let qty=1;
  items.forEach(it=>{
    const n = it.querySelector('.std-name');
    if(n && n.textContent===p.name){
      qty=parseInt(it.querySelector('.qty')?.value)||1;
    }
  });

  pieces.push({name:p.name,timePerUnit:p.time,qty:qty,subtotal:+(p.time*qty).toFixed(2)});
  updateList();
}
function addCustomPiece(){const name=$('customPieceName').value.trim();const time=parseFloat($('customPieceTime').value);const qty=parseInt($('customPieceQty').value)||1;if(!name||isNaN(time))return alert('Nom et temps valides requis');pieces.push({name,timePerUnit:time,qty:qty,subtotal:+(time*qty).toFixed(2)});$('customPieceName').value='';$('customPieceTime').value='';$('customPieceQty').value='1';updateList();}

// ================================
// ✅ Vitres & Stores : Unités + M² (difficulté 0/20/30)
// ✅ Synchronisé avec Paramètres (source = presets['Vitres & Stores'])
// - Paramètres: items {name, kind:'unit', time} et {name, kind:'m2', cap}
// - Ajuster: 2 selects (unit / m2) qui auto-remplissent temps/capacité
// - Le total ne bouge que quand on clique "Ajouter à la session"
// ================================

function vitresPresets(){
  return (presets['Vitres & Stores']||[]).map(p=>normalizePresetItem('Vitres & Stores', p)).filter(p=>p.name);
}

function refreshVitresSelects(){
  const uSel=$('vit_u_preset');
  const mSel=$('vit_m2_preset');
  if(!uSel||!mSel) return;

  const list=vitresPresets();
  const units=list.filter(x=>x.kind==='unit');
  const m2=list.filter(x=>x.kind==='m2');

  const uCur=uSel.value;
  const mCur=mSel.value;

  uSel.innerHTML = units.length
    ? units.map(x=>`<option value="${x.name}">${x.name} (${x.time||0} h/u)</option>`).join('')
    : `<option value="">(définir via 🔷)</option>`;

  mSel.innerHTML = m2.length
    ? m2.map(x=>`<option value="${x.name}">${x.name} (${x.cap||0} m²/h)</option>`).join('')
    : `<option value="">(définir via 🔷)</option>`;

  if(uCur && units.some(x=>x.name===uCur)) uSel.value=uCur;
  if(mCur && m2.some(x=>x.name===mCur)) mSel.value=mCur;
}

function applyVitresPresetToInputs(){
  const list=vitresPresets();
  const uName=$('vit_u_preset')?.value||'';
  const mName=$('vit_m2_preset')?.value||'';

  const u=list.find(x=>x.kind==='unit' && x.name===uName);
  const m=list.find(x=>x.kind==='m2' && x.name===mName);

  if(u && $('vit_u_time')) $('vit_u_time').value = String(u.time ?? '');
  if(m && $('vit_m2_cap')) $('vit_m2_cap').value = String(m.cap ?? '');
}

function hoursUnitsWithDifficulty(timePerUnit, qtyNormal, qtyDiff, coef){
  const base = (qtyNormal * timePerUnit);
  const diff = (qtyDiff * timePerUnit * (1 + coef));
  return +(base + diff).toFixed(2);
}

function hoursM2WithDifficulty(m2Normal, m2Diff, cap, coef){
  if(cap<=0) return 0;
  const base = (m2Normal / cap);
  const diff = (m2Diff / cap * (1 + coef));
  return +(base + diff).toFixed(2);
}

function addVitresToSession(){
  const t=$('cleanType')?.value||'';
  if(t!=='Vitres & Stores') return;

  const uPreset = $('vit_u_preset')?.value || '';
  const mPreset = $('vit_m2_preset')?.value || '';

  const tUnit = parseFloat($('vit_u_time')?.value||'0')||0;
  const qNorm = parseInt($('vit_u_norm')?.value||'0')||0;
  const qDiff = parseInt($('vit_u_diff')?.value||'0')||0;
  const cU    = parseFloat($('vit_u_coef')?.value||'0')||0;

  const cap   = parseFloat($('vit_m2_cap')?.value||'0')||0;
  const mNorm = parseFloat($('vit_m2_norm')?.value||'0')||0;
  const mDiff = parseFloat($('vit_m2_diff')?.value||'0')||0;
  const cM    = parseFloat($('vit_m2_coef')?.value||'0')||0;

  const hU = (tUnit>0 && (qNorm>0||qDiff>0)) ? hoursUnitsWithDifficulty(tUnit,qNorm,qDiff,cU) : 0;
  const hM = (cap>0 && (mNorm>0||mDiff>0)) ? hoursM2WithDifficulty(mNorm,mDiff,cap,cM) : 0;

  if(hU<=0 && hM<=0) return alert(lang==='fr'?'Rien à ajouter':'Nothing to add');

  if(hU>0){
    const baseName = uPreset ? `Unités • ${uPreset}` : 'Unités';
    const label = `Vitres & Stores - ${baseName} (${qNorm} normal + ${qDiff} diff, +${Math.round(cU*100)}%)`;
    pieces.push({name:label,timePerUnit:hU,qty:1,subtotal:+hU.toFixed(2)});
  }
  if(hM>0){
    const baseName = mPreset ? `M² • ${mPreset}` : 'M²';
    const label = `Vitres & Stores - ${baseName} (${mNorm} m² normal + ${mDiff} m² diff, +${Math.round(cM*100)}%)`;
    pieces.push({name:label,timePerUnit:hM,qty:1,subtotal:+hM.toFixed(2)});
  }

  // reset quantités (garde temps/capacité)
  ['vit_u_norm','vit_u_diff','vit_m2_norm','vit_m2_diff'].forEach(id=>{ if($(id)) $(id).value=''; });
  updateList();
}
function updateList(){const list=$('pieceList');list.innerHTML='';total=0;pieces.forEach((p,i)=>{total+=p.subtotal;const li=document.createElement('li');li.innerHTML=`<div><strong>${p.name}</strong><br><small>${p.timePerUnit}h × ${p.qty} = ${p.subtotal}h</small></div><div class='piece-actions'><button onclick='quickEdit(${i})'>✏️</button><button onclick='removePiece(${i})'>🗑️</button></div>`;list.appendChild(li);});updateTotal();}
function updateTotal(){
  const base=+pieces.reduce((s,p)=>s+p.subtotal,0);
  const ex=extraHours();
  const totalH=(base+ex);
  $('totalHours').textContent=totalH.toFixed(2);
  // Équipe = Total / heures par personne (sans arrondir)
  const hpp=parseFloat($('hoursPerPerson')?.value||'0')||0;
  const people = (hpp>0) ? (totalH / hpp) : 0;
  if($('teamTotal')) $('teamTotal').textContent=totalH.toFixed(2);
  if($('teamPeople')) $('teamPeople').textContent=people.toFixed(2);
}
function quickEdit(i){const p=pieces[i];const q=parseInt(prompt('Quantité',p.qty));const t=parseFloat(prompt('Temps unitaire (h)',p.timePerUnit));if(isNaN(q)||isNaN(t))return;p.qty=q;p.timePerUnit=t;p.subtotal=+(q*t).toFixed(2);updateList();}
function removePiece(i){pieces.splice(i,1);updateList();}
function resetForm(){
  if(!confirm('Réinitialiser la session actuelle?'))return;
  pieces=[];total=0;
  $('clientName').value='';
  $('cleaningDate').value='';
  $('remarks').value='';
  // Réinitialise les lignes Méthodes/Entretien (sans toucher aux paramètres)
  const c=$('m2hLines');
  if(c) c.innerHTML='';
  updateList();
  toggleM2H();
}
function generatePDF(){
  const name=$('clientName').value||'';
  const date=$('cleaningDate').value||'';
  const type=$('cleanType').value||'';
  const remarks=$('remarks').value||'';
  const exItems=getM2HExtraItems();
  const exH=exItems.reduce((s,it)=>s+it.hours,0);
  if(!(window.jspdf&&window.jspdf.jsPDF))return alert('PDF library not available');
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:'mm',format:'a4'});
  doc.setFillColor(30,144,255);doc.circle(20,18,6,'F');
  doc.setFontSize(16);doc.text('Estimation Nettoyage',32,20);
  doc.setFontSize(11);
  doc.text((lang==='fr'?'Client':'Client')+': '+name,14,32);
  doc.text('Date: '+date,90,32);
  doc.text((lang==='fr'?'Type':'Type')+': '+type,14,39);
  if(isM2HType(type) && exItems.length){
    doc.setFontSize(10);
    doc.text(`${type} : ${exItems.length} ligne(s)`,14,46);
  }

  let y=52;
  doc.setFontSize(10);
  doc.text((lang==='fr'?'Pièce':'Item'),14,y);
  doc.text((lang==='fr'?'Temps uni.(h)':'Unit time(h)'),90,y);
  doc.text((lang==='fr'?'Nombre':'Qty'),130,y);
  doc.text('Total(h)',170,y,{align:'right'});
  y+=2;doc.line(14,y,196,y);y+=6;

  pieces.forEach(p=>{
    if(y>270){doc.addPage();y=20;}
    doc.text(p.name,14,y);
    doc.text(String(p.timePerUnit),90,y);
    doc.text(String(p.qty),130,y);
    doc.text(String(p.subtotal),170,y,{align:'right'});
    y+=7;
  });

  // Ajoute les lignes Méthodes / Entretien (Surface / M²)
  exItems.forEach(it=>{
    if(y>270){doc.addPage();y=20;}
    const label = `${type}: ${it.name} (${it.surface} m²)`;
    doc.text(label,14,y);
    doc.text(String(it.hours.toFixed(2)),90,y);
    doc.text('1',130,y);
    doc.text(String(it.hours.toFixed(2)),170,y,{align:'right'});
    y+=7;
  });

  const totalH=(+pieces.reduce((s,p)=>s+p.subtotal,0) + exH).toFixed(2);
  if(y>250){doc.addPage();y=20;}
  doc.setDrawColor(0,0,0);
  doc.setFillColor(245,248,255);
  doc.rect(14,y+4,182,12,'F');
  doc.setFontSize(12);
  doc.text((lang==='fr'?'Total général':'Grand Total')+': '+totalH+' h',18,y+12);
  doc.setFontSize(10);
  doc.text((lang==='fr'?'Remarques':'Remarks')+':',14,y+24);
  doc.setFontSize(9);
  doc.text(remarks||'-',14,y+32);
  const def='Estimation_Nettoyage_'+(date||new Date().toISOString().slice(0,10))+'.pdf';
  const fname=prompt(lang==='fr'?'Nom du fichier PDF:':'PDF file name:',def)||def;
  doc.save(fname);
}

window.addEventListener('load',()=>{
  renderStandardList();
  toggleM2H();
  toggleVitresStores();
  $('hoursPerPerson')?.addEventListener('input', updateTotal);
  $('presetKind')?.addEventListener('change', syncPresetAddFields);
  $('vit_u_preset')?.addEventListener('change', applyVitresPresetToInputs);
  $('vit_m2_preset')?.addEventListener('change', applyVitresPresetToInputs);
  // Les lignes Méthodes/Entretien se gèrent via addM2HLine() (listeners attachés par ligne)
});

function refreshMethodSelect(){
  const t=$('cleanType')?.value||'';
  const c=$('m2hLines');
  if(!c) return;
  if(!isM2HType(t)){
    c.innerHTML='';
    return;
  }
  const opts=m2hOptionsForType(t);
  const lines=Array.from(c.children);
  lines.forEach(line=>{
    const sel=line.querySelector('.m2h-method');
    if(!sel) return;
    const current=sel.value;
    sel.innerHTML='';
    if(!opts.length){
      const o=document.createElement('option');
      o.value='';
      o.textContent=lang==='fr'?'(ajoute via 🔷)':'(add via 🔷)';
      sel.appendChild(o);
    }else{
      const o0=document.createElement('option');
      o0.value='';
      o0.textContent=lang==='fr'?'Choisir...':'Choose...';
      sel.appendChild(o0);
      opts.forEach(p=>{
        const opt=document.createElement('option');
        opt.value=p.name;
        opt.textContent=`${p.name} (${p.m2||0} m²)`;
        sel.appendChild(opt);
      });
      if(current && opts.find(o=>o.name===current)) sel.value=current;
    }
    updateM2HLine(line);
  });
}

// ================================
// ℹ️ Modal "Comment ça marche"
// ================================
function openInfo(){
  $('infoModal')?.classList.remove('hidden');
}
function closeInfo(){
  $('infoModal')?.classList.add('hidden');
}

// =====================================================
// ✅ BIBLIOTHÈQUE (catégories) - 100% éditable (MODAL 🔷)
// - pas de recherche
// - cliquer cat => liste items
// - ajout/édition/suppression cat + items
// - + ajoute à la session
// - visible UNIQUEMENT dans Fin de chantier / Fin de bail - / Fin de bail +
// =====================================================

const BIBLIO_KEY = 'est_biblio_v1';

function b_uid(prefix='id'){
  return prefix + '_' + Math.random().toString(16).slice(2,10);
}

const DEFAULT_BIBLIO = {
  'Fin de chantier': {
    categories: [
      { id:'pieces', label:'Pièces', items:[
        { id:'cuisine', label:'Cuisine', time:1 },
        { id:'salon', label:'Salon', time:1 },
        { id:'chambre', label:'Chambre', time:1 },
        { id:'wc', label:'WC', time:0.4 },
      ]},
      { id:'commun', label:'Commun', items:[
        { id:'couloir', label:'Couloir', time:0.4 },
        { id:'hall', label:'Hall', time:0.4 },
      ]},
      { id:'vitres', label:'Vitres', items:[
        { id:'v11', label:'Vitre 1x1', time:0.15 },
        { id:'v15', label:'Vitre 1.5x1.5', time:0.25 },
      ]},
      { id:'mobilier', label:'Mobilier', items:[] },
    ]
  },
  'Fin de bail -': { categories: [] },
  'Fin de bail +': { categories: [] },
};

function loadBiblio(){
  try{
    const raw = localStorage.getItem(BIBLIO_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    const b = parsed || JSON.parse(JSON.stringify(DEFAULT_BIBLIO));
    // seed missing keys
    Object.keys(DEFAULT_BIBLIO).forEach(k=>{ if(!b[k]) b[k] = JSON.parse(JSON.stringify(DEFAULT_BIBLIO[k])); });
    // seed empty cats for 3 types (so page principale uses biblio)
    Object.keys(DEFAULT_BIBLIO).forEach(k=>{
      if(!b[k].categories || !Array.isArray(b[k].categories)) b[k].categories = [];
      if(b[k].categories.length===0 && DEFAULT_BIBLIO[k].categories?.length){
        b[k] = JSON.parse(JSON.stringify(DEFAULT_BIBLIO[k]));
      }
    });
    localStorage.setItem(BIBLIO_KEY, JSON.stringify(b));
    return b;
  }catch{
    const b = JSON.parse(JSON.stringify(DEFAULT_BIBLIO));
    localStorage.setItem(BIBLIO_KEY, JSON.stringify(b));
    return b;
  }
}

let BIBLIO = loadBiblio();
let b_currentCatId = null;

function saveBiblio(){
  localStorage.setItem(BIBLIO_KEY, JSON.stringify(BIBLIO));
  // reflète sur la page principale
  try{ if(isBiblioType($('cleanType')?.value||'')) renderStandardList(); }catch(e){}
}

function b_activeTabName(){ return activeTab(); }

function b_getTabObj(){
  const t = b_activeTabName();
  if(!BIBLIO[t]) BIBLIO[t] = { categories: [] };
  return BIBLIO[t];
}

function b_getCatObj(){
  const tab = b_getTabObj();
  return tab.categories.find(c => c.id === b_currentCatId) || null;
}

function b_addToSession(item){
  const time = Number(item.time) || 0;
  pieces.push({ name: item.label, timePerUnit: time, qty: 1, subtotal: +time.toFixed(2) });
  updateList();
  closePresets();
}

function b_renderCats(){
  const mount = $('biblioCats');
  const tab = b_getTabObj();
  if(!mount) return;
  mount.innerHTML = '';

  tab.categories.forEach(cat=>{
    const row = document.createElement('div');
    row.className = 'b-cat';

    const btn = document.createElement('button');
    btn.type='button';
    btn.textContent = cat.label;
    if(cat.id === b_currentCatId) btn.classList.add('active');
    btn.onclick = ()=>{ b_currentCatId = cat.id; b_renderAll(); };

    const edit = document.createElement('button');
    edit.type='button';
    edit.textContent = '✏️';
    edit.className = 'btn small';
    edit.onclick = ()=>{
      const nn = prompt('Nom catégorie:', cat.label);
      if(!nn) return;
      cat.label = nn.trim();
      saveBiblio();
      b_renderAll();
    };

    const del = document.createElement('button');
    del.type='button';
    del.textContent = '🗑';
    del.className = 'btn small danger';
    del.onclick = ()=>{
      if(!confirm('Supprimer catégorie ?')) return;
      tab.categories = tab.categories.filter(c=>c.id!==cat.id);
      if(b_currentCatId===cat.id) b_currentCatId = tab.categories[0]?.id || null;
      saveBiblio();
      b_renderAll();
    };

    row.appendChild(btn);
    row.appendChild(edit);
    row.appendChild(del);
    mount.appendChild(row);
  });
}

function b_renderItems(){
  const title = $('biblioCatTitle');
  const mount = $('biblioItems');
  if(!mount || !title) return;
  mount.innerHTML = '';

  const cat = b_getCatObj();
  title.textContent = cat ? cat.label : '—';
  if(!cat) return;

  cat.items.forEach(it=>{
    const div = document.createElement('div');
    div.className = 'b-item';

    const left = document.createElement('div');
    left.className='left';
    left.innerHTML = `<strong>${it.label}</strong><small>${(Number(it.time)||0)} h</small>`;

    const right = document.createElement('div');
    right.className='right';

    const add = document.createElement('button');
    add.type='button';
    add.textContent='+';
    add.className='btn small';
    add.onclick = ()=> b_addToSession(it);

    const edit = document.createElement('button');
    edit.type='button';
    edit.textContent='✏️';
    edit.className='btn small';
    edit.onclick = ()=>{
      const nn = prompt('Nom item:', it.label);
      if(!nn) return;
      const nt = parseFloat(prompt('Temps (h):', String(it.time ?? 0)));
      if(isNaN(nt)) return;
      it.label = nn.trim();
      it.time = nt;
      saveBiblio();
      b_renderAll();
    };

    const del = document.createElement('button');
    del.type='button';
    del.textContent='🗑';
    del.className='btn small danger';
    del.onclick = ()=>{
      if(!confirm('Supprimer item ?')) return;
      cat.items = cat.items.filter(x=>x.id!==it.id);
      saveBiblio();
      b_renderAll();
    };

    right.appendChild(add);
    right.appendChild(edit);
    right.appendChild(del);
    div.appendChild(left);
    div.appendChild(right);
    mount.appendChild(div);
  });
}

function b_renderAll(){
  const wrap = $('biblioWrap');
  const list = $('presetList');
  const addRow = document.querySelector('.preset-add');
  if(!wrap || !list) return;

  const tabName = b_activeTabName();
  const enabled = isBiblioType(tabName);

  // show/hide residence pieces secondary section
  renderResidencePieceList();

  if(!enabled){
    wrap.classList.add('hidden');
    list.classList.remove('hidden');
    if(addRow) addRow.classList.remove('hidden');
    return;
  }

  wrap.classList.remove('hidden');
  list.classList.add('hidden');
  if(addRow) addRow.classList.add('hidden');

  const tab = b_getTabObj();
  if(!b_currentCatId) b_currentCatId = tab.categories[0]?.id || null;
  if(b_currentCatId && !tab.categories.some(c=>c.id===b_currentCatId)) b_currentCatId = tab.categories[0]?.id || null;

  b_renderCats();
  b_renderItems();
}

function biblioAddCategory(){
  const tab = b_getTabObj();
  const name = prompt('Nom nouvelle catégorie:');
  if(!name) return;
  tab.categories.push({ id: b_uid('cat'), label: name.trim(), items: [] });
  b_currentCatId = tab.categories.at(-1).id;
  saveBiblio();
  b_renderAll();
}

function biblioAddItem(){
  const cat = b_getCatObj();
  if(!cat) return alert('Choisis une catégorie.');
  const label = prompt('Nom item:');
  if(!label) return;
  const time = parseFloat(prompt('Temps (h):', '0'));
  if(isNaN(time)) return;
  cat.items.push({ id: b_uid('it'), label: label.trim(), time });
  saveBiblio();
  b_renderAll();
}
