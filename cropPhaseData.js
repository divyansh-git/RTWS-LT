const cropPhases = {
    "tomato" : [
        {"name": "vegetative", "range": [4,7]},
        {"name": "flowering", "range": [8,12]},
        {"name": "fruiting", "range": [10,15]},
        {"name": "harvesting", "range": [12,18]},
        {"name": "post-harvest", "range": [12,18]}
    ],
    "potato" : [
        {"name": "vegetative", "range": [4,8]},
        {"name": "flowering", "range": [7,10]},
        {"name": "maturity", "range": [10,13]},
        {"name": "harvesting", "range": [13,15]},
        {"name": "post-harvest", "range": [15,16]}
    ],
    "capsicum" : [
        {"name": "vegetative", "range": [4,8]},
        {"name": "flowering", "range": [7,10]},
        {"name": "maturity", "range": [10,13]},
        {"name": "harvesting", "range": [13,15]},
        {"name": "post-harvest", "range": [15,16]}
    ],
    "muskmelon" : [
        {"name": "vegetative", "range": [6,10]},
        {"name": "flowering", "range": [11,12]},
        {"name": "fruiting", "range": [13,14]},
        {"name": "harvesting", "range": [15]},
        {"name": "post-harvest", "range": [16]}
    ],
    "cotton" : [
        {"name": "vegetative", "range": [3,6]},
        {"name": "flowering", "range": [7,14]},
        {"name": "boll-formation", "range": [15,21]},
        {"name": "harvesting", "range": [21,27]},
        {"name": "post-harvest", "range": [21,27]}
    ],
    "grape" : [
        {"name": "Vegetative growth ", "range": [1,7]},
        {"name": "Berry growth & Development", "range": [8,9]},
        {"name": "harvesting", "range": [10,12]},
        {"name": "post-harvest", "range": [10,12]},
    ],
}

module.exports = {cropPhases};