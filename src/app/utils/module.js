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


const colorMap = {
    red: ["bg-red-500", "hover:bg-red-800"],
    blue: ["bg-blue-500", "hover:bg-blue-800"],
    green: ["bg-green-500", "hover:bg-green-800"],
    yellow: ["bg-yellow-500", "hover:bg-yellow-800"],
    orange: ["bg-orange-500", "hover:bg-orange-800"],
    fuchsia: ["bg-fuchsia-500", "hover:bg-fuchsia-800"],
    indigo: ["bg-indigo-500", "hover:bg-indigo-800"],
  };
 
const url ={
    url1: "https://newsapi.org/v2/top-headlines?category=",
    url2: "https://newsapi.org/v2/everything?q="

}

module.exports={
    colscheme:colscheme,
    link:url,
    colorMap:colorMap
}