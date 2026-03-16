import { items } from './data/items.js'
import ItemGrid from './components/ItemGrid.jsx'
import QRSection from './components/QRSection.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-text">
          <h1 className="app__title">Garage Sale</h1>
          <p className="app__subtitle">
            Everything must go! Message via WhatsApp to arrange pickup.
          </p>
        </div>
        <QRSection />
      </header>
      <main className="app__main">
        <ItemGrid items={items} />
      </main>
    </div>
  )
}
