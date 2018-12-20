# dn_tocapi

Provides a component-factory that allows you to register a widget for controlling the map content.

## Usage

In order to use the widget you need to create a component instance and register it.

## Configuration Reference

### Implementing a custom Menu Entry/Action
Developers can provide their own menu entries, called __Actions__.
A CustomActionFactory must be implemented and provided:

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
Make sure the instance is provided as `dn_tocapi.LayerActionFactory` in the bundle's manifest.json:

```json
{
    "components": [
        {
            "name": "MyCustomActionFactory",
            "provides": "dn_tocapi.LayerActionFactory",
            "properties": {
                "priority": 100
            }
        }
    ]
}
```
