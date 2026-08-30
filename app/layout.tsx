/**
 * Root layout — placeholder.
 *
 * The real Next.js app is initialized in Post 02 (Your AI Engineering
 * Environment). Until then this file exists so /app is not empty.
 */

export const metadata = {
  title: "Scholar",
  description: "A document-grounded research assistant. Built as a public AI Engineering course.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
