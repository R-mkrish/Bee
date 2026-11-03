import { useEffect, useRef, useState, useCallback } from 'react'

const SECTIONS = 8

function Img({ src, alt, style, className = '' }) {
  const [err, setErr] = useState(false)
  return (
    <div className={`fr ${className}`} style={style}>
      {!err ? (
        <img src={src} alt={alt} onError={() => setErr(true)} />
      ) : (
        <div className="fr-ph">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>{alt}</span>
        </div>
      )}
    </div>
  )
}

function Reveal({ children, cls = 'rv', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('on'); io.disconnect() }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={cls} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  )
}

export default function App() {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  const refs = useRef(Array(SECTIONS).fill(null))
  const setRef = i => el => { refs.current[i] = el }
  const goTo = i => refs.current[i]?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY, h = document.body.scrollHeight - window.innerHeight
      setProgress(h > 0 ? s / h * 100 : 0)
      let a = 0
      refs.current.forEach((el, i) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= window.innerHeight * .5 && r.bottom >= window.innerHeight * .5) a = i
      })
      setActive(a)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // fire reveals already in viewport on mount
  useEffect(() => {
    document.querySelectorAll('.rv,.rl,.rr').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * .95) el.classList.add('on')
    })
  }, [])

  return (
    <>
      <div className="prog" style={{ width: `${progress}%` }} />

      <nav>
        <span className="n-title">She Said She Was A Witch</span>
        <div className="n-dots">
          {Array.from({ length: SECTIONS }).map((_, i) => (
            <button key={i} className={`n-dot${active === i ? ' active' : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
      </nav>

      {/* ── 0 · HERO ── */}
      <section ref={setRef(0)} className="hero-wrap">
        <div className="hero-bg">
          <img src="/asset3/us_gibli.jpg" alt="" onError={e => e.target.style.display = 'none'} />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p className="hero-tag rv">A story told in photographs</p>
          <h1 className="hero-h rv" style={{ transitionDelay: '.2s' }}>
            She Said<br />She Was<br /><em>A Witch.</em>
          </h1>
          <p className="hero-sub rv" style={{ transitionDelay: '.4s' }}>
            I believed her immediately.<br />
            How else do you explain<br />
            the way the sea calms<br />
            when she walks toward it —
          </p>
          <div className="hero-arrow rv" style={{ transitionDelay: '.65s' }}>
            <svg width="18" height="26" viewBox="0 0 18 26" fill="none" stroke="currentColor" strokeWidth="1.4">
              <line x1="9" y1="0" x2="9" y2="22" />
              <polyline points="3,16 9,22 15,16" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── 1 · FIRST SIGHT ── */}
      <section ref={setRef(1)} style={{ background: 'var(--bg)' }}>
        <div className="two">
          <Reveal cls="rr">
            <Img src="/asset3/01_first_sight.jpg" alt="First sight" style={{ width: '100%', aspectRatio: '3/4' }} />
          </Reveal>
          <Reveal cls="rl" delay={0.18}>
            <div className="col">
              <h2 className="htitle">The face that<br />time forgot<br /><strong>to forget</strong></h2>
              <div className="rule" />
              <p className="poem">
                Twenty-five years the earth had turned,<br />
                twenty-five times the jasmine bloomed,<br />
                and yet when I saw her again —<br />
                <em>time simply stopped counting.</em>
              </p>
              <br />
              <p className="poem">
                The sky did not announce her.<br />
                No thunder, no sign —<br />
                only the quiet rearranging<br />
                <em>of everything I had known.</em>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2 · THE SEA REMEMBERED HER ── */}
      <section ref={setRef(2)} style={{ background: 'linear-gradient(180deg,var(--bg) 0%,var(--bg2) 60%,var(--bg3) 100%)', flexDirection: 'column', gap: 56 }}>
        <Reveal>
          <div className="ctr">
            <h2 className="htitle">The Sea<br /><strong>Remembered Her</strong></h2>
            <div className="rule c" />
            <p className="poem" style={{ maxWidth: 500, margin: '0 auto' }}>
              She wanted to be a mermaid, she said —<br />
              laughing, as if it were a small thing.<br />
              But I watched her walk into the water<br />
              <em>and the sea did not seem surprised.</em>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Img src="/asset3/Fav2.jpg" alt="Watching the sea" style={{ width: '100%', maxWidth: 1080, aspectRatio: '16/9' }} />
        </Reveal>
        <div className="tri sea-row" style={{ maxWidth: 1080, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, alignItems: "start" }}>
          <Reveal cls="rv" delay={0.05}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Img src="/asset3/shells.jpg" alt="Shells" style={{ aspectRatio: '1/1' }} />
              <Img src="/asset3/03_starfish.jpg" alt="Starfish" style={{ aspectRatio: '4/5' }} />
            </div>
          </Reveal>
          <Reveal cls="rv" delay={0.2}>
            <div style={{ padding: '24px 20px' }}>
              <p className="poem">
                She held a starfish<br />
                the way one holds<br />
                a small miracle —<br />
                with both hands,<br />
                <em>and a held breath.</em>
              </p>
              <div className="rule" style={{ margin: '28px 0' }} />
              <p className="poem">
                We picked shells.<br />
                She kept the broken ones.<br />
                That told me everything<br />
                <em>I needed to know.</em>
              </p>
            </div>
          </Reveal>
          <Reveal cls="rv" delay={0.35}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Img src="/asset3/karnataka_02.jpg" alt="Karnataka" style={{ aspectRatio: '4/5' }} />
              <Img src="/asset3/karnataka_03.jpg" alt="Karnataka" style={{ aspectRatio: '1/1' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3 · AUROVILLE ── */}
      <section ref={setRef(3)} className="dark-sec">
        <div className="two">
          <Reveal cls="rr">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Img src="/asset3/Fav.jpg" alt="Auroville" style={{ width: '100%', aspectRatio: '3/4' }} />
              <Img src="/asset3/04_auroville.jpg" alt="The tree" style={{ width: '60%', aspectRatio: '1/1', marginLeft: 'auto' }} />
            </div>
          </Reveal>
          <Reveal cls="rl" delay={0.18}>
            <div className="col">
              <h2 className="htitle">Where the world<br />goes to be<br /><strong style={{ color: 'var(--tq)' }}>still</strong></h2>
              <div className="rule" />
              <p className="poem">
                Some people carry silence<br />
                the way rivers carry light —<br />
                not making it, just<br />
                <em>showing you it was always there.</em>
              </p>
              <br />
              <p className="poem">
                She stood under a bare tree<br />
                beside still water,<br />
                and the landscape leaned toward her<br />
                <em>the way all things lean</em><br />
                <em>toward what they recognize.</em>
              </p>
              <br />
              <p className="prose">
                There is a photograph of her standing next to a leafless tree, a grey lake
                behind her, hills in the mist. She looks like she belongs to that landscape —
                or the landscape belongs to her.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4 · JOY ── */}
      <section ref={setRef(4)} style={{ background: 'var(--bg)', flexDirection: 'column', gap: 52 }}>
        <div className="two" style={{ gap: 64 }}>
          <Reveal>
            <div className="col">
              <h2 className="htitle">She came back,<br />and brought<br /><strong>joy</strong></h2>
              <div className="rule" />
              <p className="poem">
                There are people who arrive<br />
                in your life like weather —<br />
                you didn't plan for them,<br />
                and now you cannot imagine<br />
                <em>a sky without that particular cloud.</em>
              </p>
              <br />
              <p className="poem">
                She walked into a river<br />
                and kicked the water into the air<br />
                and laughed —<br />
                <em>that is what joy looks like</em><br />
                <em>when it has a body.</em>
              </p>
              <br />
              <p className="prose">
                Eight days. The kind that don't feel like days — they feel like whole chapters
                of something you will one day want to read again. She was there for every page.
              </p>
            </div>
          </Reveal>
          <Reveal cls="rl" delay={0.15}>
            <Img src="/asset3/joy.jpg" alt="Joy" style={{ width: '100%', aspectRatio: '3/4' }} />
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <div className="joy-grid" style={{ maxWidth: 980, width: '100%' }}>
            <Img src="/asset3/joy1.jpg" alt="Joy" className="jbig" style={{ aspectRatio: '16/9' }} />
            <Img src="/asset3/joy2.jpg" alt="Joy" style={{ aspectRatio: '3/4' }} />
            <Img src="/asset3/joy3.jpg" alt="Joy" style={{ aspectRatio: '3/4' }} />
            <Img src="/asset3/joy4.jpg" alt="Joy" style={{ aspectRatio: '3/4' }} />
          </div>
        </Reveal>
      </section>

      {/* ── 5 · THE CAT ── */}
      <section ref={setRef(5)} style={{ background: 'var(--bg2)' }}>
        <div className="two">
          <Reveal cls="rr">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Img src="/asset3/cat.jpg" alt="The cat" style={{ width: '100%', aspectRatio: '3/4' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Img src="/asset3/cat1.jpg" alt="Cat" style={{ aspectRatio: '1/1' }} />
                <Img src="/asset3/cat2.jpg" alt="Cat" style={{ aspectRatio: '1/1' }} />
              </div>
            </div>
          </Reveal>
          <Reveal cls="rl" delay={0.18}>
            <div className="col">
              <h2 className="htitle">She holds<br />small things<br /><strong>completely</strong></h2>
              <div className="rule" />
              <p className="poem">
                A heart reveals itself<br />
                in how it holds small things.<br />
                She held that cat<br />
                <em>the way she held everything</em><br />
                that needed holding —<br />
                completely, without asking<br />
                if it was convenient.
              </p>
              <br />
              <p className="poem">
                The cat did not struggle.<br />
                Of course it didn't.<br />
                <em>It knew what it had found.</em>
              </p>
              <br />
              <p className="prose">
                A yellow hat. A sky-blue dress.
                A cat held close, 
                like it belonged nowhere else.
                First, a gentle laugh—and then, a silent depth,
                A emotion without a name, floating somewhere in between.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6 · EIGHT DAYS IN THE RAIN ── */}
      <section ref={setRef(6)} style={{ background: 'linear-gradient(180deg,var(--bg2) 0%,var(--bg3) 50%,var(--bg2) 100%)', flexDirection: 'column', gap: 56 }}>
        <Reveal>
          <div className="ctr">
            <h2 className="htitle">Eight days<br />in the <strong>rain</strong></h2>
            <div className="rule c" />
            <p className="poem" style={{ maxWidth: 500, margin: '0 auto' }}>
              The clouds followed us for eight days,<br />
              pouring over waterfalls, hills and roads.<br />
              We stopped trying to stay dry —<br />
              <em>the rain had already decided</em><br />
              <em>to be part of the story.</em>
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="k-grid">
            <Img src="/asset3/karnataka_01.jpg" alt="Day 1" className="ktall" style={{ gridRow: 'span 2' }} />
            <Img src="/asset3/us_falls.jpg" alt="Falls" />
            <Img src="/asset3/karnataka_05.jpg" alt="Day 2" />
            <Img src="/asset3/karnataka_07.jpg" alt="Day 3" className="kwide" style={{ gridColumn: 'span 2' }} />
            <Img src="/asset3/karnataka_10.jpg" alt="Day 4" />
            <Img src="/asset3/karnataka_18.jpg" alt="Day 5" />
            <Img src="/asset3/us_road.jpg" alt="The road" />
            <Img src="/asset3/karnataka_19.jpg" alt="Day 7" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="k-grid">
            {['04', '06', '08', '09', '11', '12', '14', '15', '16', '17', '20', '21'].map(n => (
              <Img key={n} src={`/asset3/karnataka_${n}.jpg`} alt="Karnataka" />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="prose" style={{ maxWidth: 620, textAlign: 'center', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--fg-mid)' }}>
            The road between places is always underestimated. watching the Western Ghats roll past, monsoon clouds low and full.
            The road was not the space between the story.<br />
            <strong>The road was the story.</strong>
          </p>
        </Reveal>
      </section>

      {/* ── 7 · THE WITCH & THE MOON ── */}
      <section ref={setRef(7)} className="dark-sec" style={{ flexDirection: 'column', gap: 60, paddingTop: 110, paddingBottom: 110 }}>
        <Reveal delay={0.1}>
          <Img src="/asset3/Fav4.jpg" alt="Soaked in the monsoon" style={{ width: '60%', maxWidth: 560, aspectRatio: '3/4', margin: '0 auto' }} />
        </Reveal>
        <div className="trio" style={{ maxWidth: 1080, width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <Reveal cls="rv" delay={0.05}>
            <Img src="/asset3/us_small.jpg" alt="Together" style={{ width: '100%', aspectRatio: '3/4' }} />
          </Reveal>
          <Reveal cls="rv" delay={0.15}>
            <Img src="/asset3/us_mirror.jpg" alt="Favourite" style={{ width: '100%', aspectRatio: '3/4' }} />
          </Reveal>
          <Reveal cls="rv" delay={0.25}>
            <Img src="/asset3/karnataka_13.jpg" alt="Karnataka" style={{ width: '100%', aspectRatio: '3/4' }} />
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div style={{ maxWidth: 680, textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: 60 }}>
            <p className="closing-verse">
              There are people who arrive<br />
              the way certain rains arrive —<br />
              without announcement,<br />
              <em>and you are soaked before you notice.</em><br />
              <br />
              She carries something ancient in her eyes,<br />
              older than her name,<br />
              older than the sea she walks into<br />
              <em>like it already knows her.</em><br />
              <br />
              And I —<br />
              I have always been<br />
              the one who circles<br />
              what he cannot hold,<br />
              <em>and calls that devotion.</em><br />
              <br />
              Twenty-five years.<br />
              Then Pondicherry.<br />
              Then eight days of rain<br />
              and a starfish<br />
              and a bare tree by a still lake —<br />
              <em>and still I am circling.</em>
            </p>
            <div className="rule c" style={{ marginTop: 52 }} />
            <p className="footer-lbl">Wondering bee</p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
