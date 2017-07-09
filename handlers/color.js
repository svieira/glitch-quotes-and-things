const Color = require('color');
const withHelp = require('./with-help');

const HELP = `
## \`/color\`

Generate a color swatch - either using a single color or a message with as many colors as you desire!
Supported colors include #rgb, #rrggbb, rgb, rgba, hsl, and CSS named colors.
`.trim()

const randomRgbComponent = () => Math.floor(Math.random() * 255);

const randomColor = () => Color({
  r: randomRgbComponent(),
  g: randomRgbComponent(),
  b: randomRgbComponent()
});

function getColor(color) {
  if (!color) return randomColor();
  try {
    return Color(color);
  } catch (e) {
    console.log('Unable to create a color for', color, 'due to', e);
    return randomColor();
  }
}

const WHITE = Color('#fff'), BLACK = Color('#000');
const SIZES = {
  Large: {
    width: 64, height: 64
  },
  Small: {
    width: 16, height: 16
  }
};

const colorStringLike = /(#[0-9a-f]{3,8}|(rgba?|hsla?|hwba?)\([0-9.,%\s]+\))/ig

const isSingleColor = s => {
  try { Color(s); return true; } catch (e) { return false; }
};

const template = ({color, size = SIZES.Large}) => {
  const inverseColor = color.light() ? BLACK : WHITE;
  const text = size === SIZES.Small ? '' : `
<text
    x="50%" y="50%" alignment-baseline="middle" text-anchor="middle"
    style="font-family: monospace; font-weight: bold; fill: ${inverseColor.hex()};">${color.hex()}</text>
`.trim();
  return `
<svg xmlns="http://www.w3.org/2000/svg"
     width="${size.width}" height="${size.height}" viewBox="0 0 100 100">
  <rect x="0" y="0" height="100" width="100"
          style="fill: ${color.hex().toLowerCase()};"/>
  ${text}
</svg>
`.trim();
}

const mdTemplate = (svg, alt='') => `![${alt}](${toDataUri(svg)})`;

const toDataUri = svg => 'data:image/svg+xml;base64,' + new Buffer(svg).toString('base64');

function standAloneColorResponse(color) {
  color = getColor(color);
  const svg = template({color});
  return mdTemplate(svg, `The color ${color.hex()}`);
}

function multipleColorResponse(str) {
  const toMd = match => {
    try {
      const color = Color(match);
      return mdTemplate(template({color, size: SIZES.Small})) + ' ' + match;
    } catch (e) {
      return match;
    }
  };
  return str.replace(colorStringLike, toMd).replace(/\b[a-z]+\b/g, toMd);
}


module.exports = withHelp({text: HELP}, function colorHandler(request, response) {
  var color = (request.body && request.body.text || '');

  const text = isSingleColor(color) ? standAloneColorResponse(color) : multipleColorResponse(color);
  response.json({
    response_type: 'in_channel',
    text
  });
});
