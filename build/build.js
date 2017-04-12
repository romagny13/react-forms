var fs = require('fs');
var zlib = require('zlib');
var rollup = require('rollup');
var uglify = require('uglify-js');
var buble = require('rollup-plugin-buble');
var version = process.env.VERSION || require('../package.json').version;
var banner =
    '/*!\n' +
    ' * {NAME} v' + version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' {name}\n' +
    ' * Released under the MIT License.\n' +
    ' */';

rollup.rollup({
    entry: "./src/index.js",
    plugins: [buble()]
})
    .then(function (bundle) {
        return write('dist/lib.js', bundle.generate({
            format: 'umd',
            banner: banner,
            moduleName: 'LIB'
        }).code)
    })
    .then(function () {
        return write(
            'dist/lib.min.js',
            banner + '\n' + uglify.minify('dist/lib.js').code
        )
    })
    .then(function () {
        return new Promise(function (resolve, reject) {
            fs.readFile('dist/lib.min.js', function (err, buf) {
                if (err) return reject(err)
                zlib.gzip(buf, function (err, buf) {
                    if (err) return reject(err)
                    write('dist/lib.min.js.gz', buf).then(resolve)
                })
            })
        })
    })
    .catch(logError);

function write(dest, code) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err)
            console.log(blue(dest) + ' ' + getSize(code))
            resolve()
        })
    })
};

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb'
};

function logError(e) {
    console.log(e)
};

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
};
