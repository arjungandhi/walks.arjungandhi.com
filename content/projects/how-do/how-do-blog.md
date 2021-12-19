---
title: "How to make a blog with Hugo and AWS"
date: 2020-10-25
slug: "how_to_make_a_blog"
description: "How and Why I made this blog"
keywords: ["hugo", "aws", "github", "blog"]
draft: false
tags: ["hugo", "aws", "github", "blog"]
categories:
  - internets
math: false
toc: true
summary: how did i make this site
---

## Why I chose this framework

So I'm incredibly particular about how my workflow goes, I want things to be automated, cohesive, pretty, and try to keep the list of frameworks and tools I need to learn to a minimum. So to be honest I had actually never heard about a blog framework like this. I had only really heard of *shudder* wordpress. I **hate** wordpress, it's bulky hard to edit and every time I have to touch PHP I want to curl into a ball and die. So I've always wanted a blog, but I had requirements.

1. Needed to be a static site (I'm a broke college student, static sites on AWS are free)
2. Needed to be based of html and javascript.
3. Integrates easily with my standard color scheme.
4. Easy to use, and edit content in. 

To be honest with you I thought my options were wordpress or bust. I was ready, and had several attempts, at designing my own dynamic website management system based entirely in AWS. However a year or two after that horrible attempt, I was talking to a fellow student about wordpress for a different site we were working on, and he mentioned that static site generators exist. To be honest with you I don't know why I never considered that if I hated wordpress, some one else must hate it just as much as me, and some coder much better than me must have come up with a solution. 

So I started googling and learning about all the various static site generators that exist. The major ones I had heard were Jekyll and Ghost, but to be honest I had issues with both. Jekyll is like super integrated with github and making it work with AWS seemed like way too much effort. Ghost cost money and I am currently very poor, but just as I was about to give up I stumbled upon [Hugo](https://gohugo.io) and immediately fell in love. It was fast, used markdown, looked great and free. So after about 10 min of staring at the site I sent it and downloaded the cli tool. 

## How I set up this site

### 1. Install Hugo

I run arch linux so for me it was as easy as 

```bash
$ sudo pacman -S hugo
```

### 2. Create a New Site

```bash
$ hugo new site imnotanadult.blog
```

### 3. Set that template site up as a git repo and push to github

You should know how to do this, if you don't __learn git__ its like fundamental to all stuff you do with any code, you can read my git guide [here](https://books.arjungandhi.com/Computers/Git_for_Robots.pdf)

### 4. Find a pretty theme (Modify it if you like)

Hugo has a huge [theme repository](https://themes.gohugo.io/) with all sorts of beautiful themes for you to yoink. Find one you like and add it as a submodule. I forked this [one](https://github.com/arjungandhi/hugo-theme-codex) and changed some colors to match the [Nord color scheme](https://www.nordtheme.com/) its the color scheme I use for literally everything.

```bash
$ git submodule add https://github.com/arjungandhi/hugo-theme-codex themes/codex
```

Add it to the `config.toml`

```bash
$ echo 'theme = "codex"' >> config.toml
```
### 5. Yoink the example site

Go steal all of the code that makes the example theme of your site, trust me its easier, modify them as needed.


### 6. Copy over the example post files and modify

Now Hugo can use markdown, json and others to generate your site from the content. I like markdown cause its easy to write in and you can add html in if you feel like it. 

You could make a new post with this command:

```bash
$ hugo new content/blog/my-first-post.md
```

But I found it didn't generate all the little tags for my theme so I went ahead and copied over all of the example files and just copy and modify them as needed. 

### 7. Build you blog! 

You can build your blog with 

```bash
$ hugo
```

You can also start a live server for viewing your changes live with 

```bash
$ hugo server
```

### 8. Setup a s3 bucket for your site. 

Amazon does has a much better tutorial [here](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)

### 9. Setup Hugo to deploy your site

Add the following to `config.toml`

```toml
# Deployment
[deployment]

[[deployment.targets]]
name = "<your s3 bucket name>"
URL = "s3://<your s3 bucket name>?region=<your reigon>"

# If you are using a CloudFront CDN, deploy will invalidate the cache as needed.
cloudFrontDistributionID =	"<your cloud fornt ID>"

[[deployment.matchers]]
# Cache static assets for 20 years.
pattern = "^.+\\.(js|css|png|jpg|gif|svg|ttf)$"
cacheControl = "max-age=630720000, no-transform, public"
gzip = true

[[deployment.matchers]]
pattern = "^.+\\.(html|xml|json)$"
gzip = true

```

Running `hugo deploy` will build and deploy your site to AWS

### 9. Making git auto build and push your blog! 

Using github workflows you can have a github automatically build and push your code to AWS whenever you push to the master/ any other branch!

The following action below will build Hugo -> upload it to AWS -> invalidate the Cloudfront cache -> clear the Cloudflare cache (If you dont use Cloudflare just delete the last 4 lines)

Create a file called `main.yml` in `.github/worflows` 

Paste this into the file.
```yaml
# This is a basic workflow to help you get started with Actions

name: deploy

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:


  build:
    name: Build and Deploy
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
        with:
          submodules: true


          # Sets up Hugo
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.76.5'
        
      - name: Build
        run: hugo --minify --verbose
        
      - name: Deploy to S3
        if: github.ref == 'refs/heads/master'
        run: hugo deploy -v --force --maxDeletes -1 --invalidateCDN 
        env:
          AWS_ACCESS_KEY_ID: ${{secrets.AWS_ACCESS_KEY_ID}}
          AWS_SECRET_ACCESS_KEY: ${{secrets.AWS_SECRET_ACCESS_KEY}}

      - name: Clear Cloudflare Cache
        uses: jakejarvis/cloudflare-purge-action@v0.3.0
        env:
          CLOUDFLARE_ZONE: ${{ secrets.CLOUDFLARE_ZONE }}
          CLOUDFLARE_TOKEN: ${{ secrets.CLOUDFLARE_TOKEN }}
```

For this to work you will need to add AWS access keys and Cloudflare keys as a [encrypted secret](https://docs.github.com/en/free-pro-team@latest/actions/reference/encrypted-secrets)

## Closing

Hopefully this brief tutorial helps some one, I know it was kind of a pain to find all this info when I tried setting this up. If you have any questions feel free to reach out to me and enjoy your brand new blog!

-Arjun