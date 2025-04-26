import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generator from "@babel/generator";
import * as types from "@babel/types";

const STYLENAME_PREFIX = "Carl";

export function transformCode(code, type) {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });
  const styleNames: string[] = [];
  let styleCounter = 0;
  traverse.default(ast, {
    // convert module.scss
    ImportDeclaration(path) {
      if (
        path.node.source.value.endsWith(
          type === "scss" ? ".module.scss" : ".module.less"
        ) &&
        path.node.specifiers.length === 0
      ) {
        const styleName = `${STYLENAME_PREFIX}${styleCounter++}`;
        styleNames.push(styleName);
        path.replaceWith(
          types.importDeclaration(
            [types.importDefaultSpecifier(types.identifier(styleName))],
            path.node.source
          )
        );
      }
    },
    // add <div className={current scss file import}></div>
    ReturnStatement(path) {
      const returnArg = path.node.argument;
      if (types.isJSXElement(returnArg) || types.isJSXFragment(returnArg)) {
        const combinedClassName = styleNames.map((styleName, index) =>
          index === 0
            ? types.callExpression(
                types.memberExpression(
                  types.identifier(styleName || ""),
                  types.identifier("toString")
                ),
                []
              )
            : types.binaryExpression(
                "+",
                types.stringLiteral(" "),
                types.callExpression(
                  types.memberExpression(
                    types.identifier(styleName || ""),
                    types.identifier("toString")
                  ),
                  []
                )
              )
        );

        const newCombinedClassName = (combinedClassName as Array<any>).reduce(
          (acc, curr) => types.binaryExpression("+", acc, curr),
          types.stringLiteral("")
        );
        const styleObject = types.objectExpression([
          types.objectProperty(
            types.identifier("display"),
            types.stringLiteral("none")
          ),
        ]);

        const attributes: Array<any> = [
          combinedClassName
            ? types.jsxAttribute(
                types.jsxIdentifier("className"),
                types.jsxExpressionContainer(newCombinedClassName)
              )
            : [],
          types.jsxAttribute(
            types.jsxIdentifier("style"),
            types.jsxExpressionContainer(styleObject)
          ),
        ].filter((attr) => attr !== null && attr !== undefined); // Optimize filter undefined/null values

        const newDiv = types.jsxElement(
          types.jsxOpeningElement(
            types.jsxIdentifier("div"),
            attributes,
            false
          ),
          types.jsxClosingElement(types.jsxIdentifier("div")),
          []
        );
        if (types.isJSXElement(returnArg)) {
          returnArg.children.push(newDiv);
        } else if (types.isJSXFragment(returnArg)) {
          returnArg.children.push(newDiv);
        }
      }
    },
  });
  return generator.default(ast).code;
}
