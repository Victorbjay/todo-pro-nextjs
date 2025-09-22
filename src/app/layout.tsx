// // src/app/layout.tsx
// import "./globals.css";
// import Header from "@/components/Header";

// export const metadata = {
//   title: "Todo Pro",
//   description: "Next.js + Supabase Todo App",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="min-h-screen bg-slate-50">
//         <Header />
//         <main className="p-6 max-w-3xl mx-auto">{children}</main>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import Header from "@/components/Header";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SpeedInsights } from "@vercel/speed-insights/next";
export const metadata = {
  title: "Todo Pro",
  description: "Next.js + Supabase Todo App",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <Header />
        <main className="p-6 max-w-3xl mx-auto">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </body>
    </html>
  );
}
