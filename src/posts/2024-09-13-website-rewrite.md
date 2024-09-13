---
title: Website Rewrite
description: I have rewritten my website using Svelte and Tailwind CSS with TypeScript.
---

<script>
  import { siteLink } from "$lib/constants";
  import AudioCard from "$lib/components/AudioCard.svelte";
  import AudioCardList from "$lib/components/AudioCardList.svelte";
</script>

Heya! It is time for a new blog post because everything is now new and fancy.

Okay, okay, the general structure of my website is the same and all old blogposts are still available unchanged too. Nevertheless, I took some time to **rewrite the entire thing**. Instead of using Jekyll and Twitter bootstrap for the static site generation, I have set up a codebase using Svelte and Tailwind CSS with TypeScript. Is it overkill to do a simple static website with all of these frameworks? Probably! But it was a whole lot of fun too and Svelte has impressed me a lot. And on top of that, it allowed me to implement some new toys alongside updating my page content.

What new toys? While you're invited to browse the pages on the new website, I can share a few songs that I have added to the [Music](/music) page since my last post. And to do that I can use some new features I wrote for this site! You can click on the song cards below and listen to them while you continue browsing around! Neat, huh?

<AudioCardList>
  <AudioCard src="{siteLink}/music/TheEagleScreamsNoMore.ogg" title="Inches of Mercury - The Eagle Screams No More" genre="Metal" />
  <AudioCard src="{siteLink}/music/WhenIDrink.ogg" title="When I Drink (AC Odyssey Tribute Song)" genre="Alternative Rock" />
  <AudioCard src="{siteLink}/music/TheQueensConservatory.ogg" title="The Queen's Conservatory (Night Fae Piano Tribute)" genre="Piano" />
  <AudioCard src="{siteLink}/music/GlimmerfallCaverns.ogg" title="Glimmerfall Caverns" genre="Piano" />
</AudioCardList>

**Inches of Mercury** is a new project I started, which represents a fictional metal band in the Elite Dangerous universe. The name is based on an inside joke with a friend. We were talking about air pressure and noticed that the US use inches of mercury as the unit for that. I made the comment that it sounds more like a metal band than a unit for atmospheric pressure, which then planted the idea into my head of actually making this a thing. As such, I started working on a first track. Time will tell whether there will be more or not... 😉

**When I Drink** and **The Queen's Conservatory** were tribute tracks to Assassin's Creed Odyssey and the Night Far Covenant in World of Warcraft Shadowlands respectively, as I enjoyed their melodies so much that I had to make a tribute cover.

That's it for my update today. I hope you like the redesign and new functionality!
