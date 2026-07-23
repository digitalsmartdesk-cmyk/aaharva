import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { FooterFull } from '../components/Footer';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useCart';
import { CATEGORIES, PRODUCTS, addToCart, type Product } from '../data';

const bestsellers = PRODUCTS.filter((p) => p.bestSeller);

export function Home() {
  const [toast, setToast] = useToast();

  const addToBox = (p: Product) => {
    addToCart(p.id, 1);
    setToast(`Added ${p.name} to your box`);
  };

  return (
    <>
      <Header active="home" />
      <Toast message={toast} />

      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px 40px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 56,
        }}
      >
        <div style={{ flex: 1, minWidth: 320 }}>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 14px',
              borderRadius: 999,
              background: 'oklch(0.94 0.03 145)',
              color: 'oklch(0.32 0.08 145)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.3,
              marginBottom: 20,
            }}
          >
            FOR DIABETIC &amp; PRE-DIABETIC HOUSEHOLDS
          </div>
          <h1
            style={{
              fontFamily: "'Source Serif 4',serif",
              fontSize: 52,
              lineHeight: 1.08,
              fontWeight: 600,
              margin: '0 0 20px',
              color: 'oklch(0.2 0.03 50)',
            }}
          >
            Everyday food that keeps blood sugar in mind.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: 'oklch(0.46 0.02 50)', maxWidth: 480, margin: '0 0 32px' }}>
            Low-GI atta, millets, breakfast mixes and snacks — sorted by what they&rsquo;re made of and what
            they&rsquo;re for, so you always know what to reach for. Delivered monthly, so the kitchen never runs
            short.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
            <Link
              to="/shop"
              style={{
                padding: '14px 26px',
                borderRadius: 10,
                background: 'oklch(0.42 0.09 145)',
                color: 'white',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Shop all products
            </Link>
            <Link
              to="/subscription"
              style={{
                padding: '14px 26px',
                borderRadius: 10,
                background: 'white',
                border: '1px solid oklch(0.85 0.02 80)',
                color: 'oklch(0.24 0.02 50)',
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Build your monthly box
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 13, color: 'oklch(0.46 0.02 50)', fontWeight: 500 }}>
            <span>100% Vegetarian</span>
            <span>·</span>
            <span>No Maida, No Added Sugar</span>
            <span>·</span>
            <span>FSSAI Certified</span>
          </div>
        </div>
        <div style={{ flex: '0 0 400px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 20, background: 'oklch(0.94 0.03 145)', borderRadius: 32, zIndex: 0 }} />
          <img
            src="/uploads/lite/product (3).jpg"
            alt="Diabetic Roti Premix"
            style={{
              position: 'relative',
              zIndex: 1,
              width: '100%',
              borderRadius: 24,
              boxShadow: '0 24px 48px -20px oklch(0.3 0.05 145 / 0.35)',
              display: 'block',
            }}
          />
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 40px 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 16,
            padding: '24px 0',
            borderTop: '1px solid oklch(0.89 0.016 80)',
            borderBottom: '1px solid oklch(0.89 0.016 80)',
          }}
        >
          <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 600, color: 'oklch(0.4 0.02 50)' }}>
            Low Glycemic Index
            <div style={{ fontWeight: 400, color: 'oklch(0.55 0.02 50)', marginTop: 4 }}>Helps manage blood sugar</div>
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: 'oklch(0.4 0.02 50)',
              borderLeft: '1px solid oklch(0.89 0.016 80)',
            }}
          >
            High in Fibre &amp; Protein
            <div style={{ fontWeight: 400, color: 'oklch(0.55 0.02 50)', marginTop: 4 }}>Keeps you fuller, longer</div>
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: 'oklch(0.4 0.02 50)',
              borderLeft: '1px solid oklch(0.89 0.016 80)',
            }}
          >
            No Artificial Anything
            <div style={{ fontWeight: 400, color: 'oklch(0.55 0.02 50)', marginTop: 4 }}>
              No colours, flavours, preservatives
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              fontSize: 13,
              fontWeight: 600,
              color: 'oklch(0.4 0.02 50)',
              borderLeft: '1px solid oklch(0.89 0.016 80)',
            }}
          >
            Lab-Tested Batches
            <div style={{ fontWeight: 400, color: 'oklch(0.55 0.02 50)', marginTop: 4 }}>Every SKU, every batch</div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 32,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <h2 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>
              Shop by what it&rsquo;s made of
            </h2>
            <p style={{ margin: 0, color: 'oklch(0.46 0.02 50)', fontSize: 15 }}>
              Every SKU is sorted into one of seven groups, by ingredient and how you&rsquo;ll use it.
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              to={`/shop?cat=${cat.key}`}
              style={{
                display: 'block',
                background: 'white',
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid oklch(0.89 0.016 80)',
              }}
            >
              <div style={{ height: 140, overflow: 'hidden' }}>
                <img
                  src={cat.sampleImg}
                  alt={cat.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '16px 18px 20px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.3, color: cat.color, marginBottom: 6 }}>
                  {cat.short}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>{cat.label}</div>
                <div style={{ fontSize: 13, color: 'oklch(0.5 0.02 50)', lineHeight: 1.4 }}>{cat.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px 20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 32,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <h2 style={{ fontFamily: "'Source Serif 4',serif", fontSize: 32, fontWeight: 600, margin: '0 0 6px' }}>
              Most reordered
            </h2>
            <p style={{ margin: 0, color: 'oklch(0.46 0.02 50)', fontSize: 15 }}>
              The staples our subscribers never let run out.
            </p>
          </div>
          <Link to="/shop" style={{ fontSize: 14, fontWeight: 600, color: 'oklch(0.32 0.08 145)', whiteSpace: 'nowrap' }}>
            View full catalog →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {bestsellers.map((p) => (
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
                style={{ display: 'block', height: 180, overflow: 'hidden', background: 'oklch(0.96 0.012 80)' }}
              >
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </Link>
              <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
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
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: 'oklch(0.5 0.02 50)', lineHeight: 1.4, flex: 1 }}>{p.blurb}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ fontSize: 17, fontWeight: 700 }}>₹{p.price}</span>
                  <button
                    onClick={() => addToBox(p)}
                    style={{
                      padding: '9px 16px',
                      borderRadius: 8,
                      background: 'oklch(0.42 0.09 145)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: 13,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Add to box
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 20px' }}>
        <h2
          style={{
            fontFamily: "'Source Serif 4',serif",
            fontSize: 32,
            fontWeight: 600,
            margin: '0 0 8px',
            textAlign: 'center',
          }}
        >
          How the subscription works
        </h2>
        <p style={{ textAlign: 'center', color: 'oklch(0.46 0.02 50)', fontSize: 15, margin: '0 0 40px' }}>
          Set it up once. We handle the reordering.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {[
            { n: 1, title: 'Pick your staples', desc: 'Choose any products yourself, or start from a curated box like Diabetic Starter or Breakfast.' },
            { n: 2, title: 'Set your frequency', desc: 'Monthly delivery, timed to when your kitchen actually runs out.' },
            { n: 3, title: 'Save automatically', desc: '15% off every subscribed order. No codes, applied at your box total.' },
            { n: 4, title: 'Stay in control', desc: 'Skip a month, swap products, or cancel anytime from your box.' },
          ].map((step) => (
            <div key={step.n}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'oklch(0.42 0.09 145)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                {step.n}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 15 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: 'oklch(0.5 0.02 50)', lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '80px auto 0', padding: '0 40px' }}>
        <div
          style={{
            background: 'oklch(0.32 0.08 145)',
            borderRadius: 24,
            padding: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <h3 style={{ fontFamily: "'Source Serif 4',serif", color: 'white', fontSize: 28, fontWeight: 600, margin: '0 0 12px' }}>
              Subscribe and save 15% on every order
            </h3>
            <p style={{ color: 'oklch(0.94 0.02 145)', fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 440 }}>
              Example: Diabetic Roti Premix + Mixed Dal Blend + Super Seed Mix — ₹777 one-time, ₹660 on a monthly
              subscription.
            </p>
          </div>
          <Link
            to="/subscription"
            style={{
              padding: '14px 28px',
              borderRadius: 10,
              background: 'white',
              color: 'oklch(0.32 0.08 145)',
              fontWeight: 700,
              fontSize: 15,
              whiteSpace: 'nowrap',
            }}
          >
            Build my monthly box
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 40px 20px' }}>
        <h2
          style={{
            fontFamily: "'Source Serif 4',serif",
            fontSize: 32,
            fontWeight: 600,
            margin: '0 0 40px',
            textAlign: 'center',
          }}
        >
          From kitchens like yours
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {[
            {
              quote:
                'My father’s post-meal sugar readings improved after we switched his roti flour. One simple change, real difference.',
              name: 'Radhika M.',
              role: 'Cooks for her father, Type 2 diabetic',
            },
            {
              quote:
                'I run the subscription for our whole kitchen — millets, dal, snacks. One box, and we stop running out mid-week.',
              name: 'Arjun K.',
              role: 'Home cook, family of four',
            },
            {
              quote: 'Low-GI, high protein, and it actually tastes good. My post-workout khichdi is this now, every time.',
              name: 'Meera S.',
              role: 'Fitness & weight-management',
            },
          ].map((t) => (
            <div
              key={t.name}
              style={{ background: 'white', borderRadius: 16, border: '1px solid oklch(0.89 0.016 80)', padding: 28 }}
            >
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 18px', color: 'oklch(0.3 0.02 50)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'oklch(0.55 0.02 50)' }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      <FooterFull />
    </>
  );
}
