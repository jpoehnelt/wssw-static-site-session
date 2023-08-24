---
layout: slide.njk
title: Minimal JavaScript Frameworks
order: 10.6
---

{% predictText "in a short sentence, describe AlpineJS" %}

## Example

```html
<script src="//unpkg.com/alpinejs"></script>

<div x-data="{ open: false }">
    <button @click="open = true">Expand</button>

    <span x-show="open">
        Content...
    </span>
</div>
```