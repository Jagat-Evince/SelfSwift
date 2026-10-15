const SITE_ASSETS = "https://selfswift.lovable.app";

export const SITE_IMAGES = {
  kioskStore: `${SITE_ASSETS}/assets/selfswift-journey-store-Dnp-8EID.jpg`,
  storeQueue: `${SITE_ASSETS}/assets/selfswift-store-queue-BmyfFc8s.jpg`,
  basketCheckout: `${SITE_ASSETS}/assets/selfswift-basket-checkout-B8qrIZnR.jpg`,
  rackCount: `${SITE_ASSETS}/assets/selfswift-rack-count-ByyJhTye.jpg`,
  doorExit: `${SITE_ASSETS}/assets/selfswift-door-exit-lYdMjAw2.jpg`,
  warehouse: `${SITE_ASSETS}/assets/selfswift-future-warehouse-wROugwSx.jpg`,
  kioskJourneyGif: `${SITE_ASSETS}/__l5e/assets-v1/314cbfbf-9702-4ff9-8744-b80c41b68300/selfswift-kiosk-journey.gif`,
  founder: `${SITE_ASSETS}/__l5e/assets-v1/b03f7eb7-c478-41ca-867a-e0de40a9e5db/maulik-pandya-founder.jpg`,
} as const;

export const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "Beyond checkout", href: "#how-it-works" },
  { label: "Experience", href: "#experience" },
  { label: "Pilot", href: "#pilot" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO = {
  headline: ["One tag.", "More possibilities."],
  body: "Your favourite pieces. One clear basket. A checkout that moves with you - from RFID recognition to payment and receipt.",
  primaryCta: { label: "Pilot it in your store", href: "#pilot" },
  secondaryCta: { label: "I know retail. I can help.", href: "#pilot" },
  tertiaryCta: { label: "Explore the story", href: "#challenge" },
};

export const GLANCE = {
  title: ["SelfSwift", "at a glance"],
  tag: "Clothing & footwear",
  facts: [
    { id: "what", label: "What it is", value: "An RFID self checkout kiosk for clothing and footwear stores" },
    { id: "status", label: "Status", value: "In development, with a pilot planned" },
    { id: "who", label: "Who it is for", value: "Fashion retailers where fast checkout matters" },
    { id: "where", label: "Where first", value: "North America, with a global plan" },
    { id: "partners", label: "Founding partners", value: "2 spots. No cost to pilot" },
    { id: "builder", label: "Built by", value: "Evince Development", href: "https://evincedev.com" },
  ],
} as const;

export const DEMO_CURRENCY = "USD";

export const DEMO_BASKET_ITEMS = [
  { id: "oxford-shirt", name: "Oxford shirt", variant: "Ivory · M", unitPrice: 48 },
  { id: "tailored-trousers", name: "Tailored trousers", variant: "Charcoal · 32", unitPrice: 72 },
  { id: "leather-sneakers", name: "Leather sneakers", variant: "White · 42", unitPrice: 96 },
] as const;

export const BASKET_STAGES = ["Detected", "Reviewed", "Payment", "Receipt"] as const;

export const CHALLENGE = {
  kicker: "Without SelfSwift / With SelfSwift",
  headline: ["Keep the shopping.", "Change the checkout."],
  body: "Without SelfSwift, each piece passes through a cashier-led checkout. With SelfSwift, tagged pieces become one basket that shoppers can review and pay for themselves. Same purchase. A different path.",
  without: {
    label: "Without SelfSwift",
    heading: "One piece at a time.",
    flow: ["Wait", "Scan each item", "Cashier checkout"],
    points: [
      "A queue before the payment can begin",
      "Each garment scanned separately at the counter",
      "The cashier builds and checks the basket",
      "Staff lead the full checkout transaction",
    ],
  },
  with: {
    label: "With SelfSwift",
    heading: "One basket. In your hands.",
    flow: ["Place together", "Review", "Pay & go"],
    points: [
      "Compatible tagged pieces identified together",
      "A shopper-controlled view of items and total",
      "One payment for the complete selection",
      "Receipt and sale linked to connected store records",
    ],
  },
};

export const KIOSK_STAGES = [
  {
    id: "recognise",
    title: "Recognise the selection",
    heading: "RFID recognition",
    body: "The kiosk reads compatible tagged pieces together. Product names, sizes and prices come from the store’s catalogue.",
    callout: "One basket, without scanning each piece individually.",
  },
  {
    id: "review",
    title: "Review the purchase",
    heading: "A shopper-controlled basket",
    body: "A shopper-controlled view of items and total lets the shopper review the purchase before paying.",
    callout: "Shoppers see the adjusted total before payment.",
  },
  {
    id: "pay",
    title: "Complete the payment",
    heading: "One payment",
    body: "Card and digital wallet options cover the complete selection, using the methods agreed for each store.",
    callout: "One payment for the complete selection.",
  },
  {
    id: "connect",
    title: "Connect the store",
    heading: "Connected records",
    body: "Printed or digital receipts, with the sale linked to connected store records. Soft-tag deactivation follows payment.",
    callout: "Receipt and sale linked to connected store records.",
  },
] as const;

export const BEYOND = {
  kicker: "Beyond the checkout",
  headline: ["One tag.", "More possibilities."],
  body: "The tags on your pieces can do more than build a basket. Connect the story from the clothing rack to checkout and the store exit.",
  rack: {
    imageLabel: "On the rack",
    kicker: "Rack count",
    heading: "A clearer view of what’s on the floor.",
    body: "Read compatible garment tags together and compare the selection with store stock records. Explore RFID-led rack counting as part of your store’s pilot configuration.",
    previewLabel: "Rack-count concept",
    tags: ["Shirts", "Jackets", "Trousers"],
    status: "Tagged selection ready",
    idleStatus: "Awaiting rack read",
    readingStatus: "Reading tags…",
    cta: "Read rack",
    resetCta: "Read again",
  },
  exit: {
    imageLabel: "At the door",
    kicker: "Payment to departure",
    heading: "The purchase ends. The connection doesn’t.",
    body: "Payment-linked soft-tag deactivation connects checkout to the exit. Door antennas are intended to alert on active tags, with compatibility and security equipment validated for each store.",
    previewLabel: "Door-alert concept",
    status: "Payment completed",
    supporting: "Receipt issued. Soft-tag deactivation follows payment.",
    alertStatus: "Active tag detected",
    alertSupporting: "Door alert raised: this item has not completed the checkout flow.",
    prompt: "Explore an exit scenario",
    cta: "Show active tag",
    resetCta: "Complete payment",
  },
  connector: "One tag",
};

export const FUTURE = {
  kicker: "Future expansion",
  headline: ["Checkout is the start.", "Not the limit."],
  body: "A focused beginning in clothing and footwear. A bigger vision for the places your products move and the insights they leave behind.",
  imageBadge: "Future vision",
  imageTag: "Illustrative",
  tabs: [
    {
      id: "warehouse",
      label: "RFID warehouse management",
      area: "Warehouse",
      heading: "From the stockroom to the store.",
      body: "Our future vision extends RFID visibility into apparel warehouses, connecting incoming pieces, stock locations and store replenishment with the same product identity.",
      steps: ["Receive tagged stock", "Locate clothing & footwear", "Plan store replenishment"],
      outcome: "A connected stock journey, not a replacement for your existing warehouse system.",
    },
    {
      id: "data",
      label: "Richer data & trend analysis",
      area: "Insights",
      heading: "Every purchase tells a story.",
      body: "We plan to turn connected product and sales data into clearer views of demand - helping retailers understand which styles, sizes and categories are moving, and where to look next.",
      steps: ["Explore style demand", "Compare sizes & categories", "Inform assortment decisions"],
      outcome: "A future layer of retail insight built around connected product and sales records.",
    },
  ],
  principleLabel: "Our principle",
} as const;

export const PILOT = {
  kicker: "Where we are",
  headline: ["Build it with the people", "who know the store floor."],
  audiences: [
    { id: "owners", label: "For store owners & retail leaders", note: "Founding partners · 2 spots" },
    { id: "veterans", label: "For retail veterans", note: "Retail advisors" },
  ],
  owners: {
    heading: "Become one of our two founding retail partners",
    body: "We are building SelfSwift with real stores from day one. Two retailers will shape the first version, and both will be named as our hero clients.",
    spotLabel: "Spot",
    spotStatus: "Open",
    cta: "Apply as a founding partner",
    ctaNote: "Two founding spots available",
    get: {
      title: "What you get",
      items: [
        "Hero client status. Your name on our site, a joint case study, and mentions in our press and social posts. You approve everything before it goes out.",
        "A preferred rate for 3 years after launch, agreed in writing before the pilot starts.",
        "No cost to pilot. We ask for your time and your advice, not your budget.",
        "No penalty if you stop. You can end the pilot at any time.",
        "Your data stays protected. We sign an NDA first, and the pilot plan says what data is used and why.",
        "A real say in what we build and in what order.",
      ],
    },
    ask: {
      title: "What we ask of you",
      items: [
        "A little of your time for an intro call, a walkthrough and regular feedback.",
        "Honest advice from people who run the shop floor.",
        "A store, or a few, where we can place a kiosk.",
        "One named contact on your side for the pilot.",
      ],
    },
    store: {
      title: "The store we are looking for",
      items: [
        "Clothing or footwear retail",
        "A busy store where fast checkout really matters",
        "Space to place a checkout kiosk",
        "Open to piloting in one store or a few",
      ],
    },
    measure: {
      title: "What we will measure together",
      items: [
        "Time to complete a basket",
        "Queue length at peak hours",
        "Staff hours spent at the till",
        "How many items are read correctly",
        "Shopper and store team feedback",
        "How exit checks work in practice",
      ],
    },
    steps: {
      title: "How it works",
      items: [
        { title: "Apply.", body: "Send us a short note about your stores." },
        { title: "Intro call and NDA.", body: "We talk, and we sign an NDA before you share anything sensitive." },
        { title: "One page pilot plan.", body: "We agree the store, the scope, what we will measure and the preferred rate." },
        { title: "Install and run together.", body: "We set up the kiosk, brief your store team and learn from real shoppers." },
      ],
    },
    build: {
      title: "What we plan to build first",
      note: "The exact scope is agreed with each founding partner.",
      items: [
        { title: "Read several tagged items at once", body: "No scanning each piece by hand." },
        { title: "Show one clear basket", body: "Item names, sizes, quantities and prices from your catalogue." },
        { title: "Take payment at the kiosk", body: "Card and tap are planned. The final list is set in the pilot scope." },
        { title: "Give a receipt", body: "Printed or sent to the shopper, depending on the store." },
        { title: "Connect to your store systems", body: "POS and inventory connections are agreed with each partner." },
        { title: "Support checks at the exit", body: "Options are agreed store by store." },
      ],
      footnote:
        "Pilot timing follows the build, so we agree dates with you as the first version comes together. If your items are not RFID tagged yet, we work out tagging together in the pilot plan.",
    },
  },
  veterans: {
    heading: "Retail experience helps us get this right",
    body: "You know how a store really runs. We want that in the room while SelfSwift is still being shaped. Recently retired is welcome.",
    cta: "Join as a retail advisor",
    who: {
      title: "Who we want to hear from",
      items: ["Store operations leaders", "Merchandising and buying", "Loss prevention", "Retail IT and systems", "Former retail executives"],
    },
    do: {
      title: "What you would do",
      items: [
        "Join product walkthroughs",
        "Give feedback on shopper and store team workflows",
        "Open doors to retailers you trust, if you want to",
      ],
    },
    get: {
      title: "What you get",
      items: [
        "Direct conversations with the product team",
        "Real influence on the product",
        "A written agreement covering your role, your time and any compensation",
        "Credit on this site, if you want it",
      ],
    },
  },
} as const;

export const USE_CASE_STAGES = [
  { id: "now", label: "Pilot focus now" },
  { id: "launch", label: "At launch" },
  { id: "next", label: "Next" },
  { id: "later", label: "Later" },
  { id: "beyond", label: "Beyond" },
] as const;

export const USE_CASES = {
  kicker: "RFID use cases",
  headline: ["What RFID can do", "in a store"],
  body: "Self checkout is where we start. The same tags and readers can do much more in a store, and that is part of why RFID is worth the effort for retailers.",
  items: [
    { id: "checkout", stage: "now", title: "Self checkout", body: "Shoppers place tagged items together, review one basket and pay." },
    { id: "theft", stage: "launch", title: "Theft alerts at the exit", body: "Flags an unpaid tagged item leaving the store." },
    { id: "inventory", stage: "next", title: "Inventory counts", body: "Counts a whole store in minutes, more accurately than counting by hand." },
    { id: "replenishment", stage: "next", title: "Replenishment", body: "Shows what is missing on the shop floor and what is waiting in the stockroom." },
    { id: "fitting", stage: "next", title: "Fitting room insight", body: "Shows which items get tried on but not bought." },
    { id: "receiving", stage: "later", title: "Receiving", body: "Checks a delivery against the shipping list at the back door." },
    { id: "finding", stage: "later", title: "Finding items", body: "Helps staff and shoppers locate a size or style fast." },
    { id: "omnichannel", stage: "later", title: "Online and store stock", body: "Gives reliable store stock for click and collect and ship from store orders." },
    { id: "returns", stage: "later", title: "Returns checks", body: "Confirms an item was sold by you and helps cut return fraud." },
    { id: "authenticity", stage: "later", title: "Authenticity and product passports", body: "Helps spot fakes and supports item level data such as digital product passports." },
    { id: "traceability", stage: "beyond", title: "Traceability", body: "Follows an item from factory to shelf." },
    { id: "resale", stage: "beyond", title: "Resale and repair tracking", body: "Follows an item across its life, including secondhand programs." },
  ],
} as const;

export const ROADMAP = {
  kicker: "Roadmap",
  headline: ["Where SelfSwift", "is going"],
  body: "We start with one job done well, then build outward from the same RFID foundation.",
  hereLabel: "We are here",
  phases: [
    { id: "now", title: "Now", body: "Founding partner pilot with 2 retailers in North America. Self checkout for clothing or footwear." },
    { id: "launch", title: "At launch", body: "POS connections, theft alerts at the exit, loyalty and offers, and more payment options." },
    { id: "next", title: "Next", body: "The same readers used for inventory counts, replenishment and fitting room insight." },
    { id: "later", title: "Later", body: "Online and store stock in one view, receiving, finding items, returns, authenticity and product passports." },
    { id: "beyond", title: "Beyond", body: "More categories and more regions. The US and Canada first, then Europe and beyond. Traceability and resale." },
  ],
  note: "This is our direction, not a promise. Dates and scope are agreed with our founding partners as we build.",
} as const;

export const TEAM = {
  kicker: "Team",
  headline: ["Who is building", "SelfSwift"],
  bodyLead: "SelfSwift is built by",
  company: { name: "Evince Development", href: "https://evincedev.com/" },
  bodyRest:
    ", a software company founded in 2012 in Ahmedabad, India. Our founder is based in the Greater Toronto Area, and we work with clients in North America, including through EvinceDev Inc in the US. You will talk to the people building the product, not a sales layer.",
  founder: {
    name: "Maulik (Mauk) Pandya",
    role: "Founder and CEO, EvinceDev Group",
    note: "Started Evince Development in 2012.",
    linkedin: "https://www.linkedin.com/in/maulikpandya/",
    alt: "Maulik (Mauk) Pandya, founder and CEO of EvinceDev Group",
  },
  open: { title: "Your name could be here", role: "Retail advisor", cta: "Join as a retail advisor" },
} as const;

export const ENQUIRY_TYPES = [
  { id: "retailer", label: "A retailer" },
  { id: "advisor", label: "A retail advisor" },
  { id: "investor", label: "An investor" },
  { id: "partner", label: "A partner" },
] as const;

export const CONTACT = {
  kicker: "Say hello",
  headline: ["The next chapter", "starts on the store floor."],
  body: "Run a clothing or footwear store? Have retail experience to share? Tell us about your store, your background or the conversation you’d like to start.",
  areas: ["Retail pilots", "Retail advisors", "Investors & partners"],
  email: "hello@selfswift.com",
  linkedin: { label: "Connect with Maulik", href: "https://www.linkedin.com/in/maulikpandya/" },
  form: {
    title: "New inquiry",
    iAm: "I am",
    aboutYou: "About you",
    aboutBusiness: "Your business",
    name: "Full name",
    email: "Work email",
    organization: "Company or fund",
    role: "Your role",
    region: "Country or region",
    stores: "Number of stores",
    optional: "Optional",
    sells: "What do you sell?",
    sellsOptions: ["Clothing", "Footwear", "Clothing and footwear", "Something else"],
    message: "Anything else we should know?",
    consent: "I agree that SelfSwift can contact me about this inquiry.",
    submit: "Send inquiry",
    sent: "Your email app should open with this inquiry addressed to hello@selfswift.com. Send it from there and we will reply.",
  },
} as const;

export const FAQ_SECTION = {
  kicker: "FAQ",
  headline: ["Good questions.", "Clear answers."],
  allLabel: "All questions",
  topics: [
    { id: "product", label: "The product" },
    { id: "partners", label: "Founding partners" },
    { id: "advisors", label: "Advisors & launch" },
  ],
  help: { title: "Still have a question?", body: "Ask us directly. You will talk to the people building the product.", cta: "Ask us directly" },
} as const;

export const FAQ = [
  { topic: "product", question: "What is SelfSwift?", answer: "SelfSwift is an RFID self checkout kiosk for clothing and footwear stores. Shoppers place their tagged items on it together, review one basket, pay, and get a receipt. It is built by Evince Development and is currently in development." },
  { topic: "product", question: "Is SelfSwift available now?", answer: "Not yet. We are building the first version and looking for two founding retail partners in North America to pilot it with." },
  { topic: "partners", question: "What kind of retailer is a good founding partner?", answer: "A clothing or footwear retailer where fast checkout really matters, with space to place a kiosk, and a willingness to pilot in one store or a few." },
  { topic: "partners", question: "What does the pilot cost?", answer: "Nothing for founding partners. We ask for your time and your honest advice. If your items are not RFID tagged yet, we agree how tagging is handled in the pilot plan." },
  { topic: "partners", question: "What do founding partners get?", answer: "Hero client status, which means your name on our site, a joint case study and mentions in our press and social posts, all approved by you first. You also get a preferred rate for 3 years after launch. Both are agreed in writing before the pilot starts." },
  { topic: "partners", question: "Can we stop the pilot if it is not working?", answer: "Yes. You can end the pilot at any time, with no penalty." },
  { topic: "partners", question: "How is our data handled?", answer: "Your sales and customer data stays protected. We sign an NDA before you share anything sensitive, and the pilot plan states which data is used and why." },
  { topic: "partners", question: "Do founding partners get exclusivity?", answer: "We are limited to two founding partners for now. If exclusivity matters to you, raise it on the intro call and we will talk it through." },
  { topic: "product", question: "Does every item need an RFID tag?", answer: "To read several items at once, yes. Items need compatible RFID tags, and we confirm tag compatibility while scoping the pilot." },
  { topic: "product", question: "Will SelfSwift connect to our POS and inventory systems?", answer: "That is the plan. Which systems we connect first is agreed with each founding partner." },
  { topic: "product", question: "Which payment methods will it support?", answer: "Card and tap payments are planned. The final list is confirmed in the pilot scope." },
  { topic: "product", question: "What about theft and checking items at the exit?", answer: "Exit checks are part of what the pilot will validate. Options are agreed store by store." },
  { topic: "advisors", question: "What do retail advisors do, and what do they get?", answer: "Advisors join product walkthroughs and give feedback on shopper and store team workflows. In return they get direct conversations with the product team, real influence on the product, and a written agreement covering their role, their time and any compensation." },
  { topic: "advisors", question: "Where will SelfSwift launch?", answer: "North America first, with a plan for the global fashion retail market." },
] as const;

export const TICKER_PHRASES = [
  "RFID recognition",
  "One basket, without scanning each piece",
  "Payment-linked soft-tag deactivation",
  "Connected store records",
  "Rack counting",
  "Door-alert concept",
  "Receipt issued",
  "RFID warehouse management",
] as const;

export const FOOTER = {
  tagline: "Intelligent self-checkout for clothing and footwear. A focused product. A global vision.",
  exploreTitle: "Explore SelfSwift",
  links: [
    { label: "Product", href: "#product" },
    { label: "Beyond checkout", href: "#how-it-works" },
    { label: "Experience", href: "#experience" },
    { label: "Pilot", href: "#pilot" },
    { label: "Advisors", href: "#pilot" },
    { label: "RFID use cases", href: "#use-cases" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Team", href: "#team" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#connect" },
  ],
  contactTitle: "Get in touch",
  builtBy: { label: "Built by Evince Development", href: "https://evincedev.com/" },
  linkedin: { label: "Maulik Pandya on LinkedIn", href: "https://www.linkedin.com/in/maulikpandya/" },
  copyright: "© 2026 SelfSwift. All rights reserved.",
  poweredBy: { lead: "Powered by", label: "EvinceDev", href: "https://evincedev.com/" },
  backToTop: "Back to top",
} as const;
