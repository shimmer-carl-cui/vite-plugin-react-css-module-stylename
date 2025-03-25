import { relative } from "path";
import createGenerator from "generic-names";
const GENERATE_NEW_CSS_NAME_FORMAT = "[local]__[hash:base64:5]";

const generate = createGenerator(GENERATE_NEW_CSS_NAME_FORMAT, {
  context: process.cwd(),
});
/** localName: css name, filePath: scss file path */
const generateScopedName = (localName: string, filePath: string) => {
  const relativePath = relative(process.cwd(), filePath);
  return generate(localName, relativePath);
};

export { generateScopedName };
