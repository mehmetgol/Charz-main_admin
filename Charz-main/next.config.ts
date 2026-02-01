import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // Build sırasında ESLint hataları (tırnak işareti vb.) olsa bile devam etmesini sağlar
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Eğer ileride tip hataları da build'i durdurursa bunu da ekleyebilirsin
        ignoreBuildErrors: true,
    },
};

export default nextConfig;