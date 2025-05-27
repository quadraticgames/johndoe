---
title: "Fallingwater"
date: 2019-03-16
categories: 
  - "game-design"
  - "projects"
thumbnail: "/images/blog/fwater.png"
---

The first playable "game" project I built (mostly) by myself is called **Fallingwater.** This is based on a fantastic LinkedIn Learning (formerly Lynda.com) tutorial showing how game engines can be used not just to build games, but other things like (in this case) visualizing architectural models in 3D.

The centerpiece of the build is Frank Lloyd Wright's Fallingwater, one of America's most iconic architectural achievements. It is included among Smithsonian's list of "28 places to visit before you die," and the house was designated a National Historic Landmark in 1966. You can read more about Fallingwater **[here](https://en.wikipedia.org/wiki/Fallingwater)**.

The build is playable, although not very polished. There are performance issues, some clipping, and the controls aren't very crisp. Still, it looks pretty nice, and it was a great introduction to game engine basics like importing assets, lighting, cameras, controllers, and colliders (incidentally, this project was building using Unity).

Here are some screenshots:

![](images/fw5.jpg)

![](images/fw4.jpg)

![](images/fw3.jpg)

![](images/fw2.jpg)

![](images/fw1.jpg)

After completing the tutorial, I challenged myself to figure out how to add the following features (strictly using documentation and online resources, mostly YouTube videos):

- - Build the game for Windows and WebGL (native build was for Mac)
    - Build and deploy to Xbox One devkit
    - Import Oculus Integration from asset store and make build playable in VR
    - Add some polish to the launch menu and launch process, adding custom logos and art as well as a custom app icon
    - Add ambient music (I used Joe Jackson and Steve Vai's [beautiful rendition](https://www.youtube.com/watch?v=e1d9brghFIo) of Duke Ellington's _Isfahan_) and a few sound effects
    - Add a very basic options menu
    - Add an LCD (screen) model inside the house that plays a looping video with accompanying audio

I was able to kinda / sorta get all of the above extras working (although the VR made me nauseous lol). However, I didn't have much success deploying to the Xbox, even though I have been able to do that with a different (2D) project.

I'll probably put this project "in the books," but two things I would like to revisit are 1) making the audio from the video player get louder as you get closer to it, and 2) toggle on/off individual post FX in the options menu.

You can check this out for yourself at the links below (heads up: Windows and MacOS will probably complain about the apps being unsigned, but they will still run).

### Downloads:

[Mac OS build](https://quadraticgames.com/downloads/Fallingwater-MACOS.zip) [Windows build](https://quadraticgames.com/downloads/Fallingwater-WINEXE.zip) [WebGL build](https://quadraticgames.com/downloads/Fallingwater-Web/)

\* _Note that there are no performance optimizations for these builds, so unless you have a AAA gaming rig, I recommend dialing down the resolution and quality settings - like WAY down :) The WebGL build has all post FX disabled, and the video player may not work._
