# dn_tocapi

Provides a component-factory that allows you to register a widget for controlling the map content.

## Usage

In order to use the widget you need to create a component instance and register it.

## Implementing a Custom _Action_
Developers can provide their own menu entries, called __Actions__.
Therefore, a factory-component must be provided via the `dn_tocapi.LayerActionFactory` interface:
```json
// manifest.json of your bundle
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
The `priority`-property defines the order of all available actions.
The highest priority is `1` meaning that the corresponding action will be displayed at the top of the menu.

The factory must provide a `getAction` method which has to return a vue-component.
Frequently, Actions serve as simple input functionality with a similar layout.
For example, many Actions represent buttons or sliders.
If such functionality is required, you can extend one of the preconfigured vue-components in this bundle.

Please make sure that you include a unique `name` value in your component.
To get access to the layer's properties, every action gets the [LayerViewModel](./API.md) of the corresponding as a property (`item`).

### Button
```js
import ButtonAction from "./ButtonAction.vue";

export default function HideSublayerActionFactory() {
    return {
        getAction() {
            let i18n = this._i18n.get().ui;
            return {
                // unique name is required
                name: "hide-sublayer",
                extends: ButtonAction,
                props: {
                    icon: {
                        type: String,
                        // choose your icon
                        default: "visibility_off"
                    },
                    titleLabel: {
                        type: String,
                        // choose your button label
                        default: i18n.hideAllSublayer
                    }
                },
                methods: {
                    // click-event handler
                    onClick() {
                        this.item.setForAll("visible", false);
                    }
                }
            }
        }
    }
}
```

### Slider
```js
import SliderAction from "./SliderAction.vue";

export default function OpacityActionFactory() {
    return {
        getAction() {
            let i18n = this._i18n.get().ui;
            return {
                name: "opacity",
                extends: SliderAction,
                props: {
                    fromLabel: {
                        type: String,
                        default: i18n.invisible
                    },
                    toLabel: {
                        type: String,
                        default: i18n.visible
                    },
                    titleLabel: {
                        type: String,
                        default: i18n.opacity
                    },
                    icon: {
                        type: String,
                        default: "opacity"
                    }
                },
                methods: {
                    onChange(value) {
                        this.item.opacity = value;
                    }
                }
            }
        }
    }
}
```

As you can see, it is possible to override the default labels and instead inject i18n Strings.

## Hide Actions
If the Action should not be displayed under certain circumstances you can alter the `displayAction` Boolean-property in your component (`false` = hide your Action for this item):
```js
export default function MyCustomActionFactory() {
    return {
        getAction() {
            return {
                name: "my-action",
                props: {
                    ...
                },
                beforeMount() {
                    this.displayAction = !!this.item.description;
                }
            }
        }
    }
}
```

## The Event-Bus
The __Event-Bus__ is a mechanism that allows your Action to communicate with its environment.
The preconfigured vue-components automatically provide the property `eventBus`.

### Closing the Menu
Sometimes you want to automatically close the Actions-Menu after your action has been triggered.
This can be done by emitting `close-menu` on the provided Event-Bus:
```js
import ButtonAction from "./ButtonAction.vue";

export default function MyCustomActionFactory() {
    return {
        getAction() {
            return {
                name: "my-action",
                extends: ButtonAction,
                props: {
                    ...
                },
                methods: {
                    onClick() {
                        // do something
                        this.eventBus.$emit('close-menu');
                    }
                }
            }
        }
    }
}
```

### Triggering Custom Events
If you need to interact with, for example, OSGi components from within your Action, you can do so by emitting unique events that will be delegated to your factory.
Therefore, you have to implement `getEventHandlers`:
```js
import ButtonAction from "./ButtonAction.vue";

export default function MyCustomActionFactory() {
    return {
        getAction() {
            return {
                name: "my-action",
                extends: ButtonAction,
                props: {
                    ...
                },
                methods: {
                    onClick() {
                        // do something
                        this.eventBus.$emit('do-something', this.item);
                    }
                }
            }
        },
        getEventHandlers() {
            const mapWidgetModel = this.mapWidgetModel;
            return {
                "do-something": item => {
                    mapWidgetModel.view.goTo({target: item.extent});
                }
            }
        }
    }
}
```

#### Reset
If you want to make use of the reset button in your Action you can do so by handling the `reset` event of the Event-Bus:
```js
export default function MyCustomActionFactory() {
    return {
        getAction() {
            return {
                name: "my-action",
                props: {
                    ...
                },
                beforeMount: function () {
                    this.eventBus.$on("reset", () => {
                        this.item.opacity = 1;
                    });
                }
            }
        }
    }
}
```

### Providing Actions via Custom Vue-Components
If none of the preconfigured vue-components suits your needs you can implement your own:

```javascript
import MyCustomActionFactory from "./MyCustomActionFactory";
import ZoomToExtentAction from "./ZoomToExtentAction.vue";

export default function MyCustomActionFactory() {
    return {
        getAction() {
            return ZoomToExtentAction;
        }
    }
}
```

__Please be careful when you override vue-properties in your factory and do not pass any large objects into your vue-components.__
Vue will register watchers for all properties, which can become a performance issue.
Instead, you should make use of the Event-Bus (see above).

You can still use the `item`, `eventBus` and the `displayAction` properties in your component, just make sure that you list these as vue-properties.
It is also recommended to return a `v-card-title` in order to get the same layout as native Actions:

```html
<template>
    <v-card-title>Zoom To Extent</v-card-title>
</template>
<script>
    export default {
        name: "my-action",
        properties: ["item", "eventBus", "displayAction"],
        ...
    }
</script>
```
