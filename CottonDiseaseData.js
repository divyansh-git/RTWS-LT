const cottonCalenderArr = {
    "cotton":
    [
        {"name": "vegetative", "diseases" :["damping_off", "alternaria_leaf_spot", "cercospora_leaf_spot", "bacterial_blight","root_rot","grey_mildew","leaf_curl","stenosis","cutworms","armyworms","whiteflies","aphids","thrips","jassids"]},
        {"name": "flowering", "diseases" :["alternaria_leaf_spot", "cercospora_leaf_spot", "bacterial_blight", "verticillium_wilt", "fusarium_wilt","root_rot","grey_mildew","leaf_curl","stenosis","whiteflies","aphids","thrips","jassids","pink_bollworm","spotted_bollworm"]},
        {"name": "ballformation", "diseases" :["boll_rot", "grey_mildew", "leaf_curl_viral_diseases", "bacterial_blight", "anthracnose","american_bollworm","whiteflies","pink_bollworm","spotted_bollworm"]},
        {"name": "harvesting", "diseases" :["boll_rot", "grey_mildew", "leaf_curl_viral_diseases", "bacterial_blight","pink_bollworm","spotted_bollworm","aphids","whiteflies"]},
        {"name": "post-harvest", "diseases" :["boll_rot", "grey_mildew", "leaf_curl_viral_diseases", "bacterial_blight","pink_bollworm","spotted_bollworm","aphids","whiteflies"]},
    ]
}

const cottonDiseaseMap = new Map();

// disease data

cottonDiseaseMap.set("damping_off", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [85,100]},
            {"soil_temp_range":[20,25]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 

cottonDiseaseMap.set("alternaria_leaf_spot", [
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [75,85]},
            {"soil_temp_range":[25,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);

cottonDiseaseMap.set("cercospora_leaf_spot", [
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [70,90]},
            {"soil_temp_range":[25,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);    

cottonDiseaseMap.set("bacterial_blight", [
            {"severity":1},
            {"temp_range":[30,40]},
            {"relative_humidity": [85,100]},
            {"soil_temp_range":[27,29]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 

cottonDiseaseMap.set("root_rot", [  
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[35,39]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 
cottonDiseaseMap.set("anthracnose", [ 
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);    

cottonDiseaseMap.set("grey_mildew", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [60,90]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);

cottonDiseaseMap.set("leaf_curl", [ // no data
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
cottonDiseaseMap.set("stenosis", [ //no data
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
cottonDiseaseMap.set("verticillium_wilt", [
            {"severity":1},
            {"temp_range":[15,20]},
            {"relative_humidity": [80,100]},
            {"soil_temp_range":[18,25]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);

cottonDiseaseMap.set("fusarium_wilt", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [70,100]},
            {"soil_temp_range":[20,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
cottonDiseaseMap.set("boll_rot", [
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [70,100]},
            {"soil_temp_range":[25,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);

        
// pest diseases data
      
cottonDiseaseMap.set("cutworms", [ // no data
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);

cottonDiseaseMap.set("armyworms", [ // no data
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
cottonDiseaseMap.set("white_flies", [
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [50,70]},
            {"soil_temp_range":[25,30]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
cottonDiseaseMap.set("mealy_bug", [ // no data
            {"severity":1},
            {"temp_range":[0,0]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);

cottonDiseaseMap.set("aphids", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [50,80]},
            {"soil_temp_range":[20,30]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);
cottonDiseaseMap.set("thrips", [
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [40,60]},
            {"soil_temp_range":[25,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 

cottonDiseaseMap.set("jassids", [
            {"severity":1},
            {"temp_range":[25,40]},
            {"relative_humidity": [20,40]},
            {"soil_temp_range":[25,35]},
            {"rainfall":0},
            {"days_condition": 3}
        ]); 
cottonDiseaseMap.set("pink_bollworm", [ 
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [58,80]},
            {"soil_temp_range":[25,30]},
            {"rainfall":0},
            {"days_condition": 3}
        ]); 
cottonDiseaseMap.set("spotted_bollworm", [ 
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [58,80]},
            {"soil_temp_range":[25,30]},
            {"rainfall":0},
            {"days_condition": 3}
        ]); 
cottonDiseaseMap.set("american_bollworm", [ 
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [58,80]},
            {"soil_temp_range":[25,30]},
            {"rainfall":0},
            {"days_condition": 3}
        ]); 

module.exports = {cottonCalenderArr, cottonDiseaseMap}