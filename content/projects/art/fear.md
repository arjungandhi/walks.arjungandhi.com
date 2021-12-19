---
title: "Interactive Touch: Fear"
date: 2021-03-15T14:47:41+00:00
description: "Representing the affects of covid 19 on our ideas of fear"
tags:
  - art 
  - p5.js
  - pretty-please
  - html
  - css
  - javascript
  - arduino
  - wpi
categories:
  - art
draft: true
summary: "an art project that scares you away from other humans"
---

### Inputs

<div class= "pretty container" id = 'box'></div>

---
### About The Project
With this project I wanted to represent how covid has affected our idea of closeness. Before the pandemic most people wouldn't think twice about standing next to a stranger in line or passing somebody by on the street. This virus has preverted our idea of closeness. Now the idea of closeness is firmly associated with the idea of danger and death for many of us. For this project I used an 4 ultrasonic sensors on a belt with an arduino so that the displayed image could change from a smile when you are far away from objects and to a skull when things are too close. I've included an slider on the page so you can see the image change for yourself. 

{{< figure src="/images/projects/art/skull/belt.jpg" alt="image" caption="My ultrasonic belt" class="left" >}}


#### Stuff I used

- [p5.js](https://p5js.org/)
- [pretty-please](https://pretty-please.arjungandhi.com)


<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.0/p5.min.js" integrity="sha512-tGZFF1kxT/c9C+kv77mKkZ9Ww1VyU8TMX6HLUSzbPrDLuptbiRFBfti8A33ip+BBIHYUsybuZD9OKLmIqdLmaQ==" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/css/projects/art/skull/skull.css">
<script>
function preload() {
  // preload() runs once
  skull = loadImage("/images/projects/art/skull/skull.png")
  warn = loadImage("/images/projects/art/skull/warn.png")
  smile = loadImage("/images/projects/art/skull/smile.png")
  smile.resize(400, 0);
}
</script>

<script src="/js/projects/art/skull/skull.js" type="text/javascript"></script>