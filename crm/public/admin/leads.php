<?php include __DIR__ . '/../includes/header.php'; ?>
<div style="padding:26px">
  <h2>Leads</h2>
  <p>Vista administrativa de leads (solo admin).</p>
  <div>
    <table id="leadsTable" border="1" cellpadding="6" style="width:100%;border-collapse:collapse">
      <thead><tr><th>ID</th><th>Provider</th><th>Provider ID</th><th>Campaign</th><th>Name</th><th>Email</th><th>Phone</th><th>City</th><th>Created</th></tr></thead>
      <tbody></tbody>
    </table>
  </div>
  <div style="margin-top:12px"><button id="prev">Prev</button> <span id="pageInfo"></span> <button id="next">Next</button></div>
</div>
<?php include __DIR__ . '/../includes/footer.php'; ?>
