# sdi_toc

Provides a widget that allows you to control the map content.

## Usage

No configuration required. Default values will be applied.

## Configuration Reference

### Description Menu Entry
The toc provides a menu entry for displaying the description of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"sdi_toc": {
    "ItemDescriptionAction": {
        "componentEnabled": false
    }
}
```

### Copyright Menu Entry
The toc provides a menu entry for displaying the copyright information of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"sdi_toc": {
    "ItemCopyrightAction": {
        "componentEnabled": false
    }
}
```