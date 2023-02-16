const cheerio = require('cheerio');
const axios = require('axios');
const _ = require("lodash");
const Category = require('../Models/category');
const User = require('../Models/user');
const Api = require('../Models/api');



// URL of the page we want to scrape
const url = "https://github.com/public-apis/public-apis/blob/master/README.md";

async function scrapeData() {
    try {
        await Api.deleteMany({});
        let apis = [];
        let categories = [];
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);
        // console.log($)
        const h3Elements = $('h3');
        h3Elements.each((i, el) => {
            if (!$(el).text().includes('\n'))
                categories = [...categories, { name: $(el).text()}];
        });
        categories = await categoryBuild(categories);
        // Get all tables
        const tables = $('table');
        tables.each((i, el) => {
            if (i < 10) {
                let category = categories[i]._id;
                let imgs = categories[i].imgJson;
                let index = Math.floor(Math.random() * imgs.data.results.length);
                $(el).find('tr').each((j, row) => {
                    let api = {
                        category,
                        name: undefined,
                        url: undefined,
                        description: undefined,
                        img: imgs.data.results[index].urls.raw ? imgs.data.results[index].urls.raw : imgs.data.results[index].urls.full,
                        uploadBy: "63e9512605360c2670eb7a89"
                    }
                    $(row).find('td').each((n, cell) => {
                        if (n == 0) {
                            api.url = $(cell).find('a').attr('href');
                            api.name = $(cell).text();
                        }
                        if (n == 1) {
                            api.description = $(cell).text();
                        }
                    });
                    // console.log(api)
                    let exist = apis.some(a => a.name === api.name);
                    if(api.name && api.description && api.url && !exist)
                        apis = [...apis, api];
                });
            }
        });
        // console.log(apis);
        await Api.insertMany(apis);
    } catch (err) {
        console.error(err);
      }
}

const categoryBuild = async (categoriesFromScarpe) => {
    await Category.deleteMany({});
    let categories = await Category.insertMany(categoriesFromScarpe);
    for (let i = 0; i < 10; i++) {
    //    await setTimeout(() => { }, 3000)
       categories[i].imgJson = await axios.get(`https://api.unsplash.com/search/photos?query=${categories[i].name}&client_id=2WyxAPFR4DWJL5U0hSYBOFzqFIDAIm4LeCoUaOFFupo`);
    }
    return categories;
}

module.exports = {
    scrapeData
};