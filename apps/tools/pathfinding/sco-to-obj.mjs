import fs from 'fs';

const input = process.argv[2];
if (!input) {
  console.error('provide input file path as an argument');
  process.exit(1);
}

const inputData = fs.readFileSync(input, 'utf8');
const lines = inputData.split('\n').map(line => line.trim());

let isReadingVerts = false;
let isReadingFaces = false;

const vertices = [];
const faces = [];

for (const line of lines) {
  if (line.startsWith("Verts=")) {
    isReadingVerts = true;
    isReadingFaces = false;
    continue;
  } else if (line.startsWith("Faces=")) {
    isReadingVerts = false;
    isReadingFaces = true;
    continue;
  }

  if (isReadingVerts) {
    const vertexMatches = line.match(/([-+]?\d*\.\d+)\s+([-+]?\d*\.\d+)\s+([-+]?\d*\.\d+)/);
    if (vertexMatches) {
      const [, x, y, z] = vertexMatches.map(parseFloat);
      vertices.push(`v ${x} ${y} ${z}`);
    }
  } else if (isReadingFaces) {
    const faceMatches = line.match(/\d+\s+(\d+)\s+(\d+)\s+(\d+)/);
    if (faceMatches) {
      const [, v1, v2, v3] = faceMatches.map(Number);
      faces.push(`f ${v1 + 1} ${v2 + 1} ${v3 + 1}`);
    }
  }
}

const objContent = `
${vertices.join('\n')}

${faces.join('\n')}
`;

fs.writeFileSync('output.obj', objContent);
console.log('Conversion completed. Output saved to "output.obj"');
