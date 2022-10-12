const moment = require("moment");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

moment.locale("en");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));

  eleventyConfig.setBrowserSyncConfig({
    files: "./_site/css/**/*.css",
  });

  // Folders to copy to output folder
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("experiment-assets");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");

  eleventyConfig.addPlugin(syntaxHighlight);

};

function extractExcerpt(article) {
  if (!article.hasOwnProperty("templateContent")) {
    console.warn(
      'Failed to extract excerpt: Document has no property "templateContent".'
    );
    return null;
  }

  // let excerpt = null;
  // const content = article.templateContent;

  // // The start and end separators to try and match to extract the excerpt
  // const separatorsList = [
  //   { start: "<!-- Excerpt Start -->", end: "<!-- Excerpt End -->" },
  //   { start: "<p class='excerpt'>", end: "</p>" },
  // ];

  separatorsList.some((separators) => {
    const startPosition = content.indexOf(separators.start);

    // This end position could use "lastIndexOf" to return all the paragraphs rather than just the first
    // paragraph when matching is on "<p>" and "</p>".
    const endPosition = content.indexOf(separators.end);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content
        .substring(startPosition + separators.start.length, endPosition)
        .trim();
      return true; // Exit out of array loop on first match
    }
  });

  return excerpt;
}

