import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

export default {
  input: "script.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [nodeResolve(), commonjs(), livereload(), serve()],
};
