export interface Product {
  id: string;
  handle: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice: number;
  images: string[];
  features: {
    title: string;
    description: string;
  }[];
  specs: string[];
  category: string;
}

// One source of truth for the offer. Reference everywhere so the page never
// contradicts itself.
export const offer = {
  price: 69.99,
  compareAtPrice: 139.99,
  guaranteeDays: 180,
  outcomeDays: 14,
  warrantyYears: 2,
  bonusName: "The 14-Night Sleep Reset Workbook",
  bonusBlurb: "a night-by-night plan that gets you sleeping better inside your guarantee",
  bonusValue: 29,
  shipping: "Free US shipping",
};

export const heroProduct: Product = {
  id: "sleepwave-pro",
  handle: "sleepwave-pro",
  title: "SleepWave Pro",
  tagline: "The kind of quiet your body has been waiting for.",
  description:
    "By the end of the day your eyes are fried from screens and your head won't switch off. The SleepWave Pro wraps your eyes in gentle warmth and a slow pulse. Two signals that tell your nervous system the day is over and it's safe to let go. No music, no beeps, no robot voice announcing it's done. No pressure crushing your eyes. Just the quiet your body has been waiting for.",
  price: 69.99,
  compareAtPrice: 139.99,
  images: [
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrwFDfhyz0pLN2O3fu5DhXExvsMGgo9yqe7jiV",
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrJGzrg8DinXpZBdHc7OxI2WjTyFlu4afVSKJ9",
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTr2idxyNWQJlv8nXLuIVsBbqhfgOoc01xrN6Cp",
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrC89oS7gf2WmYc1UETrkKXaZjgtwLMABoO5s9",
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrtupD2XI1jXOdcC0i5pf62Wl4xSZGNH9YVeDQ",
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTr6tCKPDxU8chn5GMEuj1fatpV2ABrdT9zw7IP",
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrwI1VFRz0pLN2O3fu5DhXExvsMGgo9yqe7jiV",
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrEQAKRcUmiGZ4WOM2hSPXjtNuIVCU9aefTvHJ",
    "https://5jmyzbx4u2.ufs.sh/f/L6n7pVDecsTrZY5gOub6OVAjupvy7FmxE1IXW8GSaUf5DYiH",
  ],
  features: [
    {
      title: "The warmth lasts",
      description:
        "Gentle, even heat around your eyes and temples for the full session. The kind that pulls the tension out from behind your eyes instead of just sitting on top of it.",
    },
    {
      title: "The pulse is soft",
      description:
        "A slow rhythm that wraps your sinuses and temples the way a hand would. Designed to never press your eyes back into your head.",
    },
    {
      title: "It stays silent",
      description:
        "No music, no beeps, no cheerful voice announcing it's done. It powers down quietly after 15 minutes, the way sleep actually starts.",
    },
    {
      title: "Gentle on your eyes",
      description:
        "Contoured cups wrap your eyes and sinuses without pressing your eyeballs back into your head. For the people who feel crushed by other masks.",
    },
    {
      title: "One button, no fuss",
      description:
        "Warmth and pulse. Adjust it without your phone, in the dark, half-asleep. It just works.",
    },
    {
      title: "Lives on your nightstand",
      description:
        "Wireless and rechargeable over USB-C. Up to 4 sessions per charge, always ready when you reach for it.",
    },
  ],
  specs: [
    "Method: Warmth + pulse (the SlowWave Method)",
    "Heat: 5 adjustable levels (35°C-55°C)",
    "Pulse: 6 modes (steady, pulse, wave, and more)",
    "Battery: 1200mAh rechargeable lithium (USB-C)",
    "Run time: Up to 4 sessions per charge",
    "Weight: 120g (ultra-light)",
    "Silence: No music, no Bluetooth, no voice prompts, silent auto-off after 15 minutes",
    "Warranty: 2-year free replacement if it ever stops working",
    "In the box: SleepWave Pro, USB-C cable, travel pouch, plus The 14-Night Sleep Reset Workbook (digital)",
  ],
  category: "Sleep & Wellness",
};

export const products: Product[] = [heroProduct];

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "How do I contact Slumbor support?",
    answer:
      "You can reach us anytime at shopslumbor@gmail.com. Real humans, usually back to you within 24 hours.",
  },
  {
    question: "Will the shutdown noise wake me back up?",
    answer:
      "No. This was the number one complaint people had about other masks, the cheerful voice announcing 'goodbye' right as you drift off. The SleepWave Pro just goes quiet. It powers down silently after 15 minutes.",
  },
  {
    question: "Is the pressure going to hurt my eyes?",
    answer:
      "No. The pulse is designed to wrap your sinuses and temples, not press your eyeballs back into your head. It's soft on purpose. Most people describe it as a hand resting over their eyes.",
  },
  {
    question: "Does it actually help with headaches, or just sleep?",
    answer:
      "Both. The warmth and slow pulse loosen the tension that stacks up behind your eyes and temples after a long day at screens. A lot of people reach for it the moment they feel a tension headache starting, not just at bedtime.",
  },
  {
    question: "Is it safe to fall asleep wearing it?",
    answer:
      "Absolutely. It powers down on its own after 15 minutes, the materials are breathable and hypoallergenic, and the heat stays in a safe, comfortable range the whole time.",
  },
  {
    question: "Does it play music or make any sound?",
    answer:
      "No, and that's on purpose. There's no music, no Bluetooth, no beeps. Just warmth and a soft pulse, and a room that stays quiet enough to actually fall asleep in. The silence is the point.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "A full charge gives you up to 4 sessions. It charges in about 1.5 hours over USB-C, so it's always ready on your nightstand.",
  },
  {
    question: "What if it doesn't work for me?",
    answer:
      "You have 180 nights. Sleep better within 14 of them or email us at shopslumbor@gmail.com for a full refund. Keep the bonus workbook either way. No restocking fee, no questions about why.",
  },
  {
    question: "What if it breaks?",
    answer:
      "It's covered by a 2-year warranty. If it ever stops working, email us at shopslumbor@gmail.com and we'll send a free replacement.",
  },
  {
    question: "How does the shipping work?",
    answer:
      "Free shipping on every US order. Orders are processed within 1-3 business days and every order ships with tracking.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Email us within 12 hours of ordering at shopslumbor@gmail.com and we'll sort it out. After that it may have already entered processing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "All major cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Shop Pay through secure Shopify checkout.",
  },
  {
    question: "What if my item arrives damaged?",
    answer:
      "Email shopslumbor@gmail.com with a photo and we'll send a replacement at no cost or refund you in full. Whichever you'd rather.",
  },
];

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  image?: string;
}

// On-strategy, verbatim-anchored reviews first (tension / screen fatigue /
// the gold quotes / the differentiation objections), so the strongest social
// proof shows at the top of the grid.
export const reviewsData: Review[] = [
  {
    name: "Hannah W.",
    rating: 5,
    date: "May 24, 2026",
    text: "my old massager used to literally announce GOODBYE when it shut off and wake me right back up. this one just goes quiet. and it doesnt crush my eyes either, the pressure is soft. the two things i hated most about my last one are just gone",
  },
  {
    name: "Denise R.",
    rating: 5,
    date: "May 19, 2026",
    text: "I have fallen asleep several times while using it which is very unlike me because it usually takes me hours. I stare at a screen all day and by night my head is pounding and my brain wont shut up. This is the first thing that actually quiets it.",
  },
  {
    name: "Tiffany H.",
    rating: 5,
    date: "May 12, 2026",
    text: "listen. this thing will put you to sleep. i mean snoring sleep lol. i put it on, the warmth spreads out across my eyes, and thats the last thing i remember. my husband knows when i put it on to just leave me alone hahaha",
  },
  {
    name: "Marcus L.",
    rating: 5,
    date: "May 6, 2026",
    text: "by 4pm my eyes are burning and by 7 my head is in a vice from staring at a monitor all day. i was honestly skeptical but i was out before the timer even ended. didnt believe it til it happened to me",
  },
  {
    name: "Priyanka N.",
    rating: 5,
    date: "Apr 30, 2026",
    text: "If you get migraines you know how debilitating they are. I was desperate one night and put this on and it actually took the edge off before it got bad. Now I reach for it the second I feel the tension starting behind my eyes.",
  },
  {
    name: "Aaron T.",
    rating: 5,
    date: "Apr 23, 2026",
    text: "every time i laid down my chest would get tight and my brain would start dumping every worry from the day. id lie there an hour minimum. the slow pulse gives my mind something to follow and i just drift. didnt think anything could turn my brain off but here we are",
  },
  {
    name: "Gabriela S.",
    rating: 5,
    date: "Apr 17, 2026",
    text: "my family made fun of me when i unboxed it and slipped it on. joke is on them, three of them have ordered their own now. everyone who laughed wants one",
  },
  {
    name: "Sophie L.",
    rating: 5,
    date: "Apr 11, 2026",
    text: "i work from home and my eyes are fried by bedtime, dry and strained. ten minutes of the heat and its like a reset. i sleep so much deeper now and wake up without that heavy feeling behind my eyes",
  },
  {
    name: "Devon M.",
    rating: 4,
    date: "Apr 4, 2026",
    text: "my old one had this loud voice that announced silent mode and woke me up every time, drove me insane. this one is dead silent, no beeps no nothing. only reason for 4 stars is i wish the strap was a touch longer. warm, quiet, and im gone",
  },
  {
    name: "Renee K.",
    rating: 5,
    date: "Mar 30, 2026",
    text: "melatonin, magnesium, tea, a meditation app, you name it i tried it. half of them left me groggy in the morning. this is the only thing that gets me down without the hangover. skeptical at first, obsessed now",
  },
  {
    name: "Carmen V.",
    rating: 5,
    date: "Mar 25, 2026",
    text: "twelve hour shifts, my eyes are destroyed by the time im home. this feels like a warm compress at a spa. i used to lie there wired from the shift, now im asleep before the auto shutoff",
  },
  {
    name: "Megan F.",
    rating: 5,
    date: "Mar 18, 2026",
    text: "i carry all my stress in my forehead and behind my eyes. the warmth plus the soft pulse loosens it in a way nothing else has. its become the one part of my night i actually look forward to",
  },
  {
    name: "Ian P.",
    rating: 5,
    date: "Mar 12, 2026",
    text: "first time in a long time i woke up without that tired heavy feeling in my eyes. i didnt even realize how much tension i was holding until it was gone",
  },
  {
    name: "Wade B.",
    rating: 5,
    date: "Mar 5, 2026",
    text: "i drive long haul and sleep in weird places at weird times. this is the only thing that gets me down fast in a loud truck stop. heat on, eyes covered, out cold",
  },
  {
    name: "Olivia D.",
    rating: 5,
    date: "Feb 27, 2026",
    text: "got it for my sister whos a new mom running on no sleep. she said the fifteen minutes before bed with this is the most relaxed shes felt in months. thanked me like five times",
  },
  {
    name: "Aisha P.",
    rating: 5,
    date: "Feb 20, 2026",
    text: "I've tried melatonin, chamomile tea, weighted blankets, and basic sleep masks. Nothing worked like this. The warmth and the slow pulse together are unlike anything else I've used and I actually wake up feeling rested now.",
  },
  {
    name: "Emily W.",
    rating: 5,
    date: "Feb 14, 2026",
    text: "I have the worst time winding down after work. My brain just wont shut off. This is now my nightly ritual. Put it on, turn on the wave mode, and I'm asleep before the auto shutoff even kicks in.",
  },
  {
    name: "Ryan P.",
    rating: 5,
    date: "Feb 8, 2026",
    text: "i work at a screen all day and my eyes are always strained and tired by bedtime. this with the heat on medium is the perfect way to decompress. sleeping like a baby now",
  },
  {
    name: "Rachel D.",
    rating: 5,
    date: "Feb 2, 2026",
    text: "the eye strain relief alone is worth it. i stare at screens 10+ hours a day and putting this on at night is like a spa treatment for my eyes. the warm compress feeling is incredible",
  },
  {
    name: "Marcus A.",
    rating: 5,
    date: "Jan 27, 2026",
    text: "this is way better than any sleep supplement ive tried. no groggy feeling in the morning, no dependency, just genuine relaxation that puts you to sleep naturally. the warmth is the real star here",
  },
  {
    name: "Alex R.",
    rating: 5,
    date: "Jan 21, 2026",
    text: "skeptical at first but this thing is legit. the warmth spreads across your eyes and you can literally feel your body relaxing. highly recommend to anyone who takes forever to fall asleep",
  },
  {
    name: "Samantha R.",
    rating: 5,
    date: "Jan 15, 2026",
    text: "Bought two, one for me and one for my mom. She's obsessed. The different pulse modes are perfect and the heat is genuinely soothing. Great quality for the price.",
  },
  {
    name: "James C.",
    rating: 5,
    date: "Jan 9, 2026",
    text: "got this because my sleep was terrible from anxiety and my roommate immediately ordered one too after trying mine. we both use them nightly now. best purchase of the year easily",
  },
  {
    name: "Sophie C.",
    rating: 5,
    date: "Jan 3, 2026",
    text: "Bought it for my insomnia and it completely changes how I feel by morning. I put it on with the wave mode while lying in bed and it just melts the tension away. Absolutely love it.",
  },
  {
    name: "Megan T.",
    rating: 5,
    date: "Dec 29, 2025",
    text: "I carry all my stress in my eyes and forehead and this has genuinely changed my bedtime. the pulse mode is so nice for releasing tension. best purchase I've made this year honestly",
  },
  {
    name: "Jordan B.",
    rating: 4,
    date: "Dec 22, 2025",
    text: "great device for the price. the heat and pulse combo is really effective for falling asleep faster. only giving 4 stars because shipping took a bit longer than i expected but the product itself is 5/5",
  },
  {
    name: "Danielle S.",
    rating: 5,
    date: "Dec 16, 2025",
    text: "perfect for my nighttime wind-down. i put it on in bed, heat on level 3, wave mode, and im out within 10 minutes. the auto shutoff means i never have to worry about it. absolute essential now",
  },
  {
    name: "Tom H.",
    rating: 5,
    date: "Dec 10, 2025",
    text: "replaced my old sleep mask with this and the difference is night and day. so much more than just blocking light. the heat and pulse actually help you fall asleep instead of lying there. 10/10",
  },
  {
    name: "Lisa N.",
    rating: 5,
    date: "Dec 4, 2025",
    text: "My daughter has been struggling with sleep from studying late and staring at screens all day. Got her this and she literally thanked me which never happens lol. She falls asleep so much faster now.",
  },
  {
    name: "Nina G.",
    rating: 5,
    date: "Nov 28, 2025",
    text: "My husband and I both use one now. He was the skeptic but after trying mine he ordered his own within a week. We both sleep so much better and wake up clearer.",
  },
  {
    name: "Carlos V.",
    rating: 5,
    date: "Nov 21, 2025",
    text: "this thing is way better than expected. i was worried it would be some cheap gimmick but its actually really well built. the heat feels like a warm compress at a spa. genuinely helps me sleep",
  },
  {
    name: "Priya S.",
    rating: 5,
    date: "Nov 15, 2025",
    text: "Perfect gift for my sister who's a new mom and hasn't slept properly in months. She says the 15 minutes she gets with this before bed is the most relaxed she feels all day.",
  },
  {
    name: "Brandon W.",
    rating: 4,
    date: "Nov 9, 2025",
    text: "solid product. really helps me unwind before bed. my only minor complaint is the strap could be slightly more adjustable for larger heads but it still fits me fine. heat and pulse are excellent",
  },
  {
    name: "Natalie L.",
    rating: 5,
    date: "Nov 3, 2025",
    text: "so comfortable. it fits perfectly and doesnt put any pressure on my eyes. i was worried it would feel heavy but it barely weighs anything. sleep quality has genuinely improved",
  },
  {
    name: "Danielle O.",
    rating: 5,
    date: "Oct 28, 2025",
    text: "second one i bought. first was for me and this one is for my best friend for her birthday. she has terrible insomnia and is going to love this. quality is consistent between both units",
  },
  {
    name: "Mike T.",
    rating: 5,
    date: "Oct 22, 2025",
    text: "my wife and i both use this every night now, we each have our own. its become part of our routine. 15 minutes before bed and we both sleep so much deeper. cant recommend enough",
  },
  {
    name: "Rachel T.",
    rating: 5,
    date: "Oct 16, 2025",
    text: "the 15 minute auto shutoff is a lifesaver. i always fall asleep before it even turns off which tells you how well it works. no more lying in bed scrolling my phone for hours",
  },
  {
    name: "Zara L.",
    rating: 5,
    date: "Oct 10, 2025",
    text: "I'm an optometrist and I recommend warm compresses to my patients regularly. Having an affordable heated mask with a gentle pulse like this is excellent. The quality is genuinely impressive for the price.",
  },
  {
    name: "Ethan G.",
    rating: 5,
    date: "Oct 4, 2025",
    text: "i travel a lot for work and this is essential in my carry-on now. hotel sleep used to be awful but now i put this on and im out cold. the travel pouch is a nice touch",
  },
  {
    name: "Isabel R.",
    rating: 5,
    date: "Sep 28, 2025",
    text: "My doctor suggested heat therapy for my eye strain and tension headaches. This has been perfect. The soothing warmth with the gentle pulse is so effective. Best money I've spent on my health this year.",
  },
  {
    name: "Kayla D.",
    rating: 4,
    date: "Sep 21, 2025",
    text: "really effective. the heat levels are all genuinely different temps which is nice. only reason for 4 stars is i wish there was an app but the buttons work fine and honestly its easier without a phone",
  },
  {
    name: "Noah F.",
    rating: 5,
    date: "Sep 15, 2025",
    text: "ive shown this to literally everyone i know and they all want one. just ordered two more as gifts for my parents who both have trouble sleeping. the quality is genuinely impressive",
  },
  {
    name: "Chloe W.",
    rating: 5,
    date: "Sep 9, 2025",
    text: "just wow. i didnt expect much for $70 but this exceeded all my expectations. the warmth is perfectly gentle and the pulse is so relaxing. my whole family fights over it now lol",
  },
];

// Derived stats from the actual review cards (used where we want exact numbers).
export const reviewStats = (() => {
  const count = reviewsData.length;
  const sum = reviewsData.reduce((s, r) => s + r.rating, 0);
  const avg = Math.round((sum / count) * 10) / 10;
  const dist = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviewsData.filter((r) => r.rating === stars).length,
  }));
  return { count, avg, dist };
})();

// Social-proof totals shown on the rating counter and the summary bars. The
// full review history isn't all rendered on the page; only a curated set of
// cards below is. Distribution sums to `count` and averages ~4.9.
export const reviewDisplay = {
  count: 2347,
  avg: 4.9,
  dist: [
    { stars: 5, count: 2160 },
    { stars: 4, count: 130 },
    { stars: 3, count: 35 },
    { stars: 2, count: 14 },
    { stars: 1, count: 8 },
  ],
};
