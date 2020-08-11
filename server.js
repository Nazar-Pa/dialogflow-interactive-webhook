const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const morgan = require('morgan');
const { WebhookClient } = require('dialogflow-fulfillment');

const handler = require('./handler/handler');

const app = express();
app.use(morgan(':method :url :status :res[content-length] --- :response-time ms'));

app.use(bodyParser.json());
morganBody(app, { maxBodyLength: 100000 });
app.use(bodyParser.urlencoded({ extended: true }));

/*
* Webhook to be exposed for fulfillment in dialogflow
*/

app.post('/webhook', (req, res) => {
    //const data = req.body.queryResult.queryText;
    
    //res.send(data);
    //console.info(`\n\n>>>>>>> S E R V E R   H I T <<<<<<<`);

    /**
     * Constructor for WebhookClient object
     * @param {Object} options JSON configuration
     * @param {Object} options.request Express HTTP request object
     * @param {Object} options.response Express HTTP response object
     */
    const agent = new WebhookClient({ request: req, response: res });
    
    const getWeather = async (agent) => {
        const result = [];
        try {
            //const result = [];
            await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
            {
                "query": "for breakfast i ate 2 eggs, bacon, and french toast",
                //"query": data,
                "timezone": "US/Eastern"
               },
            { 
                headers: {
                "Content-Type": "application/json", 
                "x-app-id": "45d558a8", 
                "x-app-key": "283a05f63e61bb5c305979fdfca57b28"
            }
            }).then(response => {
                    const food_name = response.data.foods[0].food_name;
                    const serving_qty = response.data.foods[0].serving_qty;
                    const serving_unit = response.data.foods[0].serving_unit;
                    const calories = response.data.foods[0].nf_calories;
                    
                    result = "result successfull";
                    console.log(`${serving_qty}  ${serving_unit} ${food_name} is ${calories}`);
                    //res.send(`${serving_qty}  ${serving_unit} ${food_name} is ${calories}`);
                    
                    
                })
                .catch((err) => console.log(err))
        }
        catch {
            console.log('error');
        }
        const params = { "template": "text" };
        const param_context = { name: "param_context2", lifespan: 10, parameters: params };
        agent.context.set(param_context);
        await agent.add(result);
    };
    const intentMap = new Map();

    // Run the proper function handler based on the matched Dialogflow intent name
    //intentMap.set('Android Intent', controller.androidIntent);
    //intentMap.set('Capture Android Event', controller.androidEvent);
    intentMap.set('Getweather', getWeather);
    //intentMap.set('ActivateMotivationIntent', controller.activateMotivation);
    //intentMap.set('Default Welcome Intent', controller.WelcomeIntent);
    

    agent.handleRequest(intentMap);
});

// GET
app.get('/', (req, res) => {
    //console.info(`\n\n>>>>>>> S E R V E R   H I T   G E T <<<<<<<`);
    res.send('Server running OK');
});

app.listen(process.env.PORT || 8080, () => {

    console.info(`Assistant webhook listening on port 8080!`);
});

module.exports.app = app;












// const express = require('express');
// const bodyParser = require('body-parser');
// const morganBody = require('morgan-body');
// const morgan = require('morgan');

// const handler = require('./handler/handler');

// const app = express();
// app.use(morgan(':method :url :status :res[content-length] --- :response-time ms'));

// app.use(bodyParser.json());
// morganBody(app, { maxBodyLength: 100000 });
// app.use(bodyParser.urlencoded({ extended: true }));

// /*
// * Webhook to be exposed for fulfillment in dialogflow
// */

// app.post('/webhook', (req, res) => {
//     //data = req.body.queryResult.queryText;
    
//     //res.send(data);
//     //console.info(`\n\n>>>>>>> S E R V E R   H I T <<<<<<<`);
//     handler.WebhookProcessor(req, res);
// });

// // GET
// app.get('/', (req, res) => {
//     //console.info(`\n\n>>>>>>> S E R V E R   H I T   G E T <<<<<<<`);
//     res.send('Server running OK');
// });

// app.listen(process.env.PORT || 8080, () => {

//     console.info(`Assistant webhook listening on port 8080!`);
// });

// module.exports.app = app;