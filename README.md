# Vite-plugin-react-css-module-styleName

**After the creation of our React vite project is completed**

**Please ensure that SASS is installed in your project**

Next, install our plugin package

### Installation

##### NPM

```
npm i install vite-plugin-react-css-module-stylename --save--dev
```

##### Yarn

```
yarn add vite-plugin-react-css-module-stylename -S
```

Because we want to use styleName as a simplified attribute, you can configure the global variable styleName according to your needs

```
namespace React {
  interface Attributes {
    styleName?: string;
  }
}
```

**We should configure it in vite. config. ts**

```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactCssModuleStyleName, { generateScopedName } from 'vite-plugin-react-css-module-styleName';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    reactCssModuleStyleName({ generateScopedName: generateScopedName, env: mode })
  ],
  server: {
    open: true
  },
  css: {
    modules: {
      generateScopedName: (name: string, filename: string) => {
        return generateScopedName(name, filename);
      }
    }
  }
}));
```

#### Example

```
import './index.module.scss';
<div styleName="demo">demo</div>
```
