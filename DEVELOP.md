# Getting Started with Create Next2D App

This project was bootstrapped with [Create Next2D App](https://github.com/Next2D/create-next2d-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run generate`

Generate the necessary View and ViewModel classes from the routing JSON file.

### `npm test`

Launches the test runner.

### `npm run build -- --env=prd`

Builds the app for the environment specified by env=***.\
The build will be minified and optimized for the best performance.

## Configuration JSON

### stage.json

| name | value | default | description |
| --- | --- | --- | --- |
| `width` | number | 240 | This is the setting for the width of the display area. |
| `height` | number | 240 | This is the setting for the height of the display area. |
| `fps` | number | 12 | The number of times to draw per second. |

#### Option settings

| name | value | default | description |
| --- | --- | --- | --- |
| `base` | string | empty | When acquiring JSON by relative path, the URL set here will be applied as the root. For absolute paths, the URL set here will not be applied. |
| `fullScreen` | boolean | false | It will be drawn on the entire screen beyond the width and height set in the Stage class. |
| `tagId` | string | empty | When an ID is specified, drawing will be performed within the element with the specified ID. |
| `bgColor` | The [R,G,B,A] array of background colors can be specified from 0 to 255. false is colorless and transparent. |

### config.json

You can set a common value for each environment.\
The values below all are available for all environments.

| name | value | default | description |
| --- | --- | --- | --- |
| `spa` | boolean | true | As a Single Page Application, the scene can be controlled by URL. |
| `loading` | object | { "callback": "Loading" } | Sets whether or not to display the loading screen until the preparation for screen transition is complete. Call the start and end functions of the class set as callback. |
| `gotoView`.`callback` | string or array | null | You can specify the class to call back after the `gotoView` function finishes. |

### routing.json

| name | value | default | description |
| --- | --- | --- | --- |
| `private` | boolean | false | Controls direct access; if set to true, TopView will be activated. |
| `requests` | array | null | Send a request to the specified location before accessing the View. The information received will be set in next2d.fw.response with name as the key. |

#### Properties that can be set in the `requests` property.

| name | value | default | description |
| --- | --- | --- | --- |
| `type` | string | `content` | The following fixed values are available for this property. `json`, `content`, `image` and `custom` |
| `path` | string | empty | Get the value of the string enclosed in {{***}} from config.json. e.g. {{ api.endPoint }}path/to/api |
| `name` | string | empty | When the name is set, the data retrieved with the name as the key will be set in the Response Map. |
| `cache` | boolean | false | Caches the retrieved data using the value set in name as a key. |
| `callback` | string or array | null | You can specify the class to call back after the request is completed. The value will be set to the first argument of the contractor of the specified class and will be taken over. |
| `class` | string | empty | You can specify the class that will execute the request. (it will only be invoked when type is custom) |
| `access` | string | `public` | Allows you to specify access to the function that will perform the request. You can specify `public` or `static`. (Only invoked when type is custom). |
| `method` | string | empty | You can specify a function to execute the request. (only fired when type is custom). |

## Directory Configuration

```sh
project
├── src
│   ├── index.js
│   ├── App.js
│   ├── Packages.js // It will be generated automatically.
│   │
│   ├── component
│   │   └── default empty
│   │
│   ├── config
│   │   ├── config.json  // Configuration files for each environment.
│   │   ├── routing.json // Request settings before loading the view.
│   │   ├── stage.json   // Display(Stage) area setting. 
│   │   └── Config.js    // It will be generated automatically.
│   │
│   ├── content // Symbolic access to JSON created with NoCode Tool
│   │   ├── top
│   │   │   └── TopContent.js
│   │   └── home
│   │       └── HomeContent.js
│   │
│   ├── image
│   │   └── default empty
│   │
│   ├── model // business logic
│   │   ├── callbask
│   │   │   └── Background.js
│   │   ├── api
│   │   │   └── HomeText.js
│   │   └── default empty
│   │
│   └── view // Per-page View, ViewModel files.
│       ├── top
│       │   ├── TopView.js
│       │   └── TopViewModel.js
│       └── home
│           ├── HomeView.js
│           └── HomeViewModel.js
│
└── __tests__ // Unit Test directory
    └── model
        └── default empty
```

### Chart Flow
![Chart Flow](https://github.com/Next2D/Framework/blob/main/Framework_Chart_Flow.svg)

