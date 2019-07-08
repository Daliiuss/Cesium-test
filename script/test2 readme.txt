Upload local map: failed
Must be converted to gltf

PS D:\obj2gltf-master> npm test

> obj2gltf@3.0.3 test D:\obj2gltf-master
> gulp test

internal/modules/cjs/loader.js:638
    throw err;
    ^

Error: Cannot find module 'cesium'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:636:15)
    at Function.Module._load (internal/modules/cjs/loader.js:562:25)
    at Module.require (internal/modules/cjs/loader.js:690:17)
    at require (internal/modules/cjs/helpers.js:25:18)
    at Object.<anonymous> (D:\obj2gltf-master\gulpfile.js:3:16)
    at Module._compile (internal/modules/cjs/loader.js:776:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:787:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
npm ERR! Test failed.  See above for more details.

I need to fix this error or I must find the way to make program swallow Obj :/
