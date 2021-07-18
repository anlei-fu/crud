class Autnetication {
        constructor () {
                this._authData = {};
        }

        hasPageRight(path) {
             return this._authData
                         .pages
                        .filter(page => page.path.match(path))
                        .length > 0;
        }

        hasGadgetRight(name) {
             return this._authData.gadget[name];
        }

        hasApiRight(path,method) {
              return this._authData.apis;
        }
}