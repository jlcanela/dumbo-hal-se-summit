var expect = require('chai').expect;
var process = require('../lib/process');

describe('process.order(payload, callback)', function () {
  it('calls back with an empty object', function (done) {
      process.order({}, function (err, result) {
      if (err) return done(err);
      expect(result).to.deep.equal({});
      done();
    })
  })

 it('must not process non STANDARD rate', function (done) {
      var body = { prices: [ 91.73 ],
                   quantities: [ 2 ],
                   names:
                    [ 'Tea',
                      'Glove',
                      'Worms',
                      'Water',
                      'Carrot',
                      'Jacket',
                      'Stinking cheese',
                      'Net' ],
                   country: 'HU',
                   reduction: 'STRANGE' };

      process.order(body, function (err, result) {
        if (err) return done(err);
        expect(result).to.deep.equal({  });
        done();
      })
  })

   it('compute a simple request', function (done) {
      var body = { prices: [ 91.73 ],
                   quantities: [ 2 ],
                   names:
                    [ 'Tea' ],
                   country: 'HU',
                   reduction: 'STANDARD' };

      process.order(body, function (err, result) {
        if (err) return done(err);
        console.log("result:");
        console.log(result);
        expect(result.prices).to.equal(183.46);
        done();
      })
   })
})

