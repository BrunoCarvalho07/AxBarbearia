/**
 * ============================================================================
 * AX BARBEARIA - UNIDADE PENHA
 * SCRIPT PRINCIPAL JAVASCRIPT (MODULAR & COMENTADO)
 * ============================================================================
 * 
 * Funcionalidades:
 * 1. Preloader de carregamento suave
 * 2. Efeito de scroll no cabeçalho e barra de progresso dourada
 * 3. Menu Hambúrguer (Abertura, Fechamento por botão, atalho e tecla ESC)
 * 4. Revelação suave ao rolar a página (Scroll-Triggered via IntersectionObserver)
 * 5. Sistema de Agendamento Interativo com geração de mensagem no WhatsApp
 * 6. Rolagem suave para âncoras internas
 * 
 * Configuração:
 * - Telefone oficial de agendamento: 5511948568716
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // CONFIGURAÇÃO GERAL
  // ==========================================================================
  const CONFIG = {
    // Número oficial do WhatsApp da Ax Barbearia (formato: DDI + DDD + Número)
    WHATSAPP_PHONE: '5511948568716',
    
    // Offset do cabeçalho para ajuste fino na rolagem suave
    HEADER_OFFSET: 80,

    // Tempo de transição do preloader (em milissegundos)
    PRELOADER_DELAY: 450
  };

  // ==========================================================================
  // 1. TELA DE PRÉ-CARREGAMENTO (PRELOADER)
  // ==========================================================================
  const preloader = document.getElementById('preloader');

  /**
   * Finaliza o preloader com transição de opacidade
   */
  function hidePreloader() {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
    }
  }

  // Desativa o preloader assim que todos os assets da janela forem carregados
  window.addEventListener('load', () => {
    setTimeout(hidePreloader, CONFIG.PRELOADER_DELAY);
  });

  // Fallback de segurança: caso algum asset externo demore, fecha o preloader em 2.5s
  setTimeout(hidePreloader, 2500);

  // ==========================================================================
  // 1.1 ALTERNÂNCIA DE TEMA (MODO ESCURO / MODO CLARO)
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  /**
   * Atualiza o ícone conforme o tema ativo
   */
  function updateThemeIcon(isLight) {
    if (themeIcon) {
      if (isLight) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  }

  // Verifica preferência salva no LocalStorage ou preferência do sistema operacional
  const savedTheme = localStorage.getItem('ax_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('ax_theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
    });
  }

  // ==========================================================================
  // 2. SCROLL HEADER & BARRA DE PROGRESSO DOURADA
  // ==========================================================================
  const header = document.getElementById('mainHeader') || document.querySelector('.header');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Adiciona efeito glassmorphism e sombra quando a página é rolada
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Calcula a porcentagem percorrida e preenche a barra dourada no topo
    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = (scrollY / docHeight) * 100;
        scrollProgressBar.style.width = `${progress}%`;
      }
    }
  }, { passive: true });

  // ==========================================================================
  // 3. MENU MOBILE HAMBÚRGUER (ABRIR, FECHAR & VOLTAR)
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavBack = document.getElementById('mobileNavBack');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link, .mobile-nav .btn');

  /**
   * Abre a gaveta do menu mobile
   */
  function openMobileMenu() {
    if (menuToggle) menuToggle.classList.add('active');
    if (mobileNav) mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
  }

  /**
   * Fecha a gaveta do menu mobile
   */
  function closeMobileMenu() {
    if (menuToggle) menuToggle.classList.remove('active');
    if (mobileNav) mobileNav.classList.remove('open');
    document.body.style.overflow = ''; // Restaura o scroll
  }

  if (menuToggle && mobileNav) {
    // Alterna abrir/fechar pelo botão de hambúrguer
    menuToggle.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Botão de fechar (X)
    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', closeMobileMenu);
    }

    // Botão explícito de voltar ao site
    if (mobileNavBack) {
      mobileNavBack.addEventListener('click', closeMobileMenu);
    }

    // Fecha ao clicar em qualquer item do menu
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Fecha caso o usuário aperte a tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // ==========================================================================
  // 4. ANIMAÇÕES DE ROLAGEM SUAVES (ESTILO FRAMER VIA INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Anima uma única vez para performance ideal
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores muito antigos
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // ==========================================================================
  // 5. SISTEMA DE AGENDAMENTO INTERATIVO & INTEGRAÇÃO WHATSAPP
  // ==========================================================================
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('bookService');
  const dateInput = document.getElementById('bookDate');
  const clientSlotsContainer = document.getElementById('clientSlotsContainer');
  const scheduleDayNote = document.getElementById('scheduleDayNote');
  const clientName = document.getElementById('clientName');
  const clientNotes = document.getElementById('clientNotes');

  // Elementos do resumo dinâmico
  const sumService = document.getElementById('sumService');
  const sumPrice = document.getElementById('sumPrice');
  const sumDate = document.getElementById('sumDate');
  const sumTime = document.getElementById('sumTime');

  let selectedTime = '';

  /**
   * Horários oficiais de funcionamento da Ax Barbearia:
   * - Quarta a Sexta: 10:30 às 20:30
   * - Sábado: 09:00 às 17:00
   * - Domingo a Terça: Fechado
   */
  const SCHEDULE_CONFIG = {
    // Quarta (3), Quinta (4), Sexta (5)
    WEEKDAY_SLOTS: [
      '10:30', '11:30', '12:30', '13:30', '14:30',
      '15:30', '16:30', '17:30', '18:30', '19:30', '20:30'
    ],
    // Sábado (6)
    SATURDAY_SLOTS: [
      '09:00', '10:00', '11:00', '12:00', '13:00',
      '14:00', '15:00', '16:00', '17:00'
    ]
  };

  /**
   * Retorna o dia da semana a partir de 'YYYY-MM-DD' em horário local (evita bug de timezone UTC)
   */
  function getDayOfWeek(dateStr) {
    if (!dateStr) return -1;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      return d.getDay(); // 0 = Domingo, 1 = Segunda, 2 = Terça, 3 = Quarta, 4 = Quinta, 5 = Sexta, 6 = Sábado
    }
    return -1;
  }

  /**
   * Retorna a lista oficial de horários para a data selecionada
   */
  function getSlotsForDate(dateStr) {
    const day = getDayOfWeek(dateStr);
    if (day >= 3 && day <= 5) {
      return { isOpen: true, dayName: 'Quarta a Sexta (10:30 às 20:30)', slots: SCHEDULE_CONFIG.WEEKDAY_SLOTS };
    }
    if (day === 6) {
      return { isOpen: true, dayName: 'Sábado (09:00 às 17:00)', slots: SCHEDULE_CONFIG.SATURDAY_SLOTS };
    }
    return { isOpen: false, dayName: 'Fechado (Domingo a Terça)', slots: [] };
  }

  /**
   * Converte formato de data aaaa-mm-dd para dd/mm/aaaa
   */
  function formatDateBR(dateStr) {
    if (!dateStr) return 'Hoje';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  }

  // ==========================================================================
  // GESTÃO DE HORÁRIOS OCUPADOS / BLOQUEADOS (PERSISTÊNCIA LOCALSTORAGE)
  // ==========================================================================
  
  /**
   * Retorna os agendamentos salvos no localStorage
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
   * Retorna os horários bloqueados manualmente pelo barbeiro
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
   * Verifica se determinado horário já está ocupado por cliente ou bloqueado na data informada
   */
  function isSlotUnavailable(dateStr, timeStr) {
    const appointments = getStoredAppointments();
    const isBooked = appointments.some(app => 
      app.date === dateStr && app.time === timeStr && app.status !== 'cancelled'
    );
    if (isBooked) return { unavailable: true, reason: 'booked' };

    const blocked = getStoredBlockedSlots();
    const isBlocked = blocked.some(b => b.date === dateStr && b.time === timeStr);
    if (isBlocked) return { unavailable: true, reason: 'blocked' };

    return { unavailable: false };
  }

  /**
   * Atualiza a disponibilidade visual dos botões de horário com base na data selecionada
   */
  function refreshSlotAvailability() {
    const currentDateVal = dateInput ? dateInput.value : '';
    if (!currentDateVal || !clientSlotsContainer) return;

    const scheduleInfo = getSlotsForDate(currentDateVal);

    if (scheduleDayNote) {
      scheduleDayNote.textContent = scheduleInfo.dayName;
    }

    // Se a barbearia estiver fechada neste dia (domingo, segunda ou terça)
    if (!scheduleInfo.isOpen) {
      clientSlotsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 18px; text-align: center; background: rgba(239, 68, 68, 0.08); border: 1px dashed rgba(239, 68, 68, 0.35); border-radius: 12px; color: #fca5a5; font-size: 0.88rem;">
          <i class="fa-regular fa-calendar-xmark" style="font-size: 1.3rem; margin-bottom: 6px; display: block;"></i>
          <strong>Barbearia fechada nesta data.</strong><br>
          Atendimento de <strong>Quarta a Sexta (10h30 às 20h30)</strong> e <strong>Sábado (9h às 17h)</strong>.
        </div>
      `;
      selectedTime = '';
      if (sumTime) sumTime.textContent = 'Fechado';
      return;
    }

    // Renderiza dinamicamente os horários específicos daquele dia da semana
    clientSlotsContainer.innerHTML = '';
    let hasSelectedValidSlot = false;

    scheduleInfo.slots.forEach(slotTime => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'slot-btn';
      btn.dataset.time = slotTime;
      btn.textContent = slotTime;

      const status = isSlotUnavailable(currentDateVal, slotTime);

      if (status.unavailable) {
        btn.classList.add('booked');
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
        btn.title = status.reason === 'booked' ? 'Horário já reservado por outro cliente' : 'Horário bloqueado pelo barbeiro';
      } else {
        btn.disabled = false;
        btn.removeAttribute('aria-disabled');
        btn.title = 'Horário disponível para agendamento';

        // Mantém seleção anterior se ainda for válida
        if (slotTime === selectedTime) {
          btn.classList.add('active');
          hasSelectedValidSlot = true;
        }

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          if (btn.disabled || btn.classList.contains('booked')) {
            alert('Este horário já está ocupado ou bloqueado. Por favor, escolha outro.');
            return;
          }
          const allBtns = clientSlotsContainer.querySelectorAll('.slot-btn');
          allBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedTime = slotTime;
          if (sumTime) sumTime.textContent = selectedTime;
        });
      }

      clientSlotsContainer.appendChild(btn);
    });

    // Se o horário anteriormente selecionado ficou indisponível ou não existe nesta grade, seleciona o primeiro livre
    if (!hasSelectedValidSlot) {
      const firstAvailable = clientSlotsContainer.querySelector('.slot-btn:not(:disabled)');
      if (firstAvailable) {
        firstAvailable.classList.add('active');
        selectedTime = firstAvailable.dataset.time;
        if (sumTime) sumTime.textContent = selectedTime;
      } else {
        selectedTime = '';
        if (sumTime) sumTime.textContent = 'Sem horários livres';
      }
    }
  }

  // Inicializa o campo de data com a data atual e bloqueia datas anteriores
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    if (sumDate) sumDate.textContent = formatDateBR(today);

    refreshSlotAvailability();

    dateInput.addEventListener('change', (e) => {
      const val = e.target.value;
      if (sumDate) sumDate.textContent = formatDateBR(val);
      refreshSlotAvailability();
    });
  }

  // Ouve evento disparado caso a página do admin ou outra aba altere agendamentos
  window.addEventListener('storage', (e) => {
    if (e.key === 'ax_appointments' || e.key === 'ax_blocked_slots') {
      refreshSlotAvailability();
    }
  });

  // Atualização em tempo real quando troca o serviço no select
  if (serviceSelect) {
    serviceSelect.addEventListener('change', () => {
      const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
      const price = selectedOption.dataset.price || 'R$ --';
      if (sumService) sumService.textContent = selectedOption.text.split('(')[0].trim();
      if (sumPrice) sumPrice.textContent = price;
    });
  }

  /**
   * Função global chamada ao clicar em qualquer item da tabela de preços
   * Rola a página até o formulário e pré-seleciona o serviço
   */
  window.selectServiceForBooking = function(serviceVal) {
    if (!serviceSelect) return;
    
    serviceSelect.value = serviceVal;
    serviceSelect.dispatchEvent(new Event('change'));

    const bookingSection = document.getElementById('agendamento');
    if (bookingSection) {
      const elementPosition = bookingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - CONFIG.HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  /**
   * Envio do Formulário -> Salva agendamento, bloqueia o horário e redireciona ao WhatsApp
   */
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = clientName ? clientName.value.trim() : '';
      if (!nameVal) {
        alert('Por favor, informe seu nome completo para continuar.');
        if (clientName) clientName.focus();
        return;
      }

      const currentDateVal = dateInput ? dateInput.value : '';
      if (!selectedTime) {
        alert('Não há horários disponíveis para a data selecionada.');
        return;
      }

      // Validação de concorrência: verifica se o horário foi bloqueado ou reservado
      const statusCheck = isSlotUnavailable(currentDateVal, selectedTime);
      if (statusCheck.unavailable) {
        alert('Desculpe, este horário acabou de ser reservado ou bloqueado! Por favor, escolha outro horário.');
        refreshSlotAvailability();
        return;
      }

      const serviceOption = serviceSelect.options[serviceSelect.selectedIndex];
      const serviceName = serviceOption ? serviceOption.text : 'Não informado';
      const servicePrice = serviceOption ? serviceOption.dataset.price || '' : '';
      const dateDisplay = sumDate ? sumDate.textContent : formatDateBR(currentDateVal);
      const timeVal = selectedTime;
      const notesVal = clientNotes ? clientNotes.value.trim() : '';

      // 1. Salva o agendamento no localStorage para bloquear o horário e alimentar o painel admin
      try {
        const appointments = getStoredAppointments();
        const newAppointment = {
          id: 'AX-' + Date.now(),
          clientName: nameVal,
          service: serviceName,
          price: servicePrice,
          date: currentDateVal,
          dateDisplay: dateDisplay,
          time: timeVal,
          notes: notesVal,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        appointments.push(newAppointment);
        localStorage.setItem('ax_appointments', JSON.stringify(appointments));
      } catch (err) {
        console.error('Erro ao salvar agendamento:', err);
      }

      // 2. Imediatamente atualiza a interface para mostrar o horário como ocupado
      refreshSlotAvailability();

      // 3. Montagem da mensagem estruturada para o barbeiro no WhatsApp
      let message = `💈 *NOVO AGENDAMENTO - AX BARBEARIA*\n`;
      message += `📍 *Unidade Penha (Metrô Guilhermina)*\n\n`;
      message += `👤 *Cliente:* ${nameVal}\n`;
      message += `✂️ *Serviço:* ${serviceName}\n`;
      message += `📅 *Data:* ${dateDisplay}\n`;
      message += `⏰ *Horário:* ${timeVal}\n`;
      if (notesVal) {
        message += `📝 *Observação:* ${notesVal}\n`;
      }
      message += `\n_Olá! Acabei de registrar meu agendamento no site da Ax Barbearia e gostaria de confirmar._`;

      // Codificação segura para URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${CONFIG.WHATSAPP_PHONE}?text=${encodedMessage}`;

      // Abre o WhatsApp oficial em uma nova aba
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // ==========================================================================
  // 6. ROLAGEM SUAVE (SMOOTH SCROLL) PARA LINKS ÂNCORA INTERNOS
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - CONFIG.HEADER_OFFSET;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

});
