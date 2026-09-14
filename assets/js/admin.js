/**
 * ============================================================================
 * AX BARBEARIA - UNIDADE PENHA
 * SCRIPT ADMINISTRATIVO DO BARBEIRO (MODULAR & SEPARADO)
 * ============================================================================
 * 
 * Funcionalidades:
 * 1. Autenticação e Segurança (Login e Logout de Sessão)
 * 2. Controle de Agenda e Grade de Horários por Data
 * 3. Bloqueio e Desbloqueio Manual de Horários
 * 4. Listagem, Cancelamento, Reativação e Exclusão de Agendamentos
 * 5. Cálculo Automático de Métricas em Tempo Real
 * 
 * Credenciais do Barbeiro:
 * - Usuário: Juedil1808
 * - Senha: Palmeiras2022**
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // CONFIGURAÇÃO E CONSTANTES
  // ==========================================================================
  const AUTH_CONFIG = {
    USER: 'Juedil1808',
    PASS: 'Palmeiras2022**',
    SESSION_KEY: 'ax_admin_session_auth'
  };

  // Grade oficial de 10 horários da Ax Barbearia
  const ALL_SLOTS = [
    '09:00', '10:00', '11:00', '13:30', '14:30', 
    '15:30', '16:30', '17:30', '18:30', '19:30'
  ];

  // Elementos de Login e Autenticação
  const authOverlay = document.getElementById('authOverlay');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminUser = document.getElementById('adminUser');
  const adminPass = document.getElementById('adminPass');
  const loginError = document.getElementById('loginError');
  const btnLogout = document.getElementById('btnLogout');

  // Elementos de Painel e Filtros
  const adminDateSelector = document.getElementById('adminDateSelector');
  const btnDateToday = document.getElementById('btnDateToday');
  const adminSlotsContainer = document.getElementById('adminSlotsContainer');
  const appointmentsList = document.getElementById('appointmentsList');
  const filterAppointments = document.getElementById('filterAppointments');

  // Contadores de Métricas
  const metricTodayCount = document.getElementById('metricTodayCount');
  const metricTotalCount = document.getElementById('metricTotalCount');
  const metricBlockedCount = document.getElementById('metricBlockedCount');
  const metricFreeCount = document.getElementById('metricFreeCount');

  // Componente de Notificação Toast
  const adminToast = document.getElementById('adminToast');
  const adminToastMsg = document.getElementById('adminToastMsg');

  /**
   * Exibe notificação temporária no canto inferior da tela
   */
  function showToast(msg) {
    if (adminToast && adminToastMsg) {
      adminToastMsg.textContent = msg;
      adminToast.classList.add('show');
      setTimeout(() => {
        adminToast.classList.remove('show');
      }, 3200);
    }
  }

  // ==========================================================================
  // 1. SISTEMA DE AUTENTICAÇÃO E SESSÃO
  // ==========================================================================

  /**
   * Valida se a sessão do administrador está ativa
   */
  function checkAuth() {
    const isAuth = sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY) === 'true';
    if (isAuth) {
      if (authOverlay) authOverlay.classList.add('hidden');
      initDashboard();
    } else {
      if (authOverlay) authOverlay.classList.remove('hidden');
    }
  }

  // Formulário de Login
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = adminUser ? adminUser.value.trim() : '';
      const pass = adminPass ? adminPass.value.trim() : '';

      // Validação das credenciais do cabeleireiro
      if (user === AUTH_CONFIG.USER && pass === AUTH_CONFIG.PASS) {
        sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, 'true');
        if (loginError) loginError.style.display = 'none';
        if (authOverlay) authOverlay.classList.add('hidden');
        initDashboard();
        showToast('Bem-vindo, Barbeiro! Painel de gestão liberado.');
      } else {
        if (loginError) loginError.style.display = 'block';
        if (adminPass) {
          adminPass.value = '';
          adminPass.focus();
        }
      }
    });
  }

  // Ação de Logout
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      if (confirm('Deseja realmente sair do painel do barbeiro?')) {
        sessionStorage.removeItem(AUTH_CONFIG.SESSION_KEY);
        if (authOverlay) authOverlay.classList.remove('hidden');
        if (adminPass) adminPass.value = '';
        showToast('Você saiu do painel com segurança.');
      }
    });
  }

  // ==========================================================================
  // 2. FUNÇÕES AUXILIARES DE STORAGE E DATAS
  // ==========================================================================

  /**
   * Obtém a lista de agendamentos armazenados
   */
  function getStoredAppointments() {
    try {
      const data = localStorage.getItem('ax_appointments');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Erro ao ler agendamentos:', e);
      return [];
    }
  }

  /**
   * Salva a lista de agendamentos
   */
  function saveAppointments(list) {
    localStorage.setItem('ax_appointments', JSON.stringify(list));
  }

  /**
   * Obtém a lista de horários bloqueados manualmente
   */
  function getStoredBlockedSlots() {
    try {
      const data = localStorage.getItem('ax_blocked_slots');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Erro ao ler horários bloqueados:', e);
      return [];
    }
  }

  /**
   * Salva a lista de horários bloqueados manualmente
   */
  function saveBlockedSlots(list) {
    localStorage.setItem('ax_blocked_slots', JSON.stringify(list));
  }

  /**
   * Retorna a data atual no formato AAAA-MM-DD
   */
  function getTodayString() {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Formata data AAAA-MM-DD para DD/MM/AAAA
   */
  function formatDateBR(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  }

  // ==========================================================================
  // 3. RENDERIZAÇÃO DO PAINEL
  // ==========================================================================

  /**
   * Inicializa o dashboard com a data atual
   */
  function initDashboard() {
    const today = getTodayString();
    if (adminDateSelector && !adminDateSelector.value) {
      adminDateSelector.value = today;
    }
    renderAll();
  }

  /**
   * Renderiza todos os componentes do dashboard
   */
  function renderAll() {
    renderMetrics();
    renderSlotsGrid();
    renderAppointmentsList();
  }

  /**
   * Atualiza os números nos cartões de métricas do topo
   */
  function renderMetrics() {
    const today = getTodayString();
    const appointments = getStoredAppointments();
    const blocked = getStoredBlockedSlots();
    const selectedDate = (adminDateSelector && adminDateSelector.value) ? adminDateSelector.value : today;

    const activeAppointments = appointments.filter(a => a.status !== 'cancelled');
    const todayAppointments = activeAppointments.filter(a => a.date === today);

    if (metricTodayCount) metricTodayCount.textContent = todayAppointments.length;
    if (metricTotalCount) metricTotalCount.textContent = activeAppointments.length;
    if (metricBlockedCount) metricBlockedCount.textContent = blocked.length;

    // Calcula horários disponíveis na data selecionada
    let occupiedCount = 0;
    ALL_SLOTS.forEach(time => {
      const isBooked = appointments.some(a => a.date === selectedDate && a.time === time && a.status !== 'cancelled');
      const isBlocked = blocked.some(b => b.date === selectedDate && b.time === time);
      if (isBooked || isBlocked) occupiedCount++;
    });

    if (metricFreeCount) {
      metricFreeCount.textContent = Math.max(0, ALL_SLOTS.length - occupiedCount);
    }
  }

  /**
   * Renderiza os 10 horários do dia com status e botões de ação
   */
  function renderSlotsGrid() {
    if (!adminSlotsContainer) return;

    const selectedDate = (adminDateSelector && adminDateSelector.value) ? adminDateSelector.value : getTodayString();
    const appointments = getStoredAppointments();
    const blocked = getStoredBlockedSlots();

    adminSlotsContainer.innerHTML = '';

    ALL_SLOTS.forEach(time => {
      const bookedApp = appointments.find(a => a.date === selectedDate && a.time === time && a.status !== 'cancelled');
      const isBlocked = blocked.some(b => b.date === selectedDate && b.time === time);

      const slotCard = document.createElement('div');
      slotCard.className = 'admin-slot-item';

      if (bookedApp) {
        slotCard.classList.add('is-booked');
        slotCard.innerHTML = `
          <div class="slot-item-top">
            <span class="slot-time-label">${time}</span>
            <span class="slot-badge-status badge-booked">Agendado</span>
          </div>
          <div class="slot-client-info" title="${bookedApp.clientName} (${bookedApp.service})">
            <i class="fa-regular fa-user"></i> ${bookedApp.clientName}
          </div>
          <button class="slot-action-btn btn-block-slot" onclick="window.cancelAppointment('${bookedApp.id}')">
            <i class="fa-solid fa-ban"></i> Desmarcar Cliente
          </button>
        `;
      } else if (isBlocked) {
        slotCard.classList.add('is-blocked');
        slotCard.innerHTML = `
          <div class="slot-item-top">
            <span class="slot-time-label">${time}</span>
            <span class="slot-badge-status badge-blocked">Bloqueado</span>
          </div>
          <div class="slot-client-info">
            <i class="fa-solid fa-lock"></i> Bloqueio Manual
          </div>
          <button class="slot-action-btn btn-unblock-slot" onclick="window.unblockSlot('${selectedDate}', '${time}')">
            <i class="fa-solid fa-lock-open"></i> Liberar Horário
          </button>
        `;
      } else {
        slotCard.classList.add('is-free');
        slotCard.innerHTML = `
          <div class="slot-item-top">
            <span class="slot-time-label">${time}</span>
            <span class="slot-badge-status badge-free">Disponível</span>
          </div>
          <div class="slot-client-info">
            <i class="fa-regular fa-circle-check"></i> Livre para clientes
          </div>
          <button class="slot-action-btn btn-block-slot" onclick="window.blockSlot('${selectedDate}', '${time}')">
            <i class="fa-solid fa-lock"></i> Bloquear Horário
          </button>
        `;
      }

      adminSlotsContainer.appendChild(slotCard);
    });
  }

  /**
   * Renderiza a lista de agendamentos conforme o filtro escolhido
   */
  function renderAppointmentsList() {
    if (!appointmentsList) return;

    const appointments = getStoredAppointments();
    const selectedDate = (adminDateSelector && adminDateSelector.value) ? adminDateSelector.value : getTodayString();
    const filterMode = filterAppointments ? filterAppointments.value : 'all';

    let filtered = [...appointments].reverse(); // Mais recentes no topo

    if (filterMode === 'selectedDate') {
      filtered = filtered.filter(a => a.date === selectedDate);
    } else if (filterMode === 'active') {
      filtered = filtered.filter(a => a.status !== 'cancelled');
    } else if (filterMode === 'cancelled') {
      filtered = filtered.filter(a => a.status === 'cancelled');
    }

    appointmentsList.innerHTML = '';

    if (filtered.length === 0) {
      appointmentsList.innerHTML = `
        <div class="empty-state">
          <i class="fa-regular fa-calendar-xmark"></i>
          <p>Nenhum agendamento encontrado para este filtro.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(app => {
      const isCancelled = app.status === 'cancelled';
      const card = document.createElement('div');
      card.className = `appointment-card ${isCancelled ? 'status-cancelled' : ''}`;

      card.innerHTML = `
        <div class="app-main-info">
          <h4>
            ${app.clientName}
            ${isCancelled ? '<span class="slot-badge-status badge-blocked">Cancelado</span>' : '<span class="slot-badge-status badge-free">Confirmado</span>'}
          </h4>
          <p><i class="fa-solid fa-scissors"></i> ${app.service} ${app.price ? '(' + app.price + ')' : ''}</p>
          <div class="app-meta">
            <span><i class="fa-regular fa-calendar"></i> ${formatDateBR(app.date)}</span>
            <span><i class="fa-regular fa-clock"></i> ${app.time}</span>
            ${app.notes ? `<span><i class="fa-regular fa-comment"></i> ${app.notes}</span>` : ''}
          </div>
        </div>
        <div class="app-actions">
          ${!isCancelled ? `
            <button class="btn-cancel-app" onclick="window.cancelAppointment('${app.id}')" title="Cancelar este agendamento e liberar o horário">
              <i class="fa-solid fa-xmark"></i> Cancelar
            </button>
          ` : `
            <button class="btn-restore-app" onclick="window.restoreAppointment('${app.id}')" title="Restaurar este agendamento">
              <i class="fa-solid fa-rotate-left"></i> Reativar
            </button>
          `}
          <button class="btn-cancel-app" style="border-color: rgba(255,255,255,0.2); color: #fff;" onclick="window.deleteAppointmentPermanently('${app.id}')" title="Excluir permanentemente">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      `;

      appointmentsList.appendChild(card);
    });
  }

  // ==========================================================================
  // 4. AÇÕES GLOBAIS DE GESTÃO (DISPONÍVEIS VIA WINDOW)
  // ==========================================================================

  /**
   * Bloqueia um horário manualmente
   */
  window.blockSlot = function(dateStr, timeStr) {
    const blocked = getStoredBlockedSlots();
    if (!blocked.some(b => b.date === dateStr && b.time === timeStr)) {
      blocked.push({
        date: dateStr,
        time: timeStr,
        blockedAt: new Date().toISOString()
      });
      saveBlockedSlots(blocked);
      showToast(`Horário ${timeStr} bloqueado com sucesso!`);
      renderAll();
    }
  };

  /**
   * Libera um horário bloqueado
   */
  window.unblockSlot = function(dateStr, timeStr) {
    let blocked = getStoredBlockedSlots();
    blocked = blocked.filter(b => !(b.date === dateStr && b.time === timeStr));
    saveBlockedSlots(blocked);
    showToast(`Horário ${timeStr} liberado para agendamentos!`);
    renderAll();
  };

  /**
   * Cancela um agendamento existente
   */
  window.cancelAppointment = function(appId) {
    if (!confirm('Tem certeza que deseja cancelar este agendamento? O horário ficará livre.')) return;
    const appointments = getStoredAppointments();
    const target = appointments.find(a => a.id === appId);
    if (target) {
      target.status = 'cancelled';
      saveAppointments(appointments);
      showToast('Agendamento cancelado com sucesso!');
      renderAll();
    }
  };

  /**
   * Reativa um agendamento previamente cancelado
   */
  window.restoreAppointment = function(appId) {
    const appointments = getStoredAppointments();
    const target = appointments.find(a => a.id === appId);
    if (target) {
      // Impede conflito se outro agendamento ocupou a vaga
      const isConflict = appointments.some(a => 
        a.id !== appId && a.date === target.date && a.time === target.time && a.status !== 'cancelled'
      );
      if (isConflict) {
        alert('Não é possível reativar: já existe outro agendamento ativo para este mesmo horário!');
        return;
      }
      target.status = 'confirmed';
      saveAppointments(appointments);
      showToast('Agendamento reativado com sucesso!');
      renderAll();
    }
  };

  /**
   * Exclui o registro de agendamento definitivamente
   */
  window.deleteAppointmentPermanently = function(appId) {
    if (!confirm('Deseja excluir este registro permanentemente? Esta ação não pode ser desfeita.')) return;
    let appointments = getStoredAppointments();
    appointments = appointments.filter(a => a.id !== appId);
    saveAppointments(appointments);
    showToast('Registro excluído com sucesso.');
    renderAll();
  };

  // ==========================================================================
  // 5. EVENT LISTENERS
  // ==========================================================================

  if (adminDateSelector) {
    adminDateSelector.addEventListener('change', renderAll);
  }

  if (btnDateToday) {
    btnDateToday.addEventListener('click', () => {
      if (adminDateSelector) adminDateSelector.value = getTodayString();
      renderAll();
    });
  }

  if (filterAppointments) {
    filterAppointments.addEventListener('change', renderAppointmentsList);
  }

  // Sincroniza em tempo real caso outra aba faça alterações
  window.addEventListener('storage', (e) => {
    if (e.key === 'ax_appointments' || e.key === 'ax_blocked_slots') {
      renderAll();
    }
  });

  // Executa checagem inicial de login
  checkAuth();

});
