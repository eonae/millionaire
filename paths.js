const build = './build';
const src = './src';

const paths = {
    src,
    build,
    html_src: src + '/frontend/html',
    sass_src: src + '/frontend/sass',
    js_src: src + '/frontend/js',
    assets_src: './assets',
    html_build: build,
    css_build: build,
    js_build: build + '/js',
    assets_build: build,
    back_src: src + '/backend',
    back_build: build,
    libs_src: src + '/frontend/libs',
    libs_build: build + '/js',
    templates_src: src + '/frontend/pug-client',
    templates_build: src + '/frontend/js/view/templates' // не ошибка
}

module.exports = paths;