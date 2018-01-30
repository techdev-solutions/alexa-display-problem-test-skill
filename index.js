const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;


exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {

    'LaunchRequest': function () {
        // We respond with a ListTemplate to a LaunchRequest!!!
        listTemplateResponseWithBackButton(this)

        // bodyTemplateResponseWithBackButton(this) // Returning a bodyTemplate does not cause the error
    },
    'ListWithBackButtonIntent': function () {
        // SAME RESPONSE AS to LaunchRequest
        listTemplateResponseWithBackButton(this)
    },
    'ListWithoutBackButtonIntent': function () {
        listTemplateResponseWithoutBackButton(this)
    },
    'BodyWithBackButtonIntent': function () {
        bodyTemplateResponseWithBackButton(this)
    },
    'BodyWithoutBackButtonIntent': function () {
        bodyTemplateResponseWithoutBackButton(this)
    },
    'AMAZON.StopIntent': function () {
        this.emit('AMAZON.CancelIntent');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Goodbye");
    },
    'Unhandled': function () {
        this.emit(':ask', "Sorry, but I did not understand. Please repeat.");
    }
};

function listTemplateResponseWithBackButton(alexa) {
    var listItemBuilder = new Alexa.templateBuilders.ListItemBuilder();
    var listTemplateBuilder = new Alexa.templateBuilders.ListTemplate2Builder();

    listItemBuilder.addItem(makeImage("https://s3-eu-west-1.amazonaws.com/hugo-boss/evening.png"), "token1", makePlainText("some text"));
    listItemBuilder.addItem(makeImage("https://s3-eu-west-1.amazonaws.com/hugo-boss/evening.png"), "token2", makePlainText("some text"));

    var listItems = listItemBuilder.build();
    var template = listTemplateBuilder
        .setToken("Token1")
        .setTitle("List template with back button - Say body or list with or without button")
        .setListItems(listItems)
        // .setBackButtonBehavior('HIDDEN') // For the launchRequest it doesn't matter here if this is set to HIDDEN or not.
        .build();


    alexa.response
        .renderTemplate(template)
        .speak("Say body or list with or without button")
        .listen("Say body or list with or without button");

    alexa.emit(':responseReady');
}

function listTemplateResponseWithoutBackButton(alexa) {
    var listItemBuilder = new Alexa.templateBuilders.ListItemBuilder();
    var listTemplateBuilder = new Alexa.templateBuilders.ListTemplate2Builder();

    listItemBuilder.addItem(makeImage("https://s3-eu-west-1.amazonaws.com/hugo-boss/evening.png"), "token1", makePlainText("some text"));
    listItemBuilder.addItem(makeImage("https://s3-eu-west-1.amazonaws.com/hugo-boss/evening.png"), "token2", makePlainText("some text"));

    var listItems = listItemBuilder.build();
    var template = listTemplateBuilder
        .setToken("Token2")
        .setTitle("List template without back button - Say body or list with or without button")
        .setListItems(listItems)
        .setBackButtonBehavior('HIDDEN')
        .build();


    alexa.response
        .renderTemplate(template)
        .speak("Say body or list with or without button")
        .listen("Say body or list with or without button");

    alexa.emit(':responseReady');
}

function bodyTemplateResponseWithBackButton(alexa) {
    var builder = new Alexa.templateBuilders.BodyTemplate1Builder();

    var template = builder
        .setToken("Token3")
        .setTitle("Body template with back button - Say body or list with or without button")
        .build();

    alexa.response
        .renderTemplate(template)
        .speak("Say body or list with or without button")
        .listen("Say body or list with or without button");

    alexa.emit(':responseReady');
}

function bodyTemplateResponseWithoutBackButton(alexa) {
    var builder = new Alexa.templateBuilders.BodyTemplate1Builder();

    var template = builder
        .setToken("Token4")
        .setTitle("Body template without back button - Say body or list with or without button")
        .setBackButtonBehavior("HIDDEN")
        .build();

    alexa.response
        .renderTemplate(template)
        .speak("Say body or list with or without button")
        .listen("Say body or list with or without button");

    alexa.emit(':responseReady');
}
