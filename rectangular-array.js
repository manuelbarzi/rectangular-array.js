/**
 * Rectangular Array JS
 * 
 * Math operations with Array of Arrays (Matrix) in JavaScript.
 * 
 * @author manuelbarzi
 * @version 0.0.1
 */
var RectangularArray = (function () {
    function create(m, n) {
        if (!Number.isInteger(m)) throw TypeError(m + ' is not an integer');
        if (!Number.isInteger(n)) throw TypeError(n + ' is not an integer');

        var ra = [];

        ra.m = m;
        ra.n = n;

        mount(ra);

        return ra;
    }

    function mount(ra) {
        ra.row = function () {
            if (arguments.length === 1)
                return row(this, arguments[0]);
            else if (arguments.length > 1)
                return row(this, arguments[0], arguments[1]);
        };

        ra.col = function () {
            if (arguments.length === 1)
                return col(this, arguments[0]);
            else if (arguments.length > 1)
                return col(this, arguments[0], arguments[1]);
        };

        ra.transpose = function () {
            return transpose(this);
        };

        ra.fill = function (ra) {
            fill(this, ra);
        };

        ra.toString = function () {
            return toString(this);
        };

        return ra;
    }

    function row() {
        if (arguments.length === 2) {
            var ra = arguments[0], j = arguments[1];

            var row = [];

            for (var i = 0; i < ra.n; i++)
                row[i] = ra[i + j * ra.n];

            return row;
        } else if (arguments.length > 2) {
            var ra = arguments[0], tj = arguments[1], row = arguments[2];

            if (row.length > ra.n) {
                var n = row.length;

                for (var j = ra.m - 1; j >= 0; j--)
                    for (var i = n - 1; i >= 0; i--)
                        if (i >= ra.n) ra[j * n + i] = undefined;
                        else ra[j * n + i] = ra[j * ra.n + i];

                ra.n = n;
            }

            tj >= ra.m && (ra.m = tj + 1);

            for (var i = 0; i < row.length; i++)
                ra[i + tj * ra.n] = row[i];
        }
    }

    function col() {
        if (arguments.length === 2) {
            var ra = arguments[0], i = arguments[1];
            var col = [];

            for (var j = 0; j < ra.m; j++)
                col[j] = ra[j * ra.n + i];

            return col;
        } else if (arguments.length > 2) {
            var ra = arguments[0], ti = arguments[1], col = arguments[2];

            if (ti >= ra.n) {
                var n = ti + 1

                for (var j = ra.m - 1; j >= 0; j--)
                    for (var i = n - 1; i >= 0; i--)
                        if (i >= ra.n) ra[j * n + i] = undefined;
                        else ra[j * n + i] = ra[j * ra.n + i];

                ra.n = n;
            }

            col.length > ra.m && (ra.m = col.length);

            for (var j = 0; j < col.length; j++)
                ra[j * ra.n + ti] = col[j];
        }
    }

    function transpose(ra) {
        var tra = create(ra.n, ra.m);

        for (var j = 0; j < ra.m; j++)
            for (var i = 0; i < ra.n; i++)
                tra[i * tra.n + j] = ra[j * ra.n + i];

        return tra;
    }

    function fill(ra, ra2) {
        ra.m < ra2.m && (ra.m = ra2.m);
        ra.n < ra2.n && (ra.n = ra2.n);

        for (var j = 0; j < ra.m; j++)
            for (var i = 0; i < ra.n; i++)
                ra[j * ra.n + i] = ra2[j * ra.n + i];
    }

    function fillFromArrayOfArrays(ra, aoa) {
        for (var j = 0; j < ra.m; j++)
            for (var i = 0; i < ra.n; i++)
                ra[j * ra.n + i] = aoa[j][i];
    }

    function toString(ra) {
        var string = '';

        if (ra.m || ra.n) {
            var value;

            for (var j = 0; j < ra.m; j++) {
                for (var i = 0; i < ra.n; i++) {
                    i == 0 && (string += '[');

                    value = ra[j * ra.n + i];
                    string += value == undefined ? ' ' : value;

                    i < ra.n - 1 && (string += '\t');
                    i === ra.n - 1 && (string += ']');
                }

                j < ra.m - 1 && (string += '\n');
            }
        } else string = '[]';

        return string;
    }

    return function () {
        if (!arguments.length)
            return create(0, 0);
        if (arguments.length === 1) {
            var aoa = arguments[0];
            var ra = create(aoa.length, aoa[0].length);

            fillFromArrayOfArrays(ra, aoa);

            return ra;
        } else if (arguments.length > 1) {
            return create(arguments[0], arguments[1]);
        }
    };
})();

if (typeof module === 'object') module.exports = RectangularArray;