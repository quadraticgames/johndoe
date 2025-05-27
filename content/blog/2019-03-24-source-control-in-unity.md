---
title: "Revisiting Source Control"
date: 2019-03-24
categories: 
  - "tools"
coverImage: "git.png"
---

![](images/git-workflow-gitflow.png)

It's been a minute since I've used source control tools on mid-to-large sized software projects. Back in the day, we used Perforce and I recently revisited Perforce (which has a nice, free package for small teams). But I simply could not get it up and running.

Next up I considered using Github, which I have used more recently for a number of (small) Angular projects. The Github workflow took some getting used to, but I did finally get the hang of it.

Until I take the plunge for a full, paid Unity license(s), I'm looking for a source control solution that is inexpensive (or free) that isn't too complicated to get set up and running. Thankfully, I found this tutorial on the Unity website:

**[Creating Your First Source Control Repository](https://unity3d.com/learn/tutorials/topics/cloud-build/creating-your-first-source-control-repository)**

The gist of this setup is that you use these three tools:

- Bitbucket: A free repository for small projects
- Git: A popular source control system, integrated with Bitbucket
- SourceTree: A user-friendly GUI that works with Git and Bitbucket

I was able to get a sample project up, running, and synced in just under ten minutes. I'm able to commit changes and push to the repo. Still trying to figure out how to rollback to a previous commit, but for now, this looks like a nice, clean solution for collaborative source control.

\* _Update 4/21/19: After much trail and error, I decided to go back to GitHub and GitHub Desktop. I couldn't get Bitbucket and SourceTree to work across multiple devices (though the was likely due to how I had things set up on my Mac and Windows boxes). Additionally GitHub now offer collaboration on privates repositories on its free plan._
