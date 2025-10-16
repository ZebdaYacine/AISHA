import Features from "./feature";

export default function Footer() {
  const titleClasses =
    "text-[#1a1a1a] uppercase tracking-[0.2em] text-xs sm:text-sm font-canela font-semibold opacity-70 transition-opacity duration-300 hover:opacity-100";

  return (
    <footer className="bg-[#eaeaea] text-[#1a1a1a] px-6 py-12">
      <div className=" w-3/4 mx-auto ">
        <Features />
      </div>

      <div className="mt-20 max-w-6xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-3">
            <h3 className={titleClasses}>Aicha</h3>
            <p className="text-lg font-canela font-semibold tracking-wide">
              CRAFTING CULTURE
            </p>
            <p className="text-sm leading-relaxed">
              Timeless craftsmanship. Curated heritage.
              <br />
              Handmade in Algeria.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className={titleClasses}>Customer Care</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <a className="hover:underline underline-offset-4" href="#">
                FAQs
              </a>
              <a className="hover:underline underline-offset-4" href="#">
                Shipping &amp; Returns
              </a>
              <a className="hover:underline underline-offset-4" href="#">
                Contact Us
              </a>
              <a className="hover:underline underline-offset-4" href="#">
                Terms &amp; Conditions
              </a>
              <a className="hover:underline underline-offset-4" href="#">
                Privacy Policy
              </a>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className={titleClasses}>Stay Connected</h3>
            <p className="text-sm leading-relaxed">
              Join our circle for exclusive releases and cultural stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="w-full border border-[#1a1a1a]/30 bg-white px-4 py-3 text-sm text-[#1a1a1a] focus:border-[#1a1a1a] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="sm:w-auto w-full bg-[#1a1a1a] text-white px-6 py-3 text-sm uppercase tracking-[0.2em] transition-colors duration-200 hover:bg-black"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-[#1a1a1a]/30 text-center space-y-2 text-sm">
          <span className={`${titleClasses} inline-block`}>Follow us</span>
          <p>Instagram &bull; Pinterest &bull; TikTok</p>
          <p>© 2025 AICHA. All rights reserved.</p>
          <p>Made in Algeria | Global Shipping Available</p>
        </div>
      </div>
    </footer>
  );
}
