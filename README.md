# 💈 Ax Barbearia - Unidade Penha

Website institucional moderno, de alta performance e responsivo para a **Ax Barbearia (Unidade Penha)**, localizada ao lado do **Metrô Guilhermina**, em São Paulo - SP.

O projeto foi construído inspirado no padrão de design e animações do [Framer (Barbershop Template)](https://barbershop.framer.website/), com foco em elegância clássica, visagismo masculino, agendamento inteligente via WhatsApp e otimização total para ranqueamento no **Google (SEO Local)**.

---

## 📸 Identidade Visual & Design System

- **Paleta de Cores**:
  - `Azul Noturno Profundo`: `#050b14` e `#0a111f`
  - `Dourado Nobre / Ouro Metálico`: `#d4af37`, `#f5d77f` e gradientes lineares metálicos
  - `Branco Puro & Off-White`: `#ffffff` e `#f8fafc` para máxima legibilidade
- **Tipografia**:
  - Títulos: **Cinzel** (Google Fonts) — Elegância e tradição
  - Textos & Botões: **Plus Jakarta Sans** (Google Fonts) — Leitura fluida e contemporânea
- **Efeitos de Vidro**: *Glassmorphism* com `backdrop-filter: blur(16px)` no cabeçalho e nos componentes flutuantes.

---

## ✨ Funcionalidades Principais

1. **Agendamento Inteligente com Bloqueio de Horário em Tempo Real**:
   - O cliente escolhe o serviço na tabela ou no formulário.
   - Seleciona o dia no calendário (com bloqueio automático de datas passadas).
   - Horários já reservados por outros clientes ou bloqueados pelo barbeiro ficam automaticamente indisponíveis com tag **"Ocupado"** e risco no texto, impedindo que duas pessoas agendem o mesmo horário na mesma data.
   - Ao confirmar, o agendamento é salvo e o cliente é encaminhado ao WhatsApp oficial da barbearia (`(11) 94856-8716`).

2. **Painel Exclusivo de Gestão do Barbeiro (`admin.html`)**:
   - Página restrita e segura com tela de login por senha para o cabeleireiro:
     - **Usuário**: `Juedil1808`
     - **Senha**: `Palmeiras2022**`
   - **Grade Interativa de Horários**: Permite ao barbeiro ver os 10 horários do dia selecionado e bloquear/desbloquear manualmente qualquer horário com 1 clique (ex: para horário de almoço ou imprevistos).
   - **Lista de Agendamentos**: Visualização completa de todos os agendamentos registrados, com nome do cliente, serviço, data, horário e observações.
   - **Controle Total**: Opção de cancelar agendamento (liberando o horário na hora), reativar ou excluir permanentemente.
   - **Métricas do Dia**: Contadores em tempo real de agendamentos do dia, total geral e horários livres.

3. **Animações Fluidas Estilo Framer**:
   - **Preloader Cinematográfico**: Tela de entrada com o logotipo oficial pulsando em dourado antes do carregamento suave da página.
   - **Scroll Progress Bar**: Barra de progresso dourada no topo acompanhando a rolagem da página.
   - **Scroll-Triggered Reveal**: Elementos surgindo com aceleração cúbica natural (`cubic-bezier(0.22, 1, 0.36, 1)`).
   - **Infinite Marquee**: Letreiro digital infinito com os diferenciais e serviços.
   - **Hover Interactions**: Brilho metálico percorrendo botões dourados e elevação suave dos itens.

4. **Alternância entre Modo Escuro & Modo Claro (Dark/Light Theme)**:
   - Botão circular posicionado estrategicamente ao lado do menu no cabeçalho.
   - Alterna instantaneamente entre o luxuoso visual *Deep Navy* e o sofisticado *Off-White com Dourado*.
   - Salva a preferência do visitante no `localStorage` do navegador para manter o tema nas próximas visitas.

5. **Sinais de Barbeiro Brilhantes & Animados (Double Barber Pole)**:
   - Dois sinais clássicos de barbeiro (um em cada lado do selo de destaque no Hero) com rotação contínua das listras vermelhas, brancas e azuis, extremidades metálicas e aura luminosa pulsante.

6. **Menu Hambúrguer Minimalista & Eficiente**:
   - Totalmente adaptado para dispositivos móveis com botão `X` exclusivo para fechar com agilidade e atalho para o Painel Admin.

7. **Botões Flutuantes Elegantes**:
   - Canto inferior direito fixo:
     - **WhatsApp**: com efeito pulsante e atalho para o agendamento (`(11) 94856-8716`).
     - **Instagram**: com gradiente oficial direcionando para `@axbarbeariastudio`.

8. **SEO Local Completo (Google Search & Google Maps)**:
   - **Schema.org (JSON-LD)** configurado com a categoria `BarberShop`, endereço, coordenadas geográficas, horários, telefone e catálogo de ofertas.
   - **Meta tags geográficas**: Latitude/Longitude exatas e região Penha de França / Zona Leste.
   - **Open Graph completo**: Miniatura do logotipo HD ao compartilhar links no WhatsApp e redes sociais.
   - Arquivos `robots.txt` e `sitemap.xml` inclusos.

---

## 📂 Estrutura de Arquivos

```
axbarbearia/
├── index.html                   # Estrutura HTML5 da página principal
├── admin.html                   # Painel administrativo seguro do barbeiro
├── README.md                    # Documentação completa do projeto
├── robots.txt                   # Instruções de rastreamento para o Google
├── sitemap.xml                  # Mapa do site para o Google Search Console
├── img/                         # Pasta de imagens originais e backups
│   ├── logo.png                 # Logotipo oficial em alta definição
│   ├── logo-hd.png              # Backup em alta resolução
│   └── logo.jpg                 # Imagem original
└── assets/
    ├── css/
    │   ├── style.css            # Estilos gerais do site (Dark/Light theme, animações)
    │   └── admin.css            # Estilos dedicados ao Painel do Barbeiro
    ├── js/
    │   ├── main.js              # Lógica de agendamento, bloqueio de horários e WhatsApp
    │   └── admin.js             # Lógica do painel do barbeiro, login e gestão da agenda
    └── images/
        ├── logo.png             # Logotipo oficial otimizado
        ├── logo-hd.png
        └── logo.jpg
```

---

## 🛠️ Como Personalizar

### 1. Alterar o Telefone do WhatsApp
No arquivo `assets/js/main.js`, localize as primeiras linhas da configuração:
```javascript
const CONFIG = {
  WHATSAPP_PHONE: '5511948568716', // Substitua pelo DDI + DDD + Número desejado
  ...
};
```

### 2. Alterar Preços ou Nomes de Serviços
No arquivo `index.html`, localize a **SEÇÃO 4: SERVIÇOS & TABELA DE PREÇOS**:
```html
<div class="price-item" onclick="selectServiceForBooking('corte')">
  <div class="price-item-info">
    <h3 class="price-item-title">Corte masculino</h3>
    <p class="price-item-desc">Tesoura e máquina, com acabamento na navalha</p>
  </div>
  <div class="price-item-value">
    <span>R$ 45</span>
  </div>
</div>
```

---

## 🚀 Como Executar o Projeto

1. Baixe ou clone os arquivos na sua máquina.
2. Dê um duplo clique no arquivo `index.html` para abrir diretamente no Google Chrome, Microsoft Edge, Safari ou qualquer navegador de sua preferência.
3. Não há necessidade de instalar bibliotecas pesadas ou servidores complexos — o código é nativo (HTML5, CSS3 e JavaScript Moderno), garantindo **carregamento instantâneo**.

---

## 👨‍💻 Desenvolvido Por

Desenvolvido por **Bruno Carvalho**  
- **LinkedIn**: [https://www.linkedin.com/in/bruno-carvalho-silvaa](https://www.linkedin.com/in/bruno-carvalho-silvaa)
