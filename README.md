Interview task
==============

Run JavaScript code from a file in 'vm' sandbox with memory limit.

```
$ npm start

> in_crypti@0.0.1 start d:\#_projects\crypti.me\in_crypti.me
> node run_vmscript.js

Usage:
node d:\#_projects\crypti.me\in_crypti.me\run_vmscript.js \
     memlimit(type: number) "valid_script_file.js"

npm ERR! in_crypti@0.0.1 start: `node run_vmscript.js`
npm ERR! Exit status 1
```

## == Actual launch ==

#### Infinite loop:

```
olecom@U32U-RX007R_OLE /d/#_projects/crypti.me/in_crypti.me (master)
$ node run_vmscript.js 1 tests/inf_loop.js
0
1
2
3
[...]
290
291
failed script:
____


stuff = 0;

while (true) con.log(stuff++);


____

sandbox exit code: null
```

#### Successful script:
```
olecom@U32U-RX007R_OLE /d/#_projects/crypti.me/in_crypti.me (master)
$ node run_vmscript.js 1 tests/con_log.js
0
1
sandbox exit code: 0
```

#### 404 && NaN:
```
olecom@U32U-RX007R_OLE /d/#_projects/crypti.me/in_crypti.me (master)
$ node run_vmscript.js 1 no_such_file.js
Usage:
node d:\#_projects\crypti.me\in_crypti.me\run_vmscript.js \
     memlimit(type: number) "valid_script_file.js"

olecom@U32U-RX007R_OLE /d/#_projects/crypti.me/in_crypti.me (master)
$ node run_vmscript.js nan tests/con_log.js
Usage:
node d:\#_projects\crypti.me\in_crypti.me\run_vmscript.js \
     memlimit(type: number) "valid_script_file.js"

olecom@U32U-RX007R_OLE /d/#_projects/crypti.me/in_crypti.me (master)
```
