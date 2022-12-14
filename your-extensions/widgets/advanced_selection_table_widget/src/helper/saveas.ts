
let _global = typeof window === 'object' && window.window === window
? window : typeof self === 'object' && self.self === self
? self : typeof global === 'object' && global.global === global
? global
: this

var saveAs = _global?.saveAs 

if (typeof module !== 'undefined') {
module.exports = saveAs;
}