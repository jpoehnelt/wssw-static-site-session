---
layout: slide.njk
title: Web Components Example
order: 8.1
---

{% predictText "in a single sentence, what is shoelace, the web component library?" %}

## Example Menu

<div class="flex gap-2 flex-col max-w-xs mb-8">
  <!-- already loaded in site, here for reference
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/themes/light.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/cdn/shoelace-autoloader.js"></script> 
  -->
  
  <sl-menu>
    <sl-menu-item value="foo">Foo</sl-menu-item>
    <sl-menu-item value="bar">Bar</sl-menu-item>
  </sl-menu>

  <p id="click-value">Clicked: </p>

  <script>
    document.addEventListener('sl-select', event => {
      document.querySelector("#click-value").textContent = `Clicked: ${event.detail.item.textContent}`;
    });
  </script>
</div>

## Source Code

{{ page.inputPath | sourceCode }}
