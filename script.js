function $(id){return document.getElementById(id)}
const i18n={fr:{client:'Nom client',date:'Date',type:'Type de nettoyage',pieces:'Pièces (pré-definitions)',add_custom:'Ajouter pièce personnalisée',list:'Liste des pièces',total:'Total estimé :',remarks:'Remarques :',presets_title:'Pré-définir pièces',first_tip:'💬 Conseil : utilisez le bouton 🔷 pour définir vos pièces personnalisées (une seule fois).',add_type:'Créer un type personnalisé'},en:{client:'Client name',date:'Date',type:'Cleaning type',pieces:'Rooms (presets)',add_custom:'Add custom room',list:'Rooms list',total:'Estimated total:',remarks:'Remarks:',presets_title:'Predefine rooms',first_tip:'💬 Tip: use the 🔷 button to set your custom rooms (one time).',add_type:'Create a custom type'}};
let lang=localStorage.getItem('est_lang')||'fr';function setLang(l){lang=l;localStorage.setItem('est_lang',l);translateAll();}
function translateAll(){document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(i18n[lang]&&i18n[lang][k])el.textContent=i18n[lang][k];});$('langSelect').value=lang;$('clientName').placeholder=(lang==='fr'?'Nom du client':'Client name');$('remarks').placeholder=(lang==='fr'?'Remarques...':'Remarks...');}translateAll();
const defaultPresets={
  "Fin de chantier":[{name:"Cuisine",time:3},{name:"Salle de bain",time:2},{name:"WC",time:0.5},{name:"Salon / Séjour",time:2.5},{name:"Chambre",time:1.8},{name:"Fenêtres",time:0.5}],
  "Fin de bail (moyen)":[{name:"Cuisine",time:4},{name:"Salle de bain",time:3},{name:"WC",time:1.5},{name:"Salon / Séjour",time:3},{name:"Chambre",time:2},{name:"Fenêtres",time:0.4}],
  "Fin de bail (très sale)":[{name:"Cuisine",time:6},{name:"Salle de bain",time:4.5},{name:"WC",time:2},{name:"Salon / Séjour",time:4.2},{name:"Chambre",time:2.8},{name:"Fenêtres",time:0.55}],

  // Nouveaux types (vides par défaut — tu ajoutes tes pièces/temps dans Paramètres)
  "Vitres & Stores":[],
  "Méthodes":[],
  "Entretien régulier - Administration":[],
  "Entretien régulier - Hôpital":[],
  "Entretien régulier - Écoles":[],
  "Entretien régulier - Résidence":[],
  "Entretien régulier - Médico-social":[]
};
function loadPresets(){const raw=localStorage.getItem('est_presets_v4');if(raw){try{return JSON.parse(raw);}catch(e){}}localStorage.setItem('est_presets_v4',JSON.stringify(defaultPresets));return JSON.parse(localStorage.getItem('est_presets_v4'));}
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
function toggleM2H(){
  const t=$('cleanType').value;
  const row=$('m2hRow');
  if(!row) return;
  row.classList.toggle('hidden', !isM2HType(t));
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
let manualHoursEdited=false;

function selectedMethod(){
  const t=$('cleanType')?.value||'';
  if(!isM2HType(t)) return null;
  const id=$('methodSelect')?.value||'';
  const arr=(presets[t]||[]).map(p=>normalizePresetItem(t,p)).filter(p=>p.name);
  return arr.find(p=>p.name===id) || null;
}

function computedHoursFromM2(){
  const t=$('cleanType')?.value||'';
  if(!isM2HType(t)) return 0;
  const m2=parseFloat($('surfaceM2')?.value||'0');
  const m=selectedMethod();
  if(!m || !(m.m2>0) || !(m2>0)) return 0;
  return +(m2 / m.m2);
}

function extraHours(){
  const t=$('cleanType')?.value||'';
  if(!isM2HType(t)) return 0;
  const h=parseFloat($('manualHours')?.value||'0');
  if(!isNaN(h) && h>0) return h;
  return computedHoursFromM2();
}

function syncComputedHours(){
  const t=$('cleanType')?.value||'';
  if(!isM2HType(t)) return;
  const autoH=computedHoursFromM2();
  const input=$('manualHours');
  if(!input) return;
  // Si l'utilisateur n'a pas touché au champ H, on met à jour automatiquement.
  if(!manualHoursEdited){
    input.value = autoH>0 ? autoH.toFixed(2) : '';
  }
}
function updateTotal(){
  const base=+pieces.reduce((s,p)=>s+p.subtotal,0);
  const ex=extraHours();
  $('totalHours').textContent=(base+ex).toFixed(2);
}
function quickEdit(i){const p=pieces[i];const q=parseInt(prompt('Quantité',p.qty));const t=parseFloat(prompt('Temps unitaire (h)',p.timePerUnit));if(isNaN(q)||isNaN(t))return;p.qty=q;p.timePerUnit=t;p.subtotal=+(q*t).toFixed(2);updateList();}
function removePiece(i){pieces.splice(i,1);updateList();}
function resetForm(){if(!confirm('Réinitialiser la session actuelle?'))return;pieces=[];total=0;$('clientName').value='';$('cleaningDate').value='';$('remarks').value='';if($('surfaceM2'))$('surfaceM2').value='';if($('manualHours'))$('manualHours').value='';updateList();toggleM2H();}
function generatePDF(){
  const name=$('clientName').value||'';
  const date=$('cleaningDate').value||'';
  const type=$('cleanType').value||'';
  const remarks=$('remarks').value||'';
  const surf=parseFloat($('surfaceM2')?.value||'0');
  const meth=selectedMethod();
  const exH=extraHours();
  if(!(window.jspdf&&window.jspdf.jsPDF))return alert('PDF library not available');
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:'mm',format:'a4'});
  doc.setFillColor(30,144,255);doc.circle(20,18,6,'F');
  doc.setFontSize(16);doc.text('Estimation Nettoyage',32,20);
  doc.setFontSize(11);
  doc.text((lang==='fr'?'Client':'Client')+': '+name,14,32);
  doc.text('Date: '+date,90,32);
  doc.text((lang==='fr'?'Type':'Type')+': '+type,14,39);
  if(isM2HType(type) && (surf>0 || exH>0)){
    const info=[];
    if(meth && meth.name) info.push(`Méthode: ${meth.name}`);
    if(surf>0) info.push(`M²: ${surf}`);
    if(exH>0) info.push(`H: ${exH}`);
    doc.setFontSize(10);
    doc.text(info.join('   |   '),14,46);
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

  // Ajoute une ligne "Forfait heures" si H manuel est rempli
  if(exH>0){
    if(y>270){doc.addPage();y=20;}
    doc.text('Forfait heures',14,y);
    doc.text(String(exH),90,y);
    doc.text('1',130,y);
    doc.text(String(exH.toFixed(2)),170,y,{align:'right'});
    y+=7;
  }

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
  $('manualHours')?.addEventListener('input', ()=>{
    const v=parseFloat($('manualHours')?.value||'0');
    // Si l'utilisateur efface (ou met 0), on repasse en auto-calcul
    if(isNaN(v) || v<=0){
      manualHoursEdited=false;
      syncComputedHours();
    } else {
      manualHoursEdited=true;
    }
    updateTotal();
  });
  $('surfaceM2')?.addEventListener('input', ()=>{ manualHoursEdited=false; syncComputedHours(); updateTotal(); });
  $('methodSelect')?.addEventListener('change', ()=>{ manualHoursEdited=false; syncComputedHours(); updateTotal(); });
});

function refreshMethodSelect(){
  const t=$('cleanType')?.value||'';
  const sel=$('methodSelect');
  if(!sel) return;
  if(!isM2HType(t)){
    sel.innerHTML='';
    return;
  }
  const arr=(presets[t]||[]).map(p=>normalizePresetItem(t,p)).filter(p=>p.name && p.m2>0);
  const current=sel.value;
  sel.innerHTML='';
  if(!arr.length){
    const opt=document.createElement('option');
    opt.value='';
    opt.textContent=lang==='fr'?'(ajoute des méthodes via 🔷)':'(add methods via 🔷)';
    sel.appendChild(opt);
  } else {
    arr.forEach(p=>{
      const opt=document.createElement('option');
      opt.value=p.name;
      opt.textContent=`${p.name} (${p.m2} m²)`;
      sel.appendChild(opt);
    });
    // restore selection if possible
    const found=arr.find(p=>p.name===current);
    if(found) sel.value=current;
  }
  syncComputedHours();
}