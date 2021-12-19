---
title: "Google Photos Hurts Me "
date: 2021-07-19
description: "pain"
tags:
  - html
  - javascript
  - suffering
  - reverse engineering
  - css
  - chrome dev tools
  - npm 
categories:
  - internets
draft: false
summary: google removed the good features so I did it my self. 
---
# The Blurb

Google had no good way to embed google photos albums so I did it my self.

# Features
  - blur until load
  - dynamic resizing
  - load videos and photos
  - auto updates pictures and videos using the just the album id
  - grid and carousel display options 
  - minimal css for easy editing 

# Demos

Here's a quick demo to highlight the functionality

To find the album id just grab last part of the share url (or just hit submit with my default one)

```https://photos.app.goo.gl/L74MSFRNuyNSmrKm9``` <- this last part after the forward slash


<form id ='photo-demo-form'>
<label for="album_id">google photos album id:</label><br>
<input  type="text" name= "album_id" value = "tbHcgyWN44g9qj216"> </input><br>
<input type="submit" value="Submit">
</form>

ps. it takes a couple seconds to load be patient  
pps. maybe more than a couple seconds if you have bad internet

## carousel
<div class="center"> 
<div id='carousel-demo'></div>
</div>

## grid
<div class="center"> 
<div id='grid-demo'></div>
</div>

<script type="module">
let form = document.getElementById('photo-demo-form');
form.onsubmit = (e) => {
e.preventDefault();
let id = new FormData(document.querySelector('#photo-demo-form')).get('album_id')
let c = document.getElementById('carousel-demo')
let g = document.getElementById('grid-demo')
c.innerHTML= ''
g.innerHTML = ''
c.style = ''
g.style = ''
c.className='loading'
g.className='loading'
let observer_function = (mutations,observer) => {
      mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
              mutation.target.classList.remove('loading')
              observer.disconnect()
          }})}
[c,g].forEach((el)=> {
let observer = new MutationObserver(observer_function)
observer.observe(el, {
      childList: true
      })
})
photo_function(id,"carousel-demo","carousel")
photo_function(id,"grid-demo","grid")
}
</script>

# Links/How To
npm: https://www.npmjs.com/package/google-photos-yoinker   
jsdelivr: https://www.jsdelivr.com/package/npm/google-photos-yoinker   
github: https://www.github.com/arjungandhi/google-photos-yoinker   

A quick note: For this to work on your website, you need to set up your own proxy and API on your own. I used AWS and lambda functions to do this and have instructions for it in the README of the repo. 


<end-tldr>


Listen, I know I normally start projects off the deep end and then keep going, but I swear this one started out normal. 

All I wanted to do was embed an itsy bitsy little carousel with project photos and videos into this site. All it had to do was neatly display pictures and live update from the Google Photos album I use for storage. It's **Google** - They had this embed feature like 10 years ago with Picasa. There's no way they just chucked that feature out the windows and watched the world burn right? [(<- *They totally fucking did those rat bastards*)]

# Part I: The Katabasis

Okay, but like surely there's a third party service that just turns your photo album link into a little photo carousel.

[There is!](https://www.publicalbum.org/blog/) 

This guy's tool does it! 
....But it doesn't auto-update from album changes
....And you can't do videos

Building from scratch still sounds like too much effort. 
  
    
Okay, Google's got their cloud services. They've probably got a great Google Photos API. I used their Cloud Compute service all of like one time but I'm pretty handy with AWS, I'm sure it'll be fine. 

{{< figure src="https://i.imgur.com/8fNIfjn.png" >}}

It's a public link sharing album... why the hell do I need OAuth?



Okay fuck fuck uhhhh. 
Github... yeah yeah... everyone has a Github! There's no way there's not some nerd that wrote a npm package or something that just does this perfectly no questions asked. 

There is! In PHP :( 


# Part II: Reverse Engineering Google's Shit. 

Public Google Photos albums have a permanent public link. With some elbow grease (*cough* regex and a GET request), you can pretty easily figure them out. 

All the urls look like this:

```
https://lh3.googleusercontent.com/pw/ACtC-3ey3tCB-Qxgi5WBq5tSq_-vyysVr27GClmcYaJxecmLssKdOsFivD0c6zGaAzQGZSKXJZpWXNez2q2MSAxkiL2d8AlZHnoWrNbGH8U2lgMHma-efg93QctIuns9dByUqY01TlVMfIHe3dfbDpL3gkn2=w1769-h986-no
```

The `wXXX-hXXX` you see at the end of the url let you specify a size to pull the image in. Literally 10 lines of javascript and I was most of the way done, easy project. 


## Part III: Enter Hell

See, I also wanted my little photo carousel to have videos. 

Why? 

Well, while pictures of robots are good. Videos are gooder. 

Proof:

```python
#!/bin/python
>>> import random
>>> word = "good"
>>> picture = 1000*word
>>> seconds = random.randint(0,100)
>>> video = picture * 60 * seconds 
>>> print(video)
"goodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgood"
```

Okay, so after staring at the Google Photos HTML for far to many hours. I've learned a couple things. 

Google loads videos in 2 scenarios. 

1. When you click on a video, it pulls it up. 
    - The problem is it's an internal API call and the source data doesn't contain a permanent link to the data so I can't embed that.

2. When you hover over a video, Google also loads that video.
    - I was watching the HTML change when that happens and Gotcha! When you hover over a video, it returns an HTML tag with a permanent data source url that can be embedded.

Now how do I get this link automatically. I could scrape it but that would suck and be slow 

Out of curiosity I diffed the link of the picture I get when I make the get request and its corresponding video and voila! 

They're almost identical! 

The end of the photo link: ```=w1769-h986-no```  
The end of the video link ```=m134?sq=0&sq_end=1```

After doing some tests in Jupyter Notebook [here](https://github.com/arjungandhi/google-photos-yoinker/blob/master/testing/hippity%20hoppity%20your%20photos%20are%20now%20my%20property.ipynb) I realized the GET request returned a status code that could verify whether the item was a photo or a video!

The response URL from the vide could also be used as the video source!

....... at this point in the writing of this point I had an idea and went and rewrote the entire code base. 

## it's been a week and I'm tired. 

So this post was going to be about how even with the base url I the videos refused to load in the jupyter notebook. Which sucks.

But after gremlin prowling through google api documentation. I found [this](https://developers.google.com/photos/library/guides/access-media-items).

So this project might actually work! (note the finding documentation ends up a sentence long but was 3 days of staring at the dev tools and googling till my eyes fell out of my head.)

## enter hell but now it's css flavored

So my initial plan was to just embed a carousel of the photos and videos that I had found, but in my 5 minutes of looking for a decent carousel library I didn't find one that I liked. 

And then as I was prowling around the google photos HTML. I thought how cool would it be to have my own google photos grid, that I could embed in any site. 

Luckily [Dan](https://schlosser.io/) had a great [article](https://medium.com/@danrschlosser/building-the-image-grid-from-google-photos-6a09e193c74a) on how it all worked. 

I tried using his library didn't really like it too much and then ended up implementing the algorithm from scratch anyway. 

I then trudged my way back to the carousel and found [Swiper](https://swiperjs.com/swiper-api) and got a sweet carousel. 

3 days later some suffering and bingo bango boongo you got a javascript library that can embed google photos. 

{{< tweet 1420455256136237059 >}}

# demos

Here's a quick demo to highlight the functionality:

To find the album id just grab last part of the share url (or just hit submit with my default one)

```https://photos.app.goo.gl/L74MSFRNuyNSmrKm9``` <- this last part after the forward slash


<form id ='photo-demo-form2'>
<label for="album_id">google photos album id:</label><br>
<input  type="text" name= "album_id" value = "tbHcgyWN44g9qj216"> </input><br>
<input type="submit" value="Submit">
</form>

{{< ps >}} ps.it takes a couple seconds to load be patient{{< /ps >}}

## carousel
<div class="center"> 
<div id='carousel-demo2'></div>
</div>

## grid
<div class="center"> 
<div id='grid-demo2'></div>
</div>

<script type="module">
var form = document.getElementById('photo-demo-form2')
form.onsubmit = (e) => {
e.preventDefault();
let id = new FormData(document.querySelector('#photo-demo-form2')).get('album_id')
let c = document.getElementById('carousel-demo2')
let g = document.getElementById('grid-demo2')
c.innerHTML= ''
g.innerHTML = ''
c.style=''
g.style=''
c.className='loading'
g.className='loading'
let observer_function = (mutations,observer) => {
      mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
              mutation.target.classList.remove('loading')
              observer.disconnect()
          }})}
[c,g].forEach((el)=> {
let observer = new MutationObserver(observer_function)
observer.observe(el, {
      childList: true
      })
})
photo_function(id,"carousel-demo2","carousel")
photo_function(id,"grid-demo2","grid")
}
</script>

# how do I hippity hoppity yoink your property. 

npm: https://www.npmjs.com/package/google-photos-yoinker   
jsdelivr: https://www.jsdelivr.com/package/npm/google-photos-yoinker   
github: https://www.github.com/arjungandhi/google-photos-yoinker   

A note here for this to work on your website you need to set up your own proxy and API on your own, I used AWS and lambda functions to do this and have instructions for it in the README of the repo. 








