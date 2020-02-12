'use strict';

module.exports = {
    coverage: true,
    threshold: 100,
    lint: true,
    ["coverage-exclude"]: ["client", "dist", "temp"],
    reporter: ['console', 'html'],
    output: ['stdout', 'coverage.html']
};
