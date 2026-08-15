/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Static HTML export for GitHub Pages.
  output: "export",

  // GitHub Pages serves from a subpath unless a custom domain is used.
  // We're deploying to a custom domain (bairavatransport.ca) at the root,
  // so no basePath is needed.

  images: {
    // next/image optimization needs a server; static export can't use it.
    unoptimized: true,
  },

  // Emit /path/index.html so links work without a server rewriting them.
  trailingSlash: true,
};

export default nextConfig;
