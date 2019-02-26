const build = './build';
const src = './src';

const paths = {
    src,
    build,
    html_src: src + '/frontend/html',
    sass_src: src + '/frontend/sass',
    js_src: src + '/frontend/js',
    res_src: './resources',
    html_build: build,
    css_build: build,
    js_build: build + '/js',
    res_build: build,
    back_src: src + '/backend',
    back_build: build
}

module.exports = paths;