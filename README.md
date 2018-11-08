# aaronson-oracle

> In a class I taught at Berkeley, I did an experiment where I wrote a simple little program that would let people type either “f” or “d” and would predict which key they were going to push next. It’s actually very easy to write a program that will make the right prediction about 70% of the time. Most people don’t really know how to type randomly. They’ll have too many alternations and so on. There will be all sorts of patterns, so you just have to build some sort of probabilistic model. Even a very crude one will do well. I couldn’t even beat my own program, knowing exactly how it worked. I challenged people to try this and the program was getting between 70% and 80% prediction rates. Then, we found one student that the program predicted exactly 50% of the time. We asked him what his secret was and he responded that he “just used his free will.”

\- Scott Aaronson, *Quantum Computing Since Democritus*.

Can you use your "free will"? [Try your hand](http://people.ischool.berkeley.edu/~nick/aaronson-oracle).

## how does it work?

I asked Scott if he remembered what he did, and he said,

> As it happens, I do remember!  All the basic program did was to examine all 32 possible 5-grams (sequences of five f's and d's), and see which 5-grams were more likely to be followed by f or by d in the user's previous keypresses, and then use that to generate a prediction based on the most recent 5-gram.  There might have been various enhancements on top of that -- e.g., if you're not taking enough data for 5-grams to be useful, then you can also look at 4-grams and 3-grams, and you can also "seed" the predictor with 5-gram data from the previous users (hoping that the next user will be pretty similar).

This repo implements the no-enhancements version.

## testimonials

> OMG I'm a caged bird! A caged bird with clipped wings!!!!!

\- My dad

> this is art

\- Noura Howell

Scott himself referenced this oracle at the end of his [reply to Roger Penrose](http://www.scottaaronson.com/blog/?p=2756)

## verifying the trickery

No tricks up my sleeve, I tested it with a PRNG. And you can too - just clone this repository and

```
npm install; npm test
```

## developing

```
npm install
npm run build
```

now open index.html

to build continuously (e.g. while editing

`npm run watch`

## license

BSD
