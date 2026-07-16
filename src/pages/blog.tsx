"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { BookOpen, Clock, ArrowRight, X, Tag, ChevronRight, Sparkles, ChevronDown } from "lucide-react"
import { Header1 } from "@/components/ui/header"
import { MinimalFooter } from "@/components/ui/minimal-footer"
import { CursorFollower } from "@/components/ui/cursor-follower"

import { getBlogPosts, type BlogPost } from "@/lib/blog-store"

const CATEGORY_COLORS: Record<string, string> = {
  "Shopify Tips": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "App Updates": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Design Guide": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Shopify Store Design": "bg-amber-500/10 text-amber-400 border-amber-500/20",
}

/* ─── Category Badge ─────────────────────────────────────── */
function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${CATEGORY_COLORS[category] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
      <Tag className="w-2.5 h-2.5" />
      {category}
    </span>
  )
}

/* ─── Inline Markdown Parser ────────────────────────────── */
function parseInlineMarkdown(text: string): React.ReactNode {
  if (!text) return "";
  const boldParts = text.split("**");
  return boldParts.map((boldPart, bIdx) => {
    const isBold = bIdx % 2 === 1;
    const codeParts = boldPart.split("`");
    const renderedParts = codeParts.map((codePart, cIdx) => {
      const isCode = cIdx % 2 === 1;
      if (isCode) {
        return (
          <code key={cIdx} className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-indigo-300 font-mono font-medium">
            {codePart}
          </code>
        );
      }
      return codePart;
    });

    if (isBold) {
      return (
        <strong key={bIdx} className="text-white font-extrabold">
          {renderedParts}
        </strong>
      );
    }
    return renderedParts;
  });
}

/* ─── FAQ Accordion Row Component ────────────────────────── */
function AccordionRow({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-zinc-900 bg-zinc-950/20 rounded-xl overflow-hidden mb-3 transition-colors duration-250">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center text-left text-white font-bold text-sm md:text-base hover:bg-white/[0.01] transition-colors cursor-pointer outline-none"
      >
        <span className="pr-4">{parseInlineMarkdown(question)}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-white" : ""}`} />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] border-t border-zinc-900/60 p-4 bg-black/10" : "max-h-0 overflow-hidden"
        }`}
      >
        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
          {parseInlineMarkdown(answer)}
        </p>
      </div>
    </div>
  );
}

/* ─── Article Modal ──────────────────────────────────────── */
function ArticleModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const [tocOpen, setTocOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [])

  // Extract H2 headings for Table of Contents
  const headings = post.content
    .filter(para => para.startsWith("## "))
    .map(para => {
      const title = para.replace("## ", "").replace(/\*\*?/g, "").trim();
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { title, id };
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
    >
      <motion.article
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl mx-auto bg-[#0e0e10] border border-zinc-800/60 rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.95)] flex-shrink-0 max-h-[92vh] md:max-h-[88vh] overflow-y-auto flex flex-col no-scrollbar"
      >
        {/* Sticky Close Button (Always visible on scroll for both mobile & desktop) */}
        <div className="sticky top-0 z-50 w-full flex justify-end p-4 pointer-events-none">
          <button
            onClick={onClose}
            className="pointer-events-auto w-10 h-10 rounded-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800/60 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cover (shifted up by the height of sticky header) */}
        <div className="relative w-full h-48 sm:h-72 md:h-[350px] overflow-hidden -mt-[72px]">
          <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/30 to-transparent" />
          <div className="absolute bottom-5 left-6 lg:left-12">
            <CategoryBadge category={post.category} />
          </div>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-8 md:px-12 pb-10 md:pb-12 pt-6 md:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Meta */}
              <div className="flex items-center gap-3 text-zinc-500 text-xs font-semibold">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                <span>{post.date}</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {post.title}
              </h2>

              {/* Author */}
              <div className="flex items-center gap-3 pb-6 border-b border-zinc-900">
                <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-zinc-800 object-cover" />
                <div>
                  <p className="text-sm text-white font-bold">{post.author.name}</p>
                  <p className="text-xs text-zinc-500">Author</p>
                </div>
              </div>

              {/* Table of Contents Accordion Card */}
              {headings.length > 0 && (
                <div className="border border-zinc-900 bg-zinc-950/30 rounded-2xl overflow-hidden my-2 transition-colors">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="w-full p-4 flex justify-between items-center text-left text-white font-bold text-xs md:text-sm hover:bg-white/[0.01] cursor-pointer outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      Table of Contents
                    </span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 shrink-0 ${tocOpen ? "rotate-180 text-white" : ""}`} />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      tocOpen ? "max-h-[400px] border-t border-zinc-900/60 p-4 bg-black/5" : "max-h-0 overflow-hidden"
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                      {headings.map((h, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            const el = document.getElementById(h.id);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth", block: "start" });
                            }
                          }}
                          className="text-left text-zinc-400 hover:text-white text-xs md:text-sm py-1 transition-colors cursor-pointer truncate hover:underline"
                        >
                          {h.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Content Paragraphs */}
              <div className="flex flex-col gap-5 text-zinc-300 text-sm md:text-[15px] leading-[1.85]">
                {(() => {
                  const processedBlocks: { type: string; question?: string; answer?: string; text?: string }[] = [];
                  for (let idx = 0; idx < post.content.length; idx++) {
                    const current = post.content[idx];
                    if (
                      current.startsWith("### ") &&
                      idx + 1 < post.content.length &&
                      !post.content[idx + 1].startsWith("#") &&
                      !post.content[idx + 1].startsWith("-") &&
                      !post.content[idx + 1].startsWith("*") &&
                      !post.content[idx + 1].startsWith("[") &&
                      !post.content[idx + 1].startsWith(">")
                    ) {
                      processedBlocks.push({
                        type: "faq",
                        question: current.replace("### ", "").trim(),
                        answer: post.content[idx + 1].trim()
                      });
                      idx++;
                    } else {
                      processedBlocks.push({
                        type: "raw",
                        text: current
                      });
                    }
                  }

                  return processedBlocks.map((block, i) => {
                    const isSecondBlock = i === 1;
                    
                    const renderBlockNode = () => {
                      if (block.type === "faq") {
                        return (
                          <AccordionRow question={block.question!} answer={block.answer!} />
                        );
                      }

                      const para = block.text!;
                      if (!para) return null;

                      // Custom FAQ accordion row parser (fallback)
                      if (para.startsWith("[FAQ]")) {
                        const faqData = para.replace("[FAQ]", "").trim();
                        const parts = faqData.split("|");
                        const question = parts[0] || "";
                        const answer = parts[1] || "";
                        return (
                          <AccordionRow question={question} answer={answer} />
                        );
                      }

                      // Custom Table parser
                      if (para.startsWith("[TABLE]")) {
                        const tableData = para.replace("[TABLE]", "").trim();
                        const lines = tableData.split("\n");
                        const headers = lines[0].split("|");
                        const rows = lines.slice(1).map(line => line.split("|"));
                        return (
                          <div className="overflow-x-auto my-6 border border-zinc-900 rounded-2xl bg-zinc-950/40">
                            <table className="w-full text-left border-collapse text-xs md:text-sm">
                              <thead>
                                <tr className="border-b border-zinc-900 bg-zinc-900/40">
                                  {headers.map((h, idx) => (
                                    <th key={idx} className="p-4 font-bold text-white uppercase tracking-wider text-[11px]">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="border-b border-zinc-900/50 hover:bg-white/[0.01] last:border-b-0 transition-colors">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className={`p-4 text-zinc-300 ${cIdx === 0 ? "font-bold text-white" : ""}`}>{parseInlineMarkdown(cell)}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }

                      // Alert banners (Important/Note/Tip/Warning)
                      if (para.startsWith("[NOTE]") || para.startsWith("[IMPORTANT]") || para.startsWith("[TIP]") || para.startsWith("[WARNING]")) {
                        const match = para.match(/^\[([A-Z]+)\]\s*(.*)/s);
                        const type = match ? match[1] : "NOTE";
                        const text = match ? match[2] : para;
                        
                        const styles: Record<string, { border: string, bg: string, text: string, iconColor: string, title: string }> = {
                          NOTE: { border: "border-indigo-500/20", bg: "bg-indigo-950/10", text: "text-indigo-200", iconColor: "text-indigo-400", title: "Note" },
                          IMPORTANT: { border: "border-emerald-500/20", bg: "bg-emerald-950/10", text: "text-emerald-200", iconColor: "text-emerald-400", title: "Important" },
                          TIP: { border: "border-amber-500/20", bg: "bg-amber-950/10", text: "text-amber-200", iconColor: "text-amber-400", title: "Tip" },
                          WARNING: { border: "border-rose-500/20", bg: "bg-rose-950/10", text: "text-rose-200", iconColor: "text-rose-400", title: "Warning" },
                        };
                        
                        const style = styles[type] || styles.NOTE;
                        
                        return (
                          <div className={`p-5 rounded-2xl border ${style.border} ${style.bg} my-4 flex flex-col gap-1.5`}>
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider ${style.iconColor}`}>{style.title}</span>
                            <p className={`text-xs md:text-sm leading-relaxed ${style.text}`}>{parseInlineMarkdown(text)}</p>
                          </div>
                        );
                      }

                      // Blockquotes
                      if (para.startsWith("> ")) {
                        return (
                          <blockquote className="pl-4 border-l-2 border-indigo-500 text-zinc-400 italic my-4">
                            {parseInlineMarkdown(para.substring(2))}
                          </blockquote>
                        );
                      }

                      // Main H2 Heading
                      if (para.startsWith("## ")) {
                        const title = para.replace("## ", "").replace(/\*\*?/g, "").trim();
                        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                        return (
                          <h2 id={id} className="text-lg md:text-xl font-extrabold text-white mt-8 mb-1 border-b border-zinc-900 pb-2 scroll-mt-24">
                            {parseInlineMarkdown(para.replace("## ", ""))}
                          </h2>
                        );
                      }

                      // Sub H3 Heading (with fallback inline FAQ accordion splitter)
                      if (para.startsWith("### ")) {
                        const headingText = para.replace("### ", "").trim();
                        if (headingText.includes("? ")) {
                          const qIndex = headingText.indexOf("? ");
                          const question = headingText.substring(0, qIndex + 1).trim();
                          const answer = headingText.substring(qIndex + 2).trim();
                          return (
                            <AccordionRow question={question} answer={answer} />
                          );
                        }
                        return (
                          <h3 className="text-base md:text-lg font-extrabold text-white mt-6 mb-1">
                            {parseInlineMarkdown(headingText)}
                          </h3>
                        );
                      }

                      // Bullet Points
                      if (para.startsWith("- ") || para.startsWith("* ")) {
                        return (
                          <ul className="list-disc pl-5 flex flex-col gap-2 my-1">
                            {para.split("\n").map((line, idx) => (
                              <li key={idx} className="pl-1 text-zinc-300">
                                {parseInlineMarkdown(line.replace(/^[-*]\s+/, ""))}
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      // Numbered Step circles
                      if (para.match(/^\d+\.\s+/)) {
                        return (
                          <div className="flex flex-col gap-4 my-4 pl-1">
                            {para.split("\n").map((line, idx) => {
                              const match = line.match(/^(\d+)\.\s*(.*)/);
                              const stepNum = match ? match[1] : (idx + 1).toString();
                              const stepText = match ? match[2] : line;
                              return (
                                <div key={idx} className="flex gap-4 items-start">
                                  <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-extrabold text-white shrink-0 mt-0.5">
                                    {stepNum}
                                  </div>
                                  <p className="text-zinc-300 text-sm md:text-[15px] leading-relaxed flex-grow">
                                    {parseInlineMarkdown(stepText)}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }

                      // Default paragraphs
                      return <p>{parseInlineMarkdown(para)}</p>;
                    };

                    return (
                      <div key={i} className="flex flex-col gap-5">
                        {renderBlockNode()}
                        
                        {/* Inline Promoted App CTA Box (Visible only on Mobile) */}
                        {isSecondBlock && (
                          <div className="block lg:hidden bg-gradient-to-br from-indigo-950/20 via-zinc-900/60 to-zinc-950 border border-indigo-500/10 rounded-2xl p-5 shadow-lg relative overflow-hidden my-2">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">PROMOTED APP</span>
                            </div>
                            <div className="my-3">
                              <h4 className="text-white font-extrabold text-sm leading-snug">AI Section Hub: Theme Sections</h4>
                              <p className="text-zinc-400 text-[11px] mt-1.5 leading-relaxed">
                                Add 700+ premium sections (FAQ, reels, bundles, hero banners) instantly to your theme with zero code.
                              </p>
                            </div>
                            <a
                              href={post.ctaUrl || "https://apps.shopify.com/sectionly"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-center py-2.5 bg-white text-black hover:bg-zinc-200 font-extrabold text-xs rounded-xl transition-all duration-300 shadow-md inline-flex items-center justify-center gap-1 cursor-pointer"
                            >
                              {post.ctaLabel || "Explore AI Section Hub"} <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Right Column: Sticky Sidebar with Promo */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-8 border-t lg:border-t-0 lg:border-l border-zinc-900 pt-6 lg:pt-0 lg:pl-6 shrink-0">
              
              {/* Category */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Category</span>
                <div className="w-fit">
                  <CategoryBadge category={post.category} />
                </div>
              </div>

              {/* Glowing Promotional Card for Shopify App */}
              <div className="hidden lg:flex bg-gradient-to-br from-indigo-950/20 via-zinc-900/60 to-zinc-950 border border-indigo-500/10 rounded-2xl p-5 shadow-lg relative overflow-hidden flex-col gap-4">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">PROMOTED APP</span>
                </div>
                <div>
                  <h4 className="text-white font-extrabold text-sm leading-snug">AI Section Hub: Theme Sections</h4>
                  <p className="text-zinc-400 text-[11px] mt-1.5 leading-relaxed">
                    Add 700+ premium sections (FAQ, reels, bundles, hero banners) instantly to your theme with zero code.
                  </p>
                </div>
                <a
                  href={post.ctaUrl || "https://apps.shopify.com/sectionly"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 bg-white text-black hover:bg-zinc-200 font-extrabold text-xs rounded-xl transition-all duration-300 shadow-md inline-flex items-center justify-center gap-1 cursor-pointer"
                >
                  {post.ctaLabel || "Explore AI Section Hub"} <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tags</span>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

/* ─── Main Blog Page ─────────────────────────────────────── */
export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    setBlogPosts(getBlogPosts())
  }, [])

  const categories = ["All", "Shopify Tips", "App Updates", "Design Guide", "Shopify Store Design"]
  const featuredPost = blogPosts[0]
  const gridPosts = blogPosts.slice(1)
  const filteredPosts = gridPosts.filter(
    (p) => selectedCategory === "All" || p.category === selectedCategory
  )

  return (
    <div className="relative min-h-screen bg-[#080809] text-white overflow-x-hidden">
      <CursorFollower />
      <Header1 />

      {/* ── Ambient Background ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[130px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-emerald-600/4 blur-[130px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <main className="relative z-10 container mx-auto max-w-[1440px] px-6 md:px-12 pt-36 pb-32">

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Resource Center
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none mb-5">
            Klenzo{" "}
            <span className="bg-gradient-to-br from-indigo-400 via-violet-400 to-white/50 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-zinc-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Guides, updates &amp; design tips to help you build a lightning-fast,
            high-converting Shopify storefront.
          </p>
        </motion.div>

        {/* ── Featured Post ── */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-600 mb-5">
              <BookOpen className="w-3.5 h-3.5" /> Featured Article
            </div>
            <div
              onClick={() => setSelectedPost(featuredPost)}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 bg-zinc-900/20 border border-zinc-800/50 rounded-3xl overflow-hidden cursor-pointer hover:border-zinc-700/60 transition-all duration-500 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
            >
              {/* Image */}
              <div className="lg:col-span-7 aspect-video lg:aspect-auto lg:min-h-[360px] overflow-hidden relative">
                <img
                  src={featuredPost.thumbnail}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080809] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080809] to-transparent lg:hidden" />
                {/* Featured pill */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-black">
                    ✦ Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-5 flex flex-col justify-between p-7 md:p-9">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <CategoryBadge category={featuredPost.category} />
                    <span className="text-zinc-600 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featuredPost.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight group-hover:text-zinc-100 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
                    {featuredPost.summary}
                  </p>
                  {/* Tags */}
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {featuredPost.tags.slice(0, 5).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800/50 pt-5 mt-6">
                  <div className="flex items-center gap-3">
                    <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-9 h-9 rounded-full border border-zinc-800 object-cover" />
                    <div>
                      <p className="text-xs text-white font-bold">{featuredPost.author.name}</p>
                      <p className="text-[10px] text-zinc-500 font-semibold">{featuredPost.date}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-zinc-800 bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black text-white transition-all duration-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Category Filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:border-zinc-600"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-zinc-700 text-xs font-semibold">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
          </span>
        </motion.div>

        {/* ── Blog Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => setSelectedPost(post)}
                className="group flex flex-col bg-zinc-900/20 border border-zinc-800/50 rounded-2xl overflow-hidden cursor-pointer hover:border-zinc-700/60 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-400"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-zinc-950">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover opacity-65 group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-600"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <CategoryBadge category={post.category} />
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <h3 className="text-white font-bold text-base leading-snug group-hover:text-zinc-200 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 flex-1">
                    {post.summary}
                  </p>
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.slice(0, 5).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-zinc-800/50 pt-4 mt-1">
                    <div className="flex items-center gap-2.5">
                      <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full border border-zinc-800 object-cover" />
                      <div>
                        <p className="text-[10px] text-zinc-300 font-bold">{post.author.name}</p>
                        <p className="text-[9px] text-zinc-600 font-semibold">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-600 font-semibold">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                  </div>
                </div>

                {/* Read More Bar */}
                <div className="flex items-center gap-1.5 px-5 py-3 bg-white/[0.03] border-t border-zinc-800/50 text-zinc-500 group-hover:text-white text-xs font-bold uppercase tracking-wider transition-colors">
                  Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20 text-zinc-600">
            <BookOpen className="w-10 h-10 mx-auto mb-4 opacity-40" />
            <p className="font-semibold">No articles in this category yet.</p>
          </div>
        )}
      </main>

      {/* ── Article Reader Modal ── */}
      <AnimatePresence>
        {selectedPost && (
          <ArticleModal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </AnimatePresence>

      <MinimalFooter />
    </div>
  )
}
