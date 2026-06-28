function Footer() {
  return (
    <footer className="bottom-0 position-relative">
      <div className="max-w-[90%] mx-auto px-5 border-t border-white/6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-xs ">
        <span
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="font-bold text-white/40 text-sm "
        >
          ViscoAI
        </span>

        <span>© {new Date().getFullYear()} ViscoAI. All rights reserved.</span>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Contact"].map((itm, index) => (
            <a
              key={index}
              href="#"
              className="hover:text-white/60 transition-colors"
            >
              {itm}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
