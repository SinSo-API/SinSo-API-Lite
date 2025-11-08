import { DOC_VERSION } from "../src/metadata";

export const openAPIConfig = {
  openapi: '3.0.0',
  info: {
    title: 'SinSo API Lite Documentation',
    version: DOC_VERSION,
    description: 'REST API documentation for SinSo API Lite',
    contact: {
      name: 'Vishal Rashmika',
      email: 'vishal@vishalrashmika.com',
      url: 'https://vishalrashmika.com',
    },
    license: {
      name: 'GNU General Public License v3.0',
      url: 'https://www.gnu.org/licenses/gpl-3.0.en.html',
    },
  },
  servers: [
    {
      url: 'https://sinso.vishalrashmika.com',
      description: 'Production Environment',
    },
    {
      url: 'http://localhost:8787',
      description: 'Local Development',
    },
  ],
};