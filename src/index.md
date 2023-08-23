---
layout: layout.njk
eleventyComputed:
  title: "Western Slope Startup Week - Static Site Session"
---

# Western Slope Startup Week - Static Site Session

## Documents

<ul>
{%- for doc in collections.documents|sort(false, true, 'url') -%}
  <li><a href="{{ doc.url }}">{{ doc.data.title }}</a></li>
{%- endfor -%}
</ul>

## Slides

<ol>
{%- for slide in collections.slides|sort(false, true, 'url') -%}
  <li><a href="{{ slide.url }}">{{ slide.data.title }}</a></li>
{%- endfor -%}
</ol>
