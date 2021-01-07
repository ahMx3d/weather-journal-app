// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express, Body-Parser, CORS prerequisites to run server and routes.
const
    express    = require('express'),
    bodyParser = require('body-parser'),
    cors       = require('cors');
    
// Start up an instance of app.
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance.
app.use(cors());

// Initialize the main project folder.
app.use(express.static('website'));


// Setup Server.
const port = 8000;
app.listen(port,()=>console.log(`Server running at http://localhost:${port}/`));

// GET Route.
app.get('/all', (req, res)=>res.send(projectData).status(200).end());

// POST Route.
app.post('/data',(req, res)=>{
    // console.log(req.body);
    const {temp,date,utxt} = req.body;
    projectData = {temp,date,utxt}
    // const body = req.body;
    // projectData = {
    //     temp: body.temp,
    //     date: body.date,
    //     utxt: body.utxt
    // }
    // projectData['temp'] = body.temp;
    // projectData['date'] = body.date;
    // projectData['utxt'] = body.utxt;
    res.send(projectData).status(200).end();
});