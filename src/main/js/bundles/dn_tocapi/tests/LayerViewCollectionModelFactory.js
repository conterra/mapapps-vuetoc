/* eslint-disable no-magic-numbers */
/*
 * Copyright (C) 2019 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import registerSuite from "intern!object";
import assert from "intern/chai!assert";
import later from "test-utils/later";
import md from "module";

import LayerViewCollectionModelFactory from "../LayerViewCollectionModelFactory";
import Collection from "esri/core/Collection";
import GroupLayer from "esri/layers/GroupLayer";
import Vue from "apprt-vue/Vue";

const createLayerCollection = () => {
    const featureLayer = new GroupLayer({id: "trees"});
    const collection = new Collection();
    collection.add(featureLayer);
    return collection;
}

registerSuite({
    name: md.id,
    "expect factory is available and has 'create' method"() {
        assert.isOk(LayerViewCollectionModelFactory);
        assert.isOk(LayerViewCollectionModelFactory.fromLayerCollection);
    },

    "expect factory returns array of vue components"() {
        const layerCollection = createLayerCollection();
        const {collection: modelCollection} = LayerViewCollectionModelFactory.fromLayerCollection(layerCollection);
        assert.isArray(modelCollection);
        assert.isOk(modelCollection.length);
        modelCollection.forEach(layermodel => assert(layermodel instanceof Vue));
    },

    "expect adding layers to collection is synced to model"() {
        const layerCollection = createLayerCollection();
        const {collection: modelCollection} = LayerViewCollectionModelFactory.fromLayerCollection(layerCollection);
        assert.equal(layerCollection.length, 1);
        assert.equal(modelCollection.length, 1);
        layerCollection.add(new GroupLayer({id: "rivers"}));
        return later(() => {
            assert.equal(layerCollection.length, 2);
            assert.equal(modelCollection.length, 2);
            assert.equal(modelCollection[0].id, "trees");
            assert.equal(modelCollection[1].id, "rivers");
        });
    },

    "expect removing layers from collection is synced to model"() {
        const layerCollection = createLayerCollection();
        const {collection: modelCollection} = LayerViewCollectionModelFactory.fromLayerCollection(layerCollection);
        layerCollection.add(new GroupLayer({id: "rivers"}));
        return later(() => {
            layerCollection.remove(layerCollection.getItemAt(0));
            return later(() => {
                assert.equal(layerCollection.length, 1);
                assert.equal(modelCollection.length, 1);
                assert.equal(modelCollection[0].id, "rivers");
            });
        });
    },

    "expect moving layers in collection is synced to model"() {
        const layerCollection = createLayerCollection();
        const {collection: modelCollection} = LayerViewCollectionModelFactory.fromLayerCollection(layerCollection);
        layerCollection.add(new GroupLayer({id: "rivers"}));
        layerCollection.add(new GroupLayer({id: "buildings"}));
        return later(() => {
            layerCollection.reorder(layerCollection.getItemAt(2), 0);
            return later(() => {
                assert.equal(modelCollection.length, 3);
                assert.equal(modelCollection[0].id, "buildings");
                assert.equal(modelCollection[1].id, "trees");
                assert.equal(modelCollection[2].id, "rivers");
            });
        });
    },

    "expect changing layers in collection is not synced to disposed model"() {
        const layerCollection = createLayerCollection();
        const model = LayerViewCollectionModelFactory.fromLayerCollection(layerCollection);
        model.dispose();
        const modelCollection = model.collection;
        layerCollection.add(new GroupLayer({id: "rivers"}));
        layerCollection.add(new GroupLayer({id: "buildings"}));
        return later(() => {
            layerCollection.reorder(layerCollection.getItemAt(2), 0);
            return later(() => {
                assert.equal(modelCollection.length, 1);
                assert.equal(modelCollection[0].id, "trees");
            });
        });
    },

    "expect removing layer-view-model in collection is synced to layer-collection"() {
        const layerCollection = createLayerCollection();
        const model = LayerViewCollectionModelFactory.fromLayerCollection(layerCollection);
        const modelCollection = model.collection
        layerCollection.add(new GroupLayer({id: "rivers"}));
        return later(() => {
            assert.equal(modelCollection.length, 2);
            model.remove(modelCollection[0]);
            return later(() => {
                assert.equal(modelCollection.length, 1);
                assert.equal(modelCollection[0].id, "rivers");
                assert.equal(layerCollection.length, 1);
                assert.equal(layerCollection.getItemAt(0).id, "rivers");
            });
        });
    },

    "expect reordering layer-view-model in collection is synced to layer-collection"() {
        const layerCollection = createLayerCollection();
        const model = LayerViewCollectionModelFactory.fromLayerCollection(layerCollection);
        const modelCollection = model.collection;
        layerCollection.add(new GroupLayer({id: "rivers"}));
        layerCollection.add(new GroupLayer({id: "buildings"}));
        return later(() => {
            assert.equal(modelCollection.length, 3);
            model.reorder(modelCollection[2], 0);
            return later(() => {
                assert.equal(modelCollection.length, 3);
                assert.equal(modelCollection[0].id, "buildings");
                assert.equal(modelCollection[1].id, "trees");
                assert.equal(modelCollection[2].id, "rivers");
                assert.equal(layerCollection.length, 3);
                assert.equal(layerCollection.getItemAt(0).id, "buildings");
                assert.equal(layerCollection.getItemAt(1).id, "trees");
                assert.equal(layerCollection.getItemAt(2).id, "rivers");
            });
        });
    }
});
