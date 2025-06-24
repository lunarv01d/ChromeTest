const fs = require('fs');

describe('manifest.json', () => {
  test('parses and contains required fields', () => {
    const data = fs.readFileSync('manifest.json', 'utf8');
    const manifest = JSON.parse(data);
    const requiredFields = [
      'manifest_version',
      'name',
      'version',
      'background',
      'action'
    ];

    for (const field of requiredFields) {
      expect(manifest).toHaveProperty(field);
    }
  });
});
