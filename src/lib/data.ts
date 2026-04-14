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

export const heroProduct: Product = {
  id: "dreamwave-mask",
  handle: "dreamwave-mask",
  title: "DreamWave Mask",
  tagline: "Fall asleep faster. Sleep deeper. Wake up actually rested.",
  description:
    "The DreamWave Mask combines gentle heat therapy with micro-vibration massage to relax the muscles around your eyes and signal your brain it's time to sleep. Unlike regular sleep masks or supplements, it works with your body's natural wind-down response to help you drift off in minutes.",
  price: 69.99,
  compareAtPrice: 139.99,
  images: [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ],
  features: [
    {
      title: "Gentle Heat Therapy",
      description:
        "Controlled warmth relaxes the delicate muscles around your eyes and temples, signaling your nervous system that it's time to wind down and sleep.",
    },
    {
      title: "Micro-Vibration Massage",
      description:
        "Soothing vibrations release the tension you carry from hours of screen time, helping your eyes and mind decompress before sleep.",
    },
    {
      title: "5 Heat Levels",
      description:
        "From a gentle warmth to a deep soothing heat, find the exact temperature that helps you drift off fastest. Fully adjustable to your comfort.",
    },
    {
      title: "3 Vibration Modes",
      description:
        "Choose from constant, pulsing, or wave patterns. Each mode targets different tension points around your eyes and temples.",
    },
    {
      title: "Ultra-Soft & Ergonomic",
      description:
        "Memory foam contours perfectly to your face with zero pressure on your eyes. The breathable fabric keeps you cool all night.",
    },
    {
      title: "15-Minute Auto Shutoff",
      description:
        "Falls asleep with you. The mask gently powers down after 15 minutes so you never have to worry about turning it off.",
    },
  ],
  specs: [
    "Technology: Heat therapy + micro-vibration massage",
    "Heat levels: 5 adjustable temperatures (38°C-45°C)",
    "Vibration modes: 3 unique patterns",
    "Battery: 1200mAh rechargeable lithium (USB-C)",
    "Run time: Up to 4 sessions per charge",
    "Weight: 120g (ultra-lightweight)",
    "Charge time: 1.5 hours",
    "Includes: DreamWave Mask, USB-C cable, travel pouch, user guide",
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
      "You can reach us anytime at shopslumbor@gmail.com. We typically respond within 24 hours on business days.",
  },
  {
    question: "How does the heat and vibration help me sleep?",
    answer:
      "The gentle warmth relaxes the muscles around your eyes, temples, and forehead, while micro-vibrations release built-up tension. Together, they activate your parasympathetic nervous system — your body's natural wind-down response — helping you fall asleep faster and more deeply.",
  },
  {
    question: "Is it safe to fall asleep wearing it?",
    answer:
      "Absolutely. The DreamWave Mask has a 15-minute auto-shutoff feature, so it gently powers down once you've drifted off. The materials are hypoallergenic and breathable, and the heat stays within a safe, comfortable range at all times.",
  },
  {
    question: "Do you ship worldwide?",
    answer:
      "Yes, we ship to most countries worldwide. Standard shipping typically takes 7-15 business days depending on your location. All orders include tracking.",
  },
  {
    question: "How long does processing take?",
    answer:
      "Orders are processed within 1-3 business days. Once shipped, you will receive a tracking number via email.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "You can request changes or cancellations within 12 hours of placing your order by emailing shopslumbor@gmail.com. After that, your order may have already entered processing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay through our secure Shopify checkout.",
  },
  {
    question: "Will I have to pay customs or import taxes?",
    answer:
      "Depending on your country, you may be subject to local customs duties or import taxes. These are the responsibility of the buyer and vary by region.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, contact us within 30 days of delivery for a full refund. The item must be in its original condition.",
  },
  {
    question: "What if my item arrives damaged or defective?",
    answer:
      "Contact us immediately at shopslumbor@gmail.com with photos of the damage. We will send a replacement at no extra cost or issue a full refund.",
  },
  {
    question: "How long does a refund take?",
    answer:
      "Once we receive and inspect the returned item, refunds are processed within 5-7 business days. It may take an additional 3-5 business days to appear on your statement depending on your bank.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "A full charge gives you up to 4 sessions (approximately 60 minutes of total use). It charges in about 1.5 hours via USB-C, so it's always ready for your nightly routine.",
  },
];

export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  image?: string;
}

export const reviewsData: Review[] = [
  {
    name: "Jessica M.",
    rating: 5,
    date: "Mar 28, 2026",
    text: "i used to lie awake for at least an hour every single night just staring at the ceiling. put this on my first night and was out in maybe 15 minutes. the warmth is so soothing i literally cannot keep my eyes open. game changer for real",
  },
  {
    name: "Samantha R.",
    rating: 5,
    date: "Mar 22, 2026",
    text: "Bought two of these, one for me and one for my mom. She's absolutely obsessed with it. The different vibration modes are perfect and the heat is genuinely soothing. Great quality for the price.",
  },
  {
    name: "Lauren K.",
    rating: 5,
    date: "Mar 15, 2026",
    text: "my under eyes are noticeably less puffy in the morning since i started using this every night. the heat helps with circulation or something because my dark circles are way less noticeable. also i fall asleep SO much faster now",
  },
  {
    name: "Aisha P.",
    rating: 5,
    date: "Mar 8, 2026",
    text: "I've tried melatonin, chamomile tea, weighted blankets, and those basic sleep masks. Nothing worked like this. The gentle heat and vibration combination is unlike anything else I've used and I actually wake up feeling rested now.",
  },
  {
    name: "Rachel D.",
    rating: 5,
    date: "Feb 28, 2026",
    text: "the eye strain relief alone is worth it. i stare at screens 10+ hours a day and putting this on at night is like a spa treatment for my eyes. the warm compress feeling is incredible",
  },
  {
    name: "Emily W.",
    rating: 5,
    date: "Feb 22, 2026",
    text: "I have the worst time winding down after work. My brain just won't shut off. This mask is now my nightly ritual — put it on, turn on the wave vibration mode, and I'm asleep before the auto shutoff even kicks in.",
  },
  {
    name: "Natalie L.",
    rating: 5,
    date: "Feb 15, 2026",
    text: "so comfortable. the memory foam fits perfectly and doesnt put any pressure on my eyes. i was worried it would feel heavy but it barely weighs anything. sleep quality has genuinely improved",
  },
  {
    name: "Nina G.",
    rating: 5,
    date: "Feb 8, 2026",
    text: "My husband and I both use one now. He was the skeptic but after trying mine he ordered his own within a week. We both sleep so much better. Our morning puffiness is basically gone.",
  },
  {
    name: "Olivia H.",
    rating: 5,
    date: "Feb 3, 2026",
    text: "bought this on a whim and now its literally part of my nighttime skincare routine. the heat helps my eye cream absorb better too i think. waking up with fresh looking eyes is everything",
  },
  {
    name: "Priya S.",
    rating: 5,
    date: "Jan 28, 2026",
    text: "Perfect gift for my sister who's a new mom and hasn't slept properly in months. She says the 15 minutes she gets with this mask before bed is the most relaxed she feels all day. She thanked me like five times.",
  },
  {
    name: "Jordan B.",
    rating: 4,
    date: "Jan 22, 2026",
    text: "great device for the price. the heat and vibration combo is really effective for falling asleep faster. only giving 4 stars because shipping took a bit longer than expected but the product itself is 5/5",
  },
  {
    name: "Megan F.",
    rating: 5,
    date: "Jan 15, 2026",
    text: "I carry all my stress in my eyes and forehead and this thing has genuinely transformed my bedtime. the pulsing vibration mode is so nice for releasing tension. best purchase I've made this year honestly",
  },
  {
    name: "Danielle O.",
    rating: 5,
    date: "Jan 10, 2026",
    text: "second one i bought. first one was for me and this one is for my best friend for her birthday. she has terrible insomnia and is going to love this. quality is consistent between both units",
  },
  {
    name: "Rachel T.",
    rating: 5,
    date: "Jan 4, 2026",
    text: "the 15 minute auto shutoff is a lifesaver. i always fall asleep before it even turns off which tells you how well it works. no more lying in bed scrolling my phone for hours. this is my new sleep aid",
  },
  {
    name: "Kevin Z.",
    rating: 5,
    date: "Dec 28, 2025",
    text: "got this for my wife because she always has trouble sleeping and wakes up with puffy eyes. she goes absolutely crazy for it. uses it every single night now. worth every penny and then some",
  },
  {
    name: "Olivia M.",
    rating: 4,
    date: "Dec 22, 2025",
    text: "really effective sleep mask. i use it every night and fall asleep noticeably faster. taking off one star only because i wish the travel pouch was a bit bigger but thats minor. love the product",
  },
  {
    name: "Marcus A.",
    rating: 5,
    date: "Dec 15, 2025",
    text: "this is way better than any sleep supplement ive tried. no groggy feeling in the morning, no dependency, just genuine relaxation that puts you to sleep naturally. the heat therapy is the real star here",
  },
  {
    name: "Sophie C.",
    rating: 5,
    date: "Dec 8, 2025",
    text: "Bought it for my insomnia and it completely transforms how I feel by morning. I put it on with the wave mode while lying in bed and it just melts all the tension away. Absolutely love it.",
  },
  {
    name: "Alex R.",
    rating: 5,
    date: "Dec 1, 2025",
    text: "skeptical at first but this thing is legit. the warmth spreads across your eyes and you can literally feel your body relaxing. highly recommend to anyone who takes forever to fall asleep",
  },
  {
    name: "Tanya J.",
    rating: 5,
    date: "Nov 26, 2025",
    text: "got this as a treat for myself and i dont regret it one bit. my sleep quality is so much better and my eyes look refreshed every morning. the quality is amazing for under 70 bucks",
  },
  {
    name: "Brandon W.",
    rating: 4,
    date: "Nov 20, 2025",
    text: "solid product. really helps me unwind before bed. my only minor complaint is the strap could be slightly more adjustable for larger heads but it still fits me fine. heat and vibration are excellent",
  },
  {
    name: "Lisa N.",
    rating: 5,
    date: "Nov 14, 2025",
    text: "My daughter has been struggling with sleep from studying late and staring at screens all day. Got her this and she literally thanked me which never happens lol. She falls asleep so much faster now.",
  },
  {
    name: "Ryan P.",
    rating: 5,
    date: "Nov 8, 2025",
    text: "i work from home and stare at screens all day. my eyes are always strained and tired by bedtime. this mask with the heat on medium is the perfect way to decompress. sleeping like a baby now",
  },
  {
    name: "Jade K.",
    rating: 5,
    date: "Nov 2, 2025",
    text: "bought 3 of these for gifts and kept one for myself. every single person has texted me saying they love it. its become everyones nightly ritual now. already ordered 2 more for christmas",
  },
  {
    name: "Carlos V.",
    rating: 5,
    date: "Oct 25, 2025",
    text: "this thing is way better than expected. i was worried it would be some cheap gimmick but its actually really well built. the heat feels like a warm compress at a spa. genuinely helps me sleep",
  },
  {
    name: "Anna B.",
    rating: 4,
    date: "Oct 18, 2025",
    text: "Love the mask itself. The warmth is perfect and the vibrations are so soothing. Only 4 stars because it took about 2 weeks to arrive but I understand its shipping from far away.",
  },
  {
    name: "Mike T.",
    rating: 5,
    date: "Oct 12, 2025",
    text: "my wife and i both use this every night now. we each have our own. its become part of our routine. 15 minutes with the mask before bed and we both sleep so much deeper. can't recommend enough",
  },
  {
    name: "Zara L.",
    rating: 5,
    date: "Oct 5, 2025",
    text: "I'm an optometrist and I recommend warm compresses to my patients regularly. Having an affordable heated mask with vibration like this is excellent. The quality is genuinely impressive for the price.",
  },
  {
    name: "Tom H.",
    rating: 5,
    date: "Sep 30, 2025",
    text: "replaced my old sleep mask with this and the difference is night and day. so much more effective than just blocking light. the heat and vibration actually help you fall asleep instead of just lying there. 10/10",
  },
  {
    name: "Danielle S.",
    rating: 5,
    date: "Sep 24, 2025",
    text: "perfect for my nighttime wind-down. i put it on in bed, set the heat to level 3, wave vibration mode, and im out within 10 minutes. the auto shutoff means i never have to worry about it. absolute essential now",
  },
  {
    name: "James C.",
    rating: 5,
    date: "Sep 18, 2025",
    text: "got this because my sleep was terrible from anxiety and my roommate immediately ordered one too after trying mine. we both use them nightly now. best purchase of the year easily",
  },
  {
    name: "Kayla D.",
    rating: 4,
    date: "Sep 12, 2025",
    text: "really effective sleep mask. the heat modes are all genuinely different temps which is nice. only reason for 4 stars is i wish there was a phone app to set timers but the device buttons work fine",
  },
  {
    name: "Noah F.",
    rating: 5,
    date: "Sep 5, 2025",
    text: "ive shown this to literally everyone i know and they all want one. just ordered two more as gifts for my parents who both have trouble sleeping. the quality is genuinely impressive",
  },
  {
    name: "Isabel R.",
    rating: 5,
    date: "Aug 30, 2025",
    text: "My doctor suggested trying heat therapy for my eye strain and tension headaches. This mask has been perfect. The soothing warmth combined with gentle vibration is so effective. Best money I've spent on my health this year.",
  },
  {
    name: "Ethan G.",
    rating: 5,
    date: "Aug 24, 2025",
    text: "i travel a lot for work and this has become essential in my carry-on. hotel sleep used to be awful but now i put this on and im out cold. the travel pouch is a nice touch too",
  },
  {
    name: "Chloe W.",
    rating: 5,
    date: "Aug 18, 2025",
    text: "just wow. i didnt expect much for $70 but this exceeded all my expectations. the warmth is perfectly gentle and the vibration is so relaxing. my whole family fights over it now lol",
  },
];
