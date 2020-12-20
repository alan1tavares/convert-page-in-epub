const Epup = require("epub-gen");
const cheerio = require("cheerio");
const axios = require("axios");

async function main() {
  const linkSRP =
    "https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html";
  const linkOCP =
    "https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html";
  const contentSRP = await getContentHtml(linkSRP, ".blog-post");
  const titleSRP = await getContentHtml(linkSRP, ".blog-post h1");

  const contentOCP = await getContentHtml(linkOCP, ".blog-post");
  const titleOCP = await getContentHtml(linkOCP, ".blog-post h1");

  const options = {
    title: "Post Uncle Bob",
    author: "Robert C. Martin",
    content: [
      {
        title: titleSRP,
        data: contentSRP,
      },
      {
        title: titleOCP,
        data: contentOCP,
      },
    ],
  };

  const pathName = "./Solid Post.epub";

  new Epup(options, pathName);
}

async function getContentHtml(url, querySelector) {
  const response = await axios.get(url);
  const responseData = response.data;
  const $ = cheerio.load(responseData);
  const content = $(querySelector).html();
  return content;
}

main();
