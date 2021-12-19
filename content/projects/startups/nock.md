---
title: "Nock"
date: 2019-03-08T16:32:11-04:00
description: "sleep deprivation go brr"
tags:
  - html
  - css
  - javascript
  - d3.js 
  - puppeteer
  - web automation 
  - reverse engineering
  - aws
  - s3
  - lambda
  - dynamodb
  - node
  - api gateway
  - browser engineering 
  - dom
categories:
  - startups
draft: false
---

# The Blurb

Nock.ai (now known as Testgram) was a start up company I started with me and a few friends. The goal of the company was to design a product that could eliminate the manual generation of test cases for companies. I joined the company with little-to-no software experience (I had taken AP CS in highschool). 

# What I did
Over my 8 months at Nock, I worked on several major projects. 

## Recorder Script
We needed a recorder script to collect data from out customers websites. The script I wrote would be able to work on any website on the web regardless of what technologies were used to build it. The script I wrote could record every click and text entry on the page and would record the current DOM state of the page. It also removed any personal information and site text intelligently. 

## Ingestion Pipeline 
The Ingestion Pipeline is what communicated with the recorder I built. It was built in AWS out of lambda functions and would scale to our customer base appropriately. Ideally we would have used stream processing for this, but due to having almost no budget, we ended up building a "stream-like processor" to create and store user sessions in dynamodb.

## Session Player 
My final major project was creating a tool that could take these sessions we had recorded and generate a video. To do this, I used web automation tools like puppeteer and was able to generate videos of a "user" using a website that could be shown to customers. 

# Where is nock now? 
As of the writing of this post I've left Nock.ai, I wish them the best of luck towards their bright future! 