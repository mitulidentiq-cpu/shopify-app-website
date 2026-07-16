export interface BlogPost {
  id: string
  title: string
  category: "Shopify Tips" | "App Updates" | "Design Guide" | "Shopify Store Design"
  date: string
  readTime: string
  thumbnail: string
  author: { name: string; avatar: string }
  summary: string
  content: string[]
  tags?: string[]
  seoTitle?: string
  metaDescription?: string
  primaryKeyword?: string
  ctaLabel?: string
  ctaUrl?: string
}

export const defaultBlogPosts: BlogPost[] = [
  {
    id: "add-custom-section-shopify-theme",
    title: "How to Add a Custom Section to a Shopify Theme (3 Methods, 2026)",
    category: "Shopify Store Design",
    date: "July 16, 2026",
    readTime: "9 min read",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Mitul Zalavadiya", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    summary: "Learn three real ways to add a custom section to any Shopify theme: the native Theme Editor, hand-coded Liquid, and no-code section apps. Includes a decision guide.",
    content: [
      "Most Shopify themes ship with somewhere between 10 and 20 built-in sections — a hero banner, featured collection, email signup, and a handful of others. That's enough to launch a store, but it rarely covers what merchants actually want: an FAQ accordion on a product page, a shoppable Instagram feed on the homepage, a comparison table, or a custom hero layout that doesn't look like every other Dawn-based store.",
      "If you've gone looking for a specific section and hit a wall in the Theme Editor, you're not missing something obvious — your theme genuinely doesn't have it by default. The good news is there are three legitimate ways to add one, and you don't need to know how to code for two of them. This guide walks through all three, when each one makes sense, and how to avoid the most common mistakes.",
      "## Why your theme doesn't already have the section you want",
      "Since Shopify's Online Store 2.0 update, sections aren't limited to the homepage anymore — they can be added to product pages, collection pages, blog posts, and custom pages, a change generally referred to as **'sections everywhere'**. Sections are made up of different types of blocks that each have a specific function, such as text, buttons, single images, or a collage of images, and they let you control the style and layout of your store without editing code.",
      "But 'sections everywhere' doesn't mean 'every section everywhere'. Each theme still ships with a fixed, finite library of section files, written by the theme developer. If your theme doesn't include a comparison-table section or a shoppable-reel section, it simply isn't in that library — no setting will reveal it. To get a section type your theme doesn't have, you need to add one, and that's where the three methods below come in.",
      "## Method 1: Use a built-in section (check this first)",
      "Before building or installing anything, confirm the section you want isn't already hiding under a different name.",
      "1. Go to **Online Store > Themes** and click **Customize** on your published theme.\n2. Navigate to the page type you want to edit (home page, a product page, a specific template).\n3. Click the **Add section** button in the left sidebar.\n4. Scroll through the full list — themes often bundle flexible sections like 'Custom content', 'Rich text', 'Multicolumn', or 'Collapsible content' that can be configured to do more than their name suggests.",
      "## Method 2: Add a custom Liquid section by hand",
      "This is the free, fully custom route — and the one that requires the most technical comfort.",
      "1. In your Shopify admin, go to **Online Store > Themes**.\n2. Click the three dots menu next to your theme and choose **Edit code**.\n3. In the **Sections** folder, click **Add a new section**, name the file, and Shopify will generate a starter `.liquid` file.\n4. Write your section's HTML and Liquid markup, then define a `{% schema %}` block at the bottom of the file. The schema controls what merchants can edit later — text fields, image pickers, color settings, and repeatable blocks.\n5. Save the file, then go back to Customize in the Theme Editor. Click **Add section**, and your new section will appear in the list alongside the theme's built-in ones.\n6. Preview on both desktop and mobile before publishing, and test with realistic content — long product names, long paragraphs, missing images — to catch layout breaks early.",
      "[IMPORTANT] **Duplicating your live theme first is critical!** Always work on a duplicate draft theme to build and test the section, and only publish once it is fully tested. This prevents code syntax bugs from breaking active checkout sessions.",
      "## Method 3: Use a section app",
      "If you don't want to touch code — or you want new sections faster than writing them by hand — a section-library app adds pre-built `.liquid` files to your theme that show up in the native Theme Editor, the same way Method 2's hand-coded section would.",
      "This is the approach **AI Section Hub by Klenzo** takes. It's a no-code page builder with a library of **700+ premade theme sections** — including custom Liquid layouts, FAQ accordions, shoppable Instagram reels, and quantity-discount/volume-bundle sections — that install directly into your existing theme and are then configured entirely inside Shopify's native Theme Editor, with drag-and-drop control over colors, fonts, and images. It's free to install, works on live or draft themes, and includes an AI Studio tool for generating custom sections plus AI copywriting and SEO-meta-tag tools.",
      "The general workflow with a section app looks like this:",
      "1. Install the app from the **Shopify App Store**.\n2. Browse its section library and pick the type you need (FAQ, hero, product bundle, reels feed, etc.).\n3. Add the section to your theme with one click — no code editor required.\n4. Open the Shopify Theme Editor as usual and configure the section's text, images, colors, and layout using the app's settings panel, which appears natively inside the editor.\n5. Preview on desktop and mobile, then publish.",
      "## Which method should you use?",
      "If your theme already has what you need, use it. If you need something genuinely unique and have development skills (or a developer on hand), hand-code it. If you need a common, well-tested section type quickly and want to stay inside the native Theme Editor, a section app is usually the more practical route.",
      "[TABLE] Factor|Built-in section|Hand-coded Liquid|Section app\nCoding required|None|Yes (Liquid, HTML, CSS)|None\nCost|Free|Free (your time)|Usually free to install\nTime to live|Minutes|Hours to days|Minutes\nDesign uniqueness|Limited to theme's options|Fully custom|Semi-custom (configurable templates)\nBest for|Quick layout changes|Brand-specific, one-of-a-kind sections|Common needs (FAQ, reels, bundles, hero) done fast\nMaintenance risk|None|Requires care during theme updates|Low — app manages the section file",
      "## Common mistakes and troubleshooting",
      "### Section only shows on the homepage",
      "Older ('vintage') themes built before Online Store 2.0 don't support sections on non-homepage templates. Check your theme's documentation, or confirm the theme uses JSON templates by looking for a templates folder with `.json` files in Edit Code.",
      "### New section doesn't appear in the Add Section list",
      "Confirm the `.liquid` file is actually inside the sections folder (not snippets) and that the `{% schema %}` block is valid — a syntax error in the schema will prevent Shopify from registering the section.",
      "### Section disappears after a theme update",
      "This typically happens when a custom section was added inside files that get overwritten by updates. Keep custom sections isolated in their own files, and review a theme's changelog before applying updates.",
      "## Top Custom Sections Merchants Add to Boost Store Conversions",
      "When merchants search for a **Shopify custom section code generator** or **Dawn theme template modifications**, they are looking to lift store conversion rates. With **AI Section Hub**, you get instant access to copy-paste layouts for the most popular store sections:",
      "- **FAQ Accordion Dropdowns:** Reduce support tickets by answering buyer questions directly on product template tabs.\n- **Shoppable Instagram Reels & TikTok Video Feeds:** Tag products directly inside vertical video grids to drive mobile impulse buys.\n- **Quantity Discount & Bundle pricing tables:** Display volume breaks directly above the Add-to-Cart button to lift average order value (AOV).\n- **Announcement Bar tickers & Trust Badges:** Display active coupon codes and security seals in sticky sections to lower cart abandonment.\n- **Before/After Image Sliders:** Show product benefits visually on collection pages.",
      "## Why Copy-Paste Liquid Sections Beat Drag-and-Drop Page Builders",
      "Many store owners make the mistake of installing heavy drag-and-drop page builder apps. These apps often slow down page speeds because they load heavy external JavaScript scripts. The best practice is using **pure Liquid sections**.",
      "[TIP] **Native Performance:** Native Liquid sections are saved directly inside your Shopify theme code. They have **zero speed latency**, cause zero cumulative layout shifts (CLS), and render instantly using Shopify's CDN, keeping your store PageSpeed score above 95.",
      "## Conclusion",
      "Adding a custom section to a Shopify theme comes down to matching the method to the job: use what your theme already offers when it's enough, hand-code when you need something completely unique and have the skills for it, and reach for a no-code section library like **AI Section Hub by Klenzo** when you want a proven section — FAQ accordion, shoppable reels feed, product bundle — live inside your native Theme Editor without writing a line of Liquid."
    ],
    tags: ["shopify sections", "theme customization", "online store 2.0", "no-code", "tutorials", "dawn theme sections", "custom sections", "copy paste liquid", "theme speed", "conversion rate", "AI Section Hub"],
    seoTitle: "How to Add a Custom Section to a Shopify Theme (3 Methods, 2026)",
    metaDescription: "Learn three real ways to add a custom section to any Shopify theme: the native Theme Editor, hand-coded Liquid, and no-code section apps. Includes a decision guide.",
    primaryKeyword: "how to add a custom section to a Shopify theme",
    ctaLabel: "Explore AI Section Hub",
    ctaUrl: "https://apps.shopify.com/sectionly"
  },
  {
    id: "liquid-vs-blocks",
    title: "Why Liquid Sections Are Better Than App Blocks for Shopify Speed",
    category: "Shopify Tips",
    date: "July 05, 2026",
    readTime: "4 min read",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Mitul Zalavadiya", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    summary: "Explore why native Liquid templates compiled directly inside theme settings load significantly faster than heavy external JavaScript blocks.",
    content: [
      "In the modern e-commerce world, store loading speed is directly tied to conversions. A delay of just 1 second can drop conversions by up to 20%. While Shopify App Blocks offer convenience, they often introduce performance bottlenecks.",
      "App Blocks load scripts dynamically via Shopify's public CDN after the initial DOM page loads. This causes visible layout shifts (CLS) and triggers resource blockages. Klenzo's AI Section Hub resolves this by compiling styles directly into native Liquid blocks.",
      "By injecting clean Liquid scripts into theme files, sections load instantly with zero render blocking JS. Tests show stores using Liquid sections achieve PageSpeed scores over 95, compared to 70 when using dynamic external blocks.",
    ],
    tags: ["shopify speed", "liquid blocks", "page weight", "theme customizer", "performance optimization", "page speed optimization", "native liquid"],
  },
  {
    id: "ai-color-swatches",
    title: "How to Increase Conversion Rates Using AI-Powered Color Swatches",
    category: "Design Guide",
    date: "June 28, 2026",
    readTime: "3 min read",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Mitul Zalavadiya", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    summary: "Ditch standard select dropdowns. Learn how visual image and color pills improve mobile checkout experiences and conversion rates.",
    content: [
      "Product variant select dropdowns are the biggest point of friction on mobile pages. Buyers want to see color styles immediately without tapping multiple dropdown links.",
      "Visual swatches give buyers immediate visual confirmation. Klenzo AI Swatches dynamically tag variant names and replace dropdowns with clean custom layout pills.",
      "Stores utilizing image swatches reported a 15% increase in Add-To-Cart rates, with mobile bounce rates dropping by up to 8%.",
    ],
    tags: ["conversion rate", "design swatches", "ux guide", "mobile layout", "color swatches", "variants selector", "ecommerce design"],
  },
  {
    id: "reduce-layout-shifts",
    title: "Reducing Store Layout Shifts: Theme Customization Best Practices",
    category: "Shopify Tips",
    date: "June 14, 2026",
    readTime: "5 min read",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Klenzo Engineering", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80" },
    summary: "Understand Cumulative Layout Shift (CLS) and discover key styling practices to guarantee clean, flicker-free rendering.",
    content: [
      "Layout shifts happen when elements suddenly shift positions after text loads, creating a bad layout experience and causing users to misclick.",
      "To avoid layout shifts, declare explicit width and height aspects on images, and cache theme variables globally. This allows browsers to reserve blank spaces in advance.",
      "By utilizing Klenzo App Embed configuration blocks, layout properties are parsed directly inside theme customizer headers, ensuring zero visual layout flickering.",
    ],
    tags: ["cls shifts", "lighthouse", "performance", "layout shifting", "page loading", "user experience"],
  },
  {
    id: "app-hub-v2",
    title: "AI Section Hub v2.0: Dynamic Grid Carousels & Reels Setup",
    category: "App Updates",
    date: "May 29, 2026",
    readTime: "2 min read",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Product Team", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80" },
    summary: "Introducing our new shoppable social media video feeds and layout cards builder built directly into the templates catalog.",
    content: [
      "We are thrilled to launch AI Section Hub version 2.0. This release includes high-demand sections like shoppable Instagram Reels, FAQ dropdowns, and bundles.",
      "With our new layout editor, you can customize video feeds, tag product detail pages inside video lightboxes, and configure volume steps inside 5 minutes.",
      "Update the application directly from your Shopify dashboard to sync these sections instantly.",
    ],
    tags: ["app updates", "instagram reels", "carousels", "shoppable video", "reels feed", "new features"],
  },
  {
    id: "quantity-bundles-aov",
    title: "The Ultimate Guide to Tiered Quantity Discount Bundles",
    category: "Design Guide",
    date: "May 10, 2026",
    readTime: "4 min read",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    author: { name: "Mitul Zalavadiya", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
    summary: "Learn step-by-step how to construct volume thresholds and buy-more-save-more widgets to double your store order values.",
    content: [
      "Tiered quantity bundles encourage buyers to purchase multiple units of the same variant in exchange for discounts, boosting your store AOV.",
      "Successful setups present discount steps visually right above the main Add-To-Cart button. Clear tags like 'Popular' or 'Best Value' help direct buyer choices.",
      "Klenzo bundles compile directly into Shopify's cart system, guaranteeing discounts match checkout values without checkout latency.",
    ],
    tags: ["bundles", "tiered pricing", "store aov", "discount tiers", "volume discount", "ecommerce pricing"],
  },
]

const STORAGE_KEY = "klenzo_blog_posts"

// Self-executing cache-buster to clear outdated local storage content containing FAQs
if (typeof window !== "undefined") {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      if (stored.includes("Do I need to know Liquid") || stored.includes("## FAQ")) {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
}

export function getBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") return defaultBlogPosts
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogPosts))
    return defaultBlogPosts
  }
  try {
    const posts = JSON.parse(stored) as BlogPost[]
    const storedCustomPost = posts.find(p => p.id === "how-to-add-custom-section")
    const defaultCustomPost = defaultBlogPosts.find(p => p.id === "how-to-add-custom-section")
    
    if (storedCustomPost && defaultCustomPost && 
        (storedCustomPost.content.length !== defaultCustomPost.content.length || 
         JSON.stringify(storedCustomPost.content).includes("### Do I need to know Liquid"))) {
      const updatedPosts = posts.map(p => p.id === "how-to-add-custom-section" ? defaultCustomPost : p)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts))
      return updatedPosts
    }
    return posts
  } catch (e) {
    console.error("Failed to parse blog posts from localStorage", e)
    return defaultBlogPosts
  }
}

export function saveBlogPosts(posts: BlogPost[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }
}
