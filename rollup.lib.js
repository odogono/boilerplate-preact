import Babel from 'rollup-plugin-babel';
import CommonJS from 'rollup-plugin-commonjs';
import Flow from 'rollup-plugin-flow';
import NodeResolve from 'rollup-plugin-node-resolve';
import Replace from 'rollup-plugin-replace';
import Uglify from 'rollup-plugin-uglify'


/**
 * 
 */
let Config = {
    banner: '/* Lib */',
    entry: 'src/lib/entry.js',
    dest: 'web/js/lib.js',
    sourceMap: true,
    format: 'iife',
    moduleName: 'BPLib',
    plugins: [
        Replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.PROMISE_QUEUE_COVERAGE': 'false',
            'module.hot': 'false',
        }),
        Babel({
            include: [ 'node_modules/alt/**', 'node_modules/odgn-backbone-model/**' ],
            babelrc: false,
			sourceMap: true,
            plugins: [
                "transform-es2015-parameters",
                "transform-es2015-destructuring",
                "transform-object-rest-spread",
                "transform-class-properties",
                "transform-es2015-classes",
                "external-helpers",
                // "transform-async-to-generator",
                ["transform-react-jsx", {pragma:'h'}],
            ]
        }),
        NodeResolve({jsnext:false,main:true,browser:true}),
        CommonJS({ 
            include: ['node_modules/**'], 
            namedExports: { 
                'preact-redux': ['connect', 'Provider'] 
            } 
        }),
    ]
}

Config.dest = 'web/js/lib.min.js';
Config.plugins.push(Uglify());

export default Config;