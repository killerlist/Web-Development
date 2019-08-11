let quotesData,
    currentQuote = "",
    currentAuthor = "";

let colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857"
];

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (err) {
        return true;
    }
}
function openURL(url) {
    window.open(url);
}

function getQuotes() {
    return $.ajax({
        url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
        success: function(jsonQuotes) {
            quotesData = JSON.parse(jsonQuotes);
            console.log("Successfully received and processed json object!!!");
        }
    });
}
function getRandomQuote() {
    let randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
    return quotesData.quotes[randomIndex];
}
function getQuote() {
    let randomQuote = getRandomQuote();
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;
    console.log(currentQuote);
    console.log('By '+currentAuthor);

    if (inIframe()) {
        $("#tweet-quote").attr(
            "href",
            "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
        );
        $("#tumblr-quote").attr(
            "href",
            "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                encodeURIComponent(currentAuthor) +
                "&content=" +
                encodeURIComponent(currentQuote) +
                "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
        );
    }

    $(".quote-text").animate({ opacity: 0 }, 500, function() {
        $(this).animate({
            opacity: 1
        }, 500);
        $("#text").text(randomQuote.quote);
    });
    $(".quote-author").animate({ opacity: 0 }, 500, function() {
        $(this).animate({
            opacity: 1
        }, 500);
        $("#author").html(randomQuote.author);
    });

    let randomIndex = Math.floor(Math.random() * colors.length);
    console.log(colors[randomIndex]);

    $("html body").animate({
        backgroundColor: colors[randomIndex],
        color: colors[randomIndex]
    }, 1000);
    $(".button").animate({
        backgroundColor: colors[randomIndex]
    }, 1000);
}

$(document).ready(function() {
    getQuotes().then(() => {
        getQuote();
    });

    $("#new-quote").on("click", getQuote);

    $("#tweet-quote").on("click", function() {
        if (!inIframe()) {
            openURL(
                "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                    encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
            );
        }
    });
    $("#tumblr-quote").on("click", function() {
        if (!inIframe()) {
            openURL(
                "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                    encodeURIComponent(currentAuthor) +
                    "&content=" +
                    encodeURIComponent(currentQuote) +
                    "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
            );
        }
    });
});