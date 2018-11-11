# Vue TOC Bundle
The Vue TOC is a new Widget that allows you to control the map content.

![Screenshot App](https://github.com/conterra/mapapps-vuetoc/blob/master/screenshot.JPG)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_vuetoc/index.html

## Installation Guide
**Requirement: map.apps 4.2.0**

Simply add the bundle "dn_vuetoc" to your map.apps 4 app.

### Configurable Components of dn_vuetoc:

#### MapContentWidgetFactory:
```
"MapContentWidgetFactory": {
    "showBasemaps": true,
    "showOperationalLayer": true,
    "showLegend": true,
    "showLoadingStatus": true,
    "visibleIconClass": "visibility",
    "invisibleIconClass": "visibility_off"
}
```

##### Properties
| Property                       | Type    | Possible Values                 | Default                | Description                          |
|--------------------------------|---------|---------------------------------|------------------------|--------------------------------------|
| showBasemaps                   | boolean | ```true``` &#124; ```false```   | ```true```             | Show basemaps in vuetoc              |
| showOperationalLayer           | boolean | ```true``` &#124; ```false```   | ```true```             | Show operational layers in vuetoc    |
| showLegend                     | boolean | ```true``` &#124; ```false```   | ```true```             | Show legend in vuetoc                |
| showLoadingStatus              | boolean | ```true``` &#124; ```false```   | ```true```             | Show current loading status of layer |
| visibleIconClass               | String  |                                 | ```"visibility"```     | Visible icon class                   |
| invisibleIconClass             | String  |                                 | ```"visibility_off"``` | Invisible icon class                 |

##### Icon class samples
Any material design icon class is possible: https://material.io/tools/icons/?icon=check_box_outline_blank&style=baseline

```
"MapContentWidgetFactory": {
    "visibleIconClass": "visibility",
    "invisibleIconClass": "visibility_off"
}
```
```
"MapContentWidgetFactory": {
    "visibleIconClass": "check",
    "invisibleIconClass": "close"
}
```
```
"MapContentWidgetFactory": {
    "visibleIconClass": "check_box",
    "invisibleIconClass": "check_box_outline_blank"
}
```
```
"MapContentWidgetFactory": {
    "visibleIconClass": "radio_button_checked",
    "invisibleIconClass": "radio_button_unchecked"
}
```
```
"MapContentWidgetFactory": {
    "visibleIconClass": "thumb_up",
    "invisibleIconClass": "thumb_down"
}
```

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
