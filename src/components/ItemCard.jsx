import { useState } from 'react'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function ItemCard({ item, adminMode, onToggleSold }) {
  const { id, name, description, price, images, image, originalUrl, sold, availableFrom } = item
  const isUnavailable = !sold && availableFrom && new Date(availableFrom + 'T00:00:00') > new Date()
  const photos = images?.length ? images : image ? [image] : []
  const [photoIdx, setPhotoIdx] = useState(0)

  const waText = encodeURIComponent(`Hi, I'm interested in your ${name} listed for $${price}`)
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`

  const prev = () => setPhotoIdx((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setPhotoIdx((i) => (i + 1) % photos.length)

  return (
    <div className={`item-card${sold ? ' item-card--sold' : ''}${isUnavailable ? ' item-card--unavailable' : ''}`}>
      <div className="item-card__image-wrap">
        {photos.length > 0 ? (
          <img src={photos[photoIdx]} alt={`${name} photo ${photoIdx + 1}`} className="item-card__image" />
        ) : (
          <div className="item-card__image item-card__image--placeholder" />
        )}
        {sold && <div className="item-card__sold-overlay">SOLD</div>}
        {isUnavailable && <div className="item-card__available-overlay">Available {formatDate(availableFrom)}</div>}
        {photos.length > 1 && (
          <>
            <button className="item-card__nav item-card__nav--prev" onClick={prev} aria-label="Previous photo">&#8249;</button>
            <button className="item-card__nav item-card__nav--next" onClick={next} aria-label="Next photo">&#8250;</button>
            <div className="item-card__dots">
              {photos.map((_, i) => (
                <button
                  key={i}
                  className={`item-card__dot${i === photoIdx ? ' item-card__dot--active' : ''}`}
                  onClick={() => setPhotoIdx(i)}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="item-card__body">
        <h2 className="item-card__name">{name}</h2>
        <p className="item-card__description">{description}</p>
        <div className="item-card__footer">
          <span className="item-card__price">${price}</span>
          <div className="item-card__actions">
            {originalUrl && (
              <a
                className="item-card__compare"
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Compare online
              </a>
            )}
            {!sold && !isUnavailable && (
              <a
                className="item-card__whatsapp"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
        {adminMode && (
          <button
            className={`item-card__toggle${sold ? ' item-card__toggle--sold' : ''}`}
            onClick={() => onToggleSold(id)}
          >
            {sold ? 'Mark Available' : 'Mark Sold'}
          </button>
        )}
      </div>
    </div>
  )
}
