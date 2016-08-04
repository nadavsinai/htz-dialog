SystemJS.config({
  paths: {
    "htz-dialog/": "src/"
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.13"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "htz-dialog": {
      "main": "index.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "htz-dispatch-event": "github:haaretz/htz-dispatch-event@1.0.1",
    "htz-get-focusables": "github:haaretz/htz-get-focusables@1.0.2"
  },
  packages: {}
});
