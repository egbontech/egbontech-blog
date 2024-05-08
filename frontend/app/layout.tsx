import type { Metadata } from "next";
import "./globals.css";
import "./mediaquaries.css";
import MyReactQueryProvider from "@/Providers/MyReactQueryProvider";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export const metadata: Metadata = {
  title: "Egbontech | Fullstack Software and Web Developer",
  description:
    "Egbon Eloghosa is a full-stack software and web developer who specializes in frontend web development, backend web development, and mobile app development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyReactQueryProvider>
      <SkeletonTheme
        baseColor="#333333"
        // highlightColor="#F0F2F5"
        highlightColor="#333333"
      >
        <html lang="en">
          <body>
            <div className="layout-wrapper">{children}</div>           
          </body>
        </html>
      </SkeletonTheme>
    </MyReactQueryProvider>
  );
}
