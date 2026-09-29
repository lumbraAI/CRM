document.addEventListener('DOMContentLoaded', ()=>{
  const API_BASE = window.API_BASE || '/api';
  let page = 1;
  const pageSize = 25;
  const tableBody = document.querySelector('#leadsTable tbody');
  const pageInfo = document.getElementById('pageInfo');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  async function load() {
    const token = localStorage.getItem('crm_token');
    if (!token) { alert('Debe iniciar sesión como admin'); window.location.href = '/index.php'; return; }
    const res = await fetch(`${API_BASE}/admin/leads?page=${page}&pageSize=${pageSize}`, { headers: { Authorization: 'Bearer ' + token } });
    if (!res.ok) { if (res.status===403) { alert('Acceso denegado (admin)'); } return; }
    const data = await res.json();
    tableBody.innerHTML = data.leads.map(l=>`<tr><td>${l.id}</td><td>${l.provider}</td><td>${l.provider_lead_id}</td><td>${l.campaign||''}</td><td>${l.name||''}</td><td>${l.email||''}</td><td>${l.phone||''}</td><td>${l.city||''}</td><td>${l.created_at}</td></tr>`).join('');
    pageInfo.textContent = `Página ${data.page} — ${data.total} leads`;
  }

  prevBtn.addEventListener('click', ()=>{ if (page>1){ page--; load(); } });
  nextBtn.addEventListener('click', ()=>{ page++; load(); });
  // click to edit
  document.querySelector('#leadsTable tbody').addEventListener('click', async (e)=>{
    const tr = e.target.closest('tr'); if(!tr) return; const id = tr.children[0].textContent;
    const current = Array.from(tr.children).map(td=>td.textContent);
    const newName = prompt('Nombre:', current[4]) || current[4];
    const newEmail = prompt('Email:', current[5]) || current[5];
    const newPhone = prompt('Teléfono:', current[6]) || current[6];
    const newCampaign = prompt('Campaña:', current[3]) || current[3];
    const token = localStorage.getItem('crm_token');
    if (!token) { alert('Debe iniciar sesión como admin'); window.location.href = '/index.php'; return; }
    const res = await fetch(`${API_BASE}/admin/leads/${id}`, { method: 'PUT', headers: { 'Content-Type':'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify({ name: newName, email: newEmail, phone: newPhone, campaign: newCampaign }) });
    if (!res.ok) { alert('Error al actualizar lead'); return; }
    await load();
  });

  load();
});
