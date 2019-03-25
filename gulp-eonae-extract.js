const through2 = require('through2');

module.exports = function(start_boundary, end_boundary) {
  return through2.obj(function(file, enc, cb) {

    const pattern_start = '<template lang\\=\\"pug\\">',
          pattern_end = '<\\/template>'
    let contents = file.contents.toString('utf8');
    let pattern = new RegExp(`${start_boundary}([\\s\\S]+)${end_boundary}`);
    let extract = pattern.exec(contents);
    extract = extract ? extract[1] : null;
    if (extract) {
      file.contents = new Buffer(extract);
    } else {
      console.log(`Couldn't process file: ${file.relative}`);
      file = null;

    }
    cb(null, file);
  });
}