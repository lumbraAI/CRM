// App UI logic migrated from inline script (no inline handlers)
const leads=[
{name:"Camila Rodríguez",phone:"+54 9 11 4582-0194",age:34,city:"CABA",source:"Meta Ads",campaign:"Planes Familiares · Septiembre",ad:"Video 03 · Familia",seller:"Martina López",status:"Interesado",date:"Hoy · 13:42",plan:"Plan Familiar 450",value:"$185.000"},
{name:"Nicolás Gómez",phone:"+54 9 11 3301-7742",age:29,city:"Vicente López",source:"TikTok Ads",campaign:"Jóvenes 25-35 · AMBA",ad:"UGC 02 · Precio",seller:"Lucas Fernández",status:"Nuevo",date:"Hoy · 12:18",plan:"A cotizar",value:"—"},
{name:"Valentina Suárez",phone:"+54 9 221 551-8830",age:41,city:"La Plata",source:"Google Ads",campaign:"Prepaga precio · Search",ad:"KW: obra social prepaga",seller:"Sofía Díaz",status:"Contactado",date:"Hoy · 11:06",plan:"Plan Premium",value:"$214.500"},
{name:"Federico Martínez",phone:"+54 9 11 6120-4411",age:37,city:"CABA",source:"Meta Ads",campaign:"Cambio de Prepaga",ad:"Carrusel 01 · Beneficios",seller:"Juan Pérez",status:"Afiliado",date:"Ayer · 18:22",plan:"Plan 350",value:"$148.900"},
{name:"Julieta Romero",phone:"+54 9 11 2890-6531",age:32,city:"San Isidro",source:"WhatsApp",campaign:"Orgánico Instagram",ad:"Perfil / DM",seller:"Martina López",status:"Cotización",date:"Ayer · 16:09",plan:"Plan Familiar 450",value:"$196.000"},
{name:"Mariano Acosta",phone:"+54 9 223 510-1922",age:46,city:"Mar del Plata",source:"Meta Ads",campaign:"Interior PBA · Septiembre",ad:"Imagen 04 · Cobertura",seller:"Lucas Fernández",status:"Perdido",date:"Ayer · 14:31",plan:"Plan 350",value:"$159.000"}
];
const badgeClass=s=>s==="Afiliado"?"green":s==="Cotización"?"purple":s==="Perdido"?"gray":s==="Interesado"?"orange":"";
function renderLeads(arr=leads){
 document.getElementById("leadRows").innerHTML=arr.map((l,i)=>`<tr class="clickable" data-lead-index="${leads.indexOf(l)}"><td><div class="leadName">${l.name}</div><div class="sub">${l.phone}</div></td><td><span class="badge">${l.source}</span></td><td><b>${l.campaign}</b><div class="sub">${l.ad}</div></td><td>${l.seller}</td><td><span class="badge ${badgeClass(l.status)}">${l.status}</span></td><td>${l.date}</td></tr>`).join("");
}
function filterLeads(){let q=document.getElementById("leadSearch").value.toLowerCase();renderLeads(leads.filter(l=>(l.name+" "+l.phone+" "+l.campaign).toLowerCase().includes(q)))}
function showLead(i){const l=leads[i];document.getElementById("modalBody").innerHTML=`<div class="profile"><div class="bigAvatar">${l.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div><div><h3>${l.name}</h3><p>${l.phone} · ${l.city}</p></div><span class="badge ${badgeClass(l.status)}" style="margin-left:auto">${l.status}</span></div><div class="detailGrid"><div class="detail"><span>Edad</span><b>${l.age} años</b></div><div class="detail"><span>Vendedor asignado</span><b>${l.seller}</b></div><div class="detail"><span>Plan de interés</span><b>${l.plan}</b></div><div class="detail"><span>Valor estimado</span><b>${l.value}</b></div></div><div class="attribution"><b>Trazabilidad de adquisición</b><div class="path"><span>${l.source}</span><i class="arrow">→</i><span>${l.campaign}</span><i class="arrow">→</i><span>${l.ad}</span><i class="arrow">→</i><span>${l.name}</span></div><p class="demoNote">Ejemplo: el CRM conservaría IDs de campaña, conjunto de anuncios, anuncio, formulario y lead para atribución y reportes.</p></div>`;document.getElementById("leadModal").classList.add("show");}
function closeModal(){document.getElementById("leadModal").classList.remove("show")}
function renderPipeline(){
 const stages=["Nuevo","Contactado","Interesado","Cotización","Afiliado"];
 document.getElementById("pipelineBoard").innerHTML=stages.map(s=>{let a=leads.filter(l=>l.status===s);return `<div class="column"><div class="colHead"><span>${s}</span><span class="count">${a.length}</span></div>${a.map(l=>`<div class="leadCard"><b>${l.name}</b><p>${l.city} · ${l.age} años</p><div class="minirow"><span class="badge">${l.source}</span><span class="money">${l.value}</span></div></div>`).join("")}${a.length===0?'<div class="leadCard"><b>Ejemplo de etapa</b><p>Los leads pueden moverse entre columnas.</p><span class="badge gray">Demo</span></div>':""}</div>`}).join("");
}
const titles={dashboard:"Dashboard comercial",leads:"Gestión de leads",pipeline:"Pipeline comercial",campaigns:"Campañas y atribución",analytics:"Analytics & ROI",integrations:"Integraciones",team:"Equipo comercial"};
function go(id){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));const el=document.getElementById(id);if(el)el.classList.add("active");document.querySelectorAll(".nav button").forEach(b=>b.classList.toggle("active",b.dataset.page===id));const tt=document.getElementById("topTitle");if(tt)tt.textContent=titles[id];window.scrollTo(0,0);if(id==="analytics")setTimeout(drawCharts,50)}

document.addEventListener('DOMContentLoaded', ()=>{
 // nav buttons
 document.querySelectorAll('.nav button[data-page]').forEach(b=>b.addEventListener('click', ()=>go(b.dataset.page)));
 // goto buttons
 document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click', ()=>go(b.dataset.goto)));
 // lead rows click (delegate)
 document.getElementById('leadRows').addEventListener('click', e=>{const tr=e.target.closest('tr'); if(!tr) return; const idx=tr.dataset.leadIndex; if(idx) showLead(Number(idx));});
 // modal close
 const modalClose=document.getElementById('modalCloseBtn'); if(modalClose) modalClose.addEventListener('click', closeModal);
 // search input
 const leadSearch=document.getElementById('leadSearch'); if(leadSearch) leadSearch.addEventListener('input', filterLeads);
 // backdrop click
 const leadModal=document.getElementById('leadModal'); if(leadModal) leadModal.addEventListener('click', e=>{ if(e.target.id==='leadModal') closeModal(); });
 // logout button
 const logoutBtn=document.getElementById('logout'); if(logoutBtn) logoutBtn.addEventListener('click', ()=>{ localStorage.removeItem('crm_token'); window.location.href='/index.php'; });

 renderLeads(); renderPipeline();
 setTimeout(drawCharts,100); window.addEventListener('resize', ()=>setTimeout(drawCharts,80));
});

function drawCharts(){
 const line=(id,sets,labels)=>{
  const c=document.getElementById(id); if(!c) return; const dpr=devicePixelRatio||1,w=c.parentElement.clientWidth,h=c.parentElement.clientHeight;c.width=w*dpr;c.height=h*dpr;c.style.width=w+"px";c.style.height=h+"px";const x=c.getContext("2d");x.scale(dpr,dpr);x.clearRect(0,0,w,h);
  const pad={l:42,r:16,t:15,b:32},cw=w-pad.l-pad.r,ch=h-pad.t-pad.b,max=Math.max(...sets.flatMap(s=>s.data))*1.12;
  x.font="10px system-ui";x.fillStyle="#8b95a7";x.strokeStyle="#edf0f4";x.lineWidth=1;
  for(let i=0;i<5;i++){let y=pad.t+ch*i/4;x.beginPath();x.moveTo(pad.l,y);x.lineTo(w-pad.r,y);x.stroke()}
  labels.forEach((v,i)=>{let px=pad.l+cw*i/(labels.length-1);x.fillText(v,px-10,h-10)});
  sets.forEach((s,si)=>{x.strokeStyle=si===0?"#2563eb":"#16a34a";x.lineWidth=3;x.beginPath();s.data.forEach((v,i)=>{let px=pad.l+cw*i/(s.data.length-1),py=pad.t+ch-(v/max)*ch;i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke();});
 };
 const bars=(id,data,labels)=>{const c=document.getElementById(id);if(!c) return;const dpr=devicePixelRatio||1,w=c.parentElement.clientWidth,h=c.parentElement.clientHeight;c.width=w*dpr;c.height=h*dpr;c.style.width=w+"px";c.style.height=h+"px";const x=c.getContext("2d");x.scale(dpr,dpr);x.clearRect(0,0,w,h);const max=Math.max(...data)*1.15,pad=35,bw=(w-70)/data.length*.55;data.forEach((v,i)=>{let slot=(w-70)/data.length,bh=(h-65)*v/max,px=35+i*slot+(slot-bw)/2,py=h-35-bh;x.fillStyle=["#2563eb","#7c3aed","#f59e0b","#16a34a"][i%4];x.beginPath();if(x.roundRect) x.roundRect(px,py,bw,bh,6); else x.fillRect(px,py,bw,bh);x.fillStyle="#697386";x.font="10px system-ui";x.fillText(labels[i],px,h-15);x.fillStyle="#334155";x.fillText(String(v),px,py-7)}) };
 line("revenueChart",[{data:[2.7,3.1,3.5,3.9,4.2,4.82]},{data:[9.2,10.8,12.4,14.1,15.4,18.7]}],["Abr","May","Jun","Jul","Ago","Sep"]);
 bars("channelChart",[2.51,1.28,1.03,.01],["Meta","Google","TikTok","Org."]);
 line("conversionChart",[{data:[890,960,1040,1120,1175,1284]},{data:[142,156,171,186,190,214]}],["Abr","May","Jun","Jul","Ago","Sep"]);
 bars("roasChart",[4.15,3.82,2.63],["Meta","Google","TikTok"]);
}
