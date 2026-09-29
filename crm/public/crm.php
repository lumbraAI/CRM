<?php include __DIR__ . '/includes/header.php'; ?>
<div class="app">
<aside class="sidebar">
 <div class="logo"><div class="logoMark">P</div><span>PrepaCRM</span></div>
 <div class="navLabel">Principal</div>
 <div class="nav">
  <button class="active" data-page="dashboard">▦ <span>Dashboard</span></button>
  <button data-page="leads">◎ <span>Leads</span></button>
  <button data-page="pipeline">◫ <span>Pipeline</span></button>
  <button data-page="campaigns">⌁ <span>Campañas</span></button>
  <button data-page="analytics">◒ <span>Analytics & ROI</span></button>
  <div class="navLabel">Gestión</div>
  <button data-page="integrations">⌘ <span>Integraciones</span></button>
  <button data-page="team">♙ <span>Equipo comercial</span></button>
 </div>
 <div class="sideFoot"><b>Demo comercial</b><span>Datos simulados · Sin APIs activas</span></div>
</aside>
<main class="main">
<header class="top"><h1 id="topTitle">Dashboard comercial</h1><div class="topRight"><input class="search" placeholder="Buscar lead..."><div class="avatar">AG</div></div></header>
<div class="content">
<!-- Pages (kept markup identical, inline handlers removed where present) -->
<section id="dashboard" class="page active">
 <div class="headrow"><div><h2>Resumen de ventas</h2><p>Visión general del rendimiento comercial de la prepaga.</p></div><button class="btn primary" data-goto="leads">+ Nuevo lead</button></div>
 <div class="metrics">
  <div class="metric"><div class="label">Leads este mes</div><div class="num">1.284</div><div class="up">↑ 18,4% vs. mes anterior</div></div>
  <div class="metric"><div class="label">Contactados</div><div class="num">896</div><div class="up">69,8% de los leads</div></div>
  <div class="metric"><div class="label">Afiliaciones</div><div class="num">214</div><div class="up">↑ 12,7% este mes</div></div>
  <div class="metric"><div class="label">Conversión</div><div class="num">16,7%</div><div class="up">↑ 2,1 puntos</div></div>
 </div>
 <div class="grid2">
  <div class="card"><div class="cardTitle">Leads recibidos · últimos 7 días</div><div class="bars">
   <div class="barWrap"><div class="bar" style="height:55%"></div>Lun</div><div class="barWrap"><div class="bar" style="height:72%"></div>Mar</div><div class="barWrap"><div class="bar" style="height:64%"></div>Mié</div><div class="barWrap"><div class="bar" style="height:88%"></div>Jue</div><div class="barWrap"><div class="bar" style="height:76%"></div>Vie</div><div class="barWrap"><div class="bar" style="height:42%"></div>Sáb</div><div class="barWrap"><div class="bar" style="height:34%"></div>Dom</div>
  </div></div>
  <div class="card"><div class="cardTitle">Origen de los leads</div>
   <div class="source"><div class="sourceL"><i class="dot" style="background:#2563eb"></i><span>Meta Ads</span></div><b>52%</b></div>
   <div class="source"><div class="sourceL"><i class="dot" style="background:#111827"></i><span>TikTok Ads</span></div><b>18%</b></div>
   <div class="source"><div class="sourceL"><i class="dot" style="background:#f59e0b"></i><span>Google Ads</span></div><b>14%</b></div>
   <div class="source"><div class="sourceL"><i class="dot" style="background:#22c55e"></i><span>WhatsApp / Orgánico</span></div><b>10%</b></div>
   <div class="source"><div class="sourceL"><i class="dot" style="background:#94a3b8"></i><span>Carga manual / Otros</span></div><b>6%</b></div>
  </div>
 </div>
</section>

<section id="leads" class="page">
 <div class="headrow"><div><h2>Base de leads</h2><p>Todos los prospectos y su trazabilidad de adquisición.</p></div><button class="btn primary">+ Crear lead</button></div>
 <div class="tableCard"><div class="toolbar"><input id="leadSearch" placeholder="Buscar por nombre..."><select><option>Todas las fuentes</option><option>Meta Ads</option><option>TikTok Ads</option><option>Google Ads</option></select><select><option>Todos los estados</option><option>Nuevo</option><option>Contactado</option><option>Interesado</option><option>Afiliado</option></select></div>
 <table><thead><tr><th>Lead</th><th>Fuente</th><th>Campaña / Anuncio</th><th>Vendedor</th><th>Estado</th><th>Ingreso</th></tr></thead><tbody id="leadRows"></tbody></table></div>
</section>

<section id="pipeline" class="page">
 <div class="headrow"><div><h2>Pipeline comercial</h2><p>Seguimiento visual del proceso de afiliación.</p></div><button class="btn light">Filtrar vendedor</button></div>
 <div class="pipeline" id="pipelineBoard"></div>
</section>

<section id="campaigns" class="page">
 <div class="headrow"><div><h2>Campañas</h2><p>Rendimiento de adquisición y conversiones por campaña.</p></div><button class="btn light">Últimos 30 días ▾</button></div>
 <div class="campaigns">
  <div class="campaign"><span class="badge">META ADS</span><h3>Planes Familiares · Septiembre</h3><p>Video + formulario instantáneo</p><div class="campStats"><div><span>LEADS</span><b>412</b></div><div><span>VENTAS</span><b>71</b></div><div><span>CONV.</span><b>17,2%</b></div></div></div>
  <div class="campaign"><span class="badge purple">TIKTOK</span><h3>Jóvenes 25-35 · AMBA</h3><p>Video vertical · Lead Gen</p><div class="campStats"><div><span>LEADS</span><b>229</b></div><div><span>VENTAS</span><b>31</b></div><div><span>CONV.</span><b>13,5%</b></div></div></div>
  <div class="campaign"><span class="badge orange">GOOGLE ADS</span><h3>Prepaga precio · Search</h3><p>Búsqueda · Landing de cotización</p><div class="campStats"><div><span>LEADS</span><b>184</b></div><div><span>VENTAS</span><b>39</b></div><div><span>CONV.</span><b>21,2%</b></div></div></div>
 </div>
</section>


<section id="analytics" class="page">
 <div class="headrow"><div><h2>Analytics & ROI</h2><p>Rentabilidad comercial, inversión publicitaria y atribución de ventas.</p></div><button class="btn light">Septiembre 2026 ▾</button></div>
 <div class="metrics">
  <div class="metric"><div class="label">Inversión publicitaria</div><div class="num">$4,82M</div><div class="up">Meta + Google + TikTok</div></div>
  <div class="metric"><div class="label">Facturación atribuida</div><div class="num">$18,7M</div><div class="up">↑ 21,3% vs. agosto</div></div>
  <div class="metric"><div class="label">ROAS</div><div class="num">3,88x</div><div class="up">$3,88 por cada $1 invertido</div></div>
  <div class="metric"><div class="label">ROI estimado</div><div class="num">288%</div><div class="up">Resultado atribuible / inversión</div></div>
 </div>
 <div class="metrics">
  <div class="metric"><div class="label">Costo por lead</div><div class="num">$3.754</div><div class="up">1.284 leads</div></div>
  <div class="metric"><div class="label">CAC publicitario</div><div class="num">$22.523</div><div class="up">214 afiliaciones</div></div>
  <div class="metric"><div class="label">Ticket atribuido promedio</div><div class="num">$87.383</div><div class="up">Por nueva afiliación</div></div>
  <div class="metric"><div class="label">Balance atribuido</div><div class="num">$13,88M</div><div class="up">Facturación − pauta</div></div>
 </div>

 <div class="grid2">
  <div class="card"><div class="cardTitle">Inversión vs. facturación atribuida · 6 meses</div>
   <div class="chartWrapper" style="height:250px;position:relative"><canvas id="revenueChart"></canvas></div>
  </div>
  <div class="card"><div class="cardTitle">Distribución de inversión por canal</div>
   <div class="chartWrapper" style="height:250px;position:relative"><canvas id="channelChart"></canvas></div>
  </div>
 </div>

 <div class="grid2" style="margin-top:16px">
  <div class="card"><div class="cardTitle">Leads vs. afiliaciones</div>
   <div class="chartWrapper" style="height:250px;position:relative"><canvas id="conversionChart"></canvas></div>
  </div>
  <div class="card"><div class="cardTitle">ROAS por canal</div>
   <div class="chartWrapper" style="height:250px;position:relative"><canvas id="roasChart"></canvas></div>
  </div>
 </div>

 <div class="tableCard" style="margin-top:16px">
  <div class="toolbar"><b style="padding:8px 3px">Balance por canal</b></div>
  <table><thead><tr><th>Canal</th><th>Inversión</th><th>Leads</th><th>CPL</th><th>Afiliaciones</th><th>Facturación atribuida</th><th>ROAS</th><th>Balance</th></tr></thead>
  <tbody>
   <tr><td><b>Meta Ads</b></td><td>$2.510.000</td><td>668</td><td>$3.757</td><td>119</td><td>$10.420.000</td><td><span class="badge green">4,15x</span></td><td><b>$7.910.000</b></td></tr>
   <tr><td><b>Google Ads</b></td><td>$1.280.000</td><td>180</td><td>$7.111</td><td>46</td><td>$4.890.000</td><td><span class="badge green">3,82x</span></td><td><b>$3.610.000</b></td></tr>
   <tr><td><b>TikTok Ads</b></td><td>$1.030.000</td><td>231</td><td>$4.459</td><td>32</td><td>$2.710.000</td><td><span class="badge orange">2,63x</span></td><td><b>$1.680.000</b></td></tr>
   <tr><td><b>Orgánico / Referidos</b></td><td>$0</td><td>205</td><td>$0</td><td>17</td><td>$680.000</td><td><span class="badge gray">—</span></td><td><b>$680.000</b></td></tr>
  </tbody></table>
 </div>

 <div class="card" style="margin-top:16px">
  <div class="cardTitle">Embudo comercial del mes</div>
  <div class="embudo" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;text-align:center">
   <div style="padding:18px;background:#eff6ff;border-radius:12px"><b style="font-size:24px">1.284</b><div class="sub">Leads</div></div>
   <div style="padding:18px;background:#f8fafc;border-radius:12px"><b style="font-size:24px">896</b><div class="sub">Contactados · 69,8%</div></div>
   <div style="padding:18px;background:#fff7ed;border-radius:12px"><b style="font-size:24px">507</b><div class="sub">Interesados · 39,5%</div></div>
   <div style="padding:18px;background:#f5f3ff;border-radius:12px"><b style="font-size:24px">318</b><div class="sub">Cotizados · 24,8%</div></div>
   <div style="padding:18px;background:#ecfdf3;border-radius:12px"><b style="font-size:24px">214</b><div class="sub">Afiliados · 16,7%</div></div>
  </div>
 </div>
 <p class="demoNote">* Valores completamente ficticios para demostración visual. No representan resultados reales.</p>
</section>

<section id="integrations" class="page">
 <div class="headrow"><div><h2>Integraciones</h2><p>Vista demostrativa de los canales que podrían conectarse mediante API.</p></div></div>
 <div class="integrations">
  <div class="integration"><div class="ico">f</div><div><h3>Facebook Lead Ads</h3><p>Leads, campañas y anuncios</p></div><i class="status"></i></div>
  <div class="integration"><div class="ico">◎</div><div><h3>Instagram</h3><p>Campañas y formularios Meta</p></div><i class="status"></i></div>
  <div class="integration"><div class="ico">♪</div><div><h3>TikTok Lead Gen</h3><p>Leads y campañas</p></div><i class="status"></i></div>
  <div class="integration"><div class="ico">G</div><div><h3>Google Ads</h3><p>Campañas y conversiones</p></div><i class="status"></i></div>
  <div class="integration"><div class="ico">W</div><div><h3>WhatsApp</h3><p>Contacto y seguimiento</p></div><i class="status"></i></div>
  <div class="integration"><div class="ico">⌁</div><div><h3>Landing / Web</h3><p>Formularios y UTMs</p></div><i class="status"></i></div>
  <div class="integration"><div class="ico">in</div><div><h3>LinkedIn</h3><p>Preparado para integración</p></div><i class="status off"></i></div>
  <div class="integration"><div class="ico">+</div><div><h3>API personalizada</h3><p>Otros proveedores de leads</p></div><i class="status off"></i></div>
 </div>
 <p class="demoNote">* Esta pantalla es una representación visual. La demo no realiza conexiones reales con servicios externos.</p>
</section>

<section id="team" class="page">
 <div class="headrow"><div><h2>Equipo comercial</h2><p>Distribución y rendimiento de vendedores.</p></div><button class="btn primary">+ Vendedor</button></div>
 <div class="tableCard"><table><thead><tr><th>Vendedor</th><th>Leads asignados</th><th>Contactados</th><th>Afiliaciones</th><th>Conversión</th><th>Estado</th></tr></thead><tbody>
 <tr><td><b>Martina López</b></td><td>286</td><td>241</td><td>62</td><td>21,7%</td><td><span class="badge green">Activo</span></td></tr>
 <tr><td><b>Lucas Fernández</b></td><td>253</td><td>198</td><td>47</td><td>18,6%</td><td><span class="badge green">Activo</span></td></tr>
 <tr><td><b>Sofía Díaz</b></td><td>231</td><td>176</td><td>42</td><td>18,2%</td><td><span class="badge green">Activo</span></td></tr>
 <tr><td><b>Juan Pérez</b></td><td>207</td><td>153</td><td>35</td><td>16,9%</td><td><span class="badge green">Activo</span></td></tr>
 </tbody></table></div>
</section>
</div>
</main>
</div>

<!-- modal -->
<div class="modal" id="leadModal"><div class="modalBox"><div class="modalHead"><b>Detalle del lead</b><button class="close" id="modalCloseBtn">✕</button></div><div class="modalBody" id="modalBody"></div></div></div>

<?php include __DIR__ . '/includes/footer.php'; ?>
