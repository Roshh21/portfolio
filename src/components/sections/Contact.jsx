import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { FiGithub, FiLinkedin, FiCode, FiMail, FiDownload, FiSend, FiCheck } from 'react-icons/fi'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import Button from '../ui/Button'
import MagneticButton from '../ui/MagneticButton'
import RevealOnScroll from '../ui/RevealOnScroll'
import { Avatar } from '../../avatar'
import CityScene from '../City/CityScene'
import StringLights from '../City/StringLights'
import Plant from '../City/Plant'
import profile from '../../data/profile.json'

const SOCIALS = [
  { key: 'github', icon: FiGithub, label: 'GitHub' },
  { key: 'linkedin', icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'leetcode', icon: FiCode, label: 'LeetCode' },
  { key: 'gfg', icon: FiCode, label: 'GFG' },
]

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const inputClasses =
  'w-full rounded-xl bg-surface-solid/60 border border-surface-border px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus-visible:border-accent outline-none transition-colors'

export default function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn(
        'EmailJS is not configured — add VITE_EMAILJS_* keys to your .env (see .env.example).'
      )
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.error('EmailJS send failed:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      {/* Last stop — the rooftop, evening skyline, warm lights */}
      <CityScene seed={13} starCount={55} nearHeight={[36, 68]} fade={false} className="opacity-90" />
      <div
        className="absolute inset-x-0 top-0 h-1/4 -z-10"
        style={{ background: 'linear-gradient(to bottom, rgb(var(--canvas)), transparent)' }}
      />

      <div className="container-max mx-auto">
        <SectionHeading
          eyebrow="// contact"
          title="Let's build something."
          description="Open to full-time roles, internships, and interesting collaborations in AI/ML."
          align="center"
        />

        <RevealOnScroll className="max-w-3xl mx-auto">
          <StringLights className="mb-2 max-w-md mx-auto opacity-90" />
          <GlassCard className="glass-panel-strong p-8 sm:p-10 grid md:grid-cols-2 gap-10 relative">
            <Plant className="absolute -top-6 -right-3 w-12 hidden md:block opacity-90" />

            <div className="flex flex-col justify-between gap-8">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 shrink-0">
                    <Avatar pose="bust" ariaLabel="Illustration of Roshni" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink">Get in touch</h3>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 text-accent hover:text-accent-soft transition-colors text-sm break-all"
                >
                  <FiMail /> {profile.email}
                </a>
                <p className="text-sm text-ink-muted mt-4 leading-relaxed">
                  Based in {profile.location}. Usually replies within a day.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {SOCIALS.map(({ key, icon: Icon, label }) =>
                  profile.socials[key] ? (
                    <a
                      key={key}
                      href={profile.socials[key]}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="w-11 h-11 rounded-full glass-panel flex items-center justify-center text-ink-muted hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      <Icon />
                    </a>
                  ) : null
                )}
              </div>

              <MagneticButton className="self-start">
                <Button as="a" href={profile.resumeUrl} download variant="outline" icon={FiDownload}>
                  Download Resume
                </Button>
              </MagneticButton>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="text-xs font-mono text-ink-muted mb-1.5 block">
                  Name
                </label>
                <input id="name" name="user_name" type="text" required className={inputClasses} placeholder="Ada Lovelace" />
              </div>
              <div>
                <label htmlFor="email" className="text-xs font-mono text-ink-muted mb-1.5 block">
                  Email
                </label>
                <input id="email" name="user_email" type="email" required className={inputClasses} placeholder="ada@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-mono text-ink-muted mb-1.5 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className={`${inputClasses} resize-none`}
                  placeholder="Let's talk about..."
                />
              </div>

              <Button type="submit" disabled={status === 'sending'} icon={status === 'success' ? FiCheck : FiSend}>
                {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent!' : 'Send message'}
              </Button>

              {status === 'error' && (
                <p className="text-xs text-warn font-mono" role="alert">
                  Message not sent. Please try again or email me directly at {profile.email}.
                </p>
              )}
            </form>
          </GlassCard>
        </RevealOnScroll>
      </div>
    </section>
  )
}
