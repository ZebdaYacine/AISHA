import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
// import FloatingList from "../../core/components/FloatingImageList";

const values = [
  {
    title: "Respect for Tradition",
    description: "We honor age-old techniques and the knowledge they carry.",
  },
  {
    title: "Artisan Empowerment",
    description:
      "We champion fair pay, dignity, and creative agency for makers.",
  },
  {
    title: "Sustainability",
    description: "We prioritize natural materials and responsible processes.",
  },
  {
    title: "Authenticity",
    description:
      "Every piece must tell a true story—no replicas, no shortcuts.",
  },
  {
    title: "Community",
    description:
      "We build meaningful connections between buyers, makers, and culture.",
  },
];

const faqs = [
  {
    question: "How do I place a custom order?",
    answer:
      "Visit Custom Orders → Request a Custom Piece, fill the form, and our team will reply within 5–7 business days.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes — we ship worldwide. Shipping times vary by destination.",
  },
  {
    question: "Are your materials eco-friendly?",
    answer:
      "Wherever possible—we use natural fibers, local dyes, and low-impact processes. Details are listed on each product page.",
  },
  {
    question: "Can I meet the artisan who made my piece?",
    answer:
      "We share artisan profiles and occasional studio visits via our Journal; get in touch if you’d like a private introduction.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "We accept returns on unused items within 14 days—custom pieces are final sale unless defective.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

const AnimatedSection = ({ id, className, children }: AnimatedSectionProps) => (
  <motion.section
    id={id}
    className={className}
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.section>
);

export default function MissionPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    const [, , section] = pathname.split("/");
    const target = section || "top";
    const element = document.getElementById(target);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div className="mt-28 bg-base-100 text-base-content">
      {/* <FloatingList /> */}
      <AnimatedSection
        id="top"
        className="pt-28 pb-20 bg-gradient-to-b from-primary/10 via-base-100 to-base-100"
      >
        <div className="relative container mx-auto px-4 overflow-hidden">
          <motion.div
            className="relative z-10 max-w-4xl mx-auto text-center space-y-6"
            variants={sectionVariants}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <p className="text-sm tracking-[0.35em] uppercase text-primary/80">
              Our Mission
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold">
              Weaving Algerian Artistry Into Everyday Life
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-base-content/80">
              At AICHA, we weave the timeless stories of Algerian artisans into
              every handcrafted treasure, honoring ancient techniques and the
              soulful touch of the maker. With heart and hands united, we
              cultivate fair livelihoods, nurture sustainable practices, and
              invite you to carry forward a living legacy of art, culture, and
              hope.
            </p>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10">
            <motion.article
              id="story"
              className="bg-base-200/60 border border-base-200 rounded-3xl p-10 shadow-sm"
              variants={sectionVariants}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Our Story
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-base-content/80">
                AICHA was born from a single belief: that craft connects us
                across generations and landscapes. What began as a conversation
                between friends into a platform that brings village workshops
                and city ateliers together, celebrating the makers, their
                families, and the traditions tucked into every stitch, braid,
                and glaze.
              </p>
            </motion.article>

            <motion.article
              id="values"
              className="bg-base-200/40 border border-base-200 rounded-3xl p-10 shadow-sm"
              variants={sectionVariants}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Our Values
              </h2>
              <motion.ul
                className="grid gap-4 md:grid-cols-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  hidden: {},
                  visible: {},
                }}
              >
                {values.map((value) => (
                  <motion.li
                    key={value.title}
                    className="rounded-2xl p-4 bg-base-100 border border-base-200 h-full"
                    variants={listItemVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h3 className="text-lg font-medium text-primary">
                      {value.title}
                    </h3>
                    <p className="text-sm mt-2 text-base-content/80">
                      {value.description}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.article>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16 bg-base-200/40">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <article
              id="blog"
              className="rounded-3xl border border-base-200 bg-base-100 p-10 shadow-sm"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                “Crafting Culture” &mdash; Blog &amp; Journal
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-base-content/80">
                Our Journal is a slow-read space for stories: interviews with
                artisans, process-led photo essays, recipe-like craft tutorials,
                and essays on the meanings woven into objects. Read to meet the
                hands behind the work, learn technique, and travel through the
                region&rsquo;s colors and rituals.
              </p>
            </article>

            <article
              id="testimonials"
              className="rounded-3xl border border-base-200 bg-base-100 p-10 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  Testimonials
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-base-content/80">
                  In development, our community voices will live here soon.
                </p>
              </div>
              <div className="mt-8">
                <p className="text-sm text-base-content/60">
                  Have a story to share? Email us at{" "}
                  <span className="font-medium text-primary">
                    hello@aicha-craft.com
                  </span>
                  .
                </p>
              </div>
            </article>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="faqs" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold">FAQs</h2>
            <p className="text-base text-base-content/70 mt-3">
              Short and helpful answers to keep your experience seamless.
            </p>
          </div>
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              visible: {},
            }}
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.question}
                className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm text-left"
                variants={listItemVariants}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <h3 className="text-lg font-medium text-primary">
                  {faq.question}
                </h3>
                <p className="text-sm mt-3 text-base-content/80">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="contact" className="py-16 bg-base-200/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto rounded-3xl border border-base-200 bg-base-100 p-10 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Contact Us
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-base-content/80">
              We’d love to hear from you. For general enquiries, press, and
              partnerships:{" "}
              <span className="font-medium text-primary">
                hello@aicha-craft.com
              </span>
              . For artisan applications and custom commissions, visit Become an
              AICHA Artisan and Request a Custom Piece. Follow us on social for
              behind-the-scenes stories and new drops.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
