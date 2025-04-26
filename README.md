# Vite-plugin-react-css-module-styleName

**After the creation of our React vite project is completed**

**Please ensure that Sass/Less is installed in your project**

**Next, install our plugin package**

### Installation

**Please install in advance postcss-scss**

```
npm install postcss-scss --dev
Or
yarn add postcss-scss --dev
```

If you want to use less

```
npm install postcss-less --dev
Or
yarn add postcss-less --dev
```

Don't forgat use cssType in vite config

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
or
import './index.module.less'

<div styleName="demo">demo</div>
```

#### API

| Attribute          | Value                                           | Description                                         |
| :----------------- | ----------------------------------------------- | --------------------------------------------------- |
| env                | development/development                         | Judge current env,<br />handle corresponding logic |
| cssTypes           | scss/less (default scss)                        | Analysis type                                       |
| generateScopedName | (localName: string, filePath: string) => string | localName: css name,<br />filePath: scss file path  |

#### FAQ

**If appears this error in your project**

```
Class extends value undefined is not a constructor or null
```

**Please try using,run again**

```
"resolutions": {
  "postcss": "^8.4.38",
  "postcss-scss": "^4.0.9" or "postcss-scss": "^6.0.0"
}
```
