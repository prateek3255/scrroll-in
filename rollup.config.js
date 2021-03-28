import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import copy from "rollup-plugin-copy";

const compileJSFile = (input, output) => ({
  input: input,
  output: {
    format: "iife",
    file: output,
  },
  plugins: [resolve(), commonjs(), uglify()],
  watch: {
    clearScreen: false,
  },
});

/**
 * File structure in the build folder
 * All the js files are uglified
 * build/
 *  background/
 *   background.html
 *   background.js
 *  contentScripts/
 *   save.js
 *   get.js
 *   delete.js
 *  images/
 *  (The options folder would be served via svelte)
 *  options/
 *   options.html
 *   options.js
 *   options.css
 *  Roboto/
 *  utils/
 *  manifest.json
 */

export default [
  compileJSFile("background/background.js", "build/background/background.js"),
  compileJSFile("contentScripts/save.js", "build/contentScripts/save.js"),
  compileJSFile("contentScripts/get.js", "build/contentScripts/get.js"),
  compileJSFile("contentScripts/delete.js", "build/contentScripts/delete.js"),
  {
    input: "options/options.js",
    output: {
      format: "iife",
      file: "build/options/options.js",
    },
    plugins: [
      resolve(),
      commonjs(),
      uglify(),
      copy({
        targets: [
          {
            src: ["background/background.html"],
            dest: ["build/background"],
          },
          // The options page is supposed to be rewritten with svelte
          {
            src: ["options/index.html", "options/options.css"],
            dest: ["build/options"],
          },
          {
            src: ["images", "manifest.json", "utils", "Roboto"],
            dest: ["build"],
          },
        ],
        verbose: true,
      }),
    ],
    watch: {
      clearScreen: false,
    },
  },
];