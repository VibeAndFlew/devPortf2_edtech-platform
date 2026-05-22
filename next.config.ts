import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Server Configuration ──────────────────────────────────────────
  serverExternalPackages: ["@node-rs/bcrypt"],

  // ── Production Optimization ───────────────────────────────────────
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  compress: true,
  generateEtags: true,
  poweredByHeader: false,

  // ── Image Optimization ────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },

  // ── Experimental Features ─────────────────────────────────────────
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
    ],
  },

  // ── Turbopack (default bundler in Next.js 16) ─────────────────────
  turbopack: {
    root: process.cwd(),
  },

  // ── Security Headers (CSP, HSTS, X-Frame-Options) ─────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.vercel-analytics.com https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' blob: data: https://images.unsplash.com https://*.cloudinary.com https://*.supabase.co",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://vitals.vercel-insights.com https://api.vercel.com",
              "frame-src 'self' https://*.youtube.com https://*.vimeo.com",
              "media-src 'self' blob: https://*.supabase.co",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=(self)",
              "geolocation=()",
              "accelerometer=()",
              "gyroscope=()",
              "magnetometer=()",
              "payment=()",
              "usb=()",
            ].join(", "),
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:4006",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-CSRF-Token",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // ── Build Output ──────────────────────────────────────────────────
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,

};

export default nextConfig;
