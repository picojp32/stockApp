let input = document.getElementById("stockInput");
let submit = document.getElementById("stockFetch");
let clear = document.getElementById("clearFetch");
let loader = document.getElementById("loading");
let resultsWrapper = document.getElementById("resultsWrapper");
const profileUrl = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/';


const symbol = localStorage.getItem("profile");

function displayLoading() {
    loader.classList.add("display");
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}
function hideLoading() {
    loader.classList.remove("display");
}

input.addEventListener('input', function(){
    displayLoading();
});

clear.addEventListener("click", function(){
    document.getElementById("resultsWrapper").innerHTML = "";
});

const getResults = () => {
    submit.addEventListener("click", function(){
        displayLoading()
        let stockUrl = (`https://financialmodelingprep.com/api/v3/search?query=${input.value}&limit=10&exchange=NASDAQ&apikey=demo`)
        fetch(stockUrl)
        .then(response => response.json())
        .then((data) => {
            hideLoading()
            data.forEach((stockItem) => {
                fetch(profileUrl + stockItem["symbol"])
                .then(response => response.json())
                .then((data) => {
                    const companyPriceChangesPercentage = document.createElement("span")
                    companyPriceChangesPercentage.textContent = data.profile.changesPercentage
                    companyPriceChangesPercentage.classList.add("company-price-result")
                    const companyLogo = document.createElement("img")
                    companyLogo.src=data.profile.image
                    companyLogo.classList.add("company-logo-result")
                    const stockItemWrapper = document.createElement("div")
                    stockItemWrapper.id=("stock-item-wrapper")
                    const name = document.createElement("a") 
                    name.classList.add("stock-name")
                    const symbol = document.createElement("a")
                    symbol.textContent =stockItem["name"]  +  "(" + stockItem["symbol"] + ")"
                    symbol.classList.add("stock-symbol")
                    symbol.id= ("item-symbol")                   
                    symbol.addEventListener("click", function (){
                        symbol.href = (`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${stockItem["symbol"]}`);
                        localStorage.setItem("profile", stockItem["symbol"])
                        symbol.href= "company.html"  
                    });
                
                if (Number(data.profile.changesPercentage.replace("(", "").replace("%", "").replace(")", "")) > 0) {
                    companyPriceChangesPercentage.style.color = "rgb(0, 253, 0)";
                }
                else {
                    companyPriceChangesPercentage.style.color = "red";
                }

                stockItemWrapper.append(companyLogo,name,symbol,companyPriceChangesPercentage);
                resultsWrapper.append(stockItemWrapper);
                });
            });
        });
    });
};
   
getResults();

function changeFavicon(text) {
    const canvas = document.createElement('canvas');
    canvas.height = 64;
    canvas.width = 64;
    const ctx = canvas.getContext('2d');
    ctx.font = '64px serif';
    ctx.fillText(text, 0, 64);
  
    const link = document.createElement('link');
    const oldLinks = document.querySelectorAll('link[rel="shortcut icon"]');
    oldLinks.forEach(e => e.parentNode.removeChild(e));
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL();
    document.head.appendChild(link);
  }
  
  changeFavicon('📈');
