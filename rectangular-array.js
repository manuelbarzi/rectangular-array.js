/**
 * Rectangular Array JS
 * 
 * Math operations with Array of Arrays (Matrix) in JavaScript.
 * 
 * @author manuelbarzi
 * @version 0.0.2
 */
var RectangularArray = (function () {
    function checkInteger(n, min) {
        if (!Number.isInteger(n)) throw TypeError(n + ' is not an integer');

        if (!Number.isInteger(min)) throw TypeError(min + ' is not an integer');

        if (n < min) throw Error(n + ' is not is greater than ' + min)
    }

    function slice(arguments, index) {
        return Array.prototype.slice.call(arguments, index);
    }

    function checkArray(array) {
        if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
    }

    function create(m, n) {
        checkInteger(m, 0);
        checkInteger(n, 0);

        var ra = [];

        ra.m = m;
        ra.n = n;

        ra.row = function (j, row) {
            checkInteger(j, 1);

            if (arguments.length == 1) {
                j = j - 1;

                row = [];

                for (var i = 0; i < this.n; i++)
                    row[i] = this[i + j * this.n];

                return row;
            } else {
                if (arguments.length == 2)
                    checkArray(row)
                else if (arguments.length > 2)
                    row = slice(arguments, 1);

                j = j - 1;

                if (row.length > this.n) {
                    var n = row.length;

                    for (var _j = this.m - 1; _j >= 0; _j--)
                        for (var _i = n - 1; _i >= 0; _i--)
                            if (_i < this.n) this[_j * n + _i] = this[_j * this.n + _i];
                            else delete this[_j * n + _i];

                    this.n = n;
                }

                j >= this.m && (this.m = j + 1);

                for (var i = 0; i < row.length; i++)
                    this[i + j * this.n] = row[i];
            }
        };

        ra.col = function (i, col) {
            checkInteger(i, 1);

            if (arguments.length === 1) {
                i = i - 1;

                col = [];

                for (var j = 0; j < this.m; j++)
                    col[j] = this[j * this.n + i];

                return col;
            } else {
                if (arguments.length == 2)
                    checkArray(col)
                else if (arguments.length > 2)
                    col = slice(arguments, 1);

                i = i - 1;

                if (i >= this.n) {
                    var n = i + 1;

                    for (var _j = this.m - 1; _j >= 0; _j--)
                        for (var _i = n - 1; _i >= 0; _i--)
                            if (_i < this.n) this[_j * n + _i] = this[_j * this.n + _i];
                            else delete this[_j * n + _i];

                    this.n = n;
                }

                col.length > this.m && (this.m = col.length);

                for (var j = 0; j < col.length; j++)
                    this[j * this.n + i] = col[j];
            }
        };

        ra.transpose = function () {
            var tra = create(this.n, this.m);

            for (var j = 0; j < this.m; j++)
                for (var i = 0; i < this.n; i++)
                    tra[i * tra.n + j] = this[j * this.n + i];

            return tra;
        };

        ra.fill = function (ra) {
            checkArray(ra);

            this.m < ra.m && (this.m = ra.m);
            this.n < ra.n && (this.n = ra.n);

            for (var j = 0; j < this.m; j++)
                for (var i = 0; i < this.n; i++)
                    this[j * this.n + i] = ra[j * this.n + i];
        };

        ra.toString = function () {
            var string = '';

            if (this.m || this.n) {
                var value;

                for (var j = 0; j < this.m; j++) {
                    for (var i = 0; i < this.n; i++) {
                        i == 0 && (string += '[');

                        value = this[j * this.n + i];
                        string += value == undefined ? ' ' : value;

                        i < this.n - 1 && (string += '\t');
                        i === this.n - 1 && (string += ']');
                    }

                    j < this.m - 1 && (string += '\n');
                }
            } else string = '[]';

            return string;
        };

        ra.val = function val(i, j, value) {
            checkInteger(i, 1);
            checkInteger(j, 1);

            if (arguments.length === 2)
                return this[j * this.n + i];
            else if (arguments.length === 3) {
                if (i >= this.n) {
                    var n = i + 1;

                    for (var _j = this.m - 1; _j >= 0; _j--)
                        for (var _i = n - 1; _i >= 0; _i--)
                            if (_i < this.n) this[_j * n + _i] = this[_j * this.n + _i];
                            else delete this[_j * n + _i];

                    this.n = n;
                }

                j >= this.m && (this.m = j + 1);

                this[j * this.n + i] = value;
            }
        };

        return ra;
    }

    function fillFromArrayOfArrays(ra, aoa) {
        checkArray(ra);
        checkArray(aoa);

        var row;

        for (var j = 0; j < ra.m; j++) {
            row = aoa[j];

            checkArray(row);

            for (var i = 0; i < row.length; i++)
                ra[j * ra.n + i] = row[i];
        }

    }

    return function () {
        if (!arguments.length)
            return create(0, 0);
        if (arguments.length === 1) {
            var aoa = arguments[0];

            checkArray(aoa);
            checkArray(aoa[0]);

            var ra = create(aoa.length, aoa[0].length);

            fillFromArrayOfArrays(ra, aoa);

            return ra;
        } else if (arguments.length === 2) {
            return create(arguments[0], arguments[1]);
        }
    };
})();

if (typeof module === 'object') module.exports = RectangularArray;