---
layout: "../../layouts/BlogPost.astro"
title: "Building my first split keyboard (Lily58) ⌨️"
pubDate: "Sep 25, 2022"
heroImage: "https://i.imgur.com/EfTedzQ.jpg"
---

I've wanted to use a split keyboard ever since I started watching
[ThePrimeagen](https://www.youtube.com/channel/UC8ENHE5xdFSwx71u3fDH5Xw),
a software engineer and streamer who uses a split keyboard with Neovim.

As a software engineer, I'm on the computer coding all day in Vim. Sometimes after a coding session, my wrists and hands start to hurt.

I'm concerned about getting an RSI (repetitive strain injury). As it is, I've already gotten a wrist injury from exercise two months ago. I think that a split keyboard can potentially improve my computer ergonomics, because I can align my wrists and shoulders to more natural position while typing.

And so I started searching for a keyboard that would not only reduce my wrist pain and risk of getting an RSI, but also make me
🔥 BLAZINGLY FAST 🔥 in Vim.

## Finding a Good (Available) Ergonomic Keyboard

At first, it seemed nigh impossible for me to get my hands on a split ergonomic keyboard in my country, the Philippines.

From what I've seen, most split keyboards were either custom-built (ordering custom parts/PCBs and soldering), or too expensive on top of import prices (i.e. Kinesis/Ergodox).

Luckily, someone in a Discord server I'm in runs a business here that sells pre-built split keyboard kits. Thank
goodness for [Next Keyboard Club](https://nextkeyboard.club/)!

I looked at his shop's catalog, and decided to buy the [Lily58 Pro](https://nextkeyboard.club/product/lily58-pro-mx-hotswap-keyboard/). It's a 60%-ish split keyboard with
a small OLED display on each half.

The Lily58 has a columnar stagger, which means that the keys are
staggered by column, instead of being *row staggered* like in regular keyboards. I'll explain in an
image below.

Next Keyboard Club also had other keyboards (Corne/Reviung41/Fifi) in stock, but they were 40% keyboards without the number row. I
need the number rows for games and switching workspaces in a [tiling window manager](https://hyprland.org/).

I'm not
nerd enough yet to give up the number row, so I'm good for now. ~~buys a [Corne keyboard](https://nextkeyboard.club/product-tag/corne-v3-0-1-mx/) 6 months later anyways~~

### Row and column stagger? I still don't get what they mean

I'm bored, and I have nothing else to do, so I made this illustration to show the difference between
keyboard layouts.

<img src="https://i.imgur.com/GRUTC9H.png" alt="illustration showing the difference between
row stagger, column stagger and ortholinear keyboards">


## The Parts

### Keycaps

I chose to use blank DSA-profile keycaps from KBDFans. I initially wanted every keycap to be black, but I realized that it looks boring. Instead, I went with a keycap colorscheme of black, orange, and white.

### Switches

On my former regular keyboard (Royal Kludge RK71), I had brown switches. What I liked about brown switches was the
tactility. What I didn't like was that they weren't tactile enough.

So I replaced them with Akko's CS
Jelly Purple switches, which were tactile switches like browns but with a stronger tactile feedback. I would describe them as light-medium in tactility, heavier than browns but lighter than Durock T1/Boba U4T switches. I'll reuse these trusty Akko switches for my build.

## Keyboard Components

| Name                           | Price        | Link        |
|--------------------------------|--------------|-------------|
| Lily58 Pro (Smoke Black Acrylic, Type-C Pro Micro) | ₱6,627   |  [Next Keyboard Club](https://nextkeyboard.club/product/lily58-pro-mx-hotswap-keyboard/)         |
| Akko CS Jelly Purple Switches  | ₱1,043         |  [Shopee](https://shopee.ph/akkogear.ph/11285996804#ShopeePH)           |
| KBDFans DSA Blank Keycaps      | ₱1,685            |  <a href="https://shopee.ph/DSA-BLANK-KEYCAPS-1U-(10PCS)-(kit-12-kit-22)-i.371723914.9125639315?sp_atk=2ba5fd83-6dd1-41af-97c5-d87e8f9decf9&xptdk=2ba5fd83-6dd1-41af-97c5-d87e8f9decf9">Shopee</a>           |
| Customized Coiled Cable        | ₱688            |  [Shopee](https://shopee.ph/Customized-Coiled-Cable-i.104679693.6385323656)           |
| **Total**                          | **₱10,043**             |             |

## Assembly

The Lily58 keyboard I bought was already soldered, installed with OLEDs and flashed with firmware. However, you still have to assemble the PCB and plates with screws and standoffs, and place the switches/keycaps yourself.

I'll admit I was a bit clumsy while assembling my Lily58 keyboard. I've spent all my time tinkering
with software but never with hardware before.

I dropped screws on the floor several times, and I was almost sure I lost the first screw I dropped until I
found it next to my computer case.

I think I've been too rough with the PCBs, because I've manhandled them **too many** times while
aligning them with the plates.

But hey, the OLED turned on when I plugged the cable, and I'm typing on my
*functional* Lily58 as I'm writing this! So everything turned out just fine in the
end. I think. 😅


## Build Results

Here are the pictures of my finished keyboard build. It's not the most beautiful or striking, but I'm pretty proud of it.

<img src="https://i.imgur.com/yNV94Ry.jpg" alt="Lily58 split keyboard with a black case, and black, gray and
orange keycaps connected with a gray coiled cable">

<img src="https://i.imgur.com/u0uHiC4.jpg" alt="Lily58 split keyboard right half on a black
deskmat">

<img src="https://i.imgur.com/lC4Dt0w.jpg" alt="Lily58 split keyboard with a black case, and black, gray and
orange keycaps connected with a gray coiled cable">


## My Initial Thoughts

On a normal keyboard, I was consistently typing 120+ WPM (words per minute) on [Monkeytype](https://monkeytype.com/). I was worried that a split keyboard
could slow down my typing speed to 10-30 WPM for a few weeks. Many people I know found that they were
drastically slowed down from adjusting to a split keyboard and that it took a few weeks or months for
them to adjust.

It turns out my worries were unfounded. I practiced typing on my Lily58 with Monkeytype, and I was quickly able to reach 110+ WPM in a few hours. I was able to get that high so fast because I've been practicing touch typing for more than half a year now. After a day of using my Lily58, I was able to achieve 121 WPM.

<img src="https://i.imgur.com/cr7tqeI.png" alt="Angelo's score on Monkeytype with his split
keyboard, 121 words per minute">

<img src="https://i.imgur.com/PSDWriz.png" alt="My score graph">


I looked at the graph of my typing speed over time in Monkeytype. In the graph above, you can see a dip in typing speed
on the right. That's when I switched to my new split keyboard. My typing speed dipped, but I'm
recovering quite fast. I predict that in a week, I'll be back to my normal typing speed.

After I was accustomed to the columnar stagger layout, it does feel more comfortable to me than a
row stagger layout. I really, really like the keyboard being split into two.

Lily58 has 58 keys, which is 13 keys less than my previous keyboard (71 keys). I was able to manage the reduced key count because I can do layering and other shenanigans with this keyboard.
I use [Vial](https://get.vial.today/) to modify my keyboard layout and layers.

## Vimming Time

To try out Vim on my Lily58, I'm currently writing this blog article in Vim. Already, I can write in Markdown super well. I still have to see how I fare doing work projects with this keyboard.

I've set up my Super key (switched with the Alt key) so that when I tap it twice, it becomes Escape instead. It has become an intuitive way for me to exit out of insert mode. Here's my normal layer layout below.

<img src="https://i.imgur.com/oxKVf6F.png" alt="My layer 0 key set">

## Conclusion

I'm still not as fast yet in my Lily58 as I was in my old regular keyboard, but I feel like
this keyboard will make me the fastest I've ever been in Vim.

Already, I can notice the benefits of having more freedom to place your hands around. I can
position my arms in a more comfortable and natural position. I'm probably never going back to
a regular keyboard anymore, because I've fallen in love with splits.
