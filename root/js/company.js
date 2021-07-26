let companyWrapper = document.getElementById("companyWrapper");

const profileUrl = 'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/';

const symbol = localStorage.getItem("profile");

const getProfile = () =>{
    fetch(profileUrl + symbol)
    .then(response => response.json())
    .then(data => {
        const profileWrapper = document.createElement("div")
        profileWrapper.classList.add("profile-wrapper")
        const companyLogo = document.createElement("img")
        companyLogo.src=(data.profile.image)
        companyLogo.classList.add("company-logo")
        const companyName = document.createElement("div")
        companyName.textContent=data.profile.companyName
        companyName.classList.add("company-name")
        const companyPrice = document.createElement("div")
        companyPrice.textContent ="Stock Price :" + "$" + data.profile.price
        companyPrice.classList.add("company-price")
        const companyPriceChanges = document.createElement("div")
        companyPriceChanges.id = ("company-price-changes")
        companyPriceChanges.textContent= data.profile.changesPercentage
        const companyInfo = document.createElement("div")
        companyInfo.textContent =data.profile.description 
        companyInfo.classList.add("company-info")
        profileWrapper.append(companyName,companyLogo,companyPrice,companyPriceChanges,companyInfo);
        companyWrapper.append(profileWrapper);

        if (Number(data.profile.changesPercentage.replace("(", "").replace("%", "").replace(")", "")) > 0) {
            companyPriceChanges.style.color = "rgb(0, 253, 0)";
        }
        else {
            companyPriceChanges.style.color = "red";
        }
    });
};
getProfile();

const getData = () => {
    let historyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
    let historyPrices = [];
    let historyDates = [];

    fetch(historyUrl)
    .then(response => response.json())
    .then(data => {
        for (let i = data.historical.length - 1; i > 0; i--) {
            historyPrices.push(data.historical[i].close);
            historyDates.push(data.historical[i].date);
        }
 
        const graph = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(graph, {
            type: 'line',
            data: {
                labels: historyDates,
                datasets: [{
                    label: 'Stock Price History',
                    data: historyPrices,
                    backgroundColor: ['red'],
                    borderColor:['red'],
                    fill: true,
                    borderWidth: 1
                }]
            },
        });   
    });
};

getData()

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
  
  changeFavicon('📖');
