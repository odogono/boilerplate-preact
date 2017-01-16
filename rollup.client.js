import Alias from 'rollup-plugin-alias';
import Babel from 'rollup-plugin-babel';
import CommonJS from 'rollup-plugin-commonjs';
import Flow from 'rollup-plugin-flow';
import NodeResolve from 'rollup-plugin-node-resolve';
import Replace from 'rollup-plugin-replace';
import Uglify from 'rollup-plugin-uglify'


/**
 * 
 */
export default {
    banner: '/* Client */',
    entry: 'src/client/index.js',
    dest: 'web/js/client.js',
    sourceMap: true,
    format: 'iife',
    external: ['bplib'],
    globals: {
        'bplib': 'BPLib'
    },
    plugins: [
        // Alias({
        //     'react': 'preact-compat',
        //     'react-dom': 'preact-compat'
        // }),
        Replace({
            'process.env.NODE_ENV': JSON.stringify('production'), 
        }),
        Babel({
            exclude: [
                'node_modules/**',
                '*.json'
            ],
            babelrc: false,
			sourceMap: true,
            plugins: [
                "external-helpers",
                "transform-es2015-parameters",
                "transform-es2015-destructuring",
                "transform-object-rest-spread",
                "transform-class-properties",
                "transform-es2015-classes",
                // "transform-async-to-generator",
                ["transform-react-jsx", {pragma:'h'}],
            ]
        }),
        NodeResolve({jsnext:true,main:true,browser:true}),
        CommonJS({ 
            include: ['node_modules/**'], 
            namedExports: { 
                'preact-redux': ['connect', 'Provider'] 
            } 
        }),
    ]
}