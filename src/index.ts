async function main() {
    let mylib = await import("../mylib/pkg/index.js");
    mylib.greet();
}

main();