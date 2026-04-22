# rapid-triples

Generate RDF using a form-based interface.
Fork the template and configure it with your own form.

## Overview

**rapid-triples** is a client-side web application that lets users fill structured forms and generate RDF (Resource Description Framework) output. The form can be customised by simply modifying the JSON Schema (`form.json`) and the lifting template (`form-lifting.jinja`) in the `src/assets` folder. The tool accepts all valid JSON Schemas but can be further configured following the documentation of the underlying `vuetify-jsonschema-form` library available [here](https://koumoul-dev.github.io/vuetify-jsonschema-form/2.x/). The template follows the Jinja notation as supported by the `nunjucks` library ([documentation](https://mozilla.github.io/nunjucks/)).

Key features:
- **Form-driven** — dynamic forms rendered from JSON Schema
- **No backend** — everything runs in the browser
- **Multiple output formats** — Turtle, N-Triples, N-Quads, JSON-LD
- **Auto-save** — form data persists in localStorage

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and production build → `dist/` |
| `npm run build-only` | Production build without type-check |
| `npm run preview` | Serve `dist/` locally for testing |

## Customize

The form can be customised by modifying the JSON Schema and the lifting template in the `src/assets` folder. The tool accepts all valid JSON Schemas and can be further configured following the documentation of the underlying `vuetify-jsonschema-form` library available [here](https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/). The template follows the Jinja notation as supported by the `nunjucks` library ([documentation](https://mozilla.github.io/nunjucks/)).

## Docker Deployment

Build the image:
```sh
docker build -t rapid-triples .
docker run -p 8080:80 rapid-triples
```

Visit http://localhost:8080/rapid-triples/.

Or use `publish.sh` to extract the static build without a local Node install:

```bash
bash publish.sh
# → dist/ contains the production build
```

## Cite as

If you use `rapid-triples` for publications, cite the following article:

> Scrocca M., Carenini A., Carriero V. & Celino I. (2025). `rapid-triples: Adaptive Forms for Semi-automatic Knowledge Collection in RDF`. In: 1st Workshop on Bridging Hybrid Intelligence and the Semantic Web (HAIBRIDGE 2025) co-located with the 24th International Semantic Web Conference (ISWC 2025). CEUR-WS. [https://ceur-ws.org/Vol-4093/Paper4hai.pdf](https://ceur-ws.org/Vol-4093/Paper4hai.pdf)

## Contributing

Before contributing, please read carefully, complete and sign our [Contributor Licence Agreement](https://github.com/cefriel/contributing/blob/main/contributor-license-agreement.pdf).

When contributing to this repository, please first discuss the change you wish to make via issue or any other available method with the repository's owners.

## License

_Copyright (c) Cefriel._

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0
