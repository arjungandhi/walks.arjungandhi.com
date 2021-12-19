---
title: "The Future: Trees"
date: 2021-03-16T14:47:41+00:00
description: "A project representing your future as a tree"
tags:
  - art 
  - p5.js
  - face-api.js
  - pretty-please
  - html
  - css
  - javascript
  - wpi
  - generative
categories:
  - art
draft: false
summary: demonstrating the branching nature of your life as a tree
---

<div class= "pretty container" id = 'twee-box'></div>

---
### About The Project

Life and the path we walk can be thought of as a tree, each decision we make representing a different branch, a different path we choose to follow. So this project is all about generating a tree that represents your future. 

#### How to use it

1. Upload a photo of you or a friend
2. The model will attempt to predict an age for you based on that and then calculate how an appropriate size for your future tree. 
3. Click the Generate Tree button! The program will start drawing the tree in front of your eyes. (Note the younger you are the bigger your tree is and the longer it'll take to draw)*
4. Once the progress bar is finished (or at any point in between) click the save button below the image and you'll be prompted to save your tree!

\* You can restart the drawing at any point by just clicking the generate tree button again 

#### Stuff I used

- [p5.js](https://p5js.org/)
- [face-api.js](https://github.com/justadudewhohacks/face-api.js/)
- [progressbar.js](https://github.com/kimmobrunfeldt/progressbar.js)
- [pretty-please](https://pretty-please.arjungandhi.com)

<link rel="stylesheet" href="/css/projects/art/twee/twee.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.0/p5.min.js" integrity="sha512-tGZFF1kxT/c9C+kv77mKkZ9Ww1VyU8TMX6HLUSzbPrDLuptbiRFBfti8A33ip+BBIHYUsybuZD9OKLmIqdLmaQ==" crossorigin="anonymous"></script>
<script src="/js/projects/art/twee/face-api.min.js"></script>
<script src="/js/projects/art/twee/progressbar.min.js"></script>

<script>
function preload() {
  // preload() runs once
  bg = loadImage("/images/projects/art/twee/twee_bg.jpg")
}
</script>
<script src="/js/projects/art/twee/twee.js" type="text/javascript"></script>

