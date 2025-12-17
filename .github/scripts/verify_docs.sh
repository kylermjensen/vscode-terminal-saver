#!/bin/bash
# Documentation verification script - should PASS after implementation

set -e

echo "=== Documentation Verification ==="
echo ""

# Test 1: LICENSE exists
echo "Test 1: LICENSE file exists"
test -f LICENSE && echo "✅ LICENSE exists" || (echo "❌ LICENSE missing" && exit 1)

# Test 2: README.md exists
echo "Test 2: README.md exists"
test -f README.md && echo "✅ README.md exists" || (echo "❌ README.md missing" && exit 1)

# Test 3: LICENSE contains MIT license
echo "Test 3: LICENSE contains MIT license"
grep -q "MIT License" LICENSE && echo "✅ LICENSE contains MIT License" || (echo "❌ LICENSE does not contain MIT License" && exit 1)

# Test 4: README has required sections
echo "Test 4: README has required sections"
grep -q "## Features" README.md && echo "✅ Features section found" || (echo "❌ Features section missing" && exit 1)
grep -q "## Installation" README.md && echo "✅ Installation section found" || (echo "❌ Installation section missing" && exit 1)
grep -q "## Usage" README.md && echo "✅ Usage section found" || (echo "❌ Usage section missing" && exit 1)
grep -q "## Troubleshooting" README.md && echo "✅ Troubleshooting section found" || (echo "❌ Troubleshooting section missing" && exit 1)
grep -q "## Contributing" README.md && echo "✅ Contributing section found" || (echo "❌ Contributing section missing" && exit 1)
grep -q "## License" README.md && echo "✅ License section found" || (echo "❌ License section missing" && exit 1)

# Test 5: README has badges
echo "Test 5: README has shields.io badges"
grep -q "shields.io" README.md && echo "✅ Badges found" || (echo "❌ Badges missing" && exit 1)

# Test 6: README has screenshot/demo reference
echo "Test 6: README has demo reference"
grep -qE "(demo|screenshot|\.gif|\.png)" README.md && echo "✅ Demo reference found" || (echo "❌ Demo reference missing" && exit 1)

echo ""
echo "=== All Documentation Tests Passed ==="
