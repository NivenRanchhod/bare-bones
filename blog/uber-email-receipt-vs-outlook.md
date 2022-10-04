---
layout: post-layout.njk
title: Uber email receipt vs. Outlook — an exclusive take from an email developer
description: I did a deep dive into the HTML template causing so much strife for Outlook and got a little obsessive along the way.
date: 2022-08-05
tags: ["post"]
source: medium
---

I did a deep dive into the HTML template causing so much strife for Outlook and got a little obsessive along the way.

<span class="stagger">🔗 Original story by [Bleeping&nbsp;Computer ](https://www.bleepingcomputer.com/news/microsoft/microsoft-outlook-is-crashing-when-reading-uber-receipt-emails)</span>

<span class="stagger">![](https://media.giphy.com/media/HteV6g0QTNxp6/giphy-downsized-large.gif)
_Pointless but funny gif of Ron Swanson from Parks & Recreation, dumping his computer in a bin. Outlook troubles, Ron?_
</span>
<br>
<br>

## 📖 How it started

The email community was having a field day with this. As soon as the news started circling about an email that was finally able to take down the mighty Outlook desktop application (which is notorious in it's own right for being a poor experience), we were trying to figure out what could have possibly caused the bug.

The description ‘complex tables' was thrown about like anyone knew what that actually meant. One eagle eyed community member found an [example of a recent Uber email receipt](https://reallygoodemails.com/emails/personal-your-tuesday-morning-trip-with-uber) dating back to May 2022, saved on [Really Good Emails](https://reallygoodemails.com/). She was able to pull the source code and share with the community.

I jumped at the chance to try and figure out what the issue actually was as well as get a peek behind the curtain on how a global company of this size, codes their emails.

Let's just say, I was impressed but for all the wrong reasons 😔

<div class="divider"><img src="{{ '/images/crossbones.svg' | url }}" alt="" /></div>

## 👷🏾‍♂️ Let's get technical

First I dropped the source code into [Parcel](https://parcel.io/) (a dedicated Email builder tool) and skimmed through the HTML.
Parcel has helpful tools in it's editor, such as:

- **Inspect Element** — Click any HTML element in the preview to jump to the corresponding code.

- **Focus Mode** — Highlights and scroll the HTML element you are editing into view.

- **Expanded Table View** — Outline table elements to easily debug table-based layout issues.

I cannot emphasise enough, how helpful these extra editor tools were to debugging this email. Without them, I think this would have taken twice the time to review. And they're included in the Free plan, which I'm on.

Thanks Parcel 👍🏾


<div class="divider"><img src="{{ '/images/crossbones.svg' | url }}" alt="" /></div>

### Container

On initial review, I noticed a worrying trend… Numerous layers of nested tables for each section of the template.

On top of that, an attempt at a fluid setup for the structure with some of the wrapping tables using max-widths (which Outlook doesn't support) and then a MSO or Outlook specific table with a fixed width (to fix the lack of max-width support).

```html
<!--[if (gte mso 9)|(IE)]>
<table width="700" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td>
<![endif]-->
<table
  width="100%"
  border="0"
  cellpadding="0"
  cellspacing="0"
  style="border:none; border-collapse:collapse; border-spacing:0; max-width:700px; mso-table-lspace:0; mso-table-rspace:0; width:100%"
  class="wrapper"
>
  ...
</table>
```

This setup is completely normal, but to see it being used on almost every layer of the nested structure, is simply not necessary.

This is how the email looked with the ‘Expanded Table View' switched on:

![A screenshot of the ‘Expanded Table View' in Parcel, showing the multiple layers of nested tables.](/images/blog-images/uber-review-complicated-table-structure.jpg)

I discovered there were five extra tables wrapping the outer 700px wide container.

Removing these extra tables resulted in 38 lines of code being removed and a drop in file size by 33kb.
I mean, that is huge!

The email originally weighed in at 172kb. It's now sitting at 139kb, after this removal.


<div class="divider"><img src="{{ '/images/crossbones.svg' | url }}" alt="" /></div>

### Header

The header was also wrapped in another six tables 🤯

![Screenshot of the header area and it's contents of the Uber email in question](/images/blog-images/uber-review-header.png)

Designs like this are rather simple to lay out.

1. One full width table which has the background colour and vertical padding.

2. A centred inner table of the intended width, with the two elements sitting in two columns since they stay side by side on smaller screens.

That's two tables.
Four extra tables doesn't seem like a lot, but removing these resulted in a 5kb reduction in HTML file size.

5kb doesn't sound like a lot, but in a world where Gmail clips emails larger than 102kb, a 5kb saving can be huge.
The amends to the header meant we were sitting at 134kb.


<div class="divider"><img src="{{ '/images/crossbones.svg' | url }}" alt="" /></div>

### 🏃🏾‍♀️ And on and on...

The themes from the points above continue on for all sections.
Extra tables with CSS being applied at different stages.
In some cases, padding was being applied vertically in one layer and then one or two layers further in, horizontal padding was being applied.

Other issues I found:

- Heavy multi-table faux columns. 13 lines of code to mimic a table column. Hints at a mix of development styles by multiple developers.

- 100% width Outlook fallbacks for 100% width tables. Effectively, this doubles the code for no reason.

- A lot of unused CSS in the head. A hangover from a templated system. This isn't too concerning but making CSS in the head conditional depending on the use would make savings in file size too.

- Class names for mobile styles are all doing the same thing. In this case, the .full class name (at the bottom of the list) would have sufficed.

```css
@media screen and (max-width: 699px) {
  .t1of12,
  .t2of12,
  .t3of12,
  .t4of12,
  .t5of12,
  .t6of12,
  .t7of12,
  .t8of12,
  .t9of12,
  .t10of12,
  .t11of12,
  .t12of12,
  .full {
    width: 100% !important;
    max-width: none !important;
  }
}
```

![](https://giphy.com/gifs/computer-disgusted-hammer-12bVDtXPOzYwda)

<div class="divider"><img src="{{ '/images/crossbones.svg' | url }}" alt="" /></div>

### 🦾 Accessibility

I ran the original code through the Litmus accessibility checker and found these results:

- Images are missing alt attributes

- &lt;html&gt; is missing a lang attribute

- A large number of presentational tables are missing a role attribute to inform screens readers to ignore their structure.

These are the basics for email accessibility, especially alt attributes on images, even if empty.

Not a good look.

<div class="divider"><img src="{{ '/images/crossbones.svg' | url }}" alt="" /></div>

## Conclusion
Outlook crashing or being crippled by HTML absolutely shouldn't be happening!
The Outlook team pushing out a hot fix, begs the question… Why can't they do the same to fix the numerous issues with how Outlook renders HTML, which have plagued developers for years and over multiple versions of the software?

On the flipside, why is a Unicorn like Uber unable to produce standard HTML email templates?
There is a flourishing community of [#emailgeeks](https://email.geeks.chat/) sharing how to build and deliver emails in a standard and accessible way.

We now also have the [Email Markup Consortium](https://emailmarkup.org/), made up completely of community members, attempting to help the community and ESPs set standards for everything email.
Resources are in reach.

I've been building emails for eight years now. I've seen email templating systems of all sizes in my time, but never anything this poorly built and managed. And it's sad to see such poor accessibility integration.
<br><br>

**⚠️ I must emphasise**<br>
There is actually nothing complex about the table structure being used in this template. ‘Complex tables' is the wrong term to use in this instance.
It's simply convoluted and poorly built. That's it.
Band-aids are being** applied over older band aids. Clearly, no one is reviewing the code base and ensuring it's up to date, being applied correctly or even up to scratch standards wise.

I'm still not 100% clear on what the specific issue was.
All I know is that cleaning the HTML slightly, fixed it. No HTML errors were showing in the original file, so it doesn't seem to be an invalid HTML issue.
It's as if Outlook was itself overwhelmed by the sheer over complication of what should have been a simple build 😵
<br><br>

**Do better Uber.**<br>
You have the money and resource to fix this.
We as a community would love if you reached out for help.
We'll welcome you in, run you through what you need to work on and help with implementation.

We look forward to hearing from you ✌🏾

<img class="icon-sign-off" src="/images/logo-as-icon-crosses.svg" alt="" />