import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "./ClientLayout";

export const metadata: Metadata = {
  title: "Traveloop — Plan Smarter. Travel Deeper.",
  description: "The modern travel planning platform for conscious explorers. Build itineraries, optimize routes, track budgets, and share your adventures.",
  keywords: "travel planner, itinerary builder, trip budget, route optimizer, travel SaaS",
  openGraph: {
    title: "Traveloop — Plan Smarter. Travel Deeper.",
    description: "The modern travel planning platform. Build itineraries, optimize routes, track budgets.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
