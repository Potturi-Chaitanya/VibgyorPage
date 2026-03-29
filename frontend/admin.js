let allLeads = [];

async function loadLeads() {
  let res = await fetch("https://vibgyorpage.onrender.com/leads");
  allLeads = await res.json();

  displayLeads(allLeads);
}

function displayLeads(leads) {
  let tbody = document.querySelector("#leadsTable tbody");
  tbody.innerHTML = "";

  leads.forEach((lead) => {
    let row = `
      <tr>
        <td>${lead.mobile}</td>
        <td>${lead.email}</td>
        <td>${new Date(lead.createdAt).toLocaleString()}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function filterLeads() {
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = allLeads.filter(
    (l) => l.mobile.includes(value) || l.email.toLowerCase().includes(value),
  );

  displayLeads(filtered);
}

// Auto refresh every 10 sec
setInterval(loadLeads, 10000);

loadLeads();
