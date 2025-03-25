import { Plugin } from "vite";
import { transformSync } from "@babel/core";
import { generateScopedName } from "./utils.ts";
import { transformCode } from "./convert.ts";
const NAME = "vite-plugin-react-css-module-styleName";

const FileTypeValidate = /\.(t|j)sx?$/;

export enum EEnv {
  Pro = "production",
  Dev = "development",
}

export interface IReactCssModule {
  /** Need to set up public settings in Vite */
  generateScopedName: (name: string, fileName: string) => string;
  /** @Default scss setting */
  /** TODO: I will develop other module parsing in the future, such as less */
  /** filetypes?: any; */
  /** ENV */
  env: EEnv | string;
}
const reactCssModuleStyleName = (props: IReactCssModule): Plugin => {
  const { generateScopedName: generate, env } = props;
  return {
    name: NAME,
    enforce: "pre",
    transform(code, id) {
      // exclude node_modules or normal js/ts file
      if (!FileTypeValidate.test(id) || id.includes("node_modules")) {
        return;
      }
      if (!id.endsWith("x")) {
        // react version >17
        // !code.includes('react')
        return;
      }
      const parserPlugins = ["jsx", "importMeta"];
      if (/\.tsx?$/.test(id)) {
        parserPlugins.push("typescript", "decorators-legacy");
      }

      const result = transformSync(code, {
        babelrc: false,
        configFile: false,
        filename: id,
        parserOpts: {
          sourceType: "module",
          allowAwaitOutsideFunction: true,
          plugins: parserPlugins as any,
        },
        plugins: [
          [
            // Allow use 'react-css-modules',recommend use 'babel-plugin-react-css-modules'
            "babel-plugin-react-css-modules",
            {
              autoResolveMultipleImports: true,
              exclude: "node_modules",
              generateScopedName: (name: string, filename: string) => {
                return generate(name, filename);
              },
              filetypes: {
                ".scss": {
                  syntax: "postcss-scss",
                },
              },
            },
          ],
        ],
      });
      return {
        code: env === EEnv.Pro ? transformCode(result.code) : result!.code!,
        map: result!.map,
      };
    },
  };
};
export default reactCssModuleStyleName;
export { generateScopedName };
