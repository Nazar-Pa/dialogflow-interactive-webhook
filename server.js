const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const morgan = require('morgan');
const { WebhookClient } = require('dialogflow-fulfillment');
const axios = require('axios');

const app = express();
app.use(morgan(':method :url :status :res[content-length] --- :response-time ms'));

app.use(bodyParser.json());
morganBody(app, { maxBodyLength: 100000 });
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', async (req, res) => {
    
    //console.info(`\n\n>>>>>>> S E R V E R   H I T <<<<<<<`);

    /**
     * Constructor for WebhookClient object
     * @param {Object} options JSON configuration
     * @param {Object} options.request Express HTTP request object
     * @param {Object} options.response Express HTTP response object
     */
    const agent = new WebhookClient({ request: req, response: res });
    const query = req.body.queryResult.queryText;
    
    const getWeather = async (agent) => {
        const params = { "template": "text" };
        const param_context = { name: "param_context4", lifespan: 10, parameters: params };
        agent.context.set(param_context);
        agent.add(result);
    };


    const getCalories = async (agent) => {
        let result;

        try {
            await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients',
            {
                //"query": "for breakfast i ate 2 eggs, bacon, and french toast",
                "query": query,
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
                    result = `${serving_qty}  ${serving_unit} ${food_name} is ${calories} calories`;
                    
                    // console.log(`${serving_qty}  ${serving_unit} ${food_name} is ${calories}`);
                    // //res.send(`${serving_qty}  ${serving_unit} ${food_name} is ${calories}`);    
                })
                .catch((err) => {console.log(err)})
        }
        catch {
            console.log('error');   
        }
        const params = { "template": "text" };
        const param_context = { name: "param_context5", lifespan: 10, parameters: params };
        agent.context.set(param_context);
        agent.add(result);
    };


    const WelcomeIntent = (agent) => {

    //const params = { "template": "text" };
    const params = {
        "template": "button", "buttonItems": [{ "uiText": "Action 1", "actionText": "action 1 selected", "isPositive": false },
        { "uiText": "Action 2", "actionText": "action 2 selected", "isPositive": false }, { "uiText": "Action 3", "actionText": "action 3 selected", "isPositive": false },
        { "uiText": "Action 4", "actionText": "action 4 selected", "isPositive": false }], "align": "v", "size": "s", "eventToCall": "android_event"
    };
    //const params = { "template": "checkbox", "items": [{ "uiText": "item 1<br> this item is best", "id": "1" }, { "uiText": "item 2<br> this item is OK", "id": "2" }, { "uiText": "item 3", "id": "3" }], "buttonItems": [{ "uiText": "Yes", "actionText": "process selected", "isPositive": true }, { "uiText": "No", "actionText": "cancel", "isPositive": false }], "align": "h", "size": "l", "eventToCall": "android_event" };
    //const params = { "template": "card", "cardItems": { "imgUrl": "https://picsum.photos/seed/picsum/900/500", "title": "<b>Image Title</b><i>(optional)</i>", "description": "<i>Image description. (optional)</i>" }, "buttonItems": [{ "uiText": "Yes", "actionText": "process selected", "isPositive": true }, { "uiText": "No", "actionText": "cancel", "isPositive": false }], "align": "h", "size": "l", "eventToCall": "android_event" };
    //const params = { "template": "hyperlink", "linkItems": [{ "uiText": "Next Activity", "linkType": "internal", "navigateAndroid": "com.tyagiabhinav.dialogflowchat.NavTestActivity", "navigateIOS": "", "isPositive": true }, { "uiText": "Google", "linkType": "external", "navigateAndroid": "http://www.google.com", "navigateIOS": "http://www.google.com", "isPositive": false }], "align": "v", "size": "l" };
    const param_context = { name: "param_context1", lifespan: 10, parameters: params };
    agent.context.set(param_context);
    agent.add('hi am your your personal virtual assistant, here are my capabilities. What is your name?');
};


const androidIntent = (agent) => {

    //const params = { "template": "text" };
    const params = { "template": "button", "buttonItems": [{ "uiText": "Give motivation", "actionText": "action 1 selected", "isPositive": false }, 
    { "uiText": "Action 2", "actionText": "action 2 selected", "isPositive": false }, { "uiText": "Action 3", "actionText": "action 3 selected", "isPositive": false },
    { "uiText": "Action 4", "actionText": "action 4 selected", "isPositive": false }], "align": "v", "size": "s", "eventToCall": "android_event" };
    //const params = { "template": "checkbox", "items": [{ "uiText": "item 1<br> this item is best", "id": "1" }, { "uiText": "item 2<br> this item is OK", "id": "2" }, { "uiText": "item 3", "id": "3" }], "buttonItems": [{ "uiText": "Yes", "actionText": "process selected", "isPositive": true }, { "uiText": "No", "actionText": "cancel", "isPositive": false }], "align": "h", "size": "l", "eventToCall": "android_event" };
    //const params = { "template": "card", "cardItems": { "imgUrl": "https://picsum.photos/seed/picsum/900/500", "title": "<b>Image Title</b><i>(optional)</i>", "description": "<i>Image description. (optional)</i>" }, "buttonItems": [{ "uiText": "Yes", "actionText": "process selected", "isPositive": true }, { "uiText": "No", "actionText": "cancel", "isPositive": false }], "align": "h", "size": "l", "eventToCall": "android_event" };
    //const params = { "template": "hyperlink", "linkItems": [{ "uiText": "Next Activity", "linkType": "internal", "navigateAndroid": "com.tyagiabhinav.dialogflowchat.NavTestActivity", "navigateIOS": "", "isPositive": true }, { "uiText": "Google", "linkType": "external", "navigateAndroid": "http://www.google.com", "navigateIOS": "http://www.google.com", "isPositive": false }], "align": "v", "size": "l" };
    const param_context = { name: "param_context2", lifespan: 10, parameters: params };
    agent.context.set(param_context);
    agent.add('You can ask me about below tasks');
};


const androidEvent = (agent) => {
    const params = { "template": "text" };
    const param_context = { name: "param_context3", lifespan: 10, parameters: params };
    agent.context.set(param_context);
    agent.add('Event captured successfully!');
};


const activateMotivation = (agent) => {
    const motivatioList = ['Motivation 1', 'Motivation 2', 'Motivation 3', , 'Motivation 4', 'Motivation 5', 'Motivation 6', 'Motivation 7', 'Motivation 8'];

    const params = { "template": "text" };
    const param_context = { name: "param_context6", lifespan: 10, parameters: params };
    agent.context.set(param_context);
    // randomNum = Math.floor(Math.random()*3);
    for (var a = [0, 1, 2, 3, 4, 6, 7], i = a.length; i--;) {
        var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];

    }
    const motivation = motivatioList[random]
    agent.add(JSON.stringify(motivation));
};






    const intentMap = new Map();
    
    intentMap.set('Android Intent', androidIntent);
    intentMap.set('Capture Android Event', androidEvent);
    intentMap.set('Getweather', getWeather);
    intentMap.set('getCalories', getCalories);
    intentMap.set('ActivateMotivationIntent', activateMotivation);
    intentMap.set('Default Welcome Intent', WelcomeIntent);
    
    agent.handleRequest(intentMap);
});


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