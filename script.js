function $(id){return document.getElementById(id)}

const i18n = {
  fr: {
    piece_kitchen: "Cuisine",
    piece_bathroom: "Salle de bain",
    piece_wc: "WC",
    piece_living: "Salon / Séjour",
    piece_bedroom: "Chambre",
    piece_windows: "Fenêtres",
    client: "Nom client",
    date: "Date",
    type: "Type de nettoyage",
    pieces: "Pièces (pré-définitions)",
    add_custom: "Ajouter pièce personnalisée",
    list: "Liste des pièces",
    total: "Total estimé :",
    remarks: "Remarques :",
    presets_title: "Pré-définir pièces",
    first_tip: "💬 Conseil : utilisez le bouton 🔷 pour définir vos pièces personnalisées (une seule fois).",
    add_type: "Créer un type personnalisé",
    close: "Fermer",
    info_h: "ℹ️ Guide – Comment remplir (Pièces + m²/h)",
    t_predefine: "Pré-définir pièces",
    t_info: "Comment ça marche ?",
    t_types: "Gestion des types",
    t_install: "Installer l’app",
    sub_types: "⚙️ Gestion des types",
    btn_add: "➕ Ajouter",
    btn_adjust: "+ Ajuster",
    btn_add_session: "Ajouter à la session",
    btn_pdf: "PDF",
    btn_reset: "Réinitialiser",
    team: "Équipe :",
    ph_client: "Nom du client",
    ph_remarks: "Remarques...",
    ph_custom_name: "Nom (ex: Jardin d'hiver)",
    ph_custom_time: "Temps par unité (h)",
    ph_custom_qty: "Quantité",
    info_html: `
      <div class="info-accordion">
        <details open>
          <summary>✅ Fonctionnement (2 blocs)</summary>
          <div class="info-block">
            <p><strong>Bloc 1 — Pièces (Unité/h)</strong> : tâches par division/unité (WC, cuisine, chambres, extras).</p>
            <p><strong>Bloc 2 — Surface (m²/h)</strong> : zones grandes / entretien général (sol, aspiration, passage).</p>
            <p><strong>Formules</strong> : Pièces = h/unité × quantité • Surface = m² ÷ (m²/h) • Total = Pièces + Surface.</p>
            <p><strong>Affichage</strong> : total en décimal + format horaire automatique : <strong>2.25 (2:15h)</strong>.</p>
          </div>
        </details>

        <details>
          <summary>🧮 Exemples (Entretien résidence)</summary>
          <div class="info-block">
            <h4>Exemple A — T3 80m²</h4>
            <table class="info-table">
              <thead><tr><th>Pièce</th><th>h/unité</th><th>Qté</th><th>Total</th></tr></thead>
              <tbody>
                <tr><td>WC</td><td>0.75</td><td>2</td><td>1.50</td></tr>
                <tr><td>Cuisine</td><td>1.50</td><td>1</td><td>1.50</td></tr>
                <tr><td>Chambre</td><td>0.50</td><td>3</td><td>1.50</td></tr>
                <tr><td>Salon</td><td>0.75</td><td>1</td><td>0.75</td></tr>
                <tr><td colspan="3"><strong>Subtotal Pièces</strong></td><td><strong>5.25</strong></td></tr>
              </tbody>
            </table>
            <table class="info-table">
              <thead><tr><th>Surface</th><th>m²</th><th>Capacité (m²/h)</th><th>Total</th></tr></thead>
              <tbody>
                <tr><td>Appartement</td><td>80</td><td>40</td><td>2.00</td></tr>
                <tr><td colspan="3"><strong>Subtotal Surface</strong></td><td><strong>2.00</strong></td></tr>
              </tbody>
            </table>
            <p><strong>Total</strong> = 5.25 + 2.00 = <strong>7.25 (7:15h)</strong></p>

            <h4>Exemple B — 40m²</h4>
            <p>Pièces: 1 WC (0.75×1=0.75) + 1 cuisine (1.00×1=1.00) → <strong>1.75</strong><br>
               Surface: 40 ÷ 60 = <strong>0.67</strong><br>
               Total: <strong>2.42 (2:25h)</strong></p>
          </div>
        </details>

        <details>
          <summary>📐 Capacités recommandées (m²/h)</summary>
          <div class="info-block">
            <table class="info-table">
              <thead><tr><th>Type</th><th>m²/h recommandé</th></tr></thead>
              <tbody>
                <tr><td>Entretien normal</td><td>45 – 70</td></tr>
                <tr><td>Entretien lourd</td><td>30 – 50</td></tr>
                <tr><td>Fin de bail (rapide par surface)</td><td>15 – 35</td></tr>
                <tr><td>Fin de chantier</td><td>8 – 28</td></tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>
    `
  ,
    btn_save: "Enregistrer",
    btn_clear_all: "Effacer tout",
    tm_title: "⚙️ Gestion des types",
    tm_create_h: "➕ Créer un type",
    tm_name_ph: "Ex: Restaurant",
    tm_tpl_vitres: "Modèle 2 blocs (comme Vitres)",
    tm_tpl_m2h: "Méthodes / Entretien (Surface / M²)",
    tm_tpl_biblio: "Pièces (bibliothèque)",
    tm_opt_pieces: "Pièces (bloc gauche)",
    tm_opt_m2: "M²/h (bloc droite)",
    tm_opt_coef: "Coef %",
    tm_coef_ph: "Coef % (ex: 20)",
    tm_d1_ph: "Difficulté 1 % (ex: 20)",
    tm_d2_ph: "Difficulté 2 % (ex: 30)",
    tm_btn_create: "Créer",
    tm_existing_h: "Types existants",
    tm_hint: "💡 Désactiver = disparaît du menu, mais reste enregistré.",
    tm_btn_rename: "Renommer",
    tm_btn_enable: "Activer",
    tm_btn_disable: "Désactiver",
    tm_btn_delete: "Supprimer",
    tm_bad_name: "Nom requis",
    tm_exists: "Existe déjà",
    tm_created: "Type créé",
    tm_cant_delete_base: "Impossible: type de base",
    tm_confirm_delete: "Supprimer définitivement ?",
    tm_prompt_new_name: "Nouveau nom",
    tm_name_exists: "Ce nom existe déjà",
    tm_lbl_base: "Type de base",
    tm_lbl_custom: "Personnalisé",
    confirm_delete: "Supprimer ?",
    prompt_new_category: "Nom nouvelle catégorie:",
    prompt_item_name: "Nom item:",
    prompt_time_h: "Temps (h):",
    alert_choose_category: "Choisis une catégorie.",
    alert_presets_saved: "Pré-définitions enregistrées",
    title_delete: "Supprimer",
    btn_add_plain: "Ajouter",
    res_piece_name_ph: "Nom pièce (ex: Cuisine)",
    res_piece_time_ph: "Temps (h)",
    err_name_time: "Nom et temps requis",
    err_name_m2: "Nom et M² requis",
    err_name_cap: "Nom et capacité requis",
    err_valid_name_time: "Nom et temps valides requis",
    err_nothing_add: "Rien à ajouter",
    err_pdf_lib: "Bibliothèque PDF indisponible",
    confirm_clear_all: "Tout effacer?",
    confirm_reset_session: "Réinitialiser la session actuelle?",
    confirm_delete_cat: "Supprimer catégorie ?",
    confirm_delete_item: "Supprimer item ?",
    prompt_name: "Nom",
    prompt_time_h_short: "Temps (h)",
    prompt_qty: "Quantité",
    prompt_unit_time: "Temps unitaire (h)",
    prompt_pdf_name: "Nom du fichier PDF:",
    prompt_cat_name: "Nom catégorie:",
    prompt_item_name2: "Nom item:",
    prompt_m2: "M²",
    prompt_capacity: "Capacité (m²/h)",
    prompt_time_per_unit: "Temps par unité (h)"},

  en: {
    piece_kitchen: "Kitchen",
    piece_bathroom: "Bathroom",
    piece_wc: "WC",
    piece_living: "Living room",
    piece_bedroom: "Bedroom",
    piece_windows: "Windows",
    client: "Client",
    date: "Date",
    type: "Cleaning type",
    pieces: "Rooms (presets)",
    add_custom: "Add custom room",
    list: "Rooms list",
    total: "Estimated total:",
    remarks: "Remarks:",
    presets_title: "Predefine rooms",
    first_tip: "💬 Tip: use the 🔷 button to set your custom rooms (one time).",
    add_type: "Create a custom type",
    close: "Close",
    info_h: "ℹ️ Guide – How to fill in (Rooms + m²/h)",
    t_predefine: "Predefine rooms",
    t_info: "How does it work?",
    t_types: "Type settings",
    t_install: "Install app",
    sub_types: "⚙️ Type settings",
    btn_add: "➕ Add",
    btn_adjust: "+ Adjust",
    btn_add_session: "Add to session",
    btn_pdf: "PDF",
    btn_reset: "Reset",
    team: "Team:",
    ph_client: "Client name",
    ph_remarks: "Remarks...",
    ph_custom_name: "Name (e.g., Winter garden)",
    ph_custom_time: "Time per unit (h)",
    ph_custom_qty: "Quantity",
    info_html: `
      <div class="info-accordion">
        <details open>
          <summary>✅ How it works (2 blocks)</summary>
          <div class="info-block">
            <p><strong>Block 1 — Rooms (Unit/h)</strong>: tasks per room/unit (WC, kitchen, bedrooms, extras).</p>
            <p><strong>Block 2 — Surface (m²/h)</strong>: large areas / general maintenance (floors, vacuuming, passes).</p>
            <p><strong>Formulas</strong>: Rooms = h/unit × qty • Surface = m² ÷ (m²/h) • Total = Rooms + Surface.</p>
            <p><strong>Display</strong>: decimal total + automatic time format: <strong>2.25 (2:15h)</strong>.</p>
          </div>
        </details>

        <details>
          <summary>🧮 Examples (Residential maintenance)</summary>
          <div class="info-block">
            <h4>Example A — 80m² apartment</h4>
            <table class="info-table">
              <thead><tr><th>Room</th><th>h/unit</th><th>Qty</th><th>Total</th></tr></thead>
              <tbody>
                <tr><td>WC</td><td>0.75</td><td>2</td><td>1.50</td></tr>
                <tr><td>Kitchen</td><td>1.50</td><td>1</td><td>1.50</td></tr>
                <tr><td>Bedroom</td><td>0.50</td><td>3</td><td>1.50</td></tr>
                <tr><td>Living room</td><td>0.75</td><td>1</td><td>0.75</td></tr>
                <tr><td colspan="3"><strong>Rooms subtotal</strong></td><td><strong>5.25</strong></td></tr>
              </tbody>
            </table>
            <table class="info-table">
              <thead><tr><th>Surface</th><th>m²</th><th>Capacity (m²/h)</th><th>Total</th></tr></thead>
              <tbody>
                <tr><td>Apartment</td><td>80</td><td>40</td><td>2.00</td></tr>
                <tr><td colspan="3"><strong>Surface subtotal</strong></td><td><strong>2.00</strong></td></tr>
              </tbody>
            </table>
            <p><strong>Total</strong> = 5.25 + 2.00 = <strong>7.25 (7:15h)</strong></p>

            <h4>Example B — 40m²</h4>
            <p>Rooms: 1 WC (0.75×1=0.75) + 1 kitchen (1.00×1=1.00) → <strong>1.75</strong><br>
               Surface: 40 ÷ 60 = <strong>0.67</strong><br>
               Total: <strong>2.42 (2:25h)</strong></p>
          </div>
        </details>

        <details>
          <summary>📐 Recommended capacities (m²/h)</summary>
          <div class="info-block">
            <table class="info-table">
              <thead><tr><th>Type</th><th>Recommended m²/h</th></tr></thead>
              <tbody>
                <tr><td>Normal maintenance</td><td>45 – 70</td></tr>
                <tr><td>Heavy maintenance</td><td>30 – 50</td></tr>
                <tr><td>End of lease (quick by surface)</td><td>15 – 35</td></tr>
                <tr><td>Construction cleanup</td><td>8 – 28</td></tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>
    `
  ,
    btn_save: "Save",
    btn_clear_all: "Clear all",
    tm_title: "⚙️ Type settings",
    tm_create_h: "➕ Create a type",
    tm_name_ph: "E.g., Restaurant",
    tm_tpl_vitres: "2-block template (like Windows)",
    tm_tpl_m2h: "Methods / Regular cleaning (Surface / m²)",
    tm_tpl_biblio: "Rooms (library)",
    tm_opt_pieces: "Rooms (left block)",
    tm_opt_m2: "m²/h (right block)",
    tm_opt_coef: "Coef %",
    tm_coef_ph: "Coef % (e.g., 20)",
    tm_d1_ph: "Difficulty 1 % (e.g., 20)",
    tm_d2_ph: "Difficulty 2 % (e.g., 30)",
    tm_btn_create: "Create",
    tm_existing_h: "Existing types",
    tm_hint: "💡 Disable = hidden from the menu, but kept saved.",
    tm_btn_rename: "Rename",
    tm_btn_enable: "Enable",
    tm_btn_disable: "Disable",
    tm_btn_delete: "Delete",
    tm_bad_name: "Name required",
    tm_exists: "Already exists",
    tm_created: "Type created",
    tm_cant_delete_base: "Not possible: base type",
    tm_confirm_delete: "Delete permanently?",
    tm_prompt_new_name: "New name",
    tm_name_exists: "That name already exists",
    tm_lbl_base: "Base type",
    tm_lbl_custom: "Custom",
    confirm_delete: "Delete?",
    prompt_new_category: "New category name:",
    prompt_item_name: "Item name:",
    prompt_time_h: "Time (h):",
    alert_choose_category: "Choose a category.",
    alert_presets_saved: "Presets saved",
    title_delete: "Delete",
    btn_add_plain: "Add",
    res_piece_name_ph: "Room name (e.g., Kitchen)",
    res_piece_time_ph: "Time (h)",
    err_name_time: "Name and time required",
    err_name_m2: "Name and m² required",
    err_name_cap: "Name and capacity required",
    err_valid_name_time: "Valid name and time required",
    err_nothing_add: "Nothing to add",
    err_pdf_lib: "PDF library not available",
    confirm_clear_all: "Clear all?",
    confirm_reset_session: "Reset current session?",
    confirm_delete_cat: "Delete category?",
    confirm_delete_item: "Delete item?",
    prompt_name: "Name",
    prompt_time_h_short: "Time (h)",
    prompt_qty: "Quantity",
    prompt_unit_time: "Unit time (h)",
    prompt_pdf_name: "PDF file name:",
    prompt_cat_name: "Category name:",
    prompt_item_name2: "Item name:",
    prompt_m2: "m²",
    prompt_capacity: "Capacity (m²/h)",
    prompt_time_per_unit: "Time per unit (h)"},

  de: {
    piece_kitchen: "Küche",
    piece_bathroom: "Badezimmer",
    piece_wc: "WC",
    piece_living: "Wohnzimmer",
    piece_bedroom: "Schlafzimmer",
    piece_windows: "Fenster",
    client: "Kunde",
    date: "Datum",
    type: "Reinigungsart",
    pieces: "Räume (Vorlagen)",
    add_custom: "Benutzerdefinierten Raum hinzufügen",
    list: "Räume-Liste",
    total: "Geschätzte Gesamtzeit:",
    remarks: "Bemerkungen:",
    presets_title: "Räume vordefinieren",
    first_tip: "💬 Tipp: Nutze den 🔷-Button, um deine eigenen Räume einmalig zu definieren.",
    add_type: "Benutzerdefinierten Typ erstellen",
    close: "Schließen",
    info_h: "ℹ️ Anleitung – Ausfüllen (Räume + m²/h)",
    t_predefine: "Räume vordefinieren",
    t_info: "Wie funktioniert das?",
    t_types: "Typen verwalten",
    t_install: "App installieren",
    sub_types: "⚙️ Typen verwalten",
    btn_add: "➕ Hinzufügen",
    btn_adjust: "+ Anpassen",
    btn_add_session: "Zur Sitzung hinzufügen",
    btn_pdf: "PDF",
    btn_reset: "Zurücksetzen",
    team: "Team:",
    ph_client: "Kundenname",
    ph_remarks: "Bemerkungen...",
    ph_custom_name: "Name (z.B. Wintergarten)",
    ph_custom_time: "Zeit pro Einheit (h)",
    ph_custom_qty: "Menge",
    info_html: `
      <div class="info-accordion">
        <details open>
          <summary>✅ Funktionsweise (2 Blöcke)</summary>
          <div class="info-block">
            <p><strong>Block 1 — Räume (Einheit/h)</strong>: Aufgaben pro Raum/Einheit (WC, Küche, Schlafzimmer, Extras).</p>
            <p><strong>Block 2 — Fläche (m²/h)</strong>: große Bereiche / allgemeine Unterhaltsreinigung (Böden, Saugen, Durchgänge).</p>
            <p><strong>Formeln</strong>: Räume = h/Einheit × Menge • Fläche = m² ÷ (m²/h) • Gesamt = Räume + Fläche.</p>
            <p><strong>Anzeige</strong>: Dezimal + automatische Zeitdarstellung: <strong>2.25 (2:15h)</strong>.</p>
          </div>
        </details>

        <details>
          <summary>🧮 Beispiele (Unterhaltsreinigung Wohnung)</summary>
          <div class="info-block">
            <h4>Beispiel A — Wohnung 80m²</h4>
            <table class="info-table">
              <thead><tr><th>Raum</th><th>h/Einheit</th><th>Menge</th><th>Total</th></tr></thead>
              <tbody>
                <tr><td>WC</td><td>0.75</td><td>2</td><td>1.50</td></tr>
                <tr><td>Küche</td><td>1.50</td><td>1</td><td>1.50</td></tr>
                <tr><td>Schlafzimmer</td><td>0.50</td><td>3</td><td>1.50</td></tr>
                <tr><td>Wohnzimmer</td><td>0.75</td><td>1</td><td>0.75</td></tr>
                <tr><td colspan="3"><strong>Zwischensumme Räume</strong></td><td><strong>5.25</strong></td></tr>
              </tbody>
            </table>
            <table class="info-table">
              <thead><tr><th>Fläche</th><th>m²</th><th>Leistung (m²/h)</th><th>Total</th></tr></thead>
              <tbody>
                <tr><td>Wohnung</td><td>80</td><td>40</td><td>2.00</td></tr>
                <tr><td colspan="3"><strong>Zwischensumme Fläche</strong></td><td><strong>2.00</strong></td></tr>
              </tbody>
            </table>
            <p><strong>Gesamt</strong> = 5.25 + 2.00 = <strong>7.25 (7:15h)</strong></p>

            <h4>Beispiel B — 40m²</h4>
            <p>Räume: 1 WC (0.75×1=0.75) + 1 Küche (1.00×1=1.00) → <strong>1.75</strong><br>
               Fläche: 40 ÷ 60 = <strong>0.67</strong><br>
               Gesamt: <strong>2.42 (2:25h)</strong></p>
          </div>
        </details>

        <details>
          <summary>📐 Empfohlene Leistungen (m²/h)</summary>
          <div class="info-block">
            <table class="info-table">
              <thead><tr><th>Typ</th><th>Empfohlen m²/h</th></tr></thead>
              <tbody>
                <tr><td>Normaler Unterhalt</td><td>45 – 70</td></tr>
                <tr><td>Starker Unterhalt</td><td>30 – 50</td></tr>
                <tr><td>Wohnungsabgabe (schnell nach Fläche)</td><td>15 – 35</td></tr>
                <tr><td>Bauendreinigung</td><td>8 – 28</td></tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>
    `
  ,
    btn_save: "Speichern",
    btn_clear_all: "Alles löschen",
    tm_title: "⚙️ Typen verwalten",
    tm_create_h: "➕ Typ erstellen",
    tm_name_ph: "z.B. Restaurant",
    tm_tpl_vitres: "Vorlage 2 Blöcke (wie Fenster)",
    tm_tpl_m2h: "Methoden / Unterhalt (Fläche / m²)",
    tm_tpl_biblio: "Räume (Bibliothek)",
    tm_opt_pieces: "Räume (linker Block)",
    tm_opt_m2: "m²/h (rechter Block)",
    tm_opt_coef: "Koeff. %",
    tm_coef_ph: "Koeff. % (z.B. 20)",
    tm_d1_ph: "Schwierigkeit 1 % (z.B. 20)",
    tm_d2_ph: "Schwierigkeit 2 % (z.B. 30)",
    tm_btn_create: "Erstellen",
    tm_existing_h: "Vorhandene Typen",
    tm_hint: "💡 Deaktivieren = im Menü ausgeblendet, bleibt aber gespeichert.",
    tm_btn_rename: "Umbenennen",
    tm_btn_enable: "Aktivieren",
    tm_btn_disable: "Deaktivieren",
    tm_btn_delete: "Löschen",
    tm_bad_name: "Name erforderlich",
    tm_exists: "Bereits vorhanden",
    tm_created: "Typ erstellt",
    tm_cant_delete_base: "Nicht möglich: Basistyp",
    tm_confirm_delete: "Dauerhaft löschen?",
    tm_prompt_new_name: "Neuer Name",
    tm_name_exists: "Dieser Name existiert bereits",
    tm_lbl_base: "Basistyp",
    tm_lbl_custom: "Benutzerdefiniert",
    confirm_delete: "Löschen?",
    prompt_new_category: "Name der neuen Kategorie:",
    prompt_item_name: "Name des Elements:",
    prompt_time_h: "Zeit (h):",
    alert_choose_category: "Wähle eine Kategorie.",
    alert_presets_saved: "Voreinstellungen gespeichert",
    title_delete: "Löschen",
    btn_add_plain: "Hinzufügen",
    res_piece_name_ph: "Raumname (z.B. Küche)",
    res_piece_time_ph: "Zeit (h)",
    err_name_time: "Name und Zeit erforderlich",
    err_name_m2: "Name und m² erforderlich",
    err_name_cap: "Name und Leistung erforderlich",
    err_valid_name_time: "Gültiger Name und Zeit erforderlich",
    err_nothing_add: "Nichts hinzuzufügen",
    err_pdf_lib: "PDF-Bibliothek nicht verfügbar",
    confirm_clear_all: "Alles löschen?",
    confirm_reset_session: "Aktuelle Sitzung zurücksetzen?",
    confirm_delete_cat: "Kategorie löschen?",
    confirm_delete_item: "Element löschen?",
    prompt_name: "Name",
    prompt_time_h_short: "Zeit (h)",
    prompt_qty: "Menge",
    prompt_unit_time: "Zeit pro Einheit (h)",
    prompt_pdf_name: "PDF-Dateiname:",
    prompt_cat_name: "Kategoriename:",
    prompt_item_name2: "Elementname:",
    prompt_m2: "m²",
    prompt_capacity: "Leistung (m²/h)",
    prompt_time_per_unit: "Zeit pro Einheit (h)"}
};

let lang = localStorage.getItem('est_lang') || 'fr';

function t(key, fallback){
  const v = i18n[lang]?.[key];
  return (v!==undefined && v!==null) ? v : (fallback!==undefined ? fallback : key);
}

// ✅ Alias to avoid bugs when local variables are named "t" (type name)
function tr(key, fallback){
  return t(key, fallback);
}


const L10N = {
  en: {
    type: {
      "Fin de chantier": "End of construction",
      "Fin de bail -": "End of lease (standard)",
      "Fin de bail +": "End of lease (deep)",
      "Vitres & Stores": "Windows & Blinds",
      "Méthodes": "Methods",
      "Entretien régulier - Administration": "Regular cleaning – Administration",
      "Entretien régulier - Hôpital": "Regular cleaning – Hospital",
      "Entretien régulier - Écoles": "Regular cleaning – Schools",
      "Entretien régulier - Résidence": "Regular cleaning – Residence",
      "Entretien régulier - Médico-social": "Regular cleaning – Social/Medical"
    },
    piece: {
      "Cuisine": "Kitchen",
      "Salle de bain": "Bathroom",
      "WC": "Toilet",
      "Salon / Séjour": "Living room",
      "Chambre": "Bedroom",
      "Fenêtres": "Windows",
      "Couloir": "Hallway"
    }
  },
  de: {
    type: {
      "Fin de chantier": "Bauendreinigung",
      "Fin de bail -": "Umzugsreinigung (Standard)",
      "Fin de bail +": "Umzugsreinigung (Intensiv)",
      "Vitres & Stores": "Fenster & Storen",
      "Méthodes": "Methoden",
      "Entretien régulier - Administration": "Unterhaltsreinigung – Verwaltung",
      "Entretien régulier - Hôpital": "Unterhaltsreinigung – Spital",
      "Entretien régulier - Écoles": "Unterhaltsreinigung – Schulen",
      "Entretien régulier - Résidence": "Unterhaltsreinigung – Wohnanlage",
      "Entretien régulier - Médico-social": "Unterhaltsreinigung – Sozial/Medizin"
    },
    piece: {
      "Cuisine": "Küche",
      "Salle de bain": "Badezimmer",
      "WC": "WC",
      "Salon / Séjour": "Wohnzimmer",
      "Chambre": "Schlafzimmer",
      "Fenêtres": "Fenster",
      "Couloir": "Flur"
    }
  }
};

function trTypeName(name){
  return (L10N[lang] && L10N[lang].type && L10N[lang].type[name]) ? L10N[lang].type[name] : name;
}
function trPieceName(name){
  return (L10N[lang] && L10N[lang].piece && L10N[lang].piece[name]) ? L10N[lang].piece[name] : name;
}


function setLang(l){
  lang = l;
  localStorage.setItem('est_lang', l);
  translateAll();
}

function translateAll(){
  // text
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    const v = i18n[lang]?.[k];
    if(v!=null) el.textContent = v;
  });
  // html
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const k = el.getAttribute('data-i18n-html');
    const v = i18n[lang]?.[k];
    if(v!=null) el.innerHTML = v;
  });

  // titles
  document.querySelectorAll('[data-i18n-title]').forEach(el=>{
    const k = el.getAttribute('data-i18n-title');
    const v = i18n[lang]?.[k];
    if(v!=null) el.setAttribute('title', v);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const k = el.getAttribute('data-i18n-placeholder');
    const v = i18n[lang]?.[k];
    if(v!=null) el.setAttribute('placeholder', v);
  });

  // legacy titles
  const presetIcon = $('presetIcon');
  if(presetIcon) presetIcon.title = i18n[lang].t_predefine;
  const infoBtn = $('infoBtn');
  if(infoBtn) infoBtn.title = i18n[lang].t_info;
  const typesBtn = $('typesBtn');
  if(typesBtn) typesBtn.title = i18n[lang].t_types;
  const installBtn = $('installBtn');
  if(installBtn) installBtn.title = i18n[lang].t_install;

  // placeholders
  const cn = $('clientName');
  if(cn) cn.placeholder = i18n[lang].ph_client;
  const rm = $('remarks');
  if(rm) rm.placeholder = i18n[lang].ph_remarks;
  const cpn = $('customPieceName');
  if(cpn) cpn.placeholder = i18n[lang].ph_custom_name;
  const cpt = $('customPieceTime');
  if(cpt) cpt.placeholder = i18n[lang].ph_custom_time;
  const cpq = $('customPieceQty');
  if(cpq) cpq.placeholder = i18n[lang].ph_custom_qty;

  translateTypeOptions();
  translatePresetUI();

  // lang select + html lang
  const sel = $('langSelect');
  if(sel) sel.value = lang;
  document.documentElement.lang = lang;
}


function translateTypeOptions(){
  const sel = document.getElementById('cleanType');
  if(sel){
    Array.from(sel.options).forEach(opt=>{
      if(opt.value==='__custom__'){
        // keep current label from i18n (btn_adjust)
        opt.textContent = i18n[lang]?.btn_adjust || opt.textContent;
      } else {
        opt.textContent = trTypeName(opt.value);
      }
    });
  }
}

function translatePresetUI(){
  // Tabs in "Pré-définir pièces"
  document.querySelectorAll('[data-tab]').forEach(btn=>{
    const v = btn.getAttribute('data-tab');
    if(v) btn.textContent = trTypeName(v);
  });

  // Any displayed standard piece names (lists)
  document.querySelectorAll('.std-name').forEach(el=>{
    const raw = el.getAttribute('data-raw-name') || el.textContent;
    el.setAttribute('data-raw-name', raw);
    el.textContent = trPieceName(raw);
  });

  // Any selects that list presets (m2h, etc.)
  document.querySelectorAll('select').forEach(sel=>{
    Array.from(sel.options).forEach(opt=>{
      const raw = opt.getAttribute('data-raw-label');
      if(raw) opt.textContent = raw; // will be rebuilt by renderers anyway
    });
  });
}

translateAll();

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
    d.innerHTML=`<div><strong>${trPieceName(p.name)}</strong><div><small>${(p.time||0)} h</small></div></div><div><button type="button" onclick="editResidencePiecePreset(${i})">✏️</button> <button type="button" onclick="removeResidencePiecePreset(${i})">🗑️</button></div>`;
    list.appendChild(d);
  });
}

function addResidencePiecePreset(){
  const name = $('resPieceName')?.value.trim();
  const time = parseFloat($('resPieceTime')?.value);
  if(!name || isNaN(time)) return alert(tr('err_name_time','Nom et temps requis'));
  residencePiecesArr().push({ name, time:+time });
  $('resPieceName').value='';
  $('resPieceTime').value='';
  renderResidencePieceList();
}

function editResidencePiecePreset(i){
  const p = normalizeResidencePiece(residencePiecesArr()[i]);
  const nn = prompt(tr('prompt_name','Nom'), p.name);
  if(!nn) return;
  const nt = parseFloat(prompt(tr('prompt_time_h_short','Temps (h)'), p.time));
  if(isNaN(nt)) return;
  residencePiecesArr()[i] = { name: nn, time:+nt };
  renderResidencePieceList();
  renderStandardList();
}

function removeResidencePiecePreset(i){
  if(!confirm(tr('confirm_delete','Supprimer ?'))) return;
  residencePiecesArr().splice(i,1);
  renderResidencePieceList();
  renderStandardList();
}

function isM2HTypeForPresets(t){
  return t==='Méthodes' || (t||'').startsWith('Entretien régulier') || serviceTemplateOf(t)==='m2h';
}

function isVitresStoresTab(t){
  return t==='Vitres & Stores' || serviceTemplateOf(t)==='vitres';
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
  try{ renderPresetTabs(); }catch(e){}
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

function renderPresetTabs(){
  const cont = document.getElementById('presetTabs') || document.querySelector('#presetsModal .tabs');
  if(!cont) return;
  // keep current tab if possible
  const current = activeTab();
  // If services manager exists, render from services; otherwise keep existing buttons
  if(typeof _services === 'undefined' || !_services || !_services.length){
    return;
  }
  cont.innerHTML = '';
  const activeServices = _services.filter(s=>s && s.active!==false);
  activeServices.forEach((s, idx)=>{
    const b=document.createElement('button');
    b.className='tab-btn' + ((s.name===current) ? ' active' : '');
    b.setAttribute('data-tab', s.name);
    b.textContent=trTypeName(s.name);
    b.onclick=()=>switchTab(s.name);
    cont.appendChild(b);
  });
  // ensure one active
  const still = activeServices.find(s=>s.name===current);
  const first = activeServices[0]?.name;
  const toActivate = (still? current : first) || current;
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.classList.toggle('active', btn.getAttribute('data-tab')===toActivate);
  });
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
    d.innerHTML=`<div><strong>${trPieceName(p.name)}</strong>${sub}</div><div><button onclick="editPreset('${t}',${i})">✏️</button> <button onclick="removePreset('${t}',${i})">🗑️</button></div>`;
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
    if(!name||isNaN(m2)||m2<=0) return alert(tr('err_name_m2','Nom et M² requis'));
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
      if(!name||isNaN(time)) return alert(tr('err_name_time','Nom et temps requis'));
      presets[t].push({name, kind:'unit', time:+time});
      $('presetName').value='';
      $('presetTime').value='';
    } else {
      const cap=parseFloat($('presetM2').value);
      if(!name||isNaN(cap)||cap<=0) return alert(tr('err_name_cap','Nom et capacité requis'));
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
  if(!name||isNaN(time)) return alert(tr('err_name_time','Nom et temps requis'));
  presets[t]=presets[t]||[];
  presets[t].push({name,time:+time});
  $('presetName').value='';
  $('presetTime').value='';
  renderPresetList();
}

function editPreset(t,i){
  const isM=isM2HTypeForPresets(t);
  const p=normalizePresetItem(t,presets[t][i]);
  const nn=prompt(tr('prompt_name','Name'),p.name);
  if(!nn) return;
  if(isM){
    const nm2=parseFloat(prompt(tr('prompt_m2','m²'),p.m2));
    if(isNaN(nm2)||nm2<=0) return;
    presets[t][i]={name:nn,m2:+nm2};
  }
  else if(isVitresStoresTab(t)){
    if(p.kind==='m2'){
      const ncap=parseFloat(prompt(tr('prompt_capacity','Capacité (m²/h)'), String(p.cap||0)));
      if(isNaN(ncap)||ncap<=0) return;
      presets[t][i]={name:nn, kind:'m2', cap:+ncap};
    } else {
      const nt=parseFloat(prompt(tr('prompt_time_per_unit','Temps par unité (h)'), String(p.time||0)));
      if(isNaN(nt)) return;
      presets[t][i]={name:nn, kind:'unit', time:+nt};
    }
  }
  else {
    const nt=parseFloat(prompt(tr('prompt_time_h_short','Time (h)'),p.time));
    if(isNaN(nt)) return;
    presets[t][i]={name:nn,time:+nt};
  }
  renderPresetList();
  renderStandardList();
  refreshMethodSelect();
  refreshVitresSelects();
}
function removePreset(t,i){
  if(!confirm(tr('confirm_delete','Supprimer ?')))return;
  presets[t].splice(i,1);
  renderPresetList();
  renderStandardList();
  if(isVitresStoresTab(t)) refreshVitresSelects();
}
function savePresets(){
  localStorage.setItem('est_presets_v4',JSON.stringify(presets));
  alert(tr('alert_presets_saved','Pré-définitions enregistrées'));
  closePresets();
  renderStandardList();
  refreshMethodSelect();
  refreshVitresSelects();
}
function clearAllPresets(){
  if(!confirm(tr('confirm_clear_all','Tout effacer?')))return;
  presets=JSON.parse(JSON.stringify(defaultPresets));
  localStorage.setItem('est_presets_v4',JSON.stringify(presets));
  renderPresetList();
  renderStandardList();
  refreshMethodSelect();
  refreshVitresSelects();
}
function createCustomType(name){
  const n = (typeof name==='string' ? name : ($('tm_name')?$('tm_name').value:($('newTypeName')?$('newTypeName').value:'' ))).trim();
  if(!n) return;
  const sel=$('cleanType');
  // add option if not exists
  if(sel && !Array.from(sel.options).some(o=>o.value===n)){
    const opt=document.createElement('option');
    opt.value=n; opt.textContent=n;
    sel.insertBefore(opt, sel.querySelector('option[value="__custom__"]'));
  }
  // init presets according to template
  const template = (document.getElementById('tm_template')?.value) || 'vitres';
  if(!presets[n]){
    if(template==='vitres'){
      // copy current Vitres & Stores presets (unit + m2)
      presets[n] = JSON.parse(JSON.stringify(presets['Vitres & Stores'] || []));
    }else if(template==='m2h'){
      // copy current Méthodes presets (m²/h lines)
      presets[n] = JSON.parse(JSON.stringify(presets['Méthodes'] || []));
    }else if(template==='pieces_biblio'){
      // Pièces (bibliothèque) : pas de presets (liste = bibliothèque)
      presets[n] = [];
      // seed a dedicated biblio for this new type
      try{
        if(typeof BIBLIO !== 'undefined'){
          if(!BIBLIO[n]){
            BIBLIO[n] = { categories: [
              { id:'pieces', label:'Pièces', items:[] },
              { id:'commun', label:'Zones communes', items:[] },
              { id:'extras', label:'Extras / Ajustements', items:[] },
            ]};
            saveBiblio();
          }
        }
      }catch(e){}
    }else{
      presets[n] = [];
    }
  }
  savePresets();
  if(sel){ sel.value=n; }
}
let pieces=[];let total=0;
function toggleAdjuster(){const a=$('adjuster');const b=$('toggleAdjuster');a.classList.toggle('hidden');b.textContent=a.classList.contains('hidden')?'+ Ajuster':'- Ajuster';}
function isM2HType(t){
  return t==='Méthodes' || (t||'').startsWith('Entretien régulier') || serviceTemplateOf(t)==='m2h';
}

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
    <button class="m2h-del" type="button" title="${tr('title_delete','Supprimer')}">🗑️</button>
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
  const on = isVitresStoresTab(t);
  wrap.classList.toggle('hidden', !on);
  std.classList.toggle('hidden', on);
  if(on){
    refreshVitresSelects();
    applyVitresPresetToInputs();
  }
}

// ================================
// ✅ Coef global (appliqué au total)
// ================================
const GLOBAL_COEF_SEL_KEY = 'est_global_coef_sel_v1'; // map {typeName: percent}

function _loadGlobalCoefSel(){
  try{ return JSON.parse(localStorage.getItem(GLOBAL_COEF_SEL_KEY)||'{}') || {}; }catch(e){ return {}; }
}
function _saveGlobalCoefSel(map){
  localStorage.setItem(GLOBAL_COEF_SEL_KEY, JSON.stringify(map||{}));
}
function refreshGlobalCoefUI(){
  const t = $('cleanType')?.value || '';
  const sel = $('globalCoefSelect');
  if(!sel) return;
  const enabled = serviceHasGlobalCoef(t);
  sel.classList.toggle('hidden', !enabled);
  if(!enabled) return;

  const choices = serviceCoefChoices(t); // [0, d1, d2]
  const labels = choices.map(p=> p===0 ? (lang==='fr'?'Coef 0%':'Coef 0%') : `Coef +${p}%`);
  const map=_loadGlobalCoefSel();
  const current = (typeof map[t]==='number') ? map[t] : 0;

  sel.innerHTML='';
  choices.forEach((p,i)=>{
    const o=document.createElement('option');
    o.value=String(p);
    o.textContent=labels[i];
    if(p===current) o.selected=true;
    sel.appendChild(o);
  });
  sel.onchange=()=>{
    const map2=_loadGlobalCoefSel();
    map2[t]=parseFloat(sel.value)||0;
    _saveGlobalCoefSel(map2);
    updateTotal();
  };
}

function getCurrentGlobalCoefPercent(){
  const t = $('cleanType')?.value || '';
  if(!serviceHasGlobalCoef(t)) return 0;
  const map=_loadGlobalCoefSel();
  return (typeof map[t]==='number') ? map[t] : 0;
}

function onTypeChange(){
  const v=$('cleanType').value;
  if(v==='__custom__'){openTypeManager();setTimeout(()=>$('tm_name')?.focus(),50);}else{renderStandardList();}
  toggleM2H();
  toggleVitresStores();
  refreshGlobalCoefUI();
  refreshGlobalCoefUI();
}
function currentArr(){
  const t=$('cleanType').value;
  if(!presets[t]||!presets[t].length){return defaultPresets[t]||[]}
  return presets[t];
}

// ✅ Bibliothèque apenas para 3 tipos
function isBiblioType(t){
  // Base types
  if(t==='Fin de chantier' || t==='Fin de bail -' || t==='Fin de bail +') return true;
  // Custom types: Pièces (bibliothèque)
  const s = getServiceByName(t);
  if(s && s.template==='pieces_biblio') return true;
  return false;
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
      d.innerHTML=`<span class="std-name">${trPieceName(p.name)}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${i})'>${tr('btn_add_plain','Ajouter')}</button>`;
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
    d.innerHTML=`<span class="std-name">${trPieceName(p.name)}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${i})'>${tr('btn_add_plain','Ajouter')}</button>`;
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
      d.innerHTML=`<span class="std-name">${trPieceName(p.name)}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${i})'>${tr('btn_add_plain','Ajouter')}</button>`;
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
      d.innerHTML=`<span class="std-name">${trPieceName(p.name)}</span><input class="qty" type="number" min="1" value="1"><button onclick='addStandard(${idx})'>${tr('btn_add_plain','Ajouter')}</button>`;
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
function addCustomPiece(){const name=$('customPieceName').value.trim();const time=parseFloat($('customPieceTime').value);const qty=parseInt($('customPieceQty').value)||1;if(!name||isNaN(time))return alert(tr('err_valid_name_time','Nom et temps valides requis'));pieces.push({name,timePerUnit:time,qty:qty,subtotal:+(time*qty).toFixed(2)});$('customPieceName').value='';$('customPieceTime').value='';$('customPieceQty').value='1';updateList();}

// ================================
// ✅ Vitres & Stores : Unités + M² (difficulté 0/20/30)
// ✅ Synchronisé avec Paramètres (source = presets['Vitres & Stores'])
// - Paramètres: items {name, kind:'unit', time} et {name, kind:'m2', cap}
// - Ajuster: 2 selects (unit / m2) qui auto-remplissent temps/capacité
// - Le total ne bouge que quand on clique "Ajouter à la session"
// ================================

function vitresPresets(typeName){
  const t = typeName || ($('cleanType')?.value || 'Vitres & Stores');
  return (presets[t]||[]).map(p=>normalizePresetItem(t,p)).filter(p=>p.name);
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
  // Allow any custom type that uses the "vitres" (2 blocs) template.
  if(!isVitresStoresTab(t)) return;

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

  if(hU<=0 && hM<=0) return alert(tr('err_nothing_add','Rien à ajouter'));

  if(hU>0){
    const baseName = uPreset ? `Unités • ${uPreset}` : 'Unités';
    const label = `${t} - ${baseName} (${qNorm} normal + ${qDiff} diff, +${Math.round(cU*100)}%)`;
    pieces.push({name:label,timePerUnit:hU,qty:1,subtotal:+hU.toFixed(2)});
  }
  if(hM>0){
    const baseName = mPreset ? `M² • ${mPreset}` : 'M²';
    const label = `${t} - ${baseName} (${mNorm} m² normal + ${mDiff} m² diff, +${Math.round(cM*100)}%)`;
    pieces.push({name:label,timePerUnit:hM,qty:1,subtotal:+hM.toFixed(2)});
  }

  // reset quantités (garde temps/capacité)
  ['vit_u_norm','vit_u_diff','vit_m2_norm','vit_m2_diff'].forEach(id=>{ if($(id)) $(id).value=''; });
  updateList();
}
function updateList(){const list=$('pieceList');list.innerHTML='';total=0;pieces.forEach((p,i)=>{total+=p.subtotal;const li=document.createElement('li');li.innerHTML=`<div><strong>${trPieceName(p.name)}</strong><br><small>${p.timePerUnit}h × ${p.qty} = ${p.subtotal}h</small></div><div class='piece-actions'><button onclick='quickEdit(${i})'>✏️</button><button onclick='removePiece(${i})'>🗑️</button></div>`;list.appendChild(li);});updateTotal();}
function formatHoursClock(h){
  const sign = h<0 ? '-' : '';
  h = Math.abs(h||0);
  const totalMin = Math.round(h*60);
  const hh = Math.floor(totalMin/60);
  const mm = totalMin%60;
  return sign + hh + ":" + String(mm).padStart(2,"0") + "h";
}

function updateTotal(){
  const base=+pieces.reduce((s,p)=>s+p.subtotal,0);
  const ex=extraHours();
  const totalH=(base+ex);

  const coefP = getCurrentGlobalCoefPercent ? (getCurrentGlobalCoefPercent()||0) : 0;
  const totalFinal = totalH * (1 + (coefP/100));
  const totalClock = formatHoursClock(totalFinal);

  $('totalHours').textContent = totalFinal.toFixed(2) + ' (' + formatHoursClock(totalFinal) + ')';

  // Équipe = Total / heures par personne (sans arrondir)
  const hpp=parseFloat($('hoursPerPerson')?.value||'0')||0;
  const people = (hpp>0) ? (totalFinal / hpp) : 0;

  if($('teamTotal')) $('teamTotal').textContent = totalFinal.toFixed(2) + ' (' + formatHoursClock(totalFinal) + ')';
  if($('teamPeople')) $('teamPeople').textContent=people.toFixed(2);
}
function quickEdit(i){const p=pieces[i];const q=parseInt(prompt(tr('prompt_qty','Quantité'),p.qty));const t=parseFloat(prompt(tr('prompt_unit_time','Temps unitaire (h)'),p.timePerUnit));if(isNaN(q)||isNaN(t))return;p.qty=q;p.timePerUnit=t;p.subtotal=+(q*t).toFixed(2);updateList();}
function removePiece(i){pieces.splice(i,1);updateList();}
function resetForm(){
  if(!confirm(tr('confirm_reset_session','Réinitialiser la session actuelle?')))return;
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
  if(!(window.jspdf&&window.jspdf.jsPDF))return alert(tr('err_pdf_lib','PDF library not available'));
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
  const fname=prompt(tr('prompt_pdf_name','Nom du fichier PDF:'),def)||def;
  doc.save(fname);
}

window.addEventListener('load',()=>{
  renderStandardList();
  toggleM2H();
  toggleVitresStores();
  refreshGlobalCoefUI();
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
        opt.textContent=`${trPieceName(p.name)} (${p.m2||0} m²)`;
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
      const nn = prompt(tr('prompt_cat_name','Nom catégorie:'), cat.label);
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
      if(!confirm(tr('confirm_delete_cat','Supprimer catégorie ?'))) return;
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
      const nn = prompt(tr('prompt_item_name2','Nom item:'), it.label);
      if(!nn) return;
      const nt = parseFloat(prompt(tr('prompt_time_h','Temps (h):'), String(it.time ?? 0)));
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
      if(!confirm(tr('confirm_delete_item','Supprimer item ?'))) return;
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
  const name = prompt(tr('prompt_new_category','Nom nouvelle catégorie:'));
  if(!name) return;
  tab.categories.push({ id: b_uid('cat'), label: name.trim(), items: [] });
  b_currentCatId = tab.categories.at(-1).id;
  saveBiblio();
  b_renderAll();
}

function biblioAddItem(){
  const cat = b_getCatObj();
  if(!cat) return alert(tr('alert_choose_category','Choisis une catégorie.'));
  const label = prompt(tr('prompt_item_name','Nom item:'));
  if(!label) return;
  const time = parseFloat(prompt(tr('prompt_time_h','Temps (h):'), '0'));
  if(isNaN(time)) return;
  cat.items.push({ id: b_uid('it'), label: label.trim(), time });
  saveBiblio();
  b_renderAll();
}



// =====================================================
// ✅ Gestion des types (sans casser l’existant)
// =====================================================
const SERVICES_KEY = 'est_services_v1';

function _loadServicesLegacy(){
  const sel = document.getElementById('cleanType');
  const base = sel ? Array.from(sel.options).map(o=>o.value).filter(v=>v && v!=='__custom__') : [];
  const raw = localStorage.getItem(SERVICES_KEY);
  if(raw){
    try{
      const arr = JSON.parse(raw);
      if(Array.isArray(arr)){
        base.forEach(n=>{ if(!arr.find(x=>x.name===n)) arr.push({id:'svc_'+Math.random().toString(16).slice(2,10),name:n,active:true,locked:true}); });
        return arr;
      }
    }catch(e){}
  }
  const seeded = base.map(n=>({id:'svc_'+Math.random().toString(16).slice(2,10),name:n,active:true,locked:true}));
  localStorage.setItem(SERVICES_KEY, JSON.stringify(seeded));
  return seeded;
}

function getServiceByName(name){
  return (_services||[]).find(s=>s && s.name===name) || null;
}
function serviceTemplateOf(name){
  if(name==='Vitres & Stores') return 'vitres';
  if(name==='Méthodes' || (name||'').startsWith('Entretien régulier')) return 'm2h';
  const s=getServiceByName(name);
  return s?.template || 'standard';
}
function serviceHasGlobalCoef(name){
  const s=getServiceByName(name);
  // Base rule: aucun coef global par défaut (même pour Fin de chantier).
  // Le coef global n'apparaît que si l'option est activée dans la gestion de types.
  if(!s) return false;
  return !!(s.options && s.options.coef);
}
function serviceCoefChoices(name){
  const s=getServiceByName(name);
  const d1 = s?.diff1 ?? 20;
  const d2 = s?.diff2 ?? 30;
  return [0, d1, d2];
}

let _services = _loadServicesLegacy();
function _saveServices(){ localStorage.setItem(SERVICES_KEY, JSON.stringify(_services)); }

// Ensure the main type <select> contains all (active) services from localStorage,
// including custom types after a page refresh.
function syncTypeSelectFromServices(){
  const sel = document.getElementById('cleanType');
  if(!sel) return;
  _services.forEach(s=>{
    if(!s || !s.name) return;
    let opt = Array.from(sel.options).find(o=>o.value===s.name);
    if(!opt){
      opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = trTypeName(s.name);
      const custom = sel.querySelector('option[value="__custom__"]');
      if(custom) sel.insertBefore(opt, custom);
      else sel.appendChild(opt);
    }
    opt.hidden = (s.active===false);
  });
}

// Run once on load
syncTypeSelectFromServices();

function openTypeManager(){
  document.getElementById('typesModal')?.classList.remove('hidden');
  tmRenderList();
  try{ tmSyncTemplateUI(); }catch(e){}
}
function closeTypeManager(){
  document.getElementById('typesModal')?.classList.add('hidden');
}

// Ajuste automatiquement les options selon le modèle choisi
function tmSyncTemplateUI(){
  const tpl = document.getElementById('tm_template');
  const optPieces = document.getElementById('tm_opt_pieces');
  const optM2 = document.getElementById('tm_opt_m2');
  const optCoef = document.getElementById('tm_opt_coef');
  const coef = document.getElementById('tm_coef');
  if(!tpl) return;
  const v = tpl.value;
  if(v==='vitres'){
    if(optPieces) optPieces.checked = true;
    if(optM2) optM2.checked = true;
  }else if(v==='m2h'){
    if(optPieces) optPieces.checked = false;
    if(optM2) optM2.checked = true;
  }else if(v==='pieces_biblio'){
    if(optPieces) optPieces.checked = true;
    if(optM2) optM2.checked = false;
    if(optCoef) optCoef.checked = false;
    if(coef) coef.value = '';
  }
}

// Bind change
try{
  const tpl=document.getElementById('tm_template');
  if(tpl){ tpl.addEventListener('change', tmSyncTemplateUI); }
}catch(e){}

function tmCreate(){
  const name = (document.getElementById('tm_name')?.value||'').trim();
  if(!name) return alert(tr('tm_bad_name','Nom requis'));
  if(_services.find(s=>s.name===name)) return alert(tr('tm_exists','Existe déjà'));
  // create using existing presets workflow
  if(typeof createCustomType === 'function') createCustomType(name);

  const template = document.getElementById('tm_template')?.value || 'vitres';
  let optPieces = !!document.getElementById('tm_opt_pieces')?.checked;
  let optM2 = !!document.getElementById('tm_opt_m2')?.checked;
  let optCoef = !!document.getElementById('tm_opt_coef')?.checked;
  // Force rules per template
  if(template==='pieces_biblio'){ optPieces = true; optM2 = false; }
  const coef = parseFloat(document.getElementById('tm_coef')?.value||'0')||0;
  const d1 = parseFloat(document.getElementById('tm_d1')?.value||'20')||20;
  const d2 = parseFloat(document.getElementById('tm_d2')?.value||'30')||30;

  _services.push({id:'svc_'+Math.random().toString(16).slice(2,10), name, active:true, locked:false, template, options:{pieces:optPieces,m2:optM2,coef:optCoef}, coefPercent:coef, diff1:d1, diff2:d2});
  _saveServices();
  document.getElementById('tm_name').value='';
  tmRenderList();
  const sel = document.getElementById('cleanType');
  if(sel && Array.from(sel.options).some(o=>o.value===name)){ sel.value=name; onTypeChange(); }
  alert(tr('tm_created','Type créé'));
}

function tmRenderList(){
  const wrap = document.getElementById('tm_list');
  const sel = document.getElementById('cleanType');
  if(!wrap || !sel) return;
  wrap.innerHTML='';
  // ensure services cover select options
  const existing = Array.from(sel.options).map(o=>o.value).filter(v=>v && v!=='__custom__');
  existing.forEach(n=>{ if(!_services.find(s=>s.name===n)) _services.push({id:'svc_'+Math.random().toString(16).slice(2,10),name:n,active:true,locked:true}); });
  _saveServices();

  _services.forEach(s=>{
    const row=document.createElement('div');
    row.className='tm-item';
    const left=document.createElement('div');
    left.className='tm-left';
    const displayName = s.locked ? trTypeName(s.name) : s.name;
    left.innerHTML = `<strong>${displayName}</strong><small>${s.locked? tr('tm_lbl_base','Type de base') : tr('tm_lbl_custom','Personnalisé')}</small>`;
    const actions=document.createElement('div');
    actions.className='tm-actions';

    const btnRename=document.createElement('button');
    btnRename.className='btn white small';
    btnRename.textContent=tr('tm_btn_rename','Renommer');
    btnRename.onclick=()=>{
      const nn=prompt(tr('tm_prompt_new_name','Nouveau nom'), s.name);
      if(!nn) return;
      if(_services.find(x=>x.name===nn)) return alert(tr('tm_name_exists','Ce nom existe déjà'));
      // rename in select
      Array.from(sel.options).forEach(o=>{ if(o.value===s.name){ o.value=nn; o.textContent=nn; }});
      // rename presets object
      if(typeof presets !== 'undefined' && presets[s.name]){
        presets[nn]=presets[s.name];
        delete presets[s.name];
        localStorage.setItem('est_presets_v4', JSON.stringify(presets));
      }
      // rename tab buttons
      document.querySelectorAll('.tab-btn').forEach(b=>{
        if(b.getAttribute('data-tab')===s.name){ b.setAttribute('data-tab', nn); b.textContent = nn; b.onclick=()=>switchTab(nn); }
      });
      s.name=nn;
      _saveServices();
      tmRenderList();
    };

    const btnToggle=document.createElement('button');
    btnToggle.className='btn white small';
    btnToggle.textContent = (s.active===false)?tr('tm_btn_enable','Activer'):tr('tm_btn_disable','Désactiver');
    btnToggle.onclick=()=>{
      s.active = (s.active===false)?true:false;
      // hide/show in select
      Array.from(sel.options).forEach(o=>{ if(o.value===s.name){ o.hidden = (s.active===false); }});
      _saveServices();
      tmRenderList();
    };

    const btnDel=document.createElement('button');
    btnDel.className='btn white small danger';
    btnDel.textContent=tr('tm_btn_delete','Supprimer');
    btnDel.onclick=()=>{
      if(s.locked) return alert(tr('tm_cant_delete_base','Impossible: type de base'));
      if(!confirm(tr('tm_confirm_delete','Supprimer définitivement ?'))) return;
      Array.from(sel.options).forEach(o=>{ if(o.value===s.name) o.remove(); });
      if(typeof presets !== 'undefined' && presets[s.name]){
        delete presets[s.name];
        localStorage.setItem('est_presets_v4', JSON.stringify(presets));
      }
      document.querySelectorAll('.tab-btn').forEach(b=>{ if(b.getAttribute('data-tab')===s.name) b.remove(); });
      _services = _services.filter(x=>x.id!==s.id);
      _saveServices();
      tmRenderList();
    };

    actions.appendChild(btnRename);
    actions.appendChild(btnToggle);
    actions.appendChild(btnDel);

    row.appendChild(left);
    row.appendChild(actions);
    wrap.appendChild(row);
  });
}
function hoursToClock(h){
  const sign = h < 0 ? '-' : '';
  const v = Math.abs(Number(h) || 0);
  const totalMin = Math.round(v * 60);
  const hh = Math.floor(totalMin / 60);
  const mm = totalMin % 60;
  return sign + hh + ':' + String(mm).padStart(2, '0');
}
