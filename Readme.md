# Requirement

npm install alexa-sdk

## Invocation

"Open test skill" to open the skill

## Intents - invocations

ListWithBackButtonIntent: "list with button"

ListWithoutBackButtonIntent: "list without button"

BodyWithBackButtonIntent: "body with button"

BodyWithoutBackButtonIntent: "body without button"

## Problem description

tl;dr
When the first template returned by the skill is a list template and the next intent is a template with the back button hidden (body or list doesn't matter) then the skill session ends unexpectedly.


When returning a list template as response to the LauchRequest, then calling an Intent which returns a list or body template *without back button* the session is ended. While the Echo device still listens to the user's response the template is not displayed and a user response is not send to the skill.

*To cause the error:*

Case 1 Launch followed by Intent that returns bodyTemplate with backButton hidden:

```
"Open test skill" -> Returns list template 1 or 2 
"Body without button" -> Should return a body template without back button and listen for user input but fails
```

 Case 2 Launch followed by Intent that returns listTemplate with backButton hidden:

```
"Open test skill" -> Returns list template 1 or 2 
"List without button" -> Should return a list template without back button and listen for user input but fails
```

Case 3 Direct intent invocation followed by Intent that returns bodyTemplate with backButton hidden:

```
"Open test skill and list/body with/without button" -> Returns the respective template 
"Body without button" -> Should return a body template without back button and listen for user input but fails
```

 Case 4 Direct intent invocation followed by Intent that returns listTemplate with backButton hidden:

```
"Open test skill and list/body with/without button" -> Returns the respective template 
"List without button" -> Should return a list template without back button and listen for user input but fails
 ```
 
 

If the template that is returned has a back button everything works just fine:

```
"Open test skill"
"list with button" <- list or body doesn't matter.
"list without button"
"list without button"
"body without button"
"body with button"
...
 ```

If the first template (on lauch or direct invocation of an intent) is a body template everything works just fine. No matter what template follows.
 