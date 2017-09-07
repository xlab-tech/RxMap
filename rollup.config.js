// rollup.config.js
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    input: 'examples/map.js',
    output: {
        file: 'examples/bundle.js',
        format: 'iife',
        sourcemap: 'inline'
    },
    plugins: [
        nodeResolve({
            jsnext: true,
            main: true
        }),
        commonjs(),
        uglify({}, minify)
    ],
    watch: {
        include: 'src/**'
    },
    external: ['rxjs']
};