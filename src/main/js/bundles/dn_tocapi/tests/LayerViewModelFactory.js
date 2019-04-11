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

import LayerViewModelFactory from "../LayerViewModelFactory";
import LayerViewModel from "../LayerViewModel";
import GroupLayer from "esri/layers/GroupLayer";
import FeatureLayer from "esri/layers/FeatureLayer";

const createLayer = () => {
    const groupLayer = new GroupLayer({
        id: "trees",
        title: "Trees",
        opacity: 0.5,
        copyright: "Don't cut my trees",
        description: "I love trees",
        visible: true
    });
    groupLayer.layers.add(new FeatureLayer({id: "oak"}));
    const conifer = new GroupLayer({id: "conifer"});
    conifer.layers.add(new FeatureLayer({id: "fir"}));
    conifer.layers.add(new FeatureLayer({id: "pine"}));
    groupLayer.layers.add(conifer);
    return groupLayer;
};

registerSuite({
    name: md.id,
    "expect factory is available and has 'create' method"() {
        assert.isOk(LayerViewModelFactory);
        assert.isOk(LayerViewModelFactory.create);
    },

    "expect calling factory function without parameters throws error"() {
        assert.throws(LayerViewModelFactory.create,
            "LayerViewModelFactory: First parameter must be a layer!");
    },

    "expect factory returns a LayerViewModel"() {
        const layer = createLayer();
        const model = LayerViewModelFactory.create(layer);
        assert(model instanceof LayerViewModel);
    },

    "expect model has layer properties"() {
        const layer = createLayer();
        const model = LayerViewModelFactory.create(layer);
        assert.equal(model.id, "trees");
        assert.equal(model.title, "Trees");
        assert.equal(model.opacity, 0.5);
        assert.equal(model.copyright, "Don't cut my trees");
        assert.equal(model.description, "I love trees");
        assert.equal(model.visible, true);
    },

    "expect updating layer properties is synced to model"() {
        const layer = createLayer();
        const model = LayerViewModelFactory.create(layer);
        layer.title = "updated-title";
        return later(() => {
            assert.equal(model.title, "updated-title");
        })
    },

    "expect updating model properties is synced to layer"() {
        const layer = createLayer();
        const model = LayerViewModelFactory.create(layer);
        model.visible = false;
        return later(() => {
            assert.equal(layer.visible, false);
        })
    },

    "expect sublayers are available as children in model"() {
        const layer = createLayer();
        const model = LayerViewModelFactory.create(layer);
        assert.isOk(model.children);
        assert.equal(model.children.length, 2);
    },

    "expect children of sublayers are available in model"() {
        const layer = createLayer();
        const model = LayerViewModelFactory.create(layer);
        assert.isOk(model.children);
        assert.equal(model.children.length, 2);
        assert.equal(model.children[1].children.length, 2);
    },

    "expect updating child model properties is synced to model"() {
        const layer = createLayer();
        const model = LayerViewModelFactory.create(layer);
        assert.equal(layer.layers.getItemAt(1).layers.getItemAt(0).visible, true);
        model.children[1].children[0].visible = false;
        return later(() => {
            assert.equal(layer.layers.getItemAt(1).layers.getItemAt(0).visible, false);
        })
    },

    "expect disposed model won't be updated"() {
        const layer = createLayer();
        const model = LayerViewModelFactory.create(layer);
        model.dispose();
        layer.title = "updated-title";
        return later(() => {
            assert.equal(model.title, "Trees");
        })
    }
});
