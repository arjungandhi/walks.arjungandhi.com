---
title: "Swol Kat"
date: 2021-07-01
description: "building a quadruped, i think"
tags:
  - python
  - c++ 
  - solidworks
  - cad
  - 3d printing
  - websockets
  - html
  - css
  - javascript
  - controls 
  - odrive 
  - bldc 
  - wpi 
  - leadership
categories:
  - robots
draft: false
---

# The Blurb

This project was a shot at my childhood dream of making a robot that can walk. Somehow I also convinced my school to give me college credit for it. Me and my team designed built and programmed a 12 DOF quadruped over the course of 8 months. Due to some mechanical errors the quadruped was not able to hold up its own weight but this should be easily fixable in future generations of the mechanics.

# What I did

On this project I was primarily responsible for the programming and controls of the robot. I worked on everything from the math on the controls to the high level visualizations of the robots. 

# Features
  - Carbon Fiber and 3d printed body
  - Custom circuit boards for power distribution and wire management
  - Highly expansible code base that runs on a Raspberry pi
  - Code base can easily be modified to work on a completely different quadruped
  - Visualization of the quadruped gaits for debugging for running on a real robot
  - Low latency Websocket comms over Wifi
  - 2 custom GUI's for Motor, and Single Leg testing
  - 3 implemented gaits 
  - High Power BLDC actuators

# Links:
- [paper](https://books.arjungandhi.com/Robotics/mqp-report.pdf)
- [github](https://github.com/swol-kat)

# Photos/Videos
{{< google-photos tbHcgyWN44g9qj216 carousel >}}


<end-tldr>

Hi, welcome to a culmination of the last 4 years of my education, a robot kat that theoretically walks. 

# The Goal 

So we like every other soon-to-be-college-grad, thought we were gods and said, we're gonna build a walking quadruped, how hard could it be?

MIT did it in like 10 years.

Our school has never really done it well.

So like we can pull it off in one. Right? 

....   
.....
......
.......
........

The goal of this project was simple: build a quadruped that could do both a dynamic and static wallking gait. 

With that in mind, I grabbed 4 friends and we gave it our best shot.

# Some Background 

## Why in the world is it named Swol Kat? 
Err....This one's on me. Last year, a couple friends of mine had attempted to make a servo-based quadruped called [Small Kat](https://hackaday.io/project/164727-smallkat-an-adorable-dynamics-oriented-robot-cat). 
Since our team wanted to use big, strong, power-dense [BLDCs](renesas.com/us/en/support/engineer-school/brushless-dc-motor-01-overview) I said .... AS A JOKE  
> Hey we should call our project Swol Kat... cause it's like Small Kat but you know [Swol](https://www.urbandictionary.com/define.php?term=swol)

So then we started referring to the project as Swol Kat.... then we called it Swol Kat to our future advisors .... and then .... we registered it as the official name of our project. So its Swol Kat I guess. 

## What did I do on the project? 
On this project, I focused on software and controls of the robots. As such, I'm gonna talk mostly about software and controls. One because that's what I did. Two the electronics are controlled by angry pixies and I've yet to unlock the pixie wrangler skillset. If you're a big fan of pixies, feel free to read our 75 page long [paper](https://books.arjungandhi.com/Robotics/mqp-report.pdf).

# How to make a motor go brr

## What we need
So the core of this project are the actuators. Finding actuators that can do what we need to do is surprisingly difficult: you need high torque and low rpm actuators which haven't been magicked into existence by overworked researchers yet. The traditional engineering approach says for us to build a quadruped we must first do all the surrounding math and use that math to determine the ideal actuator and control system needed. However there’s a few problems with that.

- Dynamic quadruped math was outside the scope of our senior thesis. While it's an area I hope to explore in the future, it would probably have driven my team up a wall to hold up the entire project while learning a new field.

- Spending all this time on trying to design or make this perfect actuator is a distraction from the real point of the project. Our goal is to make a quadruped walk, not design a beautiful robotics actuator. Other teams that have pulled off this project have had 3-4 years worth of iterations and testing to get something to a workable state. We didn't have that time, so rather than trying to reinvent the wheel, we are trying to piggy back off as much previous work as possible.

## What we are using
After reading through the papers on MIT's [Mini Cheetah](https://build-its.blogspot.com/2019/12/the-mini-cheetah-robot.html) and Stanford's [Doggo](https://github.com/Nate711/StanfordDoggoProject), we ~~copied them and~~ settled on using the [Turningy Multistar 9225 160kv BLDC](https://hobbyking.com/en_us/9225-160kv-turnigy-multistar-brushless-multi-rotor-motor.html?queryID=&objectID=40516&indexName=hbk_live_magento_en_us_products) they were right in the range of what previous projects had used and, even better, my roommate had 8 of them just lying around. We paired these motors with the Odrive Controllers previous projects had success with 

(Unrelated: Odrive was created in a demon lair and sucks the life out of your soul. To make it slightly less painful, I wrote a tuner tool that you can read more about [here](/projects/robots/odrive-tuner)). 

After wrestling with the tuning gods (aka days of dedicated grind time), I got some pretty cool position control working: 
{{< youtube BdbSvHMulOI >}}

# ~~Arms~~, ~~Legs~~, Thing that the robot stand on

## Designing the thing

Okay, so you know those cool robot arms in factories? What if you were to take them flip them upside down and attach them together. You'd get a horrifying moster of a quadruped. But it is a quadruped. Unrelated.... if you ever get coffee with me ask me about the **hexcavator pod**. 

Anyway a quadruped is really just 4 robotic arms strapped together. So to make a full quadruped you need to first make one good leg. Pro-tip from some one who's suffered through this, test the hell out of your leg, make it do all of the motions put it under load , the whole shabang. Due to time constraints on our project we only checked that we could move the thing right and thats bit us in the ass as you'll read later. 

Okay, I have a series of questions for you. 

1. How many degrees of freedom do you need in a quadruped leg?
2. Where do the motors go? 
3. How do you correctly transmit power to the places that need them?

I'll be expecting your answers in my office at 08:00 sharp.

.....

For the rest of you slackers I guess I'll explain to you our answers. 

{{< figure src="http://orthopets.com/wp-content/uploads/2018/03/coparison.jpg" alt="image" caption="okay but how funny is it that some artist had to draw a human in this position" class="left" >}}

This is a dog. Interms of anatomy (dogs, cats, cheetahs, horses, humans) their all basically the same.

Since we are trying to make a quadruped that walks we figured we should start with an animal that already does it. So dogs have 4 degrees of freedom in their legs. 2 in the hips 1 in the knee and 1 in the ankle. So we decided to copy that and gave the dog 3 DOF legs. 

Now the brightest among you might notice that 4 != 3. You are indeed correct. The ankle joint in quadruped movment, while useful for fast movements and storing energy, is really just a extra bit of complexity that we really don't need in this project. So we, like most quadrupeds, have chosen to ignore it for now. 

Now in order to design a quadruped leg of your own that may work the solution is simple. 

Step 1: Find a mechanical deisgner friend who likes to spend all his time in CAD.   
Step 2: Make him do it. 

Bingo bango Boongo 6-9 months later and you've given birth do to a beautiful leg. 

{{< figure src="https://lh3.googleusercontent.com/pw/ACtC-3dEu7uQ0Hs4QXj8ZQXgpfMyLkHhgkUM9zaTkIhxtrU9RUOzXXmifiONb0085s7lSvzzdq-rh1wIh0vLMpcZbTne-966jjmfxCuS-xVSKb-L64B4enbnHmMXXmlcIuLJO-ie_ynaoxXmX1oMSJMAlT2O=w1911-h981-no?authuser=0" alt="image" caption="cad model of our final leg">}}


## Making it move

While my partners were working on designing and builidng the real robot I wanted to be doing something so I began writing the code base. 

My goal when writing this code base was 2-fold: 
1. I wanted to be able to run a virtual version of the leg and the real leg with the same code. 
2. I didnt want to have to completely rewrite this code for the full quadruped. 


{{< figure src="https://lh3.googleusercontent.com/S0cuGUMFVpYTm8h8WBLve5joS3B49C7Mf5tqxdLhNivh8eqp7jZncGndHFiOJCzCf_J_kJm__WyL11NxFZzsql4PrgLKCXR5MtNcdkCNdZ7FehGDPA8tSsI4ty8tYvt1qWHj1X4LGA=w2400" alt="image" class="left" >}}

So I came up with this cute little class structure. There's a couple cool things about this. 

Notice how the leg class can send values to either the Joint or the Virtual Joint. Basically I created 2 joint objects, one communicates with the actual controller we are using, and another that just pretends to communicate to the controller. You can make the leg with any combinations of the two and the leg class will just work. This structure proved to just be the best. It allowed me to completely test all my math on virtual legs and with in a few moment run any number of joints to see if they were working as I wanted. 

The other nice thing is you could create a variety of joint objects to communicate with all sorts of different controllers, as long as it followed the base class structure it would just **work** 

Now, this is the basis of object oriented design, but you'd be suprised how quick that goes out the window the minute any real hardware is involved. 

As normal, after a couple weeks of attempting to debug via a terminal and print statements, I got fed up. 

So like last time I created another web GUI to control and test the leg. 
{{< figure src="https://lh3.googleusercontent.com/pw/ACtC-3ey3tCB-Qxgi5WBq5tSq_-vyysVr27GClmcYaJxecmLssKdOsFivD0c6zGaAzQGZSKXJZpWXNez2q2MSAxkiL2d8AlZHnoWrNbGH8U2lgMHma-efg93QctIuns9dByUqY01TlVMfIHe3dfbDpL3gkn2=w1769-h986-no?authuser=0" class="big">}}

This GUI had all the neat features of the last tool I made making testing way easier. It also was able to show the live position of the robot arm in the browser itself. 

## The Math. DUN DUN DUN

Generally, when you're moving a robot arm around, you want to be able to control where the end of it is and how the end of it moves (task space). Unfortunately, we can only control the angles of each joint of the robot (joint space). Because of this, we need to do some math and figure out how to convert between joint space and task space. 

For position, this conversion is called Forward and Inverse Kinematics and is a well-studied thing in Robotics.

Unfortunately, sometimes position control just doesnt cut it. Sometimes you want to be able to control the velocity and forces on the end effector (tip) as well. 

Again we have math that can do this, and is generally known as Velocity Kinematics. (Velocity Kinematics lets us do both velocity and force control on the robot.)

I'm not gonna rederive the math for them here, if you want to see how it was done you can find it all in our [paper](https://books.arjungandhi.com/Robotics/mqp-report.pdf). (Warning: It's alot of matrices)

The end result of this (with a little bit of trajectory generation and gait control that's covered later) is: 

{{< youtube mMwvLhEuTUQ >}}

(I found out later that we accidently set the current limit on the motors to like 2 amps which meant it was struggling to move the leg around in the air. Keep reading...the steps look a lot cooler later on.)

# Now Do It Again. But more. 

Now you can control a leg in space. Congrats 🎉. The next step is attempting to coordinate 4 of those at once. Now in my several years of suffering through robot debugging hell, I've learned one of the best ways to debug broken robots is to see what it's actually doing.

## Visualization 

To help with this I plotted the 4 corners of the robot and each of the legs in an interactive graph in Jupyter Notebook. This provided a useful tool to help debug a whole bunch of issues with the robot.

After many, **many** hours of debugging and making a good bit of progress towards looking more and more like my father, I got these results, forever saved in this cool video of it walking around in the visualization environment.

{{< youtube 59Iai2ZQGe0 >}}

Using the visualization, I was able to test a majority of the gaits before the robot was ever built.

## Golly Gee Lets Get Gaited 

In simple terms, gaits are patterns that describe the motion of the four legs of the quadruped. There's a huge variety of gaits that dogs and other four legged creatures use to traverse and during this project, I programmed four of them. I'll briefly cover each of the four I programmed along with some pretty videos, but more gait implementation details + additional complicated nonsense can be found again in [paper](https://books.arjungandhi.com/Robotics/mqp-report.pdf).

### Wiggle Gait (No idea what it's actually called but I call cause it makes the robot wiggle)
The wiggle gait tries to keep the feet of the robot on the ground while moving the body around. 

{{< youtube U84VOgEOHHI >}}

### Crawl Gait
The crawl gait tries to move the robot body forward at a constant velocity while moving the legs forward 1 at a time.

{{< youtube Ln1GCvG1c0s >}}


### Trot Gait 
The trot gait tries to move the robot body forward at a constant velocity while moving 2 diagonal legs forward at a time.

{{< youtube D14twvJj0SA >}}


### Intermittent Crawl Gait 
The intermittent crawl Gait consists of 2 major movements. First, the body is moved to the center of the triangle formed by the 3 grounded legs, then the stepping leg is moved forward

{{< youtube 8ohMD32n8FU >}}


# The Results 

While the robot didn't walk due to major mechanical limitations in the belt transmission, I learned a whole lot. This isn't the end of quadrupeds for me, but it is the end of this post. Here's some fun photos/videos of legs the robot!

# Links:
- [paper](https://books.arjungandhi.com/Robotics/mqp-report.pdf)
- [github](https://github.com/swol-kat)

# CAD
{{< fusion SH919a0QTf3c32634dcfcf7fb8a01154b1fb >}}

# Photos/Videos
{{< google-photos tbHcgyWN44g9qj216 grid >}}
