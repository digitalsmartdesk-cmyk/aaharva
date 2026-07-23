import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { FooterSimple } from '../components/Footer';
import { Toast } from '../components/Toast';
import { useCart, useToast } from '../hooks/useCart';
import { addToCart, CATEGORIES, cartTotals, getProduct, PRODUCTS, updateQty } from '../data';

const BOX_DEFS = [
  { name: 'Diabetic Starter Box', desc: 'The essentials for someone newly managing blood sugar.', itemIds: [3, 15, 4, 28] },
  { name: 'Breakfast Box', desc: 'A full week of low-GI dosa, idli, poha and porridge.', itemIds: [10, 11, 12, 14] },
  { name: 'Protein Box', desc: 'Plant protein staples for strength and steady energy.', itemIds: [16, 17, 18, 22] },
  { name: 'Snacking Box', desc: 'Roasted, not fried — snacking that won’t spike you.', itemIds: [20, 21, 23, 24] },
];

export function Subscription() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [confirmed, setConfirmed] = useState(false);
  const [cart, refreshCart] = useCart();
  const [toast, setToast] = useToast();

  const qtyFor = (id: number) => cart.find((c) => c.id === id)?.qty ?? 0;
  const addToBox = (id: number) => {
    addToCart(id, 1);
    refreshCart();
  };
  const setQty = (id: number, qty: number) => {
    updateQty(id, qty);
    refreshCart();
  };
  const addBox = (box: (typeof BOX_DEFS)[number]) => {
    box.itemIds.forEach((id) => addToCart(id, 1));
    refreshCart();
    setToast(`${box.name} added to your subscription`);
  };

  const boxes = useMemo(
    () =>
      BOX_DEFS.map((b) => {
        const items = b.itemIds.map((id) => getProduct(id)!);
        const subtotal = items.reduce((s, p) => s + p.price, 0);
        const discounted = Math.round(subtotal * 0.85);
        return { ...b, thumbs: items.map((p) => p.img), itemsLine: items.map((p) => p.name).join(' · '), subtotal, discounted };
      }),
    [],
  );

  const pickerProducts = selectedCat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCat);
  const totals = cartTotals(true);
  const cartEmpty = totals.items.length === 0;

  return (
    <>
      <Header active="subscription" />
      <Toast message={toast} />

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 40px 20px', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            borderRadius: 999,
            background: 'oklch(0.94 0.03 145)',
            color: 'oklch(0.32 0.08 145)',
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 18,
          }}
        >
          MONTHLY SUBSCRIPTION
        </div>
        <h1 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 42, fontWeight: 600, margin: '0 0 14px' }}>
          Build a box that restocks itself.
        </h1>
        <p style={{ fontSize: 16, color: 'oklch(0.46 0.02 50)', maxWidth: 600, margin: '0 auto' }}>
          Start from a curated box or pick your own products. Every subscribed order ships monthly and saves 15%,
          automatically.
        </p>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px 0' }}>
        <h2 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 26, fontWeight: 600, margin: '0 0 22px' }}>
          Start from a curated box
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {boxes.map((box) => (
            <div
              key={box.name}
              style={{
                background: 'white',
                borderRadius: 16,
                border: '1px solid oklch(0.89 0.016 80)',
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 4, borderRadius: 10, overflow: 'hidden' }}>
                {box.thumbs.map((img, i) => (
                  <img key={i} src={img} style={{ width: '100%', height: 64, objectFit: 'cover', display: 'block' }} alt="" />
                ))}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{box.name}</div>
                <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 50)', lineHeight: 1.5 }}>{box.desc}</div>
              </div>
              <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 50)', lineHeight: 1.6 }}>{box.itemsLine}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 'auto' }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>₹{box.discounted}</span>
                <span style={{ fontSize: 12, color: 'oklch(0.55 0.02 50)', textDecoration: 'line-through' }}>₹{box.subtotal}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'oklch(0.42 0.1 145)' }}>/mo</span>
              </div>
              <button
                onClick={() => addBox(box)}
                style={{ padding: 11, borderRadius: 9, background: 'oklch(0.42 0.09 145)', color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}
              >
                Add box to my subscription
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px 0', display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 26, fontWeight: 600, margin: '0 0 8px' }}>Or build your own</h2>
          <p style={{ fontSize: 14, color: 'oklch(0.46 0.02 50)', margin: '0 0 20px' }}>
            Pick freely from all seven categories — everything ships together, monthly.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            <button
              onClick={() => setSelectedCat('all')}
              style={{
                padding: '8px 14px',
                borderRadius: 999,
                border: selectedCat === 'all' ? 'none' : '1px solid oklch(0.86 0.02 80)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: selectedCat === 'all' ? 700 : 600,
                background: selectedCat === 'all' ? 'oklch(0.32 0.08 145)' : 'white',
                color: selectedCat === 'all' ? 'white' : 'oklch(0.4 0.02 50)',
              }}
            >
              All
            </button>
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCat(cat.key)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    border: active ? 'none' : '1px solid oklch(0.86 0.02 80)',
                    cursor: 'pointer',
                    fontSize: 12,
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'white', borderRadius: 14, border: '1px solid oklch(0.89 0.016 80)', overflow: 'hidden' }}>
            {pickerProducts.map((p) => {
              const qty = qtyFor(p.id);
              return (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderBottom: '1px solid oklch(0.93 0.012 80)' }}>
                  <img src={p.img} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} alt="" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: 'oklch(0.55 0.02 50)' }}>
                      {p.weight} · GI {p.gi} · ₹{p.price}
                    </div>
                  </div>
                  {qty > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'oklch(0.94 0.03 145)', borderRadius: 8, padding: '4px 6px' }}>
                      <button
                        onClick={() => setQty(p.id, qty - 1)}
                        style={{ width: 20, height: 20, borderRadius: 5, border: 'none', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}
                      >
                        –
                      </button>
                      <span style={{ fontSize: 12, fontWeight: 700, minWidth: 12, textAlign: 'center' }}>{qty}</span>
                      <button
                        onClick={() => setQty(p.id, qty + 1)}
                        style={{ width: 20, height: 20, borderRadius: 5, border: 'none', background: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 12 }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToBox(p.id)}
                      style={{ padding: '7px 14px', borderRadius: 8, background: 'oklch(0.42 0.09 145)', color: 'white', fontWeight: 600, fontSize: 12, border: 'none', cursor: 'pointer', flexShrink: 0 }}
                    >
                      Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flex: '0 0 340px', position: 'sticky', top: 90, background: 'white', borderRadius: 16, border: '1px solid oklch(0.89 0.016 80)', padding: 22 }}>
          {confirmed ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
              <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: 19, fontWeight: 600, marginBottom: 8 }}>You&rsquo;re subscribed</div>
              <p style={{ fontSize: 13, color: 'oklch(0.5 0.02 50)', lineHeight: 1.6, margin: '0 0 16px' }}>
                Your monthly box is set. First delivery arrives in 3–5 days, then automatically every month — skip or
                edit anytime.
              </p>
              <Link to="/shop" style={{ fontSize: 13, fontWeight: 700, color: 'oklch(0.32 0.08 145)' }}>
                Keep browsing products →
              </Link>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Your monthly box</div>
              {cartEmpty && (
                <p style={{ fontSize: 13, color: 'oklch(0.55 0.02 50)', textAlign: 'center', padding: '24px 0' }}>
                  Add a curated box or pick products to get started.
                </p>
              )}
              <div style={{ maxHeight: 280, overflowY: 'auto', marginBottom: 14 }}>
                {totals.items.map((i) => (
                  <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, padding: '7px 0', borderBottom: '1px solid oklch(0.93 0.012 80)' }}>
                    <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {i.qty}× {i.product.name}
                    </span>
                    <span style={{ fontWeight: 600, marginLeft: 8 }}>₹{i.product.price * i.qty}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'oklch(0.5 0.02 50)', marginBottom: 6 }}>
                <span>Subtotal</span>
                <span>₹{totals.subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'oklch(0.42 0.1 145)', marginBottom: 6 }}>
                <span>Subscription discount (15%)</span>
                <span>−₹{totals.discount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 700, marginBottom: 4 }}>
                <span>Monthly total</span>
                <span>₹{totals.total}</span>
              </div>
              <div style={{ fontSize: 11, color: 'oklch(0.55 0.02 50)', marginBottom: 16 }}>Delivered every month · skip or cancel anytime</div>
              <button
                onClick={() => {
                  if (!cartEmpty) setConfirmed(true);
                }}
                disabled={cartEmpty}
                style={{
                  width: '100%',
                  padding: 13,
                  borderRadius: 10,
                  background: 'oklch(0.42 0.09 145)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 14,
                  border: 'none',
                  cursor: cartEmpty ? 'default' : 'pointer',
                  opacity: cartEmpty ? 0.6 : 1,
                }}
              >
                Confirm subscription
              </button>
            </>
          )}
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '88px auto 0', padding: '0 40px' }}>
        <h2 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 26, fontWeight: 600, margin: '0 0 24px', textAlign: 'center' }}>
          Subscription FAQs
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { q: 'Can I skip a month?', a: 'Yes — skip, pause or push your delivery from your account, anytime before it ships.' },
            { q: "Can I change what's in my box?", a: 'Swap products, adjust quantities, or add extras right up until your next order is processed.' },
            { q: 'Is the 15% discount permanent?', a: 'Yes, on every subscribed order — no minimums, no codes, applied automatically at checkout.' },
            { q: 'Can I cancel anytime?', a: 'Yes, with no lock-in and no cancellation fee — cancel from your account whenever you like.' },
          ].map((faq) => (
            <div key={faq.q} style={{ background: 'white', borderRadius: 12, border: '1px solid oklch(0.89 0.016 80)', padding: '18px 20px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{faq.q}</div>
              <div style={{ fontSize: 13, color: 'oklch(0.5 0.02 50)', lineHeight: 1.6 }}>{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      <FooterSimple maxWidth={1200} />
    </>
  );
}
