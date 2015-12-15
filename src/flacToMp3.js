#!/usr/bin/env node

var fs = require('fs');
var spawn = require('child_process').spawn;
var spawnSync = require('child_process').spawnSync;
var path = require('path');

var flacFile = "./data/01_Solsorte.flac";
var mp3File = "./data/01_Solsorte.mp3";

var dir = process.argv[2];

function transcode(file) {
  var re = /^(.+)\.flac$/;
  var m = re.exec(file);
  if(m) {
    console.log('here we are: ' + m[1]);
    var conversion = spawn('ffmpeg', [
      '-i',
      path.join(dir, file),
      '-map',
      '0:a',
      '-b:a',
      '320k',
      path.join(dir, m[1] + '.mp3')
    ]);
    conversion.stdout.on('data', function(data) {
      console.log('ffmpeg: ' + data);
    });
    conversion.stderr.on('data', function(data) {
      console.log('ffmpeg (err): ' + data);
    });
  } else {
    console.log('no match: ' + file);
  }
}

fs.readdir(dir, function(err, files) {
  if(err) throw err;
  var re = /.flac$/;
  files.filter(function(file) {
    return re.exec(file);
  }).forEach(function(file) {
    console.log('transcoding: ' + file);
    transcode(file);
  });
})
