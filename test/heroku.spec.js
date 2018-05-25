/* global define, it, describe, beforeEach, document */
const chai = require('chai');
const chaiMatch = require('chai-match');
const chaiHttp = require('chai-http');
const config = require('../config.json');

const expect = chai.expect;
chai.use(chaiMatch);
chai.use(chaiHttp);

const projects = [
  'first_app',
  'change_calculator',
  'mortgage_calculator',
  'top_spots',
  'vstda'
];

const checkValidHerokuUrl = (url) => {
  expect(url).to.match(/(http|https):\/\/[A-Za-z0-9-]*.herokuapp.com(\/)?/, `Expected ${config.heroku_url} to match http://*.herokuapp.com`);
};

describe('Heroku Workshop', function() {
  this.timeout(6500);
  describe('config file', function() {
    projects.forEach((project) => {
      it(`includes a key called "${project}" with a valid Heroku URL for a value`, () => {
        expect(config[project]).to.exist;
        checkValidHerokuUrl(config[project]);
      });
    });
  });

  describe('heroku apps', function() {
    projects.forEach((project) => {
      this.timeout(15000);
      it(`${project} is deployed`, (done) => {
        chai
          .request(config[project])
          .get('/')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});
