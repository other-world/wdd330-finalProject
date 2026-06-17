import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        certifications: resolve(__dirname, "src/certifications.html"),
        members: resolve(__dirname, "src/members.html"),
        qualified: resolve(__dirname, "src/qualified.html"),
        signupresults: resolve(__dirname, "src/signup-results.html"),
        training: resolve(__dirname, "src/training.html"),
        updateContactInfo: resolve(__dirname, "src/updateContactInfo.html"),
        weather: resolve(__dirname, "src/weather.html"),
      },
    },
  },
});
