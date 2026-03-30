import { useState } from 'react'
import { items as initialItems } from './data/items.js'
import ItemGrid from './components/ItemGrid.jsx'
import QRSection from './components/QRSection.jsx'

function loadSoldMap() {
  try {
    return JSON.parse(localStorage.getItem('soldMap') || '{}')
  } catch {
    return {}
  }
}

export default function App() {
  const [soldMap, setSoldMap] = useState(loadSoldMap)
  const [adminMode, setAdminMode] = useState(false)
  const [titleClicks, setTitleClicks] = useState(0)

  const items = initialItems.map((item) => ({
    ...item,
    sold: item.id in soldMap ? soldMap[item.id] : item.sold,
  }))

  const toggleSold = (id) => {
    setSoldMap((prev) => {
      const current = id in prev ? prev[id] : initialItems.find((i) => i.id === id).sold
      const next = { ...prev, [id]: !current }
      localStorage.setItem('soldMap', JSON.stringify(next))
      return next
    })
  }

  const handleTitleClick = () => {
    setTitleClicks((n) => {
      const next = n + 1
      if (next >= 5) {
        setAdminMode((m) => !m)
        return 0
      }
      return next
    })
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-text">
          <h1 className="app__title" onClick={handleTitleClick}>
            Garage Sale
          </h1>
          <p className="app__subtitle">
            Everything must go! Message via WhatsApp to arrange pickup.
          </p>
          {adminMode && <span className="admin-badge">Admin Mode — click items to toggle</span>}
        </div>
        <QRSection />
      </header>
      <main className="app__main">
        <ItemGrid items={items} adminMode={adminMode} onToggleSold={toggleSold} />
      </main>
    </div>
  )
}
