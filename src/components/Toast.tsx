export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'oklch(0.22 0.02 50)',
        color: 'white',
        padding: '12px 22px',
        borderRadius: 10,
        fontSize: 14,
        fontWeight: 500,
        zIndex: 100,
        animation: 'toastIn 0.2s ease',
      }}
    >
      {message}
    </div>
  );
}
