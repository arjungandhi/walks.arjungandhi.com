---
title: "Data Visualization: Rain Drops"
date: 2021-03-14T14:47:41+00:00
description: "Representing Popultions as Rain Drops"
tags:
  - art 
  - p5.js
  - pretty-please
  - html
  - css
  - javascript
  - wpi
  - generative
categories:
  - art
draft: false
summary: simulating life and death with raindrops
---


### Inputs

<div class= "pretty container" id = 'box'></div>

---
### About The Project
This is a simulation about mortality and age distributions in populations. Each drop represents a person with a diameter that matches their "age". The max diameter is based on the census data of how old populations are in the entered zip code. As the drops grow up you'll see they have a chance to die once a drop dies it shrinks until it disappears, this chance is based on the mortality distribution per state. The number of drops that can appear is based on the population of that zip code.

#### How to use it
1. Enter a zip code
2. Choose a simulation year
3. Click run simulation


#### Stuff I used

- [p5.js](https://p5js.org/)
- [censtats](https://censtats.com/)
- [CDC Wonder](https://wonder.cdc.gov/)
- [pretty-please](https://pretty-please.arjungandhi.com)


<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.0/p5.min.js" integrity="sha512-tGZFF1kxT/c9C+kv77mKkZ9Ww1VyU8TMX6HLUSzbPrDLuptbiRFBfti8A33ip+BBIHYUsybuZD9OKLmIqdLmaQ==" crossorigin="anonymous"></script>
<link rel="stylesheet" href="/css/projects/art/raindrops/drops.css">
<script src="/js/projects/art/raindrops/drops.js" type="text/javascript"></script>

