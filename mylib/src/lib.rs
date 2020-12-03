
#[macro_use] extern crate log;
use log::Level;
use wasm_bindgen::prelude::*;
use web_sys::console;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn greet() {
    console::log_1(&JsValue::from_str("Hello, mylib!"));
    set_panic_hook();
}

#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    wasm_logger::init(wasm_logger::Config::new(Level::Debug));

    Ok(())
}

#[wasm_bindgen]
pub struct Test {
    foo: String,
}

#[wasm_bindgen]
impl Test {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            foo: String::new(),
        }
    }

    #[wasm_bindgen(setter)]
    pub fn set_foo(&mut self, value: String) {
        self.foo = value;
    }

    #[wasm_bindgen(getter)]
    pub fn get_foo(&self) -> String {
        self.foo.to_owned()
    }
}

pub fn set_panic_hook() {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function at least once during initialization, and then
    // we will get better error messages if our code ever panics.
    //
    // For more details see
    // https://github.com/rustwasm/console_error_panic_hook#readme
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}