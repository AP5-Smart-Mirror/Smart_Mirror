let fetch = require("node-fetch");
const apiKey = "d9e5d5f774d841f58853522e98497a9d";
const country = "fr";
const source = "le-monde";
const url_CountryFormat = `http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
//const url_OneJournalFormat = `http://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;

console.log(url_CountryFormat);

async function getNewsProm() {
  return await fetch(url_CountryFormat, {
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

function jsonTreatment(json) {
  let articles = [];
  json.articles.forEach(function (item) {
    newJson = {};
    newJson["source"] = item.source.name;
    newJson["title"] = item.title;
    articles.push(newJson);
  });

  return articles;
}
async function getNews() {
  var json;
  try {
    json = await getNewsProm();
  } catch (error) {
    json["error"] = "Can't reach the NewsAPI server to get the data";
  }
  return jsonTreatment(json);
}

exports.getNews = getNews;
