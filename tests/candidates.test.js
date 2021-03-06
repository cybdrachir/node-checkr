import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Candidates', () => {
  let candidateId = null;
  let candidateData = {
    first_name: 'John',
    email: 'jdoe@gmail.com',
    last_name: 'Doe'
  };

  describe('# CREATE', () => {
    it('should create a new candidate', done => {
      checkr.Candidates
        .create(candidateData)
        .then(res => {
          expect(res).to.have.property('id');
          candidateId = res.id;
          done();
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          expect(err).to.be.null;
          done();
        });
    });
  });
  describe('# UPDATE', () => {
    it('should update a candidate', done => {
      candidateData.first_name = 'Jane';
      checkr.Candidates
        .update(candidateId, candidateData)
        .then(res => {
          expect(res).to.have.property('id');
          expect(res.first_name).to.equal('Jane');
          done();
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          expect(err).to.be.null;
          done();
        });
    });
  });
  describe('# LIST', () => {
    it('should list all candidates', done => {
      checkr.Candidates
        .list()
        .then(res => {
          expect(res).to.have.property('data');
          expect(res.data).to.be.an('array')
          done();
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          expect(err).to.be.null;
          done();
        });
    });
  });
  describe('# RETRIEVE', () => {
    it('should retrieve an existing candidate', done => {
      checkr.Candidates
        .retrieve( candidateId )
        .then(res => {
          expect(res).to.have.property('id');
          expect(res.first_name).to.equal('Jane');
          done();
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          expect(err).to.be.null;
          done();
        });
    });
  });
});
