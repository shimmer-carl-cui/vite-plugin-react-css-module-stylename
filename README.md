# Vite-plugin-react-css-module-styleName

**After the creation of our React vite project is completed**

**Please ensure that SASS is installed in your project**

**Next, install our plugin package**

### Installation

**Please install in advance postcss-scss**

```
npm install postcss-scss --dev
yarn add postcss-scss --dev
```

##### NPM

```
npm install vite-plugin-react-css-module-stylename --save--dev
```

##### Yarn

```
yarn add vite-plugin-react-css-module-stylename --save
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

#### FAQ

**If appears this error in your project**

```
Class extends value undefined is not a constructor or null
```

Please try using,run again

```
"resolutions": {
  "postcss": "^8.4.38",
  "postcss-scss": "^4.0.9"
}
```
