import { MainRuntime } from '@teambit/cli';
import { UseTypescriptModifiers } from '@teambit/react';
import { BundlerContext } from '@teambit/bundler';
import { ReactAspect, ReactMain } from '@teambit/react';
import { EnvsAspect, EnvsMain } from '@teambit/envs';
import { AspectAspect, AspectMain } from '@teambit/aspect';
import { UseTailwindTransformer } from '@bit-foundations/styling.tailwind.webpack-transformer';
import { tailwindConfigPath } from '@corpus/utils.themes.default';
import {
  devConfigTransformer,
  buildConfigTransformer,
} from '@bit-foundations/env-configs.typescript.jsx-transform';
import { TailwindReactAspect } from './tailwind-react.aspect';
import { WebpackConfigTransformer } from '@teambit/webpack';
export class TailwindReactMain {
  static slots = [];

  static dependencies = [ReactAspect, EnvsAspect, AspectAspect];

  static runtime = MainRuntime;

  static async provider([react, envs, aspect]: [
    ReactMain,
    EnvsMain,
    AspectMain
  ]) {
    const {
      previewConfigTransformer: twPreviewTransformer,
      devServerConfigTransformer: twDevServerTransformer,
      // } = UseTailwindTransformer(tailwindConfigPath); // <-- this is for shareable tailwind config
    } = UseTailwindTransformer(tailwindConfigPath); // <-- this is for locally-defined tw config

    const JsxTransformTsModifiers: UseTypescriptModifiers = {
      devConfig: [devConfigTransformer],
      buildConfig: [buildConfigTransformer],
    };

    const templatesReactEnv = envs.compose(react.reactEnv, [
      react.useTypescript(JsxTransformTsModifiers),
      react.useWebpack({
        // previewConfig: [twPreviewTransformer],
        devServerConfig: [twDevServerTransformer],
      }),

      // this is key for tailwind styles rendering in the remote scope
      envs.override({
        getTemplateBundler: (
          context: BundlerContext,
          transformers: WebpackConfigTransformer[] = []
        ) => {
          return aspect.aspectEnv.createTemplateWebpackBundler(context, [
            twPreviewTransformer,
            ...transformers,
          ]);
        },
      }),

      /**
       * override dependencies here
       */
      react.overrideDependencies({
        devDependencies: {
          '@types/react': '^18.0.17',
          '@types/react-dom': '^18.0.6',
        },
        peers: [
          {
            name: 'react',
            version: '18.2.0',
            supportedRange: '^18.2.0',
            force: true,
          },
          {
            name: 'react-dom',
            version: '18.2.0',
            supportedRange: '^18.2.0',
            force: true,
          },
        ],
      }),
    ]);
    envs.registerEnv(templatesReactEnv);
    return new TailwindReactMain();
  }
}

TailwindReactAspect.addRuntime(TailwindReactMain);
