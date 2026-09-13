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

1. **Agendamento Inteligente com Calendário & WhatsApp**:
   - O cliente escolhe o serviço na tabela ou no formulário.
   - Seleciona o dia no calendário (com bloqueio automático de datas passadas).
   - Escolhe o horário disponível com 1 clique.
   - Informa o nome e observações opcionais.
   - O sistema monta uma mensagem estruturada e abre diretamente o WhatsApp oficial da barbearia (`(11) 94856-8716`).

2. **Animações Fluidas Estilo Framer**:
   - **Preloader Cinematográfico**: Tela de entrada com o logotipo oficial pulsando em dourado antes do carregamento suave da página.
   - **Scroll Progress Bar**: Barra de progresso dourada no topo acompanhando a rolagem da página.
   - **Scroll-Triggered Reveal**: Elementos surgindo com aceleração cúbica natural (`cubic-bezier(0.22, 1, 0.36, 1)`).
   - **Infinite Marquee**: Letreiro digital infinito com os diferenciais e serviços.
   - **Hover Interactions**: Brilho metálico percorrendo botões dourados e elevação suave dos itens.

3. **Menu Hambúrguer com Fechar & Voltar**:
   - Totalmente adaptado para dispositivos móveis.
   - Botão circular de fechar (`X`) no topo direito.
   - Botão explícito de retorno (`← Voltar ao site`).
   - Fechamento prático ao clicar em qualquer link ou pressionar a tecla `ESC`.

4. **Botões Flutuantes Elegantes**:
   - Canto inferior direito fixo:
     - **WhatsApp**: com efeito pulsante e atalho para o agendamento (`(11) 94856-8716`).
     - **Instagram**: com gradiente oficial direcionando para `@axbarbeariastudio`.

5. **SEO Local Completo (Google Search & Google Maps)**:
   - **Schema.org (JSON-LD)** configurado com a categoria `BarberShop`, endereço, coordenadas geográficas, horários, telefone e catálogo de ofertas.
   - **Meta tags geográficas**: Latitude/Longitude exatas e região Penha de França / Zona Leste.
   - **Open Graph completo**: Miniatura do logotipo HD ao compartilhar links no WhatsApp e redes sociais.
   - Arquivos `robots.txt` e `sitemap.xml` inclusos.

---

## 📂 Estrutura de Arquivos

```
axbarbearia/
├── index.html                   # Estrutura HTML5 semântica e acessível
├── README.md                    # Documentação completa do projeto
├── robots.txt                   # Instruções de rastreamento para o Google
├── sitemap.xml                  # Mapa do site para o Google Search Console
├── img/                         # Pasta dedicada de imagens
│   ├── logo.png                 # Logotipo oficial em alta definição (transparente)
│   ├── logo-hd.png              # Backup em alta resolução
│   └── logo.jpg                 # Imagem original
└── assets/
    ├── css/
    │   └── style.css            # Folha de estilos modular e comentada
    ├── js/
    │   └── main.js              # Lógica de agendamento, animações e interações
    └── images/
        ├── logo.png             # Logo referenciado pelos assets
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
