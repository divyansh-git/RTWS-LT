const potatoCalenderArr = {
    "potato" : [
        {"name": "vegetative", "diseases" :["early_blight", "soft_rot", "leaf_spot", "dry_rot", "bacterial_wilt", "brown_rot", "potato_leaf_curl"]},
        {"name": "flowering", "diseases" :["late_blight", "power_mildew", "fusarium_wilt", "black_scurf", "bacterial_wilt", "brown_rot", "potato_leaf_curl"]},
        {"name": "maturity", "diseases" :["late_blight", "power_mildew", "fusarium_wilt",  "black_scurf", "bacterial_wilt", "common_scab", "potato_leaf_curl"]},
        {"name": "harvesting", "diseases" :["late_blight", "dry_rot", "soft_rot", "black_scurf", "bacterial_wilt", "scorching", "common_scab"]},
        {"name": "post-harvest", "diseases" :["dry_rot", "soft_rot", "late_blight", "common_scab"]},
    ]
}

const potatoDiseaseMap = new Map();

potatoDiseaseMap.set("black_scurf", [
            {"severity":1},
            {"temp_range":[16,23]},
            {"relative_humidity": [0,100]},
            {"soil_temp_range":[18,20]},
            {"rainfall":1},
            {"days condition": 3}]);
            
potatoDiseaseMap.set("dry_rot", [
            {"severity":1},
            {"temp_range":[12,15]},
            {"relative_humidity": [90,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
        
potatoDiseaseMap.set("early_blight", [
            {"severity":1},
            {"temp_range":[17,27]},
            {"relative_humidity": [85,100]},
            {"soil_temp_range":[12,17]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);    
        
potatoDiseaseMap.set("late_blight", [
            {"severity":1},
            {"temp_range":[7.2,26.6]},
            {"relative_humidity": [85,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);    
        
potatoDiseaseMap.set("bacterial_wilt", [
            {"severity":1},
            {"temp_range":[25,37]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[15,20]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);  
        
potatoDiseaseMap.set("brown_rot", [
            {"severity":1},
            {"temp_range":[28,30]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[15,20]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);     
        
potatoDiseaseMap.set("fusarium_wilt", [
            {"severity":1},
            {"temp_range":[26,32]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);         


potatoDiseaseMap.set("soft_rot", [
            {"severity":1},
            {"temp_range":[16,35]},
            {"relative_humidity": [90,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);


potatoDiseaseMap.set("potato_leaf_curl", [
            {"severity":1},
            {"temp_range":[5,19]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
        
potatoDiseaseMap.set("common_scab", [
            {"severity":1},
            {"temp_range":[20,30]},
            {"relative_humidity": [0,0]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]); 
        
        
potatoDiseaseMap.set("leaf_spot", [
            {"severity":1},
            {"temp_range":[24,26]},
            {"relative_humidity": [70,100]},
            {"soil_temp_range":[0,0]},
            {"rainfall":1},
            {"days_condition": 3}
        ]);
        

module.exports = {potatoCalenderArr, potatoDiseaseMap};