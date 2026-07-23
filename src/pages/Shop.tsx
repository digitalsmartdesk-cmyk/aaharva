import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { FooterSimple } from '../components/Footer';
import { Toast } from '../components/Toast';
import { useCart, useToast } from '../hooks/useCart';
import { CATEGORIES, PRODUCTS, addToCart, cartTotals, getCategory, updateQty, type Product } from '../data';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat');
  const [selectedCat, setSelectedCat] = useState<string>(catParam && getCategory(catParam) ? catParam : 'all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  const [cart, refreshCart] = useCart();
  const [toast, setToast] = useToast(1800);

  const qtyFor = (id: number) => cart.find((c) => c.id === id)?.qty ?? 0;

  const addToBox = (p: Product) => {
    addToCart(p.id, 1);
    refreshCart();
    setToast(`Added ${p.name} to your box`);
  };
  const setQty = (id: number, qty: number) => {
    updateQty(id, qty);
    refreshCart();
  };

  const selectCat = (key: string) => {
    setSelectedCat(key);
    setSearchParams(key === 'all' ? {} : { cat: key });
  };

  const filteredProducts = useMemo(
    () => (selectedCat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCat)),
    [selectedCat],
  );
  const activeCat = getCategory(selectedCat);
  const totals = cartTotals(subscribe);

  const onCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDrawerOpen(true);
  };

  return (
    <>
      <Header active="shop" onCartClick={onCartClick} />
      <Toast message={toast} />

      <section style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 40px 20px' }}>
        <h1 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 36, fontWeight: 600, margin: '0 0 8px' }}>
          Shop all products
        </h1>
        <p style={{ margin: '0 0 32px', color: 'oklch(0.46 0.02 50)', fontSize: 15 }}>
          30 low-GI staples, sorted by ingredient and everyday use.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
          <button
            onClick={() => selectCat('all')}
            style={{
              padding: '9px 16px',
              borderRadius: 999,
              border: selectedCat === 'all' ? 'none' : '1px solid oklch(0.86 0.02 80)',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: selectedCat === 'all' ? 700 : 600,
              background: selectedCat === 'all' ? 'oklch(0.32 0.08 145)' : 'white',
              color: selectedCat === 'all' ? 'white' : 'oklch(0.4 0.02 50)',
            }}
          >
            All ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => selectCat(cat.key)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 999,
                  border: active ? 'none' : '1px solid oklch(0.86 0.02 80)',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: active ? 700 : 600,
                  background: active ? cat.color : 'white',
                  color: active ? 'white' : 'oklch(0.4 0.02 50)',
                }}
              >
                {cat.short}
              </button>
            );
          })}
        </div>

        {activeCat && (
          <p style={{ margin: '-20px 0 28px', fontSize: 14, color: 'oklch(0.46 0.02 50)' }}>{activeCat.desc}</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {filteredProducts.map((p) => {
            const qty = qtyFor(p.id);
            return (
              <div
                key={p.id}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: '1px solid oklch(0.89 0.016 80)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link
                  to={`/product/${p.id}`}
                  style={{ display: 'block', height: 170, overflow: 'hidden', background: 'oklch(0.96 0.012 80)' }}
                >
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </Link>
                <div style={{ padding: '14px 16px 18px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'oklch(0.42 0.1 145)',
                        background: 'oklch(0.94 0.03 145)',
                        padding: '3px 8px',
                        borderRadius: 6,
                      }}
                    >
                      GI {p.gi}
                    </span>
                    <span style={{ fontSize: 12, color: 'oklch(0.55 0.02 50)' }}>{p.weight}</span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 50)', lineHeight: 1.4, flex: 1 }}>{p.blurb}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>₹{p.price}</span>
                    {qty > 0 ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          background: 'oklch(0.94 0.03 145)',
                          borderRadius: 8,
                          padding: '4px 6px',
                        }}
                      >
                        <button
                          onClick={() => setQty(p.id, qty - 1)}
                          style={{ width: 22, height: 22, borderRadius: 6, border: 'none', background: 'white', cursor: 'pointer', fontWeight: 700 }}
                        >
                          –
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 14, textAlign: 'center' }}>{qty}</span>
                        <button
                          onClick={() => setQty(p.id, qty + 1)}
                          style={{ width: 22, height: 22, borderRadius: 6, border: 'none', background: 'white', cursor: 'pointer', fontWeight: 700 }}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToBox(p)}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 8,
                          background: 'oklch(0.42 0.09 145)',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: 12,
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Add to box
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {drawerOpen && (
        <>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'oklch(0.15 0.01 50 / 0.45)', zIndex: 60 }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: 420,
              maxWidth: '92vw',
              background: 'white',
              zIndex: 61,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-16px 0 40px oklch(0.2 0.02 50 / 0.15)',
            }}
          >
            <div
              style={{
                padding: '20px 22px',
                borderBottom: '1px solid oklch(0.89 0.016 80)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontFamily: "'Source Serif 4',serif", fontSize: 20, fontWeight: 600 }}>Your box</span>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{ border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', color: 'oklch(0.5 0.02 50)' }}
              >
                ×
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px' }}>
              {totals.items.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'oklch(0.55 0.02 50)', fontSize: 14 }}>
                  Your box is empty.
                  <br />
                  Add a few products to get started.
                </div>
              )}
              {totals.items.map((i) => (
                <div
                  key={i.id}
                  style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid oklch(0.92 0.012 80)' }}
                >
                  <img src={i.product.img} style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} alt="" />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{i.product.name}</div>
                    <div style={{ fontSize: 11, color: 'oklch(0.55 0.02 50)', marginBottom: 8 }}>
                      {i.product.weight} · ₹{i.product.price}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        onClick={() => setQty(i.id, i.qty - 1)}
                        style={{ width: 22, height: 22, borderRadius: 6, border: '1px solid oklch(0.86 0.02 80)', background: 'white', cursor: 'pointer', fontWeight: 700 }}
                      >
                        –
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 700, minWidth: 14, textAlign: 'center' }}>{i.qty}</span>
                      <button
                        onClick={() => setQty(i.id, i.qty + 1)}
                        style={{ width: 22, height: 22, borderRadius: 6, border: '1px solid oklch(0.86 0.02 80)', background: 'white', cursor: 'pointer', fontWeight: 700 }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => setQty(i.id, 0)}
                        style={{ marginLeft: 'auto', border: 'none', background: 'none', color: 'oklch(0.55 0.14 30)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '18px 22px 24px', borderTop: '1px solid oklch(0.89 0.016 80)' }}>
              <div style={{ display: 'flex', background: 'oklch(0.96 0.012 80)', borderRadius: 10, padding: 4, marginBottom: 16 }}>
                <button
                  onClick={() => setSubscribe(false)}
                  style={{
                    flex: 1,
                    padding: 9,
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: !subscribe ? 700 : 600,
                    background: !subscribe ? 'white' : 'transparent',
                    boxShadow: !subscribe ? '0 1px 3px oklch(0.2 0.02 50 / 0.12)' : 'none',
                    color: !subscribe ? 'oklch(0.22 0.02 50)' : 'oklch(0.5 0.02 50)',
                  }}
                >
                  One-time
                </button>
                <button
                  onClick={() => setSubscribe(true)}
                  style={{
                    flex: 1,
                    padding: 9,
                    borderRadius: 8,
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: subscribe ? 700 : 600,
                    background: subscribe ? 'white' : 'transparent',
                    boxShadow: subscribe ? '0 1px 3px oklch(0.2 0.02 50 / 0.12)' : 'none',
                    color: subscribe ? 'oklch(0.32 0.08 145)' : 'oklch(0.5 0.02 50)',
                  }}
                >
                  Monthly · save 15%
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'oklch(0.5 0.02 50)', marginBottom: 6 }}>
                <span>Subtotal</span>
                <span>₹{totals.subtotal}</span>
              </div>
              {subscribe && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'oklch(0.42 0.1 145)', marginBottom: 6 }}>
                  <span>Subscription discount (15%)</span>
                  <span>−₹{totals.discount}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, marginBottom: 18 }}>
                <span>Total</span>
                <span>₹{totals.total}</span>
              </div>
              <Link
                to="/subscription"
                style={{ display: 'block', textAlign: 'center', padding: 13, borderRadius: 10, background: 'oklch(0.42 0.09 145)', color: 'white', fontWeight: 700, fontSize: 14 }}
              >
                Continue to plan
              </Link>
            </div>
          </div>
        </>
      )}

      <FooterSimple />
    </>
  );
}
