module.exports = class PacakgeName {
  constructor(pkgName) {
    this._baseName = pkgName;
  }

  get name() {
    return this._baseName;
  }

  get camelCase() {
    return this._baseName
      .split(/-|_/)
      .map((v, i) => {
          if (i !== 0) {
            let letters = [...v];
            letters[0] = letters[0].toUpperCase();
            return letters.join('');
          }
          return v;
        }
      )
      .join('');
  }
};
