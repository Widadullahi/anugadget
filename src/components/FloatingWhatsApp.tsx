import { useLocation } from "react-router-dom";

const FloatingWhatsApp = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <a
      href="https://wa.me/2348127704308"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
    >
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-14 w-14">
        <defs>
          <radialGradient id="waGreen" cx="30%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#4fe06f" />
            <stop offset="100%" stopColor="#25d366" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#waGreen)" />
        <path
          fill="#ffffff"
          d="M46.7 17.3c-3.9-3.9-9.1-6-14.6-6-11.4 0-20.7 9.2-20.7 20.6 0 3.6 1 7.1 2.8 10.1L12 52l10.4-2.7c2.9 1.6 6.2 2.4 9.7 2.4h.1c11.4 0 20.7-9.2 20.7-20.6 0-5.5-2.1-10.7-6.2-14.8zM32.1 48.2h-.1c-3.1 0-6.1-.9-8.8-2.5l-.6-.4-6.2 1.6 1.7-6.1-.4-.6c-1.7-2.8-2.6-6-2.6-9.3 0-9.5 7.8-17.3 17.4-17.3 4.6 0 9 1.8 12.3 5.1 3.3 3.3 5.1 7.6 5.1 12.2 0 9.6-7.8 17.3-17.8 17.3z"
        />
        <path
          fill="#ffffff"
          d="M41.8 37.2c-.4-.2-2.3-1.1-2.7-1.2-.4-.2-.6-.2-.9.2-.2.4-1 1.2-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.5-.6-2.9-1.8-1.1-1-1.8-2.2-2-2.6-.2-.4 0-.6.2-.7.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.2.1-.5 0-.7-.1-.2-.9-2.2-1.2-3-.3-.7-.6-.6-.9-.6h-.8c-.3 0-.7.1-1 .4-.3.4-1.3 1.3-1.3 3.1 0 1.9 1.4 3.7 1.6 3.9.2.3 2.7 4.2 6.6 5.8.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5z"
        />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
