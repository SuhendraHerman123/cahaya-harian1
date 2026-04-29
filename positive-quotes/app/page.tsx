'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { quotes, getDailyQuote, getCategoryLabel, type Quote } from '@/lib/quotes'

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  )
}

function ChevronIcon({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left'
        ? <polyline points="15 18 9 12 15 6"/>
        : <polyline points="9 18 15 12 9 6"/>
      }
    </svg>
  )
}

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [tab, setTab] = useState<'daily' | 'explore' | 'favorites'>('daily')

  useEffect(() => {
    const daily = getDailyQuote()
    const idx = quotes.findIndex(q => q.id === daily.id)
    setCurrentIndex(idx)
    setCurrentQuote(daily)
    const saved = localStorage.getItem('favorites')
    if (saved) setFavorites(JSON.parse(saved))
    setTimeout(() => setIsLoading(false), 600)
  }, [])

  const goToQuote = useCallback((index: number) => {
    if (transitioning) return
    setTransitioning(true)
    setImageLoaded(false)
    setTimeout(() => {
      const newIndex = (index + quotes.length) % quotes.length
      setCurrentIndex(newIndex)
      setCurrentQuote(quotes[newIndex])
      setTransitioning(false)
    }, 350)
  }, [transitioning])

  const handleRandom = () => {
    let next = Math.floor(Math.random() * quotes.length)
    if (next === currentIndex) next = (next + 1) % quotes.length
    goToQuote(next)
  }

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
      localStorage.setItem('favorites', JSON.stringify(updated))
      return updated
    })
  }

  const handleShare = async () => {
    if (!currentQuote) return
    const text = `"${currentQuote.text}" — ${currentQuote.author}\n\nvia Cahaya Harian ✨`
    try {
      if (navigator.share) {
        await navigator.share({ text })
      } else {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {}
  }

  const favoriteQuotes = quotes.filter(q => favorites.includes(q.id))

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-white/60 animate-spin mx-auto" />
          <p className="text-white/30 text-sm font-light tracking-widest uppercase">Memuat inspirasi...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">

      {/* Background ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] animate-orb blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentQuote?.accent || '#FF6B35'}, transparent)`,
            top: '-10%', right: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentQuote?.accent || '#FF6B35'}, transparent)`,
            bottom: '10%', left: '-5%',
            animation: 'orb 15s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <div>
          <h1 className="text-lg font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Cahaya<span style={{ color: currentQuote?.accent || '#FF6B35' }}>.</span>
          </h1>
          <p className="text-white/30 text-xs tracking-widest uppercase mt-0.5">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {(['daily', 'explore', 'favorites'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                tab === t
                  ? 'text-black'
                  : 'text-white/40 hover:text-white/70'
              }`}
              style={tab === t ? { backgroundColor: currentQuote?.accent || '#FF6B35' } : {}}
            >
              {t === 'daily' ? '✦ Hari Ini' : t === 'explore' ? 'Jelajahi' : `❤ ${favorites.length}`}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-4 md:px-10 pb-20">

        {/* DAILY TAB */}
        {tab === 'daily' && currentQuote && (
          <div className={`max-w-5xl mx-auto transition-all duration-350 ${transitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>

            {/* Hero Card */}
            <div className="relative rounded-3xl overflow-hidden mt-2 glass border border-white/10" style={{ minHeight: '480px' }}>

              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={currentQuote.imageUrl}
                  alt={currentQuote.imageKeyword}
                  fill
                  priority
                  className={`object-cover transition-all duration-700 ${imageLoaded ? 'opacity-40 scale-100' : 'opacity-0 scale-105'}`}
                  onLoad={() => setImageLoaded(true)}
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="absolute inset-0" style={{
                  background: `linear-gradient(135deg, ${currentQuote.accent}15 0%, transparent 60%)`
                }} />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end min-h-[480px]">

                {/* Category badge */}
                <div className="mb-6 animate-fade-in">
                  <span
                    className="category-badge px-3 py-1.5 rounded-full text-black font-semibold"
                    style={{ backgroundColor: currentQuote.accent }}
                  >
                    {getCategoryLabel(currentQuote.category)}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="animate-fade-in delay-100">
                  <p className="quote-text text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-6">
                    &ldquo;{currentQuote.text}&rdquo;
                  </p>
                  <footer className="text-white/50 text-sm font-light tracking-wide">
                    — {currentQuote.author}
                  </footer>
                </blockquote>

                {/* Actions */}
                <div className="flex items-center justify-between mt-8 animate-fade-in delay-200">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleFavorite(currentQuote.id)}
                      className={`p-3 rounded-2xl glass transition-all duration-300 hover:scale-110 active:scale-95 ${
                        favorites.includes(currentQuote.id) ? 'text-rose-400' : 'text-white/40 hover:text-white/70'
                      }`}
                      title="Simpan ke favorit"
                    >
                      <HeartIcon filled={favorites.includes(currentQuote.id)} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-2xl glass text-white/40 hover:text-white/70 transition-all duration-300 hover:scale-110 active:scale-95 relative"
                      title="Bagikan"
                    >
                      <ShareIcon />
                      {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-white text-black px-2 py-1 rounded-full whitespace-nowrap">
                          Tersalin! ✓
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToQuote(currentIndex - 1)}
                      className="p-3 rounded-2xl glass text-white/40 hover:text-white/70 transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      <ChevronIcon dir="left" />
                    </button>
                    <button
                      onClick={handleRandom}
                      className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 text-black"
                      style={{ backgroundColor: currentQuote.accent }}
                    >
                      <RefreshIcon />
                      <span className="hidden md:inline">Acak</span>
                    </button>
                    <button
                      onClick={() => goToQuote(currentIndex + 1)}
                      className="p-3 rounded-2xl glass text-white/40 hover:text-white/70 transition-all duration-300 hover:scale-110 active:scale-95"
                    >
                      <ChevronIcon dir="right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mt-5">
              {quotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToQuote(i)}
                  className="progress-dot rounded-full"
                  style={{
                    width: i === currentIndex ? '20px' : '6px',
                    height: '6px',
                    backgroundColor: i === currentIndex ? currentQuote.accent : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { label: 'Quote tersedia', value: quotes.length, icon: '📚' },
                { label: 'Favorit disimpan', value: favorites.length, icon: '❤️' },
                { label: 'Streak harian', value: '1 hari', icon: '🔥' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center border border-white/5">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl font-semibold text-white">{stat.value}</div>
                  <div className="text-white/30 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPLORE TAB */}
        {tab === 'explore' && (
          <div className="max-w-5xl mx-auto mt-4 animate-fade-in">
            <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Semua Quote
            </h2>
            <p className="text-white/40 text-sm mb-6">Temukan kata-kata yang menyentuh hatimu</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(showAll ? quotes : quotes.slice(0, 6)).map((quote, i) => (
                <button
                  key={quote.id}
                  onClick={() => { goToQuote(quotes.indexOf(quote)); setTab('daily') }}
                  className="glass rounded-2xl overflow-hidden text-left border border-white/5 hover:border-white/15 transition-all duration-300 hover:scale-[1.02] group"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={quote.imageUrl}
                      alt={quote.imageKeyword}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span
                      className="absolute top-3 left-3 category-badge px-2.5 py-1 rounded-full text-black font-semibold text-[10px]"
                      style={{ backgroundColor: quote.accent }}
                    >
                      {getCategoryLabel(quote.category)}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(quote.id) }}
                      className={`absolute top-3 right-3 p-2 rounded-full glass transition-all ${favorites.includes(quote.id) ? 'text-rose-400' : 'text-white/40'}`}
                    >
                      <HeartIcon filled={favorites.includes(quote.id)} />
                    </button>
                  </div>
                  <div className="p-4">
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-2 quote-text italic">
                      &ldquo;{quote.text}&rdquo;
                    </p>
                    <p className="text-white/30 text-xs mt-2">— {quote.author}</p>
                  </div>
                </button>
              ))}
            </div>

            {!showAll && quotes.length > 6 && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full mt-4 py-3 rounded-2xl glass text-white/50 hover:text-white/80 text-sm transition-all border border-white/5 hover:border-white/15"
              >
                Tampilkan {quotes.length - 6} quote lainnya →
              </button>
            )}
          </div>
        )}

        {/* FAVORITES TAB */}
        {tab === 'favorites' && (
          <div className="max-w-5xl mx-auto mt-4 animate-fade-in">
            <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Quote Favorit
            </h2>
            <p className="text-white/40 text-sm mb-6">
              {favoriteQuotes.length === 0
                ? 'Belum ada favorit. Mulai simpan quote yang kamu suka!'
                : `${favoriteQuotes.length} quote tersimpan`}
            </p>

            {favoriteQuotes.length === 0 ? (
              <div className="glass rounded-3xl p-12 text-center border border-white/5">
                <div className="text-5xl mb-4">🌟</div>
                <p className="text-white/40 text-sm">Ketuk ikon ❤ pada quote untuk menyimpannya di sini</p>
                <button
                  onClick={() => setTab('daily')}
                  className="mt-4 px-5 py-2.5 rounded-full text-sm text-black font-medium transition-all hover:scale-105"
                  style={{ backgroundColor: currentQuote?.accent || '#FF6B35' }}
                >
                  Jelajahi Quote →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {favoriteQuotes.map((quote, i) => (
                  <div
                    key={quote.id}
                    className="glass rounded-2xl p-5 border border-white/5 flex gap-4 items-start animate-fade-in"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={quote.imageUrl}
                        alt={quote.imageKeyword}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span
                        className="category-badge px-2 py-0.5 rounded-full text-black font-semibold text-[10px] mb-2 inline-block"
                        style={{ backgroundColor: quote.accent }}
                      >
                        {getCategoryLabel(quote.category)}
                      </span>
                      <p className="text-white/80 text-sm leading-relaxed quote-text italic line-clamp-2">
                        &ldquo;{quote.text}&rdquo;
                      </p>
                      <p className="text-white/30 text-xs mt-1">— {quote.author}</p>
                    </div>
                    <button
                      onClick={() => toggleFavorite(quote.id)}
                      className="p-2 text-rose-400 hover:text-white/40 transition-colors flex-shrink-0"
                    >
                      <HeartIcon filled={true} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom decoration */}
      <footer className="relative z-10 text-center py-6">
        <p className="text-white/15 text-xs tracking-widest uppercase">
          Cahaya Harian · Setiap hari adalah kesempatan baru ✦
        </p>
      </footer>
    </div>
  )
}
