const muskMelonCalenderArr = {
    "muskmelon" : [
        {"name": "vegetative", "diseases" :["fusarium_wilt", "alternaria_leaf_spot", "cucumber_mosaic_disease", "root_knot_nematode", "leaf_eating_catterpiller", "thrips", "aphid", "red_spider_mite"]},
        {"name": "flowering", "diseases" :["downy_mildew", "powdery_mildew", "bud_necrosis_disease", "alternaria_leaf_spot","root_knot_nematode", "leaf_eating_catterpiller", "red_pumpkin_beetle", "thrips", "aphid", "serpentine_leaf_miner", "red_spider_mite"]},
        {"name": "fruiting", "diseases" :["powdery_mildew", "anthracnose", "cucumber_mosaic_disease",  "alternaria_leaf_spot", "fusarium_wilt", "leaf_eating_catterpiller", "red_pumpkin_beetle", "fruit_fly", "aphid", "serpentine_leaf_miner", "red_spider_mite"]},
        {"name": "harvesting", "diseases" :["powdery_mildew", "anthracnose", "alternaria_leaf_spot", "fusarium_wilt", "red_pumpkin_beetle", "fruit_fly", "red_spider_mite"]},
        {"name": "post-harvest", "diseases" :[]},
    ]
}

const muskMelonDiseaseMap = new Map();

muskMelonDiseaseMap.set("downy_mildew", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [85,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days condition": 3}]);
            
muskMelonDiseaseMap.set("powdery_mildew", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [50,70]},
            {"soil_temp_range":[0,0]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);
        
muskMelonDiseaseMap.set("anthracnose", [
            {"severity":1},
            {"temp_range":[24,30]},
            {"relative_humidity": [90,100]},
            {"soil_temp_range":[30,50]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);    
        
muskMelonDiseaseMap.set("alternaria_leaf_spot", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);    
        
muskMelonDiseaseMap.set("fusarium_wilt", [
            {"severity":1},
            {"temp_range":[25,30]},
            {"relative_humidity": [90,100]},
            {"soil_temp_range":[30,50]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);  
        
muskMelonDiseaseMap.set("bud_necrosis_disease", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);     
        
muskMelonDiseaseMap.set("cucumber_mosaic_disease", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);         


muskMelonDiseaseMap.set("root_knot_nematode", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);
        
        // pest disease data

muskMelonDiseaseMap.set("red_pumpkin_beetle", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
        
muskMelonDiseaseMap.set("fruit_fly", [
            {"severity":1},
            {"temp_range":[25,30]},
            {"relative_humidity": [70,80]},
            {"soil_temp_range":[22,28]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);

muskMelonDiseaseMap.set("thrips", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [60,70]},
            {"soil_temp_range":[20,30]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
        
muskMelonDiseaseMap.set("whitefly", [
            {"severity":1},
            {"temp_range":[12,30]},
            {"relative_humidity": [69,75]},
            {"soil_temp_range":[20,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
        
muskMelonDiseaseMap.set("aphid", [
            {"severity":1},
            {"temp_range":[25,30]},
            {"relative_humidity": [70,80]},
            {"soil_temp_range":[15,25]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
        
muskMelonDiseaseMap.set("serpentine_leaf_miner", [
            {"severity":1},
            {"temp_range":[25,30]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
        
muskMelonDiseaseMap.set("red_spider_mite", [
            {"severity":1},
            {"temp_range":[21,26]},
            {"relative_humidity": [80,90]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);



module.exports = {muskMelonCalenderArr, muskMelonDiseaseMap};