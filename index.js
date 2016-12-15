'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.ad1d9289-2233-4bd7-a2aa-6a2c7629ea83';

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);

  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function() {
    this.attributes['speechOutput'] = 'Welcome to Num Rand! Give me two numbers and I\'ll randomly choose one between them.';
    this.attributes['repromptOutput'] = 'Sorry, I didn\'t catch that. Can you repeat the two numbers?';

    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptOutput']);
  },
  'NumberIntent': function() {
    var num1Slot = this.event.request.intent.slots.FirstNumber;
    var num2Slot = this.event.request.intent.slots.SecondNumber;
    var first;
    var second;

    if (num1Slot && num1Slot.value) {
      first = Number.parseInt(num1Slot.value);
    }
    if (num2Slot && num2Slot.value) {
      second = Number.parseInt(num2Slot.value);
    }

    if (first && second) {
      var random;
      if (second > first) {
        random = Math.floor(Math.random() * (second - first + 1)) + first;
      }
      else {
        random = Math.floor(Math.random() * (first - second + 1)) + second;
      }

      this.attributes['speechOutput'] = 'Your number is ' + random;
      this.attributes['repromptOutput'] = this.attributes['speechOutput'];

      this.emit(':tell', this.attributes['speechOutput']);
    }
    else {
      this.attributes['speechOutput'] = 'Sorry, I didn\'t catch that. Can you repeat the two numbers?';
      this.attributes['repromptOutput'] = this.attributes['speechOutput'];

      this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptOutput']);
    }
  },
  'AMAZON.HelpIntent': function() {
    this.attributes['speechOutput'] = 'You can ask for a random number by saying, for example, give me a number between 1 and 10, or you can say exit. What would you like to do?';
    this.attributes['repromptOutput'] = this.attributes['speechOutput'];

    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptOutput']);
  },
  'AMAZON.RepeatIntent': function() {
    this.emit(':ask', this.attributes['speechOutput'], this.attributes['repromptOutput']);
  },
  'AMAZON.StopIntent': function() {
    this.emit('SessionEndedRequest');
  },
  'AMAZON.CancelIntent': function() {
    this.emit('SessionEndedRequest');
  },
  'SessionEndedRequest': function() {
    this.emit(':tell', 'Goodbye!');
  }
};
