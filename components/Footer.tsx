export default function Footer() {
  return (
    <footer className="px-12 py-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
      <div className="text-sm text-text-dim font-space-mono">
        © 2025 Maurice Hermanns
      </div>
      <div className="text-sm text-text-dim font-space-mono">
        <span>Built with </span>
        <span className="inline-block animate-heartbeat">❤️</span>
        <span> using Next.js & GSAP</span>
      </div>
    </footer>
  )
}