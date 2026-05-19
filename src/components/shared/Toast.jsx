// src/components/shared/Toast.jsx
import { useApp } from '../../context/AppContext';

export default function Toast() {
  const { notification } = useApp();
  if (!notification) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-[9999] px-5 py-3 rounded-sm shadow-2xl font-mono-custom text-sm animate-slide-up flex items-center gap-3
      ${notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-[#C6F135] text-black'}`}>
      <span className="font-bold">{notification.msg}</span>
    </div>
  );
}
