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
module.exports = {
    apptitle: "VueTOC Sample",
    custominfo: {
        content: "Diese App zeigt das Vue TOC Bundle, welches die Kontrolle \u00FCber den Karteninhalt erm\u00F6glicht."
    },
    map: {
        koeln1: {
            title: "Basisdaten",
            districts: {
                title: "Stadtviertel",
                text: "Das k\u00F6lner Stadtviertel <b>{STV_NAME}</b>."
            },
            boroughs: {
                title: "Stadtteile",
                text: "Der Stadtteil <b>{NAME}</b> liegt im k\u00F6lner Stadtbezirk {STADTBEZIR}."
            },
            precints: {
                title: "Stadtbezirke",
                text: "Der k\u00F6lner Stadtbezirk <b>{NAME}</b>."
            }
        },
        koeln2: {
            title: "Bildung und Kultur",
            libraries: {
                title: "Bibliotheken"
            },
            museums: {
                title: "Museen",
                text: "Das Museum <b>{NAME_LANG}</b> liegt im k\u00F6lner Stadtteil {STADTTEIL}."
            },
            schools: {
                title: "Schulen",
                text: ""
            }
        },
        koeln3: {
            title: "Freizeit",
            sights: {
                title: "Sehensw\u00FCrdigkeiten",
                titleSingle: "Sehensw\u00FCrdigkeit",
                text: "Die Sehensw\u00FCrdigkeit <b>{NAME_LANG}</b> liegt im k\u00F6lner Stadtteil {STADTTEIL}."
            },
            playgrounds: {
                title: "Spiel- und Sportpl\u00E4tze",
                text: "<b>{Spielplatzname}</b> liegt im k\u00F6lner Stadtteil {Stadtteil}. Die folgende Ausstattung steht zur Verf\u00FCgung:",
                baskets: "Basketballk\u00F6rbe",
                goals: "Fussballtore",
                tables: "Tischtennis Tische",
                walls: "Torwand",
                skate: "Skaten",
                misc: "Sonstiges"
            },
            places: {
                title: "Veranstaltungsorte",
                titleSingle: "Veranstaltungsort",
                text: "<b>{NAME_LANG}</b> ist ein {expression/carrier} Veranstaltungsort."
            }
        },
        basemaps: {
            streets: "Stra\u00DFenkarte",
            topo: "Topographische Karte",
            satellite: "Luftbild"
        }
    },
    search: {
        title: "Adressen"
    },
    common: {
        number: "Nummer",
        area: "Fl\u00E4che [ha]",
        totalArea: "Anteil an Gesamtfl\u00E4che [%]",
        name: "Name",
        provider: "Tr\u00E4ger",
        address: "Adresse",
        furtherinfo: "Weitere Informationen",
        precint: "Stadtbezirk",
        district: "Stadtviertel",
        private: "private",
        municipal: "st\u00E4dtischer"
    }
};