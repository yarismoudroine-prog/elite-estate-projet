const properties = [
  { id: 1, name: 'Villa Azure', country: 'France', city: 'Cannes', type: 'Villa', price: 4850000, surface: 420, bedrooms: 6, rooms: 9, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85', amenities: ['Piscine à débordement', 'Vue mer', 'Jardin paysager', 'Garage privé'], description: 'Une villa contemporaine imaginée pour profiter pleinement de la Côte d’Azur. Ses volumes ouverts, ses larges baies vitrées et ses espaces extérieurs composent une résidence élégante et lumineuse.' },
  { id: 2, name: 'Penthouse Lumière', country: 'France', city: 'Paris', type: 'Penthouse', price: 7200000, surface: 285, bedrooms: 4, rooms: 7, image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85', amenities: ['Terrasse panoramique', 'Vue monumentale', 'Ascenseur privé', 'Conciergerie'], description: 'Un appartement d’exception au cœur de Paris, pensé autour de la lumière et des perspectives. La terrasse prolonge les espaces de réception et offre une vue spectaculaire sur la capitale.' },
  { id: 3, name: 'Ocean House', country: 'États-Unis', city: 'Miami', type: 'Villa', price: 8950000, surface: 610, bedrooms: 7, rooms: 11, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85', amenities: ['Accès mer', 'Piscine', 'Home cinéma', 'Dock privé'], description: 'Une propriété contemporaine tournée vers l’océan, avec de généreux espaces de réception et une architecture qui privilégie la continuité entre intérieur et extérieur.' },
  { id: 4, name: 'Casa Bellavista', country: 'Italie', city: 'Côme', type: 'Villa', price: 6350000, surface: 510, bedrooms: 5, rooms: 10, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85', amenities: ['Vue lac', 'Piscine privée', 'Terrasses', 'Maison d’amis'], description: 'Une résidence élégante inspirée de l’architecture italienne, implantée dans un environnement paysager avec une vue dégagée sur le lac de Côme.' },
  { id: 5, name: 'Skyline Residence', country: 'Émirats arabes unis', city: 'Dubaï', type: 'Appartement', price: 3900000, surface: 235, bedrooms: 3, rooms: 6, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85', amenities: ['Vue skyline', 'Piscine résidentielle', 'Salle de sport', 'Conciergerie'], description: 'Une résidence contemporaine au cœur de Dubaï, avec des finitions haut de gamme et une vue dégagée sur la skyline.' },
  { id: 6, name: 'Château des Vignes', country: 'France', city: 'Bordeaux', type: 'Château', price: 5400000, surface: 760, bedrooms: 8, rooms: 16, image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85', amenities: ['Parc paysager', 'Caves', 'Dépendances', 'Piscine'], description: 'Une demeure de caractère entourée de jardins et de dépendances. Un bien fictif conçu pour illustrer l’univers des propriétés patrimoniales de prestige.' },
  { id: 7, name: 'Maison Horizon', country: 'Australie', city: 'Sydney', type: 'Maison', price: 4600000, surface: 350, bedrooms: 4, rooms: 8, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85', amenities: ['Vue océan', 'Piscine', 'Terrasse', 'Cuisine ouverte'], description: 'Une maison contemporaine ouverte sur son environnement, avec des lignes épurées et une relation forte entre les espaces intérieurs et la terrasse.' },
  { id: 8, name: 'Villa Sakura', country: 'Japon', city: 'Kyoto', type: 'Villa', price: 3100000, surface: 295, bedrooms: 4, rooms: 8, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85', amenities: ['Jardin privé', 'Bassin', 'Espace traditionnel', 'Garage'], description: 'Une résidence fictive mêlant lignes contemporaines et références architecturales japonaises, au cœur d’un environnement végétal apaisant.' }
];

const $ = (id) => document.getElementById(id);
const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

function uniqueValues(key) { return [...new Set(properties.map(p => p[key]))].sort((a,b) => a.localeCompare(b, 'fr')); }
function fillSelect(id, values) { const select = $(id); values.forEach(v => { const o = document.createElement('option'); o.value = v; o.textContent = v; select.appendChild(o); }); }

fillSelect('country', uniqueValues('country'));
fillSelect('city', uniqueValues('city'));
fillSelect('type', uniqueValues('type'));

function card(p) {
  return `<article class="property-card">
    <div class="card-image"><img src="${p.image}" alt="${p.name}, ${p.city}" loading="lazy"><span class="badge">${p.type}</span></div>
    <div class="card-body">
      <h3>${p.name}</h3><div class="location">${p.city} · ${p.country}</div>
      <div class="card-price">${euro.format(p.price)}</div>
      <div class="card-meta"><span>${p.surface} m²</span><span>${p.bedrooms} chambres</span><span>${p.rooms} pièces</span></div>
      <button class="card-link" data-id="${p.id}">Voir le bien <span>→</span></button>
    </div>
  </article>`;
}

function getFilteredProperties() {
  const q = $('search').value.trim().toLowerCase();
  const country = $('country').value, city = $('city').value, type = $('type').value;
  const minPrice = Number($('minPrice').value) || 0, maxPrice = Number($('maxPrice').value) || Infinity;
  const minSurface = Number($('minSurface').value) || 0, bedrooms = Number($('bedrooms').value) || 0;
  return properties.filter(p => {
    const haystack = `${p.name} ${p.city} ${p.country} ${p.type}`.toLowerCase();
    return (!q || haystack.includes(q)) && (!country || p.country === country) && (!city || p.city === city) && (!type || p.type === type) && p.price >= minPrice && p.price <= maxPrice && p.surface >= minSurface && p.bedrooms >= bedrooms;
  });
}

function renderProperties() {
  const list = getFilteredProperties();
  $('property-grid').innerHTML = list.map(card).join('');
  $('results-count').textContent = `${list.length} bien${list.length > 1 ? 's' : ''}`;
  $('empty-state').hidden = list.length !== 0;
  document.querySelectorAll('.card-link').forEach(btn => btn.addEventListener('click', () => openModal(Number(btn.dataset.id))));
}

function openModal(id) {
  const p = properties.find(x => x.id === id); if (!p) return;
  $('modal-content').innerHTML = `<div class="modal-hero"><div class="modal-hero-image" style="background-image:url('${p.image}')"></div><div class="modal-info"><p class="eyebrow">${p.type} · ${p.city}, ${p.country}</p><h2 id="modal-title">${p.name}</h2><div class="card-price">${euro.format(p.price)}</div><div class="modal-details"><div><strong>${p.surface} m²</strong>Surface</div><div><strong>${p.bedrooms}</strong>Chambres</div><div><strong>${p.rooms}</strong>Pièces</div><div><strong>Prestige</strong>Gamme</div></div><p class="modal-description">${p.description}</p><ul class="modal-amenities">${p.amenities.map(a => `<li>${a}</li>`).join('')}</ul><a href="#contact" class="btn btn-dark modal-contact">Contacter l’agence</a></div></div>`;
  $('property-modal').classList.add('is-open'); $('property-modal').setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
  document.querySelector('.modal-contact').addEventListener('click', closeModal);
}
function closeModal() { $('property-modal').classList.remove('is-open'); $('property-modal').setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

document.querySelectorAll('.filter-item input, .filter-item select').forEach(el => el.addEventListener('input', renderProperties));
$('reset-filters').addEventListener('click', () => { document.querySelectorAll('.filters input').forEach(i => i.value = ''); document.querySelectorAll('.filters select').forEach(s => s.value = ''); renderProperties(); });
$('hero-search-btn').addEventListener('click', () => { $('search').value = $('hero-search').value; $('type').value = $('hero-type').value; renderProperties(); document.querySelector('#proprietes').scrollIntoView({ behavior: 'smooth' }); });

document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

$('contact-form').addEventListener('submit', e => { e.preventDefault(); $('form-message').textContent = 'Merci. Votre demande a bien été enregistrée dans cette démonstration du site.'; e.target.reset(); });

const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => { const nav = document.querySelector('.main-nav'); nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', nav.classList.contains('is-open')); });
document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', () => document.querySelector('.main-nav').classList.remove('is-open')));

renderProperties();
