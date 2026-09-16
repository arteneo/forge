import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

import { peerDependencies } from "./package.json" with { type: "json" };

export default defineConfig({
    plugins: [react(), dts({ bundleTypes: true })],
    build: {
        lib: {
            entry: resolve(import.meta.dirname, "src/index.tsx"),
            formats: ["es"],
            fileName: "index",
        },
        rolldownOptions: {
            // Ensure to externalize deps that should not be bundled into your library (mainly peer dependencies)
            // Additionally:
            // "react/jsx-runtime" introduced by @vitejs/plugin-react
            // "@mui/x-date-pickers/internals/hooks/useUtils" which is imported directly in library and we need to ensure that it is not bundled
            external: [
                ...Object.keys(peerDependencies),
                "@mui/x-date-pickers/internals/hooks/useUtils",
                "react/jsx-runtime",
            ],
        },
    },
});
