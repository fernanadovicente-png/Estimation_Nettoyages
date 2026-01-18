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

function isM2HTypeForPresets(t){
  return t==='Méthodes' || (t||'').startsWith('Entretien régulier');
}

function syncPresetAddFields(){
  const t=activeTab();
  const isM=isM2HTypeForPresets(t);
  const name=$('presetName');
  const time=$('presetTime');
  const m2=$('presetM2');
  if(!name||!time||!m2) return;
  // Pour Méthodes & Entretien: on enregistre "Nom + M²" (capacité)
  time.classList.toggle('hidden', isM);
  m2.classList.toggle('hidden', !isM);
  name.placeholder = isM ? 'Nom (ex: Méthode spray)' : 'Nom pièce (ex: Cuisine)';
}
if(!localStorage.getItem('est_first_tip')){localStorage.setItem('est_first_tip','1');$('firstTip')?.classList.remove('hidden');setTimeout(()=>$('firstTip')?.classList.add('hidden'),6000);}
function openPresets(){
  $('presetsModal').classList.remove('hidden');
  renderPresetList();
  syncPresetAddFields();
}
function closePresets(){$('presetsModal').classList.add('hidden');}
function activeTab(){return document.querySelector('.tab-btn.active')?.getAttribute('data-tab')||'Fin de chantier'}
function switchTab(t){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.getAttribute('data-tab')===t));
  renderPresetList();
  syncPresetAddFields();
}
function normalizePresetItem(t,p){
  // Sécurise les presets existants si l'utilisateur avait des anciens formats.
  if(isM2HTypeForPresets(t)){
    const m2 = (p && typeof p.m2==='number') ? p.m2 : (p && typeof p.time==='number' ? p.time : 0);
    return { name: (p&&p.name)||'', m2: +m2 };
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
    const sub = isM2HTypeForPresets(t)
      ? `<div><small>${(p.m2||0)} m²</small></div>`
      : `<div><small>${(p.time||0)} h</small></div>`;
    d.innerHTML=`<div><strong>${p.name}</strong>${sub}</div><div><button onclick="editPreset('${t}',${i})">✏️</button> <button onclick="removePreset('${t}',${i})">🗑️</button></div>`;
    list.appendChild(d);
  });
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
  } else {
    const time=parseFloat($('presetTime').value);
    if(!name||isNaN(time)) return alert('Nom et temps requis');
    presets[t]=presets[t]||[];
    presets[t].push({name,time:+time});
    $('presetName').value='';
    $('presetTime').value='';
  }
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
  } else {
    const nt=parseFloat(prompt('Temps (h) / Time (h)',p.time));
    if(isNaN(nt)) return;
    presets[t][i]={name:nn,time:+nt};
  }
  renderPresetList();
  renderStandardList();
  refreshMethodSelect();
}
function removePreset(t,i){if(!confirm('Supprimer?'))return;presets[t].splice(i,1);renderPresetList();renderStandardList();}
function savePresets(){
  localStorage.setItem('est_presets_v4',JSON.stringify(presets));
  alert(lang==='fr'?'Pré-définitions enregistrées':'Presets saved');
  closePresets();
  renderStandardList();
  refreshMethodSelect();
}
function clearAllPresets(){
  if(!confirm('Tout effacer?'))return;
  presets=JSON.parse(JSON.stringify(defaultPresets));
  localStorage.setItem('est_presets_v4',JSON.stringify(presets));
  renderPresetList();
  renderStandardList();
  refreshMethodSelect();
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
function onTypeChange(){
  const v=$('cleanType').value;
  if(v==='__custom__'){openPresets();setTimeout(()=>$('newTypeName').focus(),50);}else{renderStandardList();}
  toggleM2H();
}
function currentArr(){const t=$('cleanType').value; if(!presets[t]||!presets[t].length){return defaultPresets[t]||[]} return presets[t];}
function renderStandardList(){
  const t=$('cleanType').value;
  const c=$('standardList');
  c.innerHTML='';
  if(isM2HType(t)){
    const d=document.createElement('div');
    d.className='std-item';
    d.innerHTML=`<span class="std-name">${lang==='fr'?'Utilise la ligne Méthode + M² pour calculer le temps.':'Use Method + m² line to calculate time.'}</span>`;
    c.appendChild(d);
    updateTotal();
    return;
  }
  currentArr().forEach((p,i)=>{
    const d=document.createElement('div');
    d.className='std-item';
    d.innerHTML=`<span class="std-name">${p.name}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${i})'>Ajouter</button>`;
    c.appendChild(d);
  });
  updateTotal();
}
function addStandard(i){const arr=currentArr();const p=arr[i];if(!p)return;const items=document.querySelectorAll('.std-item');let qty=1;items.forEach(it=>{if(it.querySelector('.std-name').textContent===p.name){qty=parseInt(it.querySelector('.qty').value)||1;}});pieces.push({name:p.name,timePerUnit:p.time,qty:qty,subtotal:+(p.time*qty).toFixed(2)});updateList();}
function addCustomPiece(){const name=$('customPieceName').value.trim();const time=parseFloat($('customPieceTime').value);const qty=parseInt($('customPieceQty').value)||1;if(!name||isNaN(time))return alert('Nom et temps valides requis');pieces.push({name,timePerUnit:time,qty:qty,subtotal:+(time*qty).toFixed(2)});$('customPieceName').value='';$('customPieceTime').value='';$('customPieceQty').value='1';updateList();}
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
  $('hoursPerPerson')?.addEventListener('input', updateTotal);
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
