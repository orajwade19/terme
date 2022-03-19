import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
export default {
  input: "script.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [nodeResolve(), commonjs()],
};
