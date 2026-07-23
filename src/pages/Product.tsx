import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { FooterSimple } from '../components/Footer';
import { Toast } from '../components/Toast';
import { useCart, useToast } from '../hooks/useCart';
import { addToCart, getCategory, getProduct, PRODUCTS, related } from '../data';

export function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id) || 3;
  const product = getProduct(productId);
  const [qty, setQty] = useState(1);
  const [cart, refreshCart] = useCart();
  const [toast, setToast] = useToast();

  if (!product) {
    return (
      <>
        <Header active="shop" />
        <section style={{ maxWidth: 1160, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}>
          <p>Product not found.</p>
          <Link to="/shop" style={{ fontWeight: 600, color: 'oklch(0.32 0.08 145)' }}>
            Back to shop
          </Link>
        </section>
        <FooterSimple />
      </>
    );
  }

  const cat = getCategory(product.category)!;
  const cartItem = cart.find((c) => c.id === product.id);
  const relatedProducts = related(product, 4);

  const add = (subscribePref: boolean) => {
    addToCart(product.id, qty);
    if (subscribePref) localStorage.setItem('aaharva_subscribe_pref', '1');
    refreshCart();
    setToast(subscribePref ? `${product.name} added — subscription applied` : `Added ${product.name} to your box`);
    setQty(1);
  };

  return (
    <>
      <Header active="shop" />
      <Toast message={toast} />

      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'oklch(0.5 0.02 50)', marginBottom: 8 }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/shop?cat=${cat.key}`}>{cat.label}</Link>
          <span>/</span>
          <span style={{ color: 'oklch(0.3 0.02 50)', fontWeight: 600 }}>{product.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <select
            value={String(productId)}
            onChange={(e) => navigate(`/product/${e.target.value}`)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: '1px solid oklch(0.86 0.02 80)',
              fontSize: 13,
              background: 'white',
              color: 'oklch(0.4 0.02 50)',
            }}
          >
            {PRODUCTS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '8px 40px 20px', display: 'flex', gap: 56 }}>
        <div style={{ flex: '0 0 440px' }}>
          <div style={{ borderRadius: 20, overflow: 'hidden', background: 'white', border: '1px solid oklch(0.89 0.016 80)' }}>
            <img src={product.img} alt={product.name} style={{ width: '100%', display: 'block' }} />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: cat.color, marginBottom: 10 }}>
            {cat.short.toUpperCase()}
          </div>
          <h1 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 34, fontWeight: 600, margin: '0 0 10px' }}>
            {product.name}
          </h1>
          <p style={{ fontSize: 15, color: 'oklch(0.46 0.02 50)', margin: '0 0 18px', lineHeight: 1.6 }}>{product.blurb}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <span style={{ fontSize: 28, fontWeight: 700 }}>₹{product.price}</span>
            <span style={{ fontSize: 13, color: 'oklch(0.55 0.02 50)' }}>{product.weight}</span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'oklch(0.42 0.1 145)',
                background: 'oklch(0.94 0.03 145)',
                padding: '4px 10px',
                borderRadius: 6,
              }}
            >
              Glycemic Index {product.gi}
            </span>
          </div>

          {product.moderation && (
            <div
              style={{
                background: 'oklch(0.96 0.03 75)',
                border: '1px solid oklch(0.86 0.05 75)',
                color: 'oklch(0.4 0.06 60)',
                fontSize: 13,
                padding: '12px 16px',
                borderRadius: 10,
                marginBottom: 22,
                lineHeight: 1.5,
              }}
            >
              Naturally higher in sugar than our GI-focused staples — a great treat in small, mindful portions.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
            {product.benefits.map((b) => (
              <div key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'oklch(0.3 0.02 50)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, marginTop: 6, flexShrink: 0 }} />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid oklch(0.86 0.02 80)', borderRadius: 10, padding: '6px 10px' }}>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ width: 26, height: 26, borderRadius: 6, border: 'none', background: 'oklch(0.96 0.012 80)', cursor: 'pointer', fontWeight: 700 }}
              >
                –
              </button>
              <span style={{ fontSize: 14, fontWeight: 700, minWidth: 16, textAlign: 'center' }}>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                style={{ width: 26, height: 26, borderRadius: 6, border: 'none', background: 'oklch(0.96 0.012 80)', cursor: 'pointer', fontWeight: 700 }}
              >
                +
              </button>
            </div>
            <span style={{ fontSize: 13, color: 'oklch(0.5 0.02 50)' }}>
              {cartItem ? `${cartItem.qty} already in your box` : 'Not yet in your box'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => add(false)}
              style={{
                padding: '14px 24px',
                borderRadius: 10,
                background: 'white',
                border: '1px solid oklch(0.3 0.06 145)',
                color: 'oklch(0.3 0.06 145)',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Add to box
            </button>
            <button
              onClick={() => add(true)}
              style={{
                padding: '14px 24px',
                borderRadius: 10,
                background: 'oklch(0.42 0.09 145)',
                border: 'none',
                color: 'white',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Subscribe &amp; save 15%
            </button>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 40px 20px' }}>
        <h2 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 24, fontWeight: 600, margin: '0 0 20px' }}>
          More from {cat.label}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {relatedProducts.map((r) => (
            <Link
              key={r.id}
              to={`/product/${r.id}`}
              style={{ display: 'block', background: 'white', borderRadius: 16, overflow: 'hidden', border: '1px solid oklch(0.89 0.016 80)', cursor: 'pointer' }}
            >
              <div style={{ height: 150, overflow: 'hidden' }}>
                <img src={r.img} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '14px 16px 18px' }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{r.name}</div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>₹{r.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FooterSimple />
    </>
  );
}
