---
title: "Odrive Tuner Tool"
date: 2021-05-09
description: "why did i put this much effort into this thing?"
tags:
  - pretty-please
  - html
  - css
  - javascript
  - wpi
  - mqp
categories:
  - robots
draft: false
summary: "overkill tuning tool for motors"
---


While doing my senior project, I had an off-shoot project to make working with the ODrive controllers we used less painful. The interface to the ODrive controller is a python library with some pretty painful-to-use CLI tools, and after a month of suffering, I had gotten pretty tired of creating jank python scripts to change and modify my parameters without any decent feedback systems.

So I decided to build a semi-decent GUI that could do all sorts of fancy things.  

**A forewarning:** Writing this after 8 months of coding and tuning experience, there's a lot of jank junk I did that ~~absolutely should~~ could be better. If you're super gung-ho about wanting to use it, let me know and if I have time or you buy me coffee (I also take bubble tea), I'll go through and fix all those broken things (baby modifications, big difference). Also this was my first time doing like 90% of this local-web-browser-as-a-control-UI thing so I'm definately not following any of those best practice things. 

# How does it work? 

In preparation for communicating with my actual robot, I wanted to make this thing fast, work over wifi, and pretty. Given I was more comfortable with web development than GUI creation in python, I decided to make this tool browser based.

The first library I found that seemed to do a decent job at this and didn't suck to use was [Socket.io](https://socket.io/). I used that in combination with [Flask](https://flask.palletsprojects.com/) to create a websocket and then deploy some static html, javascript, and css files to the connected users browsers.

# How did you make it have such nice colors
I wrote a CSS framework a while back based on the [Nord](https://www.nordtheme.com/) color palette, check it out [here](pretty-please.arjungandhi.com)

# Results 

## Stuff that Works
- Connecting to the ODrive, Rebooting the Controller, and Clearing Errors
- Live Reporting on any errors that occurred for the axis that was being
worked on.
- Live Readout of Encoder Position, Voltage, and Current State.
- Ability to set a variety of Axis States and Control Modes.
- Seeing and Setting Position, Velocity and Current setpoints.
- Seeing and Setting Gains and Config of the ODrive.
- Live Graphing of Position, Velocity, and Current setpoints and positions.
- A debugging log to display useful information

You can find the github repo (and a picture) for the tool [here](https://github.com/swol-kat/odrive-tuner/blob/master/README.md)

## Stuff to be Added
- Work with both Odrive Axis at once, currently only works with one and code needs to be changed to make it work with the other. 
- Allow user to config all the various Odrive parmeters not just the one's I hard coded in. 
- Handle Odrive reboots
