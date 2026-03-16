import { QRCodeSVG } from 'qrcode.react'

const SITE_URL = import.meta.env.VITE_SITE_URL

export default function QRSection() {
  return (
    <div className="qr-section">
      <p className="qr-section__label">Scan to visit</p>
      <QRCodeSVG value={SITE_URL} size={128} />
      <p className="qr-section__url">{SITE_URL}</p>
    </div>
  )
}
