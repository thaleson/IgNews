import * as prismic from '@prismicio/client';

export function getPrismicClient(req?: unknown) {
    const endpoint = process.env.PRISMIC_API_ENDPOINT;
    const accessToken = process.env.PRISMIC_ACCESS_TOKKEN;

    const client = prismic.createClient(endpoint, { accessToken });

    if (req) {
        client.enableAutoPreviewsFromReq(req);
    }

    return client;
}
