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
import LayerViewModel from "../LayerViewModel";
import Collection from "esri/core/Collection";
import FeatureLayer from "esri/layers/FeatureLayer";

const createLayerCollection = () => {
    const featureLayer = new FeatureLayer({id: "trees"});
    const collection = new Collection();
    collection.add(featureLayer);
    return collection;
}

registerSuite({
    name: md.id,
    "expect factory is available and has 'create' method"() {
        assert.isOk(LayerViewCollectionModelFactory);
        assert.isOk(LayerViewCollectionModelFactory.create);
    },

    "expect calling factory function without parameters throws error"() {
        assert.throws(LayerViewCollectionModelFactory.create,
            "LayerViewCollectionModelFactory: First parameter must be collection of layers!");
    },

    "expect factory returns array of LayerViewModels"() {
        const layerCollection = createLayerCollection();
        const {collection: modelCollection} = LayerViewCollectionModelFactory.create(layerCollection);
        assert.isArray(modelCollection);
        assert.isOk(modelCollection.length);
        modelCollection.forEach(layermodel => assert(layermodel instanceof LayerViewModel));
    },

    "expect adding layers to collection is synced to model"() {
        const layerCollection = createLayerCollection();
        const {collection: modelCollection} = LayerViewCollectionModelFactory.create(layerCollection);
        assert.equal(layerCollection.length, 1);
        assert.equal(modelCollection.length, 1);
        layerCollection.add(new FeatureLayer({id: "rivers"}));
        return later(() => {
            assert.equal(layerCollection.length, 2);
            assert.equal(modelCollection.length, 2);
            assert.equal(modelCollection[0].id, "trees");
            assert.equal(modelCollection[1].id, "rivers");
        });
    },

    "expect removing layers from collection is synced to model"() {
        const layerCollection = createLayerCollection();
        const {collection: modelCollection} = LayerViewCollectionModelFactory.create(layerCollection);
        layerCollection.add(new FeatureLayer({id: "rivers"}));
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
        const {collection: modelCollection} = LayerViewCollectionModelFactory.create(layerCollection);
        layerCollection.add(new FeatureLayer({id: "rivers"}));
        layerCollection.add(new FeatureLayer({id: "buildings"}));
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
        const model = LayerViewCollectionModelFactory.create(layerCollection);
        model.dispose();
        const modelCollection = model.collection;
        layerCollection.add(new FeatureLayer({id: "rivers"}));
        layerCollection.add(new FeatureLayer({id: "buildings"}));
        return later(() => {
            layerCollection.reorder(layerCollection.getItemAt(2), 0);
            return later(() => {
                assert.equal(modelCollection.length, 1);
                assert.equal(modelCollection[0].id, "trees");
            });
        });
    }
});
