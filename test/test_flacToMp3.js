import { expect } from 'chai'
import * as f from '../src/flacToMp3'
const fs = require('fs')
const ffmetadata = require('ffmetadata')
const mm = require('musicmetadata')
const f2m = require('flac-to-mp3')

const flacFile = "../data/01_Solsorte.flac"
const mp3File = "../data/01_Solsorte.mp3"

describe('musicmetadata', () => {
  it('should retrieve the correct title of a flac file', () => {
    mm(fs.createReadStream(flacFile), (err, data) => {
      if(err) throw err
      console.log(data)
      expect(data.title).to.equal('Solsorte Synger Solen Op')
    })
  })
})

describe('flac-to-mp3', () => {
  it('should create a mp3 file from ' + flacFile, () => {
    f2m.convert(flacFile, data => {
      fs.writeFileSync(mp3File, data)
    })
  })
})
