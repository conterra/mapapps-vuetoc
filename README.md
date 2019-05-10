# Vue TOC Bundle
The Vue TOC is a new Widget that allows you to control the map content.

![Screenshot App](https://github.com/conterra/mapapps-vuetoc/blob/master/screenshot.JPG)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_vuetoc/index.html

## Installation Guide
**Requirement: map.apps 4.2.0**

Simply add the bundle "dn_vuetoc" to your map.apps 4 app.

### Configurable Components of dn_vuetoc:

#### Config:
```
"Config": {
    "showBasemaps": true,
    "showGroundOpacity": false,
    "showOperationalLayer": true,
    "showLoadingStatus": true,
    "showOperationalLayerHeaderMenu": true,
    "showLayerMenu": true,
    "showResetButton": true,
    "showCloseButton": true,
    "expandInitially": false,
    "visibleIconClass": "check_box",
    "invisibleIconClass": "check_box_outline_blank"
}
```

You need to configure the ground in you app to use the property *showGroundOpacity*. The ground opacity slider is only available in the 3D view.

```
"map": {
    "ground": {
        "url": "https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer",
        "type": "ELEVATION"
        "opacity": 1
    },
    "layers": [...],
    ...
}
```

##### Properties
| Property                       | Type    | Possible Values                 | Default                         | Description                          |
|--------------------------------|---------|---------------------------------|---------------------------------|--------------------------------------|
| showBasemaps                   | boolean | ```true``` &#124; ```false```   | ```true```                      | Show basemaps                        |
| showGroundOpacity              | boolean | ```true``` &#124; ```false```   | ```false```                     | Show ground opacity slider           |
| showOperationalLayer           | boolean | ```true``` &#124; ```false```   | ```true```                      | Show operational layers              |
| showLoadingStatus              | boolean | ```true``` &#124; ```false```   | ```true```                      | Show current loading status of layer |
| showOperationalLayerHeaderMenu | boolean | ```true``` &#124; ```false```   | ```true```                      | Show operational layer menu          |
| showLayerMenu                  | boolean | ```true``` &#124; ```false```   | ```true```                      | Show layer menu                      |
| showResetButton                | boolean | ```true``` &#124; ```false```   | ```true```                      | Show reset button                    |
| showCloseButton                | boolean | ```true``` &#124; ```false```   | ```true```                      | Show close menu                      |
| expandInitially                | boolean | ```true``` &#124; ```false```   | ```true```                      | Expands the tree                     |
| visibleIconClass               | String  |                                 | ```"check_box"```               | Visible icon class                   |
| invisibleIconClass             | String  |                                 | ```"check_box_outline_blank"``` | Invisible icon class                 |

##### Icon class samples
Any material design icon class is possible: https://material.io/tools/icons/?icon=check_box_outline_blank&style=baseline

```
"Config": {
    "visibleIconClass": "visibility",
    "invisibleIconClass": "visibility_off"
}
```
```
"Config": {
    "visibleIconClass": "check",
    "invisibleIconClass": "close"
}
```
```
"Config": {
    "visibleIconClass": "check_box",
    "invisibleIconClass": "check_box_outline_blank"
}
```
```
"Config": {
    "visibleIconClass": "radio_button_checked",
    "invisibleIconClass": "radio_button_unchecked"
}
```
```
"Config": {
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
