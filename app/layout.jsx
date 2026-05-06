import './globals.css';

export const metadata = {
  title: 'Engineering Economy — Final Exam Review',
  description:
    'Interactive review of sensitivity analysis, decision trees, replacement analysis, depreciation, after-tax analysis, bonds, break-even analysis, and rate of return.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bone text-ink-800 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
