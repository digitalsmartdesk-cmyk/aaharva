import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { asset } from '../asset';

type ActivePage = 'home' | 'shop' | 'subscription' | 'product';

const navLinkStyle = (active: boolean): React.CSSProperties => ({
  padding: '8px 14px',
  borderRadius: 8,
  fontSize: 15,
  fontWeight: active ? 600 : 500,
  color: active ? 'oklch(0.3 0.06 145)' : 'oklch(0.4 0.02 50)',
  background: active ? 'oklch(0.94 0.03 145)' : 'transparent',
});

export function Header({
  active = 'home',
  onCartClick,
}: {
  active?: ActivePage;
  onCartClick?: (e: React.MouseEvent) => void;
}) {
  const [cart] = useCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '14px 40px',
        background: 'oklch(0.99 0.006 80)',
        borderBottom: '1px solid oklch(0.9 0.018 80)',
        fontFamily: "'Work Sans',sans-serif",
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src={asset('/uploads/Logo.png')}
          alt="Aaharva"
          style={{ width: 42, height: 42, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "'Source Serif 4',serif",
            fontSize: 22,
            fontWeight: 600,
            color: 'oklch(0.3 0.06 145)',
            letterSpacing: 0.2,
          }}
        >
          Aaharva
        </span>
      </Link>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link to="/" style={navLinkStyle(active === 'home')}>
          Home
        </Link>
        <Link to="/shop" style={navLinkStyle(active === 'shop')}>
          Shop
        </Link>
        <Link to="/subscription" style={navLinkStyle(active === 'subscription')}>
          Subscription
        </Link>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link
          to="/shop"
          onClick={onCartClick}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 16px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            color: 'oklch(0.24 0.02 50)',
            border: '1px solid oklch(0.86 0.02 80)',
            background: 'white',
          }}
        >
          <span>My Box</span>
          {count > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                background: 'oklch(0.55 0.16 30)',
                color: 'white',
                fontSize: 11,
                fontWeight: 700,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
              }}
            >
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
