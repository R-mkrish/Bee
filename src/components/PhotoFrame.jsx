export default function PhotoFrame({ src, alt, style, className = '' }) {
  return (
    <div className={`photo-frame ${className}`} style={style}>
      {src ? (
        <img
          src={src}
          alt={alt || ''}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div className="photo-placeholder">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>{alt || 'Photo'}</span>
        </div>
      )}
    </div>
  )
}
