import Plant from '../City/Plant'

/**
 * The illustrated desk Roshni "sits at" in the Hero — laptop, coffee,
 * sticky notes, a plant — rendered wider than the avatar above it so it
 * reads as a real surface she's sitting behind, not a caption underneath
 * a portrait. Built entirely from the same token system as the rest of
 * the UI (surface/accent/glow/shadow custom properties) so it reads as
 * part of this city's day/night system rather than a bolted-on graphic.
 *
 * Prop placement notes: the avatar's "bust" crop has no background
 * margin of its own (she fills the frame edge to edge), so anything
 * placed high up or spread wide will land on her hair/blazer rather
 * than beside her. Props are kept low (close to the desk's own surface
 * line) and clustered either front-center (laptop + mug, which reads
 * naturally as "on the desk in front of her") or tucked into the
 * margins the Hero opens up beyond her silhouette (sticky notes, plant).
 *
 * Note: the desk TOP intentionally uses --surface-solid (white by day,
 * deep plum by night) rather than the theme-invariant `card-sheen`
 * gradient, so it doesn't look like a stray white UI card at night.
 */
export default function Desk({ className = '' }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* soft contact shadow, grounding the whole desk */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-2 h-5 w-[90%] rounded-full blur-lg"
        style={{ background: 'radial-gradient(ellipse at center, rgb(var(--shadow-color) / 0.55), transparent 72%)' }}
      />

      {/* a warm pool of lamp-light at the back corner — only visible at night */}
      <div
        className="absolute -top-14 right-[4%] h-20 w-20 rounded-full blur-2xl opacity-0 dark:opacity-40 transition-opacity duration-700"
        style={{ background: 'radial-gradient(circle, rgb(var(--glow) / 0.8) 0%, transparent 70%)' }}
      />

      {/* sticky notes, tucked in the clear margin beyond her left shoulder */}
      <div className="absolute -top-4 left-[1%] flex -space-x-2 rotate-[-8deg]">
        <span className="block h-4 w-4 rounded-[3px] bg-glow/70 border border-surface-border shadow-card" />
        <span className="block h-4 w-4 rounded-[3px] bg-accent/45 border border-surface-border shadow-card translate-y-1 rotate-[10deg]" />
      </div>

      {/* laptop, front-and-center — sitting in front of her, as if open on her lap/desk */}
      <div className="absolute -top-11 sm:-top-13 left-[16%] w-[32%] max-w-[130px]">
        <div className="rounded-t-md border border-surface-border bg-surface-solid p-1.5 shadow-card">
          <div className="relative rounded-sm bg-screen aspect-[16/10] overflow-hidden ring-1 ring-inset ring-white/10">
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(160deg, rgb(var(--accent) / 0.22), transparent 60%)' }}
            />
            <div className="absolute inset-0 flex flex-col justify-center gap-[5px] px-2.5">
              <span className="h-[3px] w-2/3 rounded-full bg-accent-soft/80" />
              <span className="h-[3px] w-1/2 rounded-full bg-accent-soft/50" />
              <span className="h-[3px] w-3/5 rounded-full bg-accent-soft/65" />
              <span className="h-[3px] w-3 rounded-full bg-accent-soft animate-blink" />
            </div>
          </div>
        </div>
        <div className="h-2 rounded-b-md bg-surface-strong/70 border-x border-b border-surface-border" />
      </div>

      {/* mug, right beside the laptop — low, sitting on the desk rather than floating near her collar */}
      <div className="absolute -top-6 sm:-top-7 left-[52%] w-6">
        <div className="mx-auto mb-0.5 flex h-3 justify-center gap-[3px]">
          <span className="w-px origin-bottom rounded-full bg-ink-faint/50 animate-steam" />
          <span className="w-px origin-bottom rounded-full bg-ink-faint/40 animate-steam [animation-delay:0.9s]" />
        </div>
        <div className="relative h-4 w-6 rounded-b-lg rounded-t-sm border border-surface-border bg-accent/70 shadow-card">
          <span className="absolute -right-1.5 top-0.5 h-2 w-1.5 rounded-full border border-surface-border" />
        </div>
      </div>

      {/* plant, alone in the clear margin beyond her right shoulder */}
      <Plant className="absolute -top-9 sm:-top-10 right-[2%] w-9 sm:w-10 opacity-95" />

      {/* desk surface */}
      <div
        className="relative h-9 sm:h-11 overflow-hidden rounded-t-2xl border border-surface-border shadow-card"
        style={{ background: 'linear-gradient(155deg, rgb(var(--surface-solid)), rgb(var(--surface-solid) / 0.86))' }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-white/50 dark:bg-white/10" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(200deg, rgb(var(--accent) / 0.1), transparent 55%)' }}
        />
      </div>
      <div className="h-2.5 rounded-b-lg border-x border-b border-surface-border bg-surface-solid/85" />
    </div>
  )
}
