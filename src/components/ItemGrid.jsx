import ItemCard from './ItemCard.jsx'

export default function ItemGrid({ items, adminMode, onToggleSold }) {
  return (
    <div className="item-grid">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} adminMode={adminMode} onToggleSold={onToggleSold} />
      ))}
    </div>
  )
}
