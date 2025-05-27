---
title: "One-Hour Unity Class: Lights, Camera, Post!"
excerpt: The basics of lighting and visual effects in Unity
date: 2025-05-15
readingTime: 8
category: Unity
thumbnail: /images/blog/ulighting.png
---

---


# 🎥 One-Hour Unity Class: Lights, Camera, Post!

**Class Title:** Lights, Camera, Post! Enhancing Visuals in Unity  
**Duration:** 1 hour  
**Level:** Beginner to Intermediate  

## Tools Needed
- Unity Editor (2022.3 LTS recommended)
- Post-Processing package (via Unity’s Package Manager)
- StarterAssetsThirdPerson (optional, for scene testing)
- Any sample scene with basic 3D geometry

---

## Learning Objectives

By the end of this session, students will:

- Understand Unity’s camera system basics
- Set up dynamic lighting using Directional and Point lights
- Apply post-processing effects like Bloom, Depth of Field, and Color Grading
- Experiment with fog and lighting to establish mood

---

## 🗂️ Agenda

### ⏱️ 00:00–00:10 | Cameras 101

- Main Camera settings: Field of View, Clipping Planes
- (Optional) Cinemachine Overview
- Targeting and Follow mechanics (e.g., StarterAssetsThirdPerson)

#### 🛠 Mini Exercise 1:
> In your current scene, adjust the Field of View of the Main Camera to dramatically zoom in (30) or out (100). Observe how it affects perception.

---

### ⏱️ 00:10–00:25 | Lighting Basics

- Types of lights: Directional, Point, Spot, Area (baked only)
- Real-Time vs Baked Lighting
- Adjusting Intensity, Color, Shadows

#### 🛠 Mini Exercise 2:
> Add a Directional Light and rotate it to simulate morning or sunset. Then add a Point Light and place it under an object to simulate an under-glow.

---

### ⏱️ 00:25–00:40 | Post-Processing Stack

- Install Post-Processing from Package Manager
- Add a Post-Processing Volume to the scene
- Create and assign a new Post-Processing Profile
- Enable and tweak:
  - Bloom
  - Depth of Field
  - Color Grading
  - Ambient Occlusion

#### 🛠 Mini Exercise 3:
> Create a “dreamy” look using Bloom + Warm Color Grading. Then create a “horror” look using Depth of Field + Cool tones.

---

### ⏱️ 00:40–00:50 | Atmosphere & Effects

- Using Fog (Window > Rendering > Lighting > Environment)
- Light Cookies
- Skybox changes
- Emissive materials

#### 🛠 Mini Exercise 4:
> Enable fog and choose a color to match your scene’s mood. Bonus: Swap out the default skybox to a night or alien sky.

---

### ⏱️ 00:50–01:00 | Group Show & Tell + Wrap-Up

- Students walk through their scene changes
- Discuss what visuals felt best for different game genres
- Tips for performance:
	- Minimize real-time lighting
	- Use camera effects sparingly on mobile or low-end devices

---

## 📚 Optional Homework

Create two versions of the same scene:

1. A bright, cheery platformer
2. A dark, moody mystery scene

Use lighting, camera tweaks, and post-processing to visually differentiate the two without changing any geometry.
