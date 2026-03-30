import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

const SITE_URL = import.meta.env.VITE_SITE_URL

export default function QRSection() {
  const canvasRef = useRef(null)

  const download = () => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'garage-sale-qr.png'
    a.click()
  }

  return (
    <div className="qr-section">
      <p className="qr-section__label">Scan to visit</p>
      <div ref={canvasRef}>
        <QRCodeCanvas value={SITE_URL} size={128} />
      </div>
      <p className="qr-section__url">{SITE_URL}</p>
      <button className="qr-section__download" onClick={download}>
        Download QR
      </button>
    </div>
  )
}
