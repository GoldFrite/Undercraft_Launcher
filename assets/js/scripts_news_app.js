// Importation des modules --------------------------------
var axios = require('axios');
const os = require('os');
// ---------------------------------------------------------


let newsForm = document.getElementById("news")
let newsRefresh = document.getElementById("news-refresh")

var config = {
    method: 'post',
    url: 'http://minecraft-launcher.medianewsonline.com/servers/undercraft/news/news.json',
    headers: {},
};

news()
newsRefresh.addEventListener("click", () => {
    news()
    newsForm.innerHTML = ""
})

function news() {

    axios(config)
        .then(function (response) {

            newsForm.innerHTML = ""
            var newsLengthJSON = JSON.stringify(response.data.news.length) // nbre de news

            // if (newsLengthJSON > 5) {
            //     newsLengthJSON = 5
            // }

            for (let newsLength = 0; newsLength < newsLengthJSON; newsLength++) {

                var newsTitle = response.data.news[newsLength].title
                var newsBody = response.data.news[newsLength].body
                var newsImage = response.data.news[newsLength].img
                var newsAuthor = response.data.news[newsLength].author
                var newsDate = response.data.news[newsLength].date

                if (newsImage === null) {
                    newsForm.innerHTML += "<div class='news-title-form'><p class='news-title'><b>" + newsTitle + "</b></p><div class='news-body-form'><p style='line-height: 25px; margin: 0px;'>" + newsBody + "</p></div><p class='news-date'>Par " + newsAuthor + ", le " + newsDate + "</p></div>"
                } else {
                    newsForm.innerHTML += "<div class='news-title-form'><p class='news-title'><b>" + newsTitle + "</b></p><div class='news-body-form'><p style='line-height: 25px; margin: 0px;'>" + newsBody + "</p><img class='news-img' src='" + newsImage + "' alt='image'></div><p class='news-date'>Par " + newsAuthor + ", le " + newsDate + "</p></div>"
                }

            }

        })

        .catch(function (error) {
            console.log(error);
            newsForm.innerHTML = "<p style='margin-bottom: 0px; color: #c74930'>Une erreur est survenue lors du chargement des news. Essayez plus tard."
        });

}

var isNewsOpen = false
const newsForm2 = document.getElementById("news-form")
const news2 = document.getElementById("news")

document.getElementById("open-news").addEventListener("click", () => {
    if (isNewsOpen == false) openNews()
    else closeNews()
})

function openNews() {

    newsForm2.style.height = window.innerHeight - 231 + "px"
    // newsForm2.style.overflow = "scroll"
    news2.style.height = "auto"
    news2.style.overflow = "scroll"
    news2.style.height = window.innerHeight - (231 + 48) + "px"
    isNewsOpen = true

}

function closeNews() {

    newsForm2.style.height = "40px"
    newsForm2.style.overflow = "hidden"
    news2.style.height = "0"
    news2.style.overflow = "hidden"
    isNewsOpen = false

}

function newsResize() {

    if (isNewsOpen == true) {

        newsForm2.style.height = window.innerHeight - 231 + "px"
        news2.style.height = window.innerHeight - (231 + 48) + "px"

    }   

}