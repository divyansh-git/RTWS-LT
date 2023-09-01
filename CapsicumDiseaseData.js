const capsicumCalenderArr = {
    "capsicum":
    [
        {"name": "vegetative", "diseases" :["damping_off", "powdery_mildew", "mosaic_virus", "nematodes"]},
        {"name": "flowering", "diseases" :["damping_off", "powdery_mildew", "cercospora_leaf_spot", "phythopthera", "leaf_curl_viral_diseases", "mosaic_virus", "mites", "fruit_borer", "nematodes"]},
        {"name": "maturity", "diseases" :["powdery_mildew", "cercospora_leaf_spot", "phythopthera", "leaf_curl_viral_diseases", "mosaic_virus", "mites", "fruit_borer", "white_flies"]},
        {"name": "harvesting", "diseases" :["cercospora_leaf_spot", "phythopthera", "fruit_borer", "white_flies"]},
        {"name": "post-harvest", "diseases" :["cercospora_leaf_spot", "phythopthera", "white_flies"]},
    ]
}

const capsicumDiseaseMap = new Map();

// disease data

capsicumDiseaseMap.set("anthracnose", [
            {"severity":1},
            {"temp_range":[20,29]},
            {"relative_humidity": [75,100]},
            {"soil_temp_range":[18,24]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
        
capsicumDiseaseMap.set("damping_off", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [70,90]},
            {"soil_temp_range":[20,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);    
        
        
capsicumDiseaseMap.set("powdery_mildew", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [70,80]},
            {"soil_temp_range":[20,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 
        
capsicumDiseaseMap.set("cercospora_leaf_spot", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [70,90]},
            {"soil_temp_range":[20,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);         


capsicumDiseaseMap.set("phythopthera", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [70,90]},
            {"soil_temp_range":[20,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);


capsicumDiseaseMap.set("leaf_curl_viral_diseases", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [70,80]},
            {"soil_temp_range":[20,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
        
capsicumDiseaseMap.set("mosaic_virus", [
            {"severity":1},
            {"temp_range":[20,24]},
            {"relative_humidity": [90,100]},
            {"soil_temp_range":[15,20]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 
        
        
// pest diseases data
        
capsicumDiseaseMap.set("thrips", [
            {"severity":1},
            {"temp_range":[28,32]},
            {"relative_humidity": [75,85]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]); 
        
capsicumDiseaseMap.set("mites", [
            {"severity":1},
            {"temp_range":[15,37.5]},
            {"relative_humidity": [90,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
        
capsicumDiseaseMap.set("aphids", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
        
capsicumDiseaseMap.set("fruit_borer", [
            {"severity":1},
            {"temp_range":[13,29]},
            {"relative_humidity": [42,77]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
        
capsicumDiseaseMap.set("nematodes", [
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[20,30]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
        
capsicumDiseaseMap.set("white_flies", [
            {"severity":1},
            {"temp_range":[25,28]},
            {"relative_humidity": [60,95]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);


module.exports = {capsicumCalenderArr, capsicumDiseaseMap};