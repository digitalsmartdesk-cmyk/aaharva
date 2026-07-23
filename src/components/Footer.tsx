import { Link } from 'react-router-dom';

export function FooterFull() {
  return (
    <footer style={{ marginTop: 88, borderTop: '1px solid oklch(0.89 0.016 80)', background: 'white' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '56px 40px 24px',
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: 32,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <img src="/uploads/Logo.png" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} alt="" />
            <span style={{ fontFamily: "'Source Serif 4',serif", fontSize: 19, fontWeight: 600, color: 'oklch(0.3 0.06 145)' }}>
              Aaharva
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'oklch(0.5 0.02 50)', lineHeight: 1.6, maxWidth: 280 }}>
            Healthy eating, simplified — low-GI staples for diabetic and pre-diabetic kitchens.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Shop</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'oklch(0.5 0.02 50)' }}>
            <Link to="/shop">All products</Link>
            <Link to="/subscription">Subscription boxes</Link>
            <Link to="/shop?cat=flours">Flours &amp; Roti Premixes</Link>
            <Link to="/shop?cat=mealkits">Meal Kits</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Company</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'oklch(0.5 0.02 50)' }}>
            <a href="#">Our sourcing</a>
            <a href="#">FSSAI &amp; lab reports</a>
            <a href="#">Contact us</a>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Support</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: 'oklch(0.5 0.02 50)' }}>
            <a href="#">Manage subscription</a>
            <a href="#">Shipping &amp; returns</a>
            <a href="#">FAQs</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 40px 32px', borderTop: '1px solid oklch(0.92 0.012 80)' }}>
        <p style={{ fontSize: 12, color: 'oklch(0.58 0.02 50)', lineHeight: 1.6, margin: '0 0 8px' }}>
          Aaharva products are designed to support balanced, low-GI nutrition and are not a substitute for medical
          treatment. Please consult your doctor or dietician for advice specific to you.
        </p>
        <p style={{ fontSize: 12, color: 'oklch(0.6 0.02 50)', margin: 0 }}>© 2026 Aaharva. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function FooterSimple({ maxWidth = 1160 }: { maxWidth?: number }) {
  return (
    <footer style={{ marginTop: 70, borderTop: '1px solid oklch(0.89 0.016 80)', background: 'white' }}>
      <div
        style={{
          maxWidth,
          margin: '0 auto',
          padding: '32px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <p style={{ fontSize: 12, color: 'oklch(0.58 0.02 50)', margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
          Aaharva products are designed to support balanced, low-GI nutrition and are not a substitute for medical
          treatment. Please consult your doctor or dietician for advice specific to you.
        </p>
        <p style={{ fontSize: 12, color: 'oklch(0.6 0.02 50)', margin: 0, whiteSpace: 'nowrap' }}>© 2026 Aaharva</p>
      </div>
    </footer>
  );
}
