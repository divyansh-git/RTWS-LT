const tomatoCalenderArr = {
    "tomato":
    [
        {"name": "vegetative", "diseases" :["early_blight", "powdery_mildew", "fusarium_wilt", "stem_rot", "foot_and_collar_rot", "septoria_leaf_spot", "sooty_mold", "anthracnose", "tomato_yellow_leaf_curl_virus", "scorching"]},
        {"name": "flowering", "diseases" :["late_blight", "powdery_mildew", "fusarium_wilt", "anthracnose", "scorching", "tomato_yellow_leaf_curl_virus"]},
        {"name": "fruiting", "diseases" :["late_blight", "powdery_mildew", "fusarium_wilt", "anthracnose", "sooty_mold"]},
        {"name": "harvesting", "diseases" :["late_blight", "powdery_mildew", "fusarium_wilt", "anthracnose", "blossom_end_rot", "bacterial_canker_of_tomato", "scorching", "tomato_yellow_leaf_curl_virus"]},
        {"name": "post-harvest", "diseases" :["anthracnose", "blossom_end_rot", "bacterial_canker_of_tomato"]},
    ]
}

const tomatoDiseaseMap = new Map();

tomatoDiseaseMap.set("gray_mold", [
            {"severity":1},
            {"temp_range":[18,24]},
            {"relative_humidity": [60,70]},
            {"soil_temp_range":[13,23]},
            {"rainfall":1},
            {"days condition": 3}]);
            
tomatoDiseaseMap.set("anthracnose", [
            {"severity":1},
            {"temp_range":[30,32]},
            {"relative_humidity": [85,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
        
tomatoDiseaseMap.set("early_blight", [
            {"severity":1},
            {"temp_range":[24,28]},
            {"relative_humidity": [55,85]},
            {"soil_temp_range":[12,17]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);    
        
tomatoDiseaseMap.set("late_blight", [
            {"severity":1},
            {"temp_range":[7.2,26.6]},
            {"relative_humidity": [85,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);    
        
tomatoDiseaseMap.set("wilt_and_damping_off", [
            {"severity":1},
            {"temp_range":[10,24]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[17,25]},
            {"rainfall":0},
            {"days_condition": 3}
        ]);  
        
tomatoDiseaseMap.set("rhizopus_rot", [
            {"severity":1},
            {"temp_range":[5,25]},
            {"relative_humidity": [97,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);     
        
tomatoDiseaseMap.set("powdery_mildew", [
            {"severity":1},
            {"temp_range":[22,27]},
            {"relative_humidity": [80,100]},
            {"soil_temp_range":[25,26]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 
        
tomatoDiseaseMap.set("fusarium_wilt", [
            {"severity":1},
            {"temp_range":[26,32]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);         


tomatoDiseaseMap.set("fusarium_stem_rot", [
            {"severity":1},
            {"temp_range":[10,21]},
            {"relative_humidity": [60,80]},
            {"soil_temp_range":[24,30]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);


tomatoDiseaseMap.set("tomoto_mosaic", [
            {"severity":1},
            {"temp_range":[28,30]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);
        
tomatoDiseaseMap.set("foot_and_collar_rot", [
            {"severity":1},
            {"temp_range":[25,35]},
            {"relative_humidity": [90,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 
        
        
tomatoDiseaseMap.set("septoria_leaf_spot", [
            {"severity":1},
            {"temp_range":[15,27]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[28,32]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);
        
tomatoDiseaseMap.set("tomato_spotted_wilt_virus", [
            {"severity":1},
            {"temp_range":[23,25]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);         
        
   
tomatoDiseaseMap.set("tomato_yellow_leaf_curl_virus", [
            {"severity":1},
            {"temp_range":[23,42]},
            {"relative_humidity": [20,40]},
            {"soil_temp_range":[0,0]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);
        
tomatoDiseaseMap.set("gray_leaf_spot", [
            {"severity":1},
            {"temp_range":[25,30]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":-1},
            {"days_condition": 3}
        ]);             


module.exports = {tomatoCalenderArr, tomatoDiseaseMap};