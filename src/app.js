const path = require('path');
const express = require('express');
const hbs = require('hbs');

const marketsRouter = require('./router/markets');
const miningPoolRouterApi = require('./router/mining-pools/api-call');
const mininPoolRouterCrawler = require('./router/mining-pools/crawler');


//set express and ports
const app = express();
const port = process.env.PORT || 8000;

//routers
app.use(marketsRouter);
app.use(miningPoolRouterApi);
app.use(mininPoolRouterCrawler);

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handelebars for views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Daily rates',
        name: 'Damir'
    });
});


app.get('/profitability', (req, res) => {
    res.render('profitability', {
        title: 'Profitability',
        name: 'Damir'
    });
});



//---------------------------------------------------------------------------------
app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Damir'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port} .`)
});

