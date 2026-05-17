import rss from "@astrojs/rss";
import removeMd from "remove-markdown";

function getFirstTwoParagraphs(content) {
  const re = new RegExp("(.|\n)*?\n\n", "gm");
  const found = [...content.matchAll(re)];

  const first_paragraph = found[0][0].replace(/[\n\r]/g, " ");
  const second_paragraph = found[1][0].replace(/[\n\r]/g, " ");

  const firstTwoParagraphs = first_paragraph + second_paragraph;
  return removeMd(firstTwoParagraphs);
}

export async function GET(context) {
  const posts = await import.meta.glob("./blog/*.md", { eager: true });

  const items = Object.values(posts)
    .map((post) => ({
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.pubDate),
      link: post.url,
      description: getFirstTwoParagraphs(post.rawContent()),
    }))
    .sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: "Angelo's Blog",
    description: "Angelo's blog on software engineering and tech.",
    site: context.site,
    items,
  });
}
