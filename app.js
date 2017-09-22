fs = require('fs');
stream = require('stream');
crypto = require('crypto');


class MyTransform extends stream.Transform 
{
  constructor(options) 
  {
    super(options);
    this.hash = crypto.createHash('md5');
  }
  _transform(chunk, encoding, callback) 
  {
      this.hash.update(chunk);
      callback();      
  }
  _flush(done) 
  {
      this.push(this.hash.digest('hex'));
      this.hash = null;
      done();
  }
}

transform = new MyTransform();

rstream = fs.createReadStream('app.js');
wstream = fs.createWriteStream('hash.txt')



rstream.pipe(transform).pipe(process.stdout);
rstream.pipe(transform).pipe(wstream);