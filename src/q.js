const fs = require('fs');
const jsonQuery = require('json-query');
const commandLineArgs = require('command-line-args');

const options = commandLineArgs([
  { name: 'query', type: String, multiple: true, defaultOption: true },
  { name: 'beautify', alias: 'y', type: Boolean, defaultValue: false },
  { name: 'before', alias: 'b', type: String },
  { name: 'after', alias: 'a', type: String },
]);

const stdin = fs.readFileSync('/dev/stdin', 'utf8');

var data = JSON.parse(stdin);

if (options.before) {
  data = (new Function('data', options.before))(data);
}

data = jsonQuery(options.query, { data });

if (options.after) {
  data = (new Function('data', options.after))(data);
}

if (options.beautify) {
  console.log(JSON.stringify(data, null, 2));
} else {
  console.log(JSON.stringify(data));
}
