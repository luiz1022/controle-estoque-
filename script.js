const materials = [
  { codigo: "MAT-001", descricao: "Cabo elétrico 6,6 kV", ideal: 100, atual: 78, preco: 42.50 },
  { codigo: "MAT-002", descricao: "Isolador de porcelana", ideal: 50, atual: 52, preco: 118.90 },
  { codigo: "MAT-003", descricao: "Conector de cobre", ideal: 80, atual: 0, preco: 35.70 },
  { codigo: "MAT-004", descricao: "Parafuso sextavado M12", ideal: 200, atual: 145, preco: 4.80 },
  { codigo: "MAT-005", descricao: "Luva isolante classe 2", ideal: 30, atual: 18, preco: 96.40 },
  { codigo: "MAT-006", descricao: "Fita isolante 20 m", ideal: 120, atual: 164, preco: 8.90 },
  { codigo: "MAT-007", descricao: "Terminal de compressão", ideal: 60, atual: 60, preco: 12.50 },
  { codigo: "MAT-008", descricao: "Chave seccionadora", ideal: 10, atual: 7, preco: 385.00 }
];

const history = [
  { data: "08/09/2026 13:42", tipo: "ENTRADA", codigo: "MAT-006", descricao: "Fita isolante 20 m", qtd: 40, anterior: 124, novo: 164, obs: "Reposição de estoque" },
  { data: "08/09/2026 12:18", tipo: "SAÍDA", codigo: "MAT-001", descricao: "Cabo elétrico 6,6 kV", qtd: 12, anterior: 90, novo: 78, obs: "Manutenção preventiva" },
  { data: "08/09/2026 10:35", tipo: "SAÍDA", codigo: "MAT-005", descricao: "Luva isolante classe 2", qtd: 4, anterior: 22, novo: 18, obs: "Equipe de manutenção" },
  { data: "07/09/2026 16:50", tipo: "ENTRADA", codigo: "MAT-002", descricao: "Isolador de porcelana", qtd: 20, anterior: 32, novo: 52, obs: "Recebimento de material" }
];

let movementType = "entrada";

const money = value => Number(value).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function statusOf(material) {
  if (material.atual === 0) return "zerado";
  if (material.atual <= material.ideal) return "baixo";
  return "normal";
}

function statusLabel(status) {
  return {
    normal: "Normal",
    baixo: "Abaixo do ideal",
    zerado: "Zerado"
  }[status];
}

function navigate(page) {
  document.querySelectorAll(".page").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));

  document.getElementById(page).classList.add("active");
  document.querySelector(`[data-page="${page}"]`)?.classList.add("active");

  const titles = {
    dashboard: "Dashboard",
    catalogo: "Catálogo e Inventário",
    movimentacao: "Lançar Movimentação",
    historico: "Histórico"
  };

  document.getElementById("page-title").textContent = titles[page];

  if (page === "catalogo") renderInventory();
  if (page === "historico") renderHistory();
  if (page === "movimentacao") updateMovementPreview();
}

document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => navigate(button.dataset.page));
});

function renderDashboard() {
  const baixo = materials.filter(m => m.atual > 0 && m.atual <= m.ideal);
  const zerados = materials.filter(m => m.atual === 0);
  const total = materials.reduce((sum, m) => sum + m.atual * m.preco, 0);

  document.getElementById("card-materiais").textContent = materials.length;
  document.getElementById("card-baixo").textContent = baixo.length;
  document.getElementById("card-zerados").textContent = zerados.length;
  document.getElementById("card-valor").textContent = money(total);

  const critical = [...materials]
    .filter(m => m.atual <= m.ideal)
    .sort((a, b) => a.atual - b.atual)
    .slice(0, 6);

  document.getElementById("critical-list").innerHTML = critical.length
    ? critical.map(m => `
      <div class="critical-item">
        <div class="item-main">
          <div>
            <strong>${m.codigo} — ${m.descricao}</strong>
            <small>Atual: ${m.atual} | Ideal: ${m.ideal}</small>
          </div>
          <span class="status ${statusOf(m)}">${statusLabel(statusOf(m))}</span>
        </div>
      </div>
    `).join("")
    : `<div class="empty">Nenhum material crítico.</div>`;

  document.getElementById("recent-list").innerHTML = history.length
    ? history.slice(0, 6).map(h => `
      <div class="recent-item">
        <div class="item-main">
          <div>
            <strong>${h.tipo} — ${h.codigo}</strong>
            <small>${h.descricao} · ${h.data}</small>
          </div>
          <span class="status ${h.tipo === "ENTRADA" ? "normal" : "baixo"}">
            ${h.tipo === "ENTRADA" ? "+" : "-"}${h.qtd}
          </span>
        </div>
      </div>
    `).join("")
    : `<div class="empty">Nenhuma movimentação registrada.</div>`;
}

function renderInventory() {
  const search = document.getElementById("search-input").value.toLowerCase().trim();
  const filter = document.getElementById("status-filter").value;

  const filtered = materials.filter(m => {
    const matchesText = `${m.codigo} ${m.descricao}`.toLowerCase().includes(search);
    const matchesStatus = filter === "todos" || statusOf(m) === filter;
    return matchesText && matchesStatus;
  });

  document.getElementById("inventory-table").innerHTML = filtered.length
    ? filtered.map(m => {
      const total = m.atual * m.preco;
      const status = statusOf(m);
      return `
        <tr>
          <td><strong>${m.codigo}</strong></td>
          <td>${m.descricao}</td>
          <td>${m.ideal}</td>
          <td><strong>${m.atual}</strong></td>
          <td>${money(m.preco)}</td>
          <td>${money(total)}</td>
          <td><span class="status ${status}">${statusLabel(status)}</span></td>
        </tr>
      `;
    }).join("")
    : `<tr><td colspan="7" class="empty">Nenhum material encontrado.</td></tr>`;
}

function populateMaterialSelect() {
  const select = document.getElementById("material-select");
  select.innerHTML = materials.map(m =>
    `<option value="${m.codigo}">${m.codigo} — ${m.descricao}</option>`
  ).join("");
}

function updateMovementPreview() {
  const code = document.getElementById("material-select").value;
  const material = materials.find(m => m.codigo === code);
  const quantity = Number(document.getElementById("quantity").value) || 0;

  if (!material) return;

  const novoSaldo = movementType === "entrada"
    ? material.atual + quantity
    : material.atual - quantity;

  const valido = movementType === "entrada" || novoSaldo >= 0;

  document.getElementById("movement-preview").innerHTML = `
    <strong>${material.descricao}</strong><br>
    Saldo atual: <strong>${material.atual}</strong> ·
    Após movimentação: <strong>${valido ? novoSaldo : "saldo insuficiente"}</strong>
  `;
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    movementType = tab.dataset.type;
    updateMovementPreview();
  });
});

document.getElementById("material-select").addEventListener("change", updateMovementPreview);
document.getElementById("quantity").addEventListener("input", updateMovementPreview);

document.getElementById("movement-form").addEventListener("submit", event => {
  event.preventDefault();

  const code = document.getElementById("material-select").value;
  const quantity = Number(document.getElementById("quantity").value);
  const observation = document.getElementById("observation").value.trim();
  const material = materials.find(m => m.codigo === code);

  if (!material || !quantity || quantity <= 0) {
    showToast("Informe uma quantidade válida.");
    return;
  }

  if (movementType === "saida" && quantity > material.atual) {
    showToast("Quantidade indisponível no estoque.");
    return;
  }

  const anterior = material.atual;
  material.atual += movementType === "entrada" ? quantity : -quantity;

  history.unshift({
    data: new Date().toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }),
    tipo: movementType === "entrada" ? "ENTRADA" : "SAÍDA",
    codigo: material.codigo,
    descricao: material.descricao,
    qtd: quantity,
    anterior,
    novo: material.atual,
    obs: observation || "Sem observação"
  });

  event.target.reset();
  populateMaterialSelect();
  updateMovementPreview();
  renderDashboard();

  showToast(`${movementType === "entrada" ? "Entrada" : "Saída"} registrada com sucesso!`);
});

function renderHistory() {
  const search = document.getElementById("history-search").value.toLowerCase().trim();

  const filtered = history.filter(h =>
    `${h.tipo} ${h.codigo} ${h.descricao} ${h.obs}`.toLowerCase().includes(search)
  );

  document.getElementById("history-table").innerHTML = filtered.length
    ? filtered.map(h => `
      <tr>
        <td>${h.data}</td>
        <td><span class="status ${h.tipo === "ENTRADA" ? "normal" : "baixo"}">${h.tipo}</span></td>
        <td><strong>${h.codigo}</strong></td>
        <td>${h.descricao}</td>
        <td>${h.qtd}</td>
        <td>${h.anterior}</td>
        <td><strong>${h.novo}</strong></td>
        <td>${h.obs}</td>
      </tr>
    `).join("")
    : `<tr><td colspan="8" class="empty">Nenhuma movimentação encontrada.</td></tr>`;
}

document.getElementById("search-input").addEventListener("input", renderInventory);
document.getElementById("status-filter").addEventListener("change", renderInventory);
document.getElementById("history-search").addEventListener("input", renderHistory);

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

populateMaterialSelect();
renderDashboard();
renderInventory();
updateMovementPreview();
