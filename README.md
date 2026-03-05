# Struktog

Struktog is an open-source web editor for creating structograms in computer science education.

The project intentionally keeps runtime dependencies at zero to remain independent and easy to maintain long-term. The application is implemented in plain JavaScript, SCSS, and HTML. External packages are used only as development tooling (`devDependencies`).

## Official Links

- Website: https://ddi.education/struktog/
- Original repository: https://gitlab.com/dev-ddi/cs-school-tools/struktog/

## Forks and Mirrors

Forks and mirrors of Struktog exist on other platforms. This repository is the officially maintained source of truth.

Notable fork:

- **OpenPatch / struktolab**: https://github.com/openpatch/struktolab  
  Integrated into the OpenPatch project. OpenPatch develops open-source projects for assessment and training of competencies in computer science.  
  Maintainer: **Mike Barkmin**.

If your fork should be listed here, feel free to open a PR.

## Features

- Visual structogram editor with drag-and-drop workflow
- Optional source-code view and language-specific generation
- Profile-based element visibility and color configuration
- Guided web tour and keyboard shortcuts (`Alt+1..0`)
- JSON import/export and PNG image export
- Optional offline support via service worker in production builds

## Quick Start

### Prerequisites

- Node.js
- npm
- Git

### Install

```bash
npm install
```

### Run development server

```bash
npm run watch
```

### Build production bundle

```bash
npm run build
```

The production output is written to `build/`.

## URL Configuration

You can customize startup behavior with URL parameters.

### `config` profiles

Examples:

```bash
https://ddi.education/struktog/?config=standard
https://ddi.education/struktog/?config=all
https://ddi.education/struktog/?config=beginner
https://ddi.education/struktog/?config=c
https://ddi.education/struktog/?config=python
https://ddi.education/struktog/?config=python_func
```

### `url` task import

Load a JSON task at startup:

```bash
{domain}/?url=https://example.org/path/to/task.json
{domain}/?url=example1.json
```

Note: External hosts must allow CORS for browser-side loading.

## Import and Export

### JSON export

Current exports use a v2 payload with:

- `formatVersion`
- `meta`
- `settings`
- `tree`

When loading, Struktog restores persisted settings from the file, including:

- profile
- visible elements
- element colors
- UI language
- code language
- source-code visibility
- shortcut setting

Legacy exports that only contain `tree` are still supported.

### PNG export

PNG export saves an image of the current structogram.

## Development

Useful scripts:

```bash
npm run watch
npm run dev
npm run build
npm run chromium
```

## Testing

Run UI tests (Selenium against local build):

```bash
npm test
```

`npm test` builds the project first and then runs `test/buttontest.js`.

### Optional environment variables

- `STRUKTOG_MAX_DEPTH` controls nesting depth (default: `2`)
- `STRUKTOG_FAST_NESTED=true` enables a faster nested mode
- `STRUKTOG_VERBOSE=true` shows detailed test steps
- `STRUKTOG_TEST_URL` overrides the target URL (default: local `build/index.html`)

## Offline Support

Production builds generate and register a service worker, enabling offline usage after first load.

Notes:

- Service workers are only active in secure contexts (`https://` or `localhost`).
- After updates, a hard reload may be required to activate new assets immediately.

## Download

- Latest release: https://dditools.inf.tu-dresden.de/releases/struktog/struktog-v1.3.2.tar.gz
- Latest build: https://dditools.inf.tu-dresden.de/releases/struktog/struktog-latest.tar.gz

## Contributing

Contributions are welcome. Please open an issue or pull request in the official repository.

## Maintainer

Thiemo Leonhardt

## License

AGPL-3.0 (see `LICENSE`).
