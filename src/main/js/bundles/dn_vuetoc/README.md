# sdi_toc

Provides a widget that allows you to control the map content.

## Usage

No configuration required. Default values will be applied.

## Configuration Reference

### Description Menu Entry
The toc provides a menu entry for displaying the description of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "ItemDescriptionAction": {
        "componentEnabled": false
    }
}
```

### Zoom-To-Extent Menu Entry
The toc provides a menu entry for changing the current view to the __full-extent__ of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "ZoomToExtentActionFactory": {
        "componentEnabled": false
    }
}
```

### Copyright Menu Entry
The toc provides a menu entry for displaying the copyright information of the selected layer.
To disable this entry the corresponding component has to be disabled in the app.json configuration below this bundle:

```json
"dn_vuetoc": {
    "ItemCopyrightAction": {
        "componentEnabled": false
    }
}
```

### Implementing a custom Menu Entry/Action
Developers can provide their own menu entries, called __Actions__.
Therefore, a CustomActionFactory mist be implemented and provided:

```javascript
import MyCustomActionFactory from "./MyCustomActionFactory.vue";

export default function MyCustomActionFactory() {
    return {
        getComponent() {
            // inject other references, configurations or i18n here
            return ZoomToExtentAction;
        }
    }
}
```

The CustomActionFactory returns a Vue-Component.
This Vue-Component will be rendered inside the provided menu.
However, you can also extent one of the provided components for common use cases such as Buttons or Sliders:

```javascript
<script>
    import ButtonAction from "./ButtonAction.vue";
    //import SliderAction from "./SliderAction.vue";
    export default  {
        name: "my-custom-action",
        extends: ButtonAction,
        props: {
            titleLabel: String,
            icon: {
                type: String,
                default: "search"
            }
        },
        methods: {
            // should your action be provided for any item/layer?
            displayActionForItem(item) {
                return item.layer && item.layer.fullExtent;
            },
            onClick(item) {
                // trigger your custom code here

                // do you want to close the menu after triggering?
                this.$emit('close-menu');
            }
        }
    }
</script>
```

Then, register an instance of this factory at the component system.
You can manipulate the order of all actions by modifying the `priority` property.
The higher the priority value, the higher the action will apear in the layer actions menu.
Make sure the instance is provided as `vue-toc.LayerActionFactory` in the bundle's manifest.json:

```json
{
    "components": [
        {
            "name": "MyCustomActionFactory",
            "provides": "vue-toc.LayerActionFactory",
            "properties": {
                "priority": 100
            }
        }
    ]
}
```