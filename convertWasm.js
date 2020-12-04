const execSync = require('child_process').execSync;
const path = require('path');

let envVars = {}

var platform = "";
var isWin = process.platform === "win32";
var isDarwin = process.platform === "darwin";

if (isWin) {
    platform = "windows";
}
else if (isDarwin) {
    platform = "macosx";
}
else {
    platform = "linux";
}

const BINARYEN_ROOT = path.resolve(__dirname, "tools", "binaryen", platform);

let cmd = path.resolve(BINARYEN_ROOT, "wasm2js");

if (isWin) cmd += ".exe";

if (!isWin) {
    if (isDarwin) {
        envVars['DYLD_LIBRARY_PATH'] = BINARYEN_ROOT
    }
    else {
        envVars['LD_LIBRARY_PATH'] = BINARYEN_ROOT
    }
}

cmd += " ";
cmd += "index_bg.wasm -o index_bg.wasm.js ";
cmd += "--enable-mutable-globals ";
cmd += "-O3 --inlining-optimizing --optimize-instructions --optimize-stack-ir";

console.log("Converting WebAssembly to Javascript (" + platform + ")");

execSync(cmd, {
    env: envVars,
    cwd: path.resolve(__dirname, "mylib", "pkg")
})

console.log("Done!");