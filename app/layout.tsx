import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice of Jesus Ministry",
  description:
    "Join Voice of Jesus Ministry for weekly Bible studies, biblical teaching, prayer, discipleship, and Christian resources.",
  keywords: [
    "Voice of Jesus Ministry",
    "Bible Study",
    "Christian Ministry",
    "Prayer",
    "Discipleship",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
