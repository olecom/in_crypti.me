#!/usr/bin/env node

'use strict';

(function sandboxing(require, process, console){
var memlimit, timelimit = 512;

  memlimit = (4 == process.argv.length) && parseFloat(process.argv[2]);
  if(memlimit && !isNaN(memlimit)){
    return require('fs').readFile(process.argv[3], runScript);
  }
  return usage();

  function runScript(err, jsbuf){
  var nodejs;

    if(err) return usage();

    jsbuf = jsbuf.toString();
    nodejs = {
      bin: process.execPath,
      arg:[
        // (max size of the old generation (in Mbytes)
        '--max-old-space-size=' + memlimit,
        // evaluate the script
        '-e', sandbox(jsbuf.replace(/[\r\n]?[\r\n]/g, '\\n'))// UNIX EOLs
      ],
      opt:{
        detached: false,
        stdio:[ 'pipe', 1, 1 ]
      }
    };

    nodejs = require('child_process').spawn(nodejs.bin, nodejs.arg, nodejs.opt);
    if(!nodejs.pid || nodejs.exitCode){
      return onNodejsClose(nodejs.exitCode);
    }
    nodejs.on('close', onNodejsClose);
    setTimeout(
    function kill_sandbox(){
      console.log('kill sandbox');
      nodejs.stdin.end();
      nodejs.kill('SIGKILL');
    }, timelimit);

    return;

    function onNodejsClose(code){
      if(code || null == code){
        console.log('failed script:\n____\n');
        console.log(jsbuf);
        console.log('\n____\n');
      }
      console.log('sandbox exit code: ' + code);
      return process.exit(code);
    }

    function sandbox(srctxt){
      return err = 'var js = "' + srctxt.replace(/"/g, '\\"') + '";\n(' + (
        function(js){
          require('vm').runInNewContext(js, { con: console});
        }
      ).toString() + ')(js)\n';
    }
  }

  function usage(){
    console.log(
'Usage: \n'
+ 'node ' + process.argv[1] + ' \\\n'
+ '     memlimit(type: number) "valid_script_file.js"'
    );
    process.exit(1);
  }
})(require, process, console);
