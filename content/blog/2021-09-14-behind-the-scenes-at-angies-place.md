---
title: "Behind the Scenes at \"Angie's Place\""
date: 2021-09-14
categories: 
  - "game-design"
  - "projects"
  - "unreal"
thumbnail: "/images/blog/computer.png"
---

> Angie's Place is my game submission for the Core 2.0 Invitational hosted by Manticore games. **[You can play it here](https://www.coregames.com/games/ba74cd/angies-place-release)** (requires the free Core client).

## "Angie's Place"

The title **_Angie's Place_** (and the game itself) was inspired by my wife, Angie. We've been married since 1994 and have always been big gamers. Over the past few years, she's developed a fondness for time-management games like _Restaurant DASH with Gordon Ramsay_ and other games in that genre. And there are other games like slot games which are great to make money, [click here now](https://theceo.in/blogs/new-releases-from-pragmatic-play/) to find more information on this.

![](/images/blog/angiesplace.png)

## The Wall Clock

Although the wall clock functions properly in the main game level, the passage of time in the tutorial level was a bit problematic since I'm not actually tracking time during the tutorial. To avoid potential continuity goofs, I took the clock off of the wall, and as the tutorial notes, mentioned that the clock was being 'repaired' by a guy named Joe (which is my name, by the way :)).

![](/images/blog/aplace1.png)

\* Thank you to varglbargl for the working clock template!

## Person Hanging Artwork

Also in the tutorial, you can see a person hanging artwork in the front of the tavern. Once the game starts, you may notice that the artwork is perfectly placed on the wall. Also, the person hanging the artwork in the tutorial is animating and appears to be using a tool. This is actually Core's _2hand\_rifle\_reload_ animation. :)

![](/images/blog/aplace2.png)

## Night and Day

It is indicated that the tutorial takes place around lunchtime on an overcast day (it is still somewhat light outside if you look closely). When the game starts, however, it is dark and rainy.

![](/images/blog/nday.png)

## Modeling

When creating the models for the beverage ingredients, I tried to model them using some of the color combinations and markings we associate with popular brands. I also tried to get as much mileage as I could out of Core decals, using them as faux brand emblems.

![](/images/blog/ing.png)

## I Have No Drink, And I Must Scream...

During the main game - if you look closely, you can see a woman in the crowd drinking, but she has no cup/glass in her hand. Oops!

![](/images/blog/lulz.png)

## Closing Time

Once the game is over, the bar is empty (or mostly empty - there is a rare bug where one patron simply refuses to leave), and most of the lights have been turned off. For Core vets, this is probably easy-peasey to implement, but as my first game developing with Core, it was a little tricky. I thought this was so cool to get working.

![](/images/blog/close.png)

## Creating the Tutorial Avatar

The "Angie" avatar in the tutorial was made by 1) creating a new Core project and dressing up a new model, 2) putting the model against a background cube with a basic color material that would be easy to knock out in Photoshop (hot pink almost always works) 3) taking a screen shot and then opening it in Photoshop, removing the pink background and choosing a different color (I chose black), 4) making some adjustments in Photoshop (I used the liquify feature to add a slight smile, added "teeth," and used the smudge tool to smooth out some of the more jagged pixels) and then 5) referenced the screenshot in the UI (using whatever black magic Aphrim has concocted in the GIF System CC tool).

For the initial game screenshot on the Core website, I used the avatar plus a shot of the tavern with gaussian blur and a vignette. By the way, if you look closely in the upper-right corner of this image, you can see a dev message that I forgot to remove!

![](/images/blog/gameback.png)

## Wall Art

There are several unique pieces of wall art in the tavern that are not a part of Core content. These images are all from **[Unsplash.com](http://www.unsplash.com)**, and I again utilized Aphrim's GIF System CC tool.

![](/images/blog/art.png)

## Computer Monitor

On the far right of the bar is a computer monitor. If you look closely, you will see that the screen is displaying the Core editor, as well as my project file for this invitational game!

![](/images/blog/computer.png)

## Bartender's Creed

There is a clipboard near the exit door. The clipboard has a sheet of paper displaying  _The Bartenders Creed_ by William Chapman.

![](/images/blog/CREED.png)

## Contra Forever!

I spent my first few days of the jam prototyping a remaster of the classic SNES side-scroller Contra III. I wasn't feeling it at the time, but hey, this might be a fun one to remake in Core!

![](/images/blog/contra.png)

## Etc.

- PS: Real-life Angie thinks "Angie's Place" Angie looks too Karen-y :)
- The background music in the tutorial features soft jazz lounge music and is very laid back. My goal was to try to lull players into a false sense of comfort. :) Once the main game starts, the soundtrack changes to fast - and loud - hard bop that manages the frantic pace of the main gameplay loop. Kudos to Matthew Pablo (Lead Audio Designer at Manticore) for such a rich and varied choice of musical tracks to use in games!
- The "chalkboard" near the top of the back of the board displays all of the ingredients used in the game in addition to an OSHA notice and a motivational quote.
- I spent nearly all of week 2 of the 4-week jam travelling and without any access to Core. I spent this time working on logic, the drink recipes, customer feedback, writing the script for the tutorial, and doing some paper-testing. This turned out to be a HUGE time-saver. Never underestimate the power of paper-testing!
- One feature that got cut early on was that in addition to choosing drinks and garnishes, you also had to select the proper serving glass (high ball glass, martini glass, wine glass, etc.), and had to pick up the appropriate mixing tool (bar spoon, shaker, blender).
- Stretch goals that made it into the game: rotating order-placers (initially, the same character model placed every single order; we created 14 unique customers), patrons "leaving" and lights off at closing time, end game UI showing total drinks served and total revenue, interactive tutorial (which took a lot longer to build than I had anticipated), and cinematic shots on tutorial start.
- Stretch goals that didn't make it: Leaderboards (this was the final cut, and the toughest call - I just felt that I didn't have enough time to do it right), recognition that you have previously completed tutorial if you had, and a more intuitive interaction system than "Press F to..."
- Potential items for future development include multi-player mode(s), different venues (fantasy, sci-fi, speakeasy, etc.), leaderboards (obviously!), more of a tycoon/business sim meta game where you invest your earnings to buy higher quality items and other upgrades, and a direct competition mode where 2-4 players could compete on the same "street" to see who can become the most popular club in town.
