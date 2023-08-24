---
layout: slide.njk
title: Eleventy Shortcodes
order: 9.1
---

{% predictText "in a couple sentences, explain what an Eleventy Shortcode is and why it is needed." %}

A short code can used similar to the following:

{% raw %}
```
{% predictText "here is the prompt being passed to the code" %}
```
{% endraw %}

And below is the code for calling Vertex AI with the prompt:

{{ "./lib/predict-text.js" | sourceCode }}

