const fs = require('fs');
const jsonQuery = require('json-query');
const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
  { name: 'query', type: String, multiple: true, defaultOption: true },
  { name: 'beautify', alias: 'b', type: Boolean, defaultValue: false },
]);

const stdin = fs.readFileSync('/dev/stdin', 'utf8');
const data = JSON.parse(stdin);

const result = jsonQuery(options.query, { data });

if (options.beautify) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(JSON.stringify(result));
}
