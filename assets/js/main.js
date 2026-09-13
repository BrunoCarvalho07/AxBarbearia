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
  // 5. SISTEMA DE AGENDAMENTO INTERATIVO & INTEGRAÇÃO WHATSAPP
  // ==========================================================================
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('bookService');
  const dateInput = document.getElementById('bookDate');
  const slotButtons = document.querySelectorAll('.slot-btn');
  const clientName = document.getElementById('clientName');
  const clientNotes = document.getElementById('clientNotes');

  // Elementos do resumo dinâmico
  const sumService = document.getElementById('sumService');
  const sumPrice = document.getElementById('sumPrice');
  const sumDate = document.getElementById('sumDate');
  const sumTime = document.getElementById('sumTime');

  let selectedTime = '09:00';

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

  // Inicializa o campo de data com a data atual e bloqueia datas anteriores
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    if (sumDate) sumDate.textContent = formatDateBR(today);

    dateInput.addEventListener('change', (e) => {
      if (sumDate) sumDate.textContent = formatDateBR(e.target.value);
    });
  }

  // Seleção de horários disponíveis
  slotButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      slotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTime = btn.dataset.time || btn.textContent.trim();
      if (sumTime) sumTime.textContent = selectedTime;
    });
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
   * Envio do Formulário -> Formata mensagem e redireciona ao WhatsApp
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

      const serviceOption = serviceSelect.options[serviceSelect.selectedIndex];
      const serviceName = serviceOption ? serviceOption.text : 'Não informado';
      const dateVal = sumDate ? sumDate.textContent : 'Hoje';
      const timeVal = sumTime ? sumTime.textContent : selectedTime;
      const notesVal = clientNotes ? clientNotes.value.trim() : '';

      // Montagem da mensagem estruturada para o barbeiro
      let message = `💈 *NOVO AGENDAMENTO - AX BARBEARIA*\n`;
      message += `📍 *Unidade Penha (Metrô Guilhermina)*\n\n`;
      message += `👤 *Cliente:* ${nameVal}\n`;
      message += `✂️ *Serviço:* ${serviceName}\n`;
      message += `📅 *Data:* ${dateVal}\n`;
      message += `⏰ *Horário:* ${timeVal}\n`;
      if (notesVal) {
        message += `📝 *Observação:* ${notesVal}\n`;
      }
      message += `\n_Olá! Gostaria de confirmar meu agendamento na Ax Barbearia._`;

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
