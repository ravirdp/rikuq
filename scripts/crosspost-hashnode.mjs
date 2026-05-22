// Cross-post an article from src/content/blog/<slug>.mdx to Hashnode.
//
// Sets originalArticleURL back to rikuq.com so search engines treat the
// original as the source. Article publishes immediately via the
// publishPost GraphQL mutation.
//
// Usage:
//   HASHNODE_PAT=<token> HASHNODE_PUBLICATION_ID=<id> \
//     node scripts/crosspost-hashnode.mjs <slug>
//
// Auth:
//   HASHNODE_PAT — generate at hashnode.com/settings/developer
//   HASHNODE_PUBLICATION_ID — visit your blog dashboard; the publication
//     ID appears in the URL. For a personal blog at ravi.hashnode.dev,
//     it's listed under "Settings → General → Publication ID."

import { loadArticle } from './lib/article-loader.mjs';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/crosspost-hashnode.mjs <slug>');
  process.exit(1);
}

const pat = process.env.HASHNODE_PAT;
const publicationId = process.env.HASHNODE_PUBLICATION_ID;
if (!pat || !publicationId) {
  console.error('ERROR: HASHNODE_PAT and HASHNODE_PUBLICATION_ID env vars are required.');
  process.exit(1);
}

const article = await loadArticle(slug);

// Hashnode accepts up to 5 tags. Each tag is {slug, name}. We approximate
// slug by lowercase + replace non-alphanumerics with dashes; name keeps
// the original casing.
const tags = article.tags.slice(0, 5).map((t) => ({
  slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
  name: t,
}));

const intro = article.republishIntro.replace('{platform}', 'Hashnode');
const contentMarkdown = `${intro}${article.body}`;

const mutation = `
  mutation PublishPost($input: PublishPostInput!) {
    publishPost(input: $input) {
      post {
        id
        slug
        url
      }
    }
  }
`;

const input = {
  title: article.title,
  subtitle: article.description.slice(0, 250),
  contentMarkdown,
  publicationId,
  originalArticleURL: article.canonicalUrl,
  tags,
  ...(article.heroImage && {
    coverImageOptions: { coverImageURL: article.heroImage },
  }),
};

const res = await fetch('https://gql.hashnode.com/', {
  method: 'POST',
  headers: {
    Authorization: pat,
    'content-type': 'application/json',
  },
  body: JSON.stringify({ query: mutation, variables: { input } }),
});

const data = await res.json();

if (data.errors) {
  console.error('Hashnode API returned errors:');
  console.error(JSON.stringify(data.errors, null, 2));
  process.exit(2);
}

const post = data.data?.publishPost?.post;
if (!post) {
  console.error('Hashnode returned unexpected payload:');
  console.error(JSON.stringify(data, null, 2));
  process.exit(2);
}

console.log(`✅ Published to Hashnode: ${post.url}`);
console.log(`   Canonical: ${article.canonicalUrl}`);
console.log(`   Tags: ${tags.map((t) => t.name).join(', ') || '(none)'}`);
