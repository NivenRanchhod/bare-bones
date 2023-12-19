---
layout: post-layout.njk
title: Parallax in Email with fallback - Email Experiment
description: An experiment with faux absolute + parallax as a progressive enhancement.
date: 2023-04-10
tags: ["post"]
# source: medium
---


<div style="position: relative; padding-bottom: 54.6875%; height: 0; margin:2rem 0; background:#8F48FF;"><iframe title="A recording of my test email using parallax, successfully working in the Parcel email build preview" src="https://www.loom.com/embed/2c482b99e4134b28bcfc5ac50d6ecde8" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<a class="button scroll-transition" href="/code/parallax-in-email" target="_blank">View&nbsp;this&nbsp;experiment</a>

<a class="button scroll-transition" href="https://parcel.io/e/99e7b39f-7186-4025-8d18-848f93ccfe2f?" target="_blank">Open in Parcel &nbsp;<svg class="button-icon" viewBox="0 0 200 200" style="display:inline-block; width:25px; height:25px; fill:#fff; vertical-align: bottom;"><g><path d="M150.4,127.8l-75.7,10.1c-5.1,0.7-10.3-0.8-14.2-4.2l-15.7-13.6L19,123.6
		c-2,0.3-2.9,2.8-1.3,4.2l47.5,41.2c2.4,2.1,5.6,3.1,8.9,2.6l107-14.3c2.1-0.3,2.9-3,1.3-4.2L150.4,127.8L150.4,127.8"/><path d="M150.4,87.1L74.7,97.2c-5.1,0.7-10.3-0.8-14.2-4.2L44.9,79.5L19,82.9
		c-2,0.3-2.9,2.8-1.3,4.2l47.5,41.2c2.4,2.1,5.6,3.1,8.9,2.6l107-14.2c2.1-0.3,2.9-3,1.3-4.2L150.4,87.1L150.4,87.1"/><path d="M19,42.2l103.1-13.7c3.1-0.4,6.1,0.4,8.5,2.3l51.7,40.9c1.6,1.3,0.8,4-1.3,4.3L74,90.2
		c-3.2,0.4-6.4-0.5-8.9-2.6L17.6,46.4C16.1,45.1,16.9,42.5,19,42.2L19,42.2"/>
</g></svg>
</a>
<br>


> Please note: This is not a mobile responsive project, so things will look squeezed and positioning on mobile will be out, but the main workings should be intact.


Here is a fun little project I've been tinkering with for a wee while. I have wanted to play with an abstract email challenge for a long time but I just haven't had the right project to spark that fire that makes me obsess over an idea.

One night this ad for Gousto (a recipe box company in the UK), popped up while we had the TV paused:
<img src="/images/blog-images/photo-of-ad-cropped.jpg" alt="A photo of the TV ad showing a hand sprinkling coriander leaves over a dish, with two lines of text placed in amongst the individual leaves to give a layered effect." loading="lazy" decoding="async" style="width:100%; max-width:300px; border-radius:10px; margin:2rem 0;" />

I instantly thought of my favourite technique, faux absolute positioning. While I wouldn't be able to recreate the design without the original image (which I couldn't track down), I could take the premise and find an equally intricate image to pull off the same effect.

<div class="divider"><img src="/images/crossbones.svg" alt="" loading="lazy" decoding="async" /></div>


## 🏗️ Setup

I scoured stock imagery sites until I found an interesting image:
<img src="/images/blog-images/sushi-stock-image.jpeg" alt="The stock image shows a hovering plate with seven pieces of sushi, sesami seeds, seeds and garnish falling in the direction of the plate" loading="lazy" decoding="async" style="width:100%; max-width:300px; border-radius:10px; margin:2rem 0;" />

First port of call was to remove the background and then split the elements up into separate layers so I could insert some text in amongst everything.

Here is a simple mockup I created once everything was cut out, to get an idea of how I could build it:
<img src="/images/blog-images/sushi-edit.jpg" alt="The same stock image now cut up and pieced back together in the same formation as the original to allow me to add the text 'I love Sushi'" loading="lazy" decoding="async" style="width:100%; max-width:450px; border-radius:10px; margin:2rem 0;" />

I'm not great with words and "I love Sushi" was the best I could come up with 😂 <br>
I tweaked it slightly during the build, to include a heart shaped piece of sushi so it reads slightly better now, but I digress.<br>
In the end, there will be some overlap between the layers, but the main goal is keep that text as live text.

It was around this time I remembered that I've always wanted to attempt a parallax effect in email. 
This technique was new to me, in implementation. Even on the front end, I hadn't ever used or even played with CSS based parallax, so I had some homework to do before I could see if this would even work in any email clients.

But first, some reflection.

<div class="divider"><img src="/images/crossbones.svg" alt="" loading="lazy" decoding="async" /></div>

## 🫗 One for the homies

In the past, the community has come up with a great alternative to parallax, in fixed/absolute positioning. A great example of this is the infamous [Taco&nbsp;Bell](https://parcel.io/e/666b2172-828c-40cf-9fd0-f84e8deec8a7) email by [Heidi Olsen](https://twitter.com/SwissWebMiss?t=Obxgbym7lDJYk-nzoVeXiw&s=09). Heidi was kind enough to share a little background and the actual code to this email. <br>
Well worth a look if you haven't seen it before:
- [Heidi's fixed position email](https://parcel.io/e/666b2172-828c-40cf-9fd0-f84e8deec8a7)
- [Heidi's write-up on the Litmus forum](https://litmus.com/community/discussions/5118-using-z-index-and-fixed-positioning-to-create-a-scrolling-experience)

Email on Acid then built their own version a year or so later, improving on Heidi's idea, with better email client support, utilising… faux absolute positioning! That technique just gives and gives and gives. 

Again, well worth a look to see where they made improvements over Heidi's idea.
- [EoA's Halloween fixed position email](https://marketing.emailonacid.com/happy-halloween)
- [EoA's write-up](https://www.emailonacid.com/blog/article/email-development/how-we-created-out-interactive-scrolling-halloween-email/)

And there are plenty more examples in our community, I've only scratched the surface.

<div class="divider"><img src="/images/crossbones.svg" alt="" loading="lazy" decoding="async" /></div>

## 🧮 The game plan

Going into this, I knew most of the ins and outs of the faux absolute technique, from my work on the [multi-axis faux absolute module](https://www.emailonacid.com/blog/article/email-development/faux-absolute-positioning/) for a client project at [Mailix](https://www.mailix.com/multi-axis-faux-absolute-positioning-in-html-email/), so I knew the approach to take and the email client support.

I also knew that parallax wouldn't be easy, otherwise we'd see it used more often. And if it was supported even in one email client, it would be treated as a progressive enhancement on top of a more solid base. And that was my goal. Faux absolute as a strong, well supported base for the majority of email clients and parallax as a bonus, if it is even supported.

I mentioned this earlier but I think it's important to note again - I decided not to go down the rabbit hole of making this responsive. I just wanted it to work and there is so much positioning involved that it would be a hell of a job adapting everything as the whole project scaled. If you test this out, you will definitely see some small positioning issues on mobile, but that's okay. The main point is to show parallax working in Apple's own mail client(s).

<div class="divider"><img src="/images/crossbones.svg" alt="" loading="lazy" decoding="async" /></div>

## 🛠️ Main build

I urge you to look into the faux absolute positioning technique if you haven't already. Basic premise is to wrap all of the elements you want to layer over the top of each other, in divs (I've only tested with divs, but may work with a span or even a table) individually, set the max-height to 0 on those divs which in-turn makes them trick each other into thinking everything is zero'd out. Then play with the max-height value of each div to push surrounding elements down or use absolute positioning, margin or padding to push your elements around. Outlook still requires VML to make this work but VML supports position absolute which is way easier to use 🎉🎉🎉

Here is the base build with wording tweak included 😉:
<img src="/images/blog-images/faux-absolute-final.jpg" alt="A preview of the base project build using faux absolute positioning, with the text now reading 'I heart Sushi'" loading="lazy" decoding="async" style="width:100%; max-width:450px; border-radius:10px; margin:2rem 0;" />

Rendering results were as expected. It worked everywhere except GMX, Web.de, T-Online.de and Comcast. Comcast I can't do too much about as I'm not US based and cannot get an account to test. 

GMX, Web.de, T-Online.de all require inline CSS. This project required a fair amount of CSS because of the targeted fixes, so I'm not going to set up the inlining just for these three clients, considering it's an experiment. However, it would be simple enough to fix for a typical faux absolute + parallax build with full width blocks and a few small elements layered over the top.

tl;dr - I can't be arsed fixing the build for these clients since they've made it incredibly more difficult to code emails. It's just silly and ultimately this is just an experiment.

<div class="divider"><img src="/images/crossbones.svg" alt="" loading="lazy" decoding="async" /></div>

## 🪄 The magic

And now the fun but laborious process of getting an understanding of CSS based parallax.

First and foremost, it is imperative you read up on this technique using the best resources available.

1. Keith Clark's [Pure CSS Parallax Websites](https://keithclark.co.uk/articles/pure-css-parallax-websites/) - a lot of detail and scenario work in this how-to. Keith includes some good examples to illustrate how the CSS mimics layers and then how they work with helpful interactive & scrollable diagrams. 
2. Chrome Developers [Performant Parallaxing](https://developer.chrome.com/blog/performant-parallaxing/) (originally written by Paul Lewis) - another in depth breakdown with some basic examples of how the properties work in conjunction.
3. Mark Robbins also adapted one of the examples included in the Chrome Developers post, for [his testing in email clients](https://parcel.io/e/495df74b-ac1b-4de6-8df3-1a11f4f7d8cf). 
<br>
<br>

This technique is heavily reliant on these three properties:
- <code>perspective</code> - defines the distance of an element from the user.
- <code>transform</code> - value of <code>translateZ(#)</code> determines the layer depth and subsequent scrolling speed + <code>scale(#)</code> scales the element back up to the originally intended size.
- <code>transform-style</code> - value of <code>preserve-3d</code> indicates the children of the element, will be positioned in a 3D space.
<br>
<br>

First thing to do was to check all of these properties in [caniemail.com](http://caniemail.com). 
- <code>perspective</code> - not documented yet.
- <code>transform</code> - has great support but that is to be expected as this property isn't specifically for 3D CSS.
- <code>transform-style</code> - not documented yet.

That is unfortunate, but understandable. Two of those properties aren't in everyday use for email. Ahh well. Time to test. 

I sent [Mark's adapted parallax test](https://parcel.io/e/495df74b-ac1b-4de6-8df3-1a11f4f7d8cf) to Litmus first, to see if <code>transform:translateZ(#);</code> was being respected. Without this, the scrolling speed variance can't be set, to give the illusion of distance. Thankfully it was working in Apple Mail, but the 3D properties weren't taking any effect in any other client. 

While the <code>translateZ</code> value was being respected in Apple Mail, I still needed to test if the scrolling speed variance effect worked, which I can only do with a manually manipulated Apple device. Weird wording, but you'll see what I mean shortly.

I only have a Windows laptop and an Android phone. My partner has an iPad but she gets a lot of use out of it for her business and artwork and I need a more accessible option, especially when I'm running rounds and rounds of tests. My best option was to set up a virtual Mac on my laptop and reserve the use of the iPad for some final testing. Setting the VM up took maybe a couple of hours including research, downloading files and then setting up the latest available version of the OS.

With that all set up, sending the test to my new test iCloud address, I could see the scrolling working as expected 🙀

<div style="position: relative; padding-bottom: 53.49182763744428%; height: 0; margin:2rem 0;"><iframe title="A recording of my test of Mark's adapted parallax test, showing text with different translateZ values and how the scroll speed is different for them depending on their translateZ value" src="https://www.loom.com/embed/a5c979e35fcb46bcbed5fb2c2e0d7592" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

It may not look like much but think about how all of those elements would usually react or rather not react when the viewport scrolls. They would stay static, keeping their initial distance between each other while the body shifts up. However, in this test, the distance between each element changes. That is the scroll speed variance I'm on about. The scroll speed of each element differs and so they are individually reacting to the scrolling action of the viewport.

Now, on to testing the properties on my build. Unfortunately, it wasn't as easy as applying the parallax properties to my faux absolute base to enhance the build for Apple Mail. The 3D properties completely throw out the faux absolute positioning values.

I found that I had to set up separate positioning values for the parallax build. And to be honest, it was just less of a headache overall having the approaches split up in styles blocks in the head. 

Once all of the elements were set up for the parallax build, I fired off another test to iCloud. 

Boom! Winner winner chicken dinner!

<div style="position: relative; padding-bottom: 53.49182763744428%; height: 0; margin:2rem 0;"><iframe title="A recording showing the parallax email properties applied to my faux absolute build. All of the elements are now mimicking Mark's test, showing differences in scroll speed." src="https://www.loom.com/embed/14a9d77c33be480492499e0cf16d4a85" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<div class="divider"><img src="/images/crossbones.svg" alt="" loading="lazy" decoding="async" /></div>

## 🪛 Fine tuning

I now needed to ensure my parallax property overrides are enabled in Apple Mail and leave the faux absolute base in place by default.

The always reliable [howtotarget.email](http://howtotarget.email) gave me this selector to target all Apple Mail from version 10 and up:

```css
.Singleton .your-class-name {
	/* Replace this comment with your styles */
}
```

This only enabled it for desktop and so I found this combo of selectors in an attempt to enable the build for ios mail on iPads and iPhones:

```css
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2), 
(min-resolution: 2dppx) and (hover: none) {
  _:-webkit-full-screen, 
	_::-webkit-full-page-media, 
	_:future, 
	:root body:not(.Singleton) .your-class-name {
    /* Replace this comment with your styles */
  }
}
```

However, I encountered some conflicts. I tested a bunch of variations of that combo but found reducing it down to just this selector, did the trick:

```css
:root body:not(.Singleton) .your-class-name { 
	/* Replace this comment with your styles */
}
```

Again, these two sets of selectors are split up into two separate style blocks, so they're easy to distinguish. I now have three, one for faux absolute and two for the different Parallax enablers, depending on which Apple device you're on. 

With the selectors in place, I could now see smaller iOS devices showing my build and so it was finally time to steal my partner's iPad for a live test and oh man, did it not disappoint. A bonus was seeing how smooth the parallax effect looks on an iPad. Especially when you scroll back to the top and see the rubber band scroll bouncing effect, accentuates the beauty.

<div style="position: relative; padding-bottom: 80%; height: 0; margin:2rem 0;"><iframe title="A recording from an iPad showing my parallax project working." src="https://res.cloudinary.com/niven/video/upload/v1680993258/Bare%20Bones/Parallax%20%2B%20faux%20absolute%20positioning/parallax-in-email_-_ipad-pro-12.9in-iPadOS-15.6.mp4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

<div class="divider"><img src="/images/crossbones.svg" alt="" loading="lazy" decoding="async" /></div>

## 🧑🏾‍🦯 Accessibility

### 🌀 Reduced Motion

Obviously, with parallax comes motion and especially with this build and the many variations on the scroll speed etc, I thought it would be best to include a way for the build to be respectful of everyone's preferences. So, my two Parallax style blocks are now wrapped in a no-preference reduce-motion media query. <br>
E.g.:
```css
@media (prefers-reduced-motion: no-preference) {
	...
}
```

Now, when a user has set a device motion effect setting off on their device, the faux absolute position build will render, if on a device (online view) or in an email client (Apple Mail / iOS Mail) that supports the required properties.

### 🖥️ Screen Readers

There wasn't a huge amount I needed to do here:

1. There is only one line of text, the H1. It's live text, so assistive tech friendly and can be translated into other languages.
2. The majority of the images are decorative and the text gives context to my message.
3. The one image that will need to give context is the heart shaped sushi nested inside of the H1.

Let's tackle point 3:

Simply adding the word "heart" to the alt attribute will then mean a screen reader will read:

> heading
> 
> 
> level 1
> 
> I
> 
> graphic
> 
> heart
> 
> Sushi
> 
> *<small>*Using Litmus' NVDA screen reader*</small>

The announcement of a graphic being included in the middle isn't ideal, as it breaks the flow of the text and may also in fact break the context I want to include. So instead, I've opted for hiding the image from screen readers by leaving the alt attribute empty and instead adding a screen reader only string with the text "heart". 

Those who can see the imagery, will see:
> "I ❤️ Sushi".

Those using a screen reader will hear:

> heading
> 
> level 1
> 
> I
> 
> heart
> 
> Sushi

Or:
> "I heart Sushi".

I went with "heart" for screen readers, so the context matches, no matter how you consume the content.

Is that the best approach? I don't know. My aim is to give as close to the same experience to everyone and I think that is what I'm doing. Happy to be corrected though.

<div class="divider"><img src="/images/crossbones.svg" alt="" loading="lazy" decoding="async" /></div>

## 🏁 Conclusion

Obviously this is an extreme example of how to use a combo of faux absolute with parallax as a progressive enhancement, but for me that's the fun of learning new techniques. 

I find it difficult to pick up advanced techniques just by reading, in fact I very often inadvertently wander with my thoughts and get distracted and have to reread long posts, many times abandoning them. And usually I learn something new while in the middle of a project, rather than building a test specifically to learn that new thing. That helps keep me engaged because I'm deep in thought on how to achieve something for a client or excited to build a crazy idea, like this.

The thrill for me comes with the initial excitement of an idea, the frustration of my implementation of a new technique into my project not working and then the overwhelming feeling of accomplishment of getting over that hurdle and sharing it with others.

I hope that inspires others to experiment, whether it be with something like this or just a crazy idea they have.





Thanks for reading,<br>
Niven

<div class="divider"><img class="icon-sign-off" src="/images/logo-as-icon-crosses.svg" alt="" loading="lazy" decoding="async" /></div>