const colscheme = (category) => {

    if (category=== "health") {
        return "red";
    }
    else if (category=== "business") {
        return "orange";
    }
    else if (category=== "technology") {
        return "blue";
    }
    else if (category=== "sports") {
        return "fuchsia"
    }
    else if (category=== "science") {
        return "green";
    }
    else {
        return "indigo";
    }

}


 
const url ={
    url1: "https://newsapi.org/v2/top-headlines?country=in&category=",
    url2: "https://newsapi.org/v2/everything?q="

}

module.exports={
    colscheme:colscheme,
    link:url
}