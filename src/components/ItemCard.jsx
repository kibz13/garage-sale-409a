const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

export default function ItemCard({ item }) {
  const { name, description, price, image, sold } = item

  const waText = encodeURIComponent(
    `Hi, I'm interested in your ${name} listed for $${price}`
  )
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`

  return (
    <div className={`item-card${sold ? ' item-card--sold' : ''}`}>
      <div className="item-card__image-wrap">
        <img src={image} alt={name} className="item-card__image" />
        {sold && <div className="item-card__sold-overlay">SOLD</div>}
      </div>
      <div className="item-card__body">
        <h2 className="item-card__name">{name}</h2>
        <p className="item-card__description">{description}</p>
        <div className="item-card__footer">
          <span className="item-card__price">${price}</span>
          {!sold && (
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
    </div>
  )
}
