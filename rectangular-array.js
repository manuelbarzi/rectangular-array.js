/**
 * Rectangular Array JS
 * 
 * Math operations with Array of Arrays (Matrix) in JavaScript.
 * 
 * @author manuelbarzi
 * @version 0.0.0
 */
var RectangularArray = (function () {
    function create(m, n) {
        if (!Number.isInteger(m)) throw TypeError(m + ' is not an integer');
        if (!Number.isInteger(n)) throw TypeError(n + ' is not an integer');

        var ra = new Array(m);

        for (var j = 0; j < m; j++)
            ra[j] = new Array(n);

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

            for (var i = 0; i < ra[j].length; i++)
                row[i] = ra[j][i];

            return row;
        } else if (arguments.length > 2) {
            var ra = arguments[0], j = arguments[1], row = arguments[2];

            for (var i = 0; i < row.length; i++)
                (ra[j] || (ra[j] = []))[i] = row[i];
        }
    }

    function col() {
        if (arguments.length === 2) {
            var ra = arguments[0], i = arguments[1];
            var col = [];

            for (var j = 0; j < ra.length; j++)
                col[j] = ra[j][i];

            return col;
        } else if (arguments.length > 2) {
            var ra = arguments[0], i = arguments[1], col = arguments[2];

            for (var j = 0; j < col.length; j++)
                ra[j][i] = col[j];
        }
    }

    function transpose(ra) {
        var tra = create(ra[0].length, ra.length);

        for (var j = 0; j < ra.length; j++)
            for (var i = 0; i < ra[0].length; i++)
                tra[i][j] = ra[j][i];

        return tra;
    }

    function fill(ra, ra2) {
        for (var j = 0; j < ra2.length; j++)
            for (var i = 0; i < ra2[0].length; i++)
                (ra[j] || (ra[j] = []))[i] = ra2[j][i];
    }

    function toString(ra) {
        var string = '';

        if (ra.length)
            for (var j = 0; j < ra.length; j++)
                string += '[' + ra[j].join('\t') + ']' + (j < ra.length - 1 ? '\n' : '');
        else string = '[]';

        return string;
    }

    return function () {
        if (!arguments.length)
            return create(0, 0);
        if (arguments.length === 1)
            return mount(arguments[0]);
        else if (arguments.length > 1) {
            return create(arguments[0], arguments[1]);
        }
    };
})();

if (typeof module === 'object') module.exports = RectangularArray;