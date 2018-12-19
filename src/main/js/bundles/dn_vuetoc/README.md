# sdi_toc

Provides a widget that allows you to control the map content.

## Usage

No configuration required. Default values will be applied.

## Configuration Reference

### _Hide Sublayer_ Menu Entry
The toc provides a menu entry for hiding all sublayers of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "HideSubLayerActionFactory": {
        "componentEnabled": false
    }
}
```

### _Show Sublayer_ Menu Entry
The toc provides a menu entry for showing all sublayers of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "ShowSubLayerActionFactory": {
        "componentEnabled": false
    }
}
```

### _Description_ Menu Entry
The toc provides a menu entry for displaying the description of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "ItemDescriptionActionFactory": {
        "componentEnabled": false
    }
}
```

### _Copyright_ Menu Entry
The toc provides a menu entry for displaying the copyright information of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "ItemCopyrightActionFactory": {
        "componentEnabled": false
    }
}
```

### _Zoom-To-Extent_ Menu Entry
The toc provides a menu entry for changing the current view to the __full-extent__ of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "ZoomToExtentActionFactory": {
        "componentEnabled": false
    }
}
```

### _Opacity_ Menu Entry
The toc provides a menu entry for changing the opacity of the selected layer.
Please be aware that changing the opacity of a service has an impact on all sublayers of this service.
The actual opacity value of the sublayer will be the value of parent layer's opacity multiplied by the sublayer's opacity.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "OpacityActionFactory": {
        "componentEnabled": false
    }
}
```