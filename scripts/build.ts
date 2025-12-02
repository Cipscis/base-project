import * as esbuild from 'esbuild';

import { config as mainConfig } from './build-config/main.ts';

await Promise.all([
	esbuild.build(mainConfig),
]);
