const { tomatoCalenderArr, tomatoDiseaseMap } = require('./TomatoDiseaseData.js');
const { potatoCalenderArr, potatoDiseaseMap } = require('./PotatoDiseaseData.js');
const {capsicumCalenderArr, capsicumDiseaseMap } = require("./CapsicumDiseaseData.js");
const { muskMelonCalenderArr, muskMelonDiseaseMap } = require("./MuskMelonDiseaseData.js");
const { cottonCalenderArr, cottonDiseaseMap } = require("./CottonDiseaseData.js");

const {cropPhases} =  require("./cropPhaseData.js");
const {tomatoNDVIMap, potatoNDVIMap, capsicumNDVIMap, muskMelonNDVIMap,cottonNDVIMap,grape3NDVIMap} = require("./ndvi.js");
const axios = require('axios');

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

exports.handler = async(event) => {
    let eventObj = event.body ? JSON.parse(event.body) : event;
    console.log(eventObj);
    
    let averageVal = eventObj.sensorData;
    
    let responseObj = {};
    var agroDisData = [];
    var agroDisDataTempObj = {};
    
    //getting the crop phase yet to define farm_id, crop_name, sowing_date
    let d = new Date();
    let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    
    var endDate = [year, month, day].join('-');
    let finalMonth,finalWeek;
    if(eventObj.notificationData.crop_type==="ST")
    {
    let diffInMs   = new Date(endDate) - new Date(eventObj.notificationData.sowing_date);
    let diffInDays = diffInMs / (1000 * 60 * 60 * 24);    
    let numOfWeeks = diffInDays/7;
     finalWeek = Math.round(numOfWeeks);
    }
    else{
        finalMonth=d.getMonth() + 1-eventObj.notificationData.pruningDate;
    }
    let ndviThreshold = [0,0];
    
    eventObj.notificationData.crop_type==="ST"?console.log('week'+finalWeek, eventObj.notificationData.crop_name):console.log('month'+finalMonth, eventObj.notificationData.crop_name);
    if(eventObj.notificationData.crop_name == 'Tomato') {
        if(tomatoNDVIMap.has('week'+finalWeek))
            ndviThreshold = tomatoNDVIMap.get('week'+finalWeek);
    }
    else if(eventObj.notificationData.crop_name == 'Potato') {
        if(potatoNDVIMap.has('week'+finalWeek))
            ndviThreshold = potatoNDVIMap.get('week'+finalWeek);
    }
    else if(eventObj.notificationData.crop_name == 'Capsicum' || eventObj.notificationData.crop_name == 'Chilli') {
        if(capsicumNDVIMap.has('week'+finalWeek))
            ndviThreshold = capsicumNDVIMap.get('week'+finalWeek);
    }
    else if(eventObj.notificationData.crop_name == 'Muskmelon' ) {
        if(muskMelonNDVIMap.has('week'+finalWeek))
            ndviThreshold = muskMelonNDVIMap.get('week'+finalWeek);
    }
    else if(eventObj.notificationData.crop_name == 'Cotton' ) {
        if(cottonNDVIMap.has('week'+finalWeek))
            ndviThreshold = cottonNDVIMap.get('week'+finalWeek);
    }
    else if(eventObj.notificationData.crop_name == 'Grape' ) {
        if(grape3NDVIMap.has('month'+finalMonth))
            ndviThreshold = grape3NDVIMap.get('month'+finalMonth);
    }
    
    console.log(ndviThreshold, "this is ndvi threshold");
    
    let cropName = eventObj.notificationData.crop_name.toLowerCase();
    
    let responseArr = [];
    for (const [crop, value] of Object.entries(cropPhases)) {
        if(crop == cropName || ( (cropName == 'chilli' || cropName == "capsicum") && crop == "capsicum") ) {
            for(var i = 0; i < value.length; i++) {
                var name = value[i].name;
                var range = value[i].range;
                if(eventObj.notificationData.crop_type==="ST")
                if(numOfWeeks >= range[0] && numOfWeeks <= range[1]) {
                    responseArr.push(name);
                }
                else
                if(finalMonth >= range[0] && finalMonth <= range[1]) {
                    responseArr.push(name);
                }
            }
        }
    }
    eventObj.notificationData.crop_type==="ST"?console.log(numOfWeeks, responseArr, "Hello I am phaseArr (week)"):console.log(finalMonth, responseArr, "Hello I am phaseArr (month)");
    
const dailyDiseaseMap = new Map();  
const diseaseSet = new Set();
if(cropName == 'tomato') {
    for(const [crop, value] of Object.entries(tomatoCalenderArr)) {
        if(crop == cropName) {
            for(let i = 0; i < value.length; i++) {
                var phaseName = value[i].name;
                if(responseArr.includes(phaseName) && responseArr.length > 0) {
                    var diseaseArr = value[i].diseases;
                    
                    for(var j = 0; j < diseaseArr.length; j++) {
                        // console.log(diseaseArr[j]);
                        
                        // checking if we have already iterate for a particular disease using --> set.has(disease)
                        if(tomatoDiseaseMap.has(diseaseArr[j]) && !diseaseSet.has(diseaseArr[j])) {
                            
                            // adding disease to set 
                            diseaseSet.add(diseaseArr[j]);
                            
                            var tempRange = tomatoDiseaseMap.get(diseaseArr[j])[1].temp_range;
                            var relativeHumidity = tomatoDiseaseMap.get(diseaseArr[j])[2].relative_humidity;
                            var soilTempRange = tomatoDiseaseMap.get(diseaseArr[j])[3].soil_temp_range;
                            var rainVal = tomatoDiseaseMap.get(diseaseArr[j])[4].rainfall;
                    
                            
                            console.log(diseaseArr[j], tempRange, relativeHumidity, soilTempRange, rainVal);
                            
                            // check for percentage of confidence
                            
                            var disObj = {atmTempCount: 0, soilTempCount : 0, relHumCount : 0, rainCount : 0}
                            for(const [day, avgVal] of Object.entries(averageVal)) { 
                                if(tempRange[0] <= avgVal.avg_atmospheric_temp && tempRange[1] >= avgVal.avg_atmospheric_temp) {
                                    disObj.atmTempCount++;
                                }
                                
                                if(soilTempRange[0] <= avgVal.avg_soil_temp && soilTempRange[1] >= avgVal.avg_soil_temp) {
                                    disObj.soilTempCount++;
                                }
                                
                                if(relativeHumidity[0] <= avgVal.avg_humidity && relativeHumidity[1] >= avgVal.avg_humidity ) 
                                {
                                    disObj.relHumCount++;
                                }
                                
                                if(rainVal != -1 && rainVal == 1 && avgVal.avg_rainfall > 2.5) {
                                    disObj.rainCount++;
                                }
                                else if(rainVal != -1 && rainVal == 0 && avgVal.avg_rainfall < 2.5) {
                                    disObj.rainCount++;
                                }
                                console.log(disObj);
                            }
                            
                            var levelOfConf = 0;
                            if(disObj.atmTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.relHumCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.soilTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.rainCount == 3) {
                                levelOfConf += 20;
                            }
                            
                            if(levelOfConf >= 20) {
                                dailyDiseaseMap.set(diseaseArr[j], levelOfConf);
                                var diseaseString = diseaseArr[j] + ' ' + levelOfConf + '%';
                                agroDisData.push({disease: diseaseString, disParams: [tempRange, relativeHumidity, soilTempRange, rainVal]});
                            }
                            
                        }
                    }
                     
                }
            }
            
            
        }
    }
}
else if(cropName == 'potato') {
    for(const [crop, value] of Object.entries(potatoCalenderArr)) {
        if(crop == cropName) {
            for(let i = 0; i < value.length; i++) {
                var phaseName = value[i].name;
                if(responseArr.includes(phaseName) && responseArr.length > 0) {
                    var diseaseArr = value[i].diseases;
                    
                    for(var j = 0; j < diseaseArr.length; j++) {
                        // console.log(diseaseArr[j]);
                        
                        // checking if we have already iterate for a particular disease using --> set.has(disease)
                        if(potatoDiseaseMap.has(diseaseArr[j]) && !diseaseSet.has(diseaseArr[j])) {
                            
                            // adding disease to set 
                            diseaseSet.add(diseaseArr[j]);
                            
                            var tempRange = potatoDiseaseMap.get(diseaseArr[j])[1].temp_range;
                            var relativeHumidity = potatoDiseaseMap.get(diseaseArr[j])[2].relative_humidity;
                            var soilTempRange = potatoDiseaseMap.get(diseaseArr[j])[3].soil_temp_range;
                            var rainVal = potatoDiseaseMap.get(diseaseArr[j])[4].rainfall;
                            
                            var disObj = {atmTempCount: 0, soilTempCount : 0, relHumCount : 0, rainCount : 0}
                            for(const [day, avgVal] of Object.entries(averageVal)) { 
                                if(tempRange[0] <= avgVal.avg_atmospheric_temp && tempRange[1] >= avgVal.avg_atmospheric_temp) {
                                    disObj.atmTempCount++;
                                }
                                
                                if(soilTempRange[0] <= avgVal.avg_soil_temp && soilTempRange[1] >= avgVal.avg_soil_temp) {
                                    disObj.soilTempCount++;
                                }
                                
                                if(relativeHumidity[0] <= avgVal.avg_humidity && relativeHumidity[1] >= avgVal.avg_humidity ) 
                                {
                                    disObj.relHumCount++;
                                }
                                
                                if(rainVal != -1 && rainVal == 1 && avgVal.avg_rainfall > 2.5) {
                                    disObj.rainCount++;
                                }
                                else if(rainVal != -1 && rainVal == 0 && avgVal.avg_rainfall < 2.5) {
                                    disObj.rainCount++;
                                }
                                console.log(disObj);
                            }
                            
                            var levelOfConf = 0;
                            if(disObj.atmTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.relHumCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.soilTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.rainCount == 3) {
                                levelOfConf += 20;
                            }
                            
                            if(levelOfConf >= 20) {
                                dailyDiseaseMap.set(diseaseArr[j], levelOfConf);
                                var diseaseString = diseaseArr[j] + ' ' + levelOfConf + '%';
                                agroDisData.push({disease: diseaseString, disParams: [tempRange, relativeHumidity, soilTempRange, rainVal]});
                            }
                        }
                    }
                     
                }
            }
            
            
        }
    }
}
else if(cropName == "capsicum" || cropName == "chilli") {
    cropName = "capsicum";
    for(const [crop, value] of Object.entries(capsicumCalenderArr)) {
        if(crop == cropName) {
            for(let i = 0; i < value.length; i++) {
                var phaseName = value[i].name;
                if(responseArr.includes(phaseName) && responseArr.length > 0) {
                    var diseaseArr = value[i].diseases;
    
                    for(var j = 0; j < diseaseArr.length; j++) {
                        // checking if we have already iterate for a particular disease using --> set.has(disease)
                        if(capsicumDiseaseMap.has(diseaseArr[j]) && !diseaseSet.has(diseaseArr[j])) {
                            
                            // adding disease to set 
                            diseaseSet.add(diseaseArr[j]);
                            
                            var tempRange = capsicumDiseaseMap.get(diseaseArr[j])[1].temp_range;
                            var relativeHumidity = capsicumDiseaseMap.get(diseaseArr[j])[2].relative_humidity;
                            var soilTempRange = capsicumDiseaseMap.get(diseaseArr[j])[3].soil_temp_range;
                            var rainVal = capsicumDiseaseMap.get(diseaseArr[j])[4].rainfall;
                            
                            console.log(diseaseArr[j], tempRange, relativeHumidity, soilTempRange, rainVal);
                            
                            
                            var disObj = {atmTempCount: 0, soilTempCount : 0, relHumCount : 0, rainCount : 0}
                            for(const [day, avgVal] of Object.entries(averageVal)) { 
                                if(tempRange[0] <= avgVal.avg_atmospheric_temp && tempRange[1] >= avgVal.avg_atmospheric_temp) {
                                    disObj.atmTempCount++;
                                }
                                
                                if(soilTempRange[0] <= avgVal.avg_soil_temp && soilTempRange[1] >= avgVal.avg_soil_temp) {
                                    disObj.soilTempCount++;
                                }
                                
                                if(relativeHumidity[0] <= avgVal.avg_humidity && relativeHumidity[1] >= avgVal.avg_humidity ) 
                                {
                                    disObj.relHumCount++;
                                }
                                
                                if(rainVal != -1 && rainVal == 1 && avgVal.avg_rainfall > 2.5) {
                                    disObj.rainCount++;
                                }
                                else if(rainVal != -1 && rainVal == 0 && avgVal.avg_rainfall < 2.5) {
                                    disObj.rainCount++;
                                }
                                console.log(disObj);
                            }
                            
                            var levelOfConf = 0;
                            if(disObj.atmTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.relHumCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.soilTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.rainCount == 3) {
                                levelOfConf += 20;
                            }
                            
                            if(levelOfConf >= 20) {
                                dailyDiseaseMap.set(diseaseArr[j], levelOfConf);
                                var diseaseString = diseaseArr[j] + ' ' + levelOfConf + '%';
                                agroDisData.push({disease: diseaseString, disParams: [tempRange, relativeHumidity, soilTempRange, rainVal]});
                            }
                        }
                    }
                     
                }
            }
            
            
        }
    }
}
else if(cropName == "muskmelon") {
    for(const [crop, value] of Object.entries(muskMelonCalenderArr)) {
        if(crop == cropName) {
            for(let i = 0; i < value.length; i++) {
                var phaseName = value[i].name;
                if(responseArr.includes(phaseName) && responseArr.length > 0) {
                    var diseaseArr = value[i].diseases;
    
                    for(var j = 0; j < diseaseArr.length; j++) {
                        // checking if we have already iterate for a particular disease using --> set.has(disease)
                        if(muskMelonDiseaseMap.has(diseaseArr[j]) && !diseaseSet.has(diseaseArr[j])) {
                            
                            // adding disease to set 
                            diseaseSet.add(diseaseArr[j]);
                            
                            var tempRange = muskMelonDiseaseMap.get(diseaseArr[j])[1].temp_range;
                            var relativeHumidity = muskMelonDiseaseMap.get(diseaseArr[j])[2].relative_humidity;
                            var soilTempRange = muskMelonDiseaseMap.get(diseaseArr[j])[3].soil_temp_range;
                            var rainVal = muskMelonDiseaseMap.get(diseaseArr[j])[4].rainfall;
                            
                            console.log(diseaseArr[j], tempRange, relativeHumidity, soilTempRange, rainVal);
                            
                            
                            var disObj = {atmTempCount: 0, soilTempCount : 0, relHumCount : 0, rainCount : 0}
                            for(const [day, avgVal] of Object.entries(averageVal)) { 
                                if(tempRange[0] <= avgVal.avg_atmospheric_temp && tempRange[1] >= avgVal.avg_atmospheric_temp) {
                                    disObj.atmTempCount++;
                                }
                                
                                if(soilTempRange[0] <= avgVal.avg_soil_temp && soilTempRange[1] >= avgVal.avg_soil_temp) {
                                    disObj.soilTempCount++;
                                }
                                
                                if(relativeHumidity[0] <= avgVal.avg_humidity && relativeHumidity[1] >= avgVal.avg_humidity ) 
                                {
                                    disObj.relHumCount++;
                                }
                                
                                if(rainVal != -1 && rainVal == 1 && avgVal.avg_rainfall > 2.5) {
                                    disObj.rainCount++;
                                }
                                else if(rainVal != -1 && rainVal == 0 && avgVal.avg_rainfall < 2.5) {
                                    disObj.rainCount++;
                                }
                                console.log(disObj);
                            }
                            
                            var levelOfConf = 0;
                            if(disObj.atmTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.relHumCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.soilTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.rainCount == 3) {
                                levelOfConf += 20;
                            }
                            
                            if(levelOfConf >= 20) {
                                dailyDiseaseMap.set(diseaseArr[j], levelOfConf);
                                var diseaseString = diseaseArr[j] + ' ' + levelOfConf + '%';
                                agroDisData.push({disease: diseaseString, disParams: [tempRange, relativeHumidity, soilTempRange, rainVal]});
                            }
                        }
                    }
                     
                }
            }
            
            
        }
    }
}
else if(cropName == "cotton") {
    for(const [crop, value] of Object.entries(cottonCalenderArr)) {
        if(crop == cropName) {
            for(let i = 0; i < value.length; i++) {
                var phaseName = value[i].name;
                if(responseArr.includes(phaseName) && responseArr.length > 0) {
                    var diseaseArr = value[i].diseases;
    
                    for(var j = 0; j < diseaseArr.length; j++) {
                        // checking if we have already iterate for a particular disease using --> set.has(disease)
                        if(cottonDiseaseMap.has(diseaseArr[j]) && !diseaseSet.has(diseaseArr[j])) {
                            
                            // adding disease to set 
                            diseaseSet.add(diseaseArr[j]);
                            
                            var tempRange = cottonDiseaseMap.get(diseaseArr[j])[1].temp_range;
                            var relativeHumidity = cottonDiseaseMap.get(diseaseArr[j])[2].relative_humidity;
                            var soilTempRange = cottonDiseaseMap.get(diseaseArr[j])[3].soil_temp_range;
                            var rainVal = cottonDiseaseMap.get(diseaseArr[j])[4].rainfall;
                            
                            console.log(diseaseArr[j], tempRange, relativeHumidity, soilTempRange, rainVal);
                            
                            
                            var disObj = {atmTempCount: 0, soilTempCount : 0, relHumCount : 0, rainCount : 0}
                            for(const [day, avgVal] of Object.entries(averageVal)) { 
                                if(tempRange[0] <= avgVal.avg_atmospheric_temp && tempRange[1] >= avgVal.avg_atmospheric_temp) {
                                    disObj.atmTempCount++;
                                }
                                
                                if(soilTempRange[0] <= avgVal.avg_soil_temp && soilTempRange[1] >= avgVal.avg_soil_temp) {
                                    disObj.soilTempCount++;
                                }
                                
                                if(relativeHumidity[0] <= avgVal.avg_humidity && relativeHumidity[1] >= avgVal.avg_humidity ) 
                                {
                                    disObj.relHumCount++;
                                }
                                
                                if(rainVal != -1 && rainVal == 1 && avgVal.avg_rainfall > 2.5) {
                                    disObj.rainCount++;
                                }
                                else if(rainVal != -1 && rainVal == 0 && avgVal.avg_rainfall < 2.5) {
                                    disObj.rainCount++;
                                }
                                console.log(disObj);
                            }
                            
                            var levelOfConf = 0;
                            if(disObj.atmTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.relHumCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.soilTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.rainCount == 3) {
                                levelOfConf += 20;
                            }
                            
                            if(levelOfConf >= 20) {
                                dailyDiseaseMap.set(diseaseArr[j], levelOfConf);
                                var diseaseString = diseaseArr[j] + ' ' + levelOfConf + '%';
                                agroDisData.push({disease: diseaseString, disParams: [tempRange, relativeHumidity, soilTempRange, rainVal]});
                            }
                        }
                    }
                     
                }
            }
            
            
        }
    }
}
else if(cropName == "grape") {
    for(const [crop, value] of Object.entries(grapeCalenderArr)) {
        if(crop == cropName) {
            for(let i = 0; i < value.length; i++) {
                var phaseName = value[i].name;
                if(responseArr.includes(phaseName) && responseArr.length > 0) {
                    var diseaseArr = value[i].diseases;
    
                    for(var j = 0; j < diseaseArr.length; j++) {
                        // checking if we have already iterate for a particular disease using --> set.has(disease)
                        if(grapeDiseaseMap.has(diseaseArr[j]) && !diseaseSet.has(diseaseArr[j])) {
                            
                            // adding disease to set 
                            diseaseSet.add(diseaseArr[j]);
                            
                            var tempRange = grapeDiseaseMap.get(diseaseArr[j])[1].temp_range;
                            var relativeHumidity = grapeDiseaseMap.get(diseaseArr[j])[2].relative_humidity;
                            var soilTempRange = grapeDiseaseMap.get(diseaseArr[j])[3].soil_temp_range;
                            var rainVal = grapeDiseaseMap.get(diseaseArr[j])[4].rainfall;
                            
                            console.log(diseaseArr[j], tempRange, relativeHumidity, soilTempRange, rainVal);
                            
                            
                            var disObj = {atmTempCount: 0, soilTempCount : 0, relHumCount : 0, rainCount : 0}
                            for(const [day, avgVal] of Object.entries(averageVal)) { 
                                if(tempRange[0] <= avgVal.avg_atmospheric_temp && tempRange[1] >= avgVal.avg_atmospheric_temp) {
                                    disObj.atmTempCount++;
                                }
                                
                                if(soilTempRange[0] <= avgVal.avg_soil_temp && soilTempRange[1] >= avgVal.avg_soil_temp) {
                                    disObj.soilTempCount++;
                                }
                                
                                if(relativeHumidity[0] <= avgVal.avg_humidity && relativeHumidity[1] >= avgVal.avg_humidity ) 
                                {
                                    disObj.relHumCount++;
                                }
                                
                                if(rainVal != -1 && rainVal == 1 && avgVal.avg_rainfall > 2.5) {
                                    disObj.rainCount++;
                                }
                                else if(rainVal != -1 && rainVal == 0 && avgVal.avg_rainfall < 2.5) {
                                    disObj.rainCount++;
                                }
                                console.log(disObj);
                            }
                            
                            var levelOfConf = 0;
                            if(disObj.atmTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.relHumCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.soilTempCount == 3) {
                                levelOfConf += 20;
                            }
                            if(disObj.rainCount == 3) {
                                levelOfConf += 20;
                            }
                            
                            if(levelOfConf >= 20) {
                                dailyDiseaseMap.set(diseaseArr[j], levelOfConf);
                                var diseaseString = diseaseArr[j] + ' ' + levelOfConf + '%';
                                agroDisData.push({disease: diseaseString, disParams: [tempRange, relativeHumidity, soilTempRange, rainVal]});
                            }
                        }
                    }
                     
                }
            }
            
            
        }
    }
}
        
    
    // finding out the daily occuring disease for duration of days
    let ansArr = [];
    console.log(dailyDiseaseMap, "this is daily disease map");
    if(dailyDiseaseMap.size > 0) {
        for (const [key, value] of dailyDiseaseMap) {
            var tempKey = capitalizeFirstLetter(key);
            var tempArr = tempKey.split("_");
            var tempKeyString = "";
            for(var i = 0; i < tempArr.length; i++) {
                if(i != tempArr.length - 1)
                    tempKeyString += tempArr[i] + ' ';
                else
                    tempKeyString += tempArr[i];
                
            }
            // console.log(tempKeyString);
            ansArr.push({"disease":tempKeyString,"percentage": value});
        }
    }
        
    console.log(ansArr + 'Hey i am answer array'); 
    let ndviResponseData
    if(eventObj.notificationData.crop_type==="ST")
    ndviResponseData = {"total_pixel":0, "below_range":0,"above_range":0,"between_range":0, "avg_ndvi": 0,"ndvi_threshold": ndviThreshold, "week": finalWeek , "crop_name": eventObj.notificationData.crop_name};
    else
    ndviResponseData = {"total_pixel":0, "below_range":0,"above_range":0,"between_range":0, "avg_ndvi": 0,"ndvi_threshold": ndviThreshold, "month": finalMonth , "crop_name": eventObj.notificationData.crop_name};
    let below_range = 0;
    let above_range = 0;
    let between_range = 0;
    let total_pixel = 0;
    let avg_ndvi = 0;
    
    let NDVIdata = [];
    
    
    var dateOfNDVI = new Date().toISOString().slice(0, 10);
    await axios.get(`https://4cs5gari41.execute-api.us-west-2.amazonaws.com/v1/realtime?farmID=${eventObj.notificationData.farm_id}&farmName=${eventObj.notificationData.farm_name}&date=${dateOfNDVI}`)
      .then(function (response) {
         console.log(response);
        NDVIdata = response.data.ndvi;
        console.log(response.data.ndvi, " This is data from Ashutosh");
      })
      .catch(function (error) {
        console.log(error, 'Error in GeoJSON API try again after sometime.');
        if(error)
            NDVIdata = null;
        // return response.json({success: false, message: 'Error in GeoJSON API try again after sometime.'});
      });
    
    if(NDVIdata != null) {
        for(let ind = 0; ind < NDVIdata.length; ind++) {
            if(parseFloat(NDVIdata[ind][2]) >= -1 && parseFloat(NDVIdata[ind][2]) <= 1 && parseFloat(NDVIdata[ind][2]) < ndviThreshold[0]) {
                below_range++;
                total_pixel++;
                avg_ndvi += parseFloat(NDVIdata[ind][2]);
            }
            else if(parseFloat(NDVIdata[ind][2]) >= -1 && parseFloat(NDVIdata[ind][2]) <= 1 && parseFloat(NDVIdata[ind][2]) > ndviThreshold[1]){
                above_range++;
                total_pixel++;
                avg_ndvi += parseFloat(NDVIdata[ind][2]);
            }
            else if(parseFloat(NDVIdata[ind][2]) >= -1 && parseFloat(NDVIdata[ind][2]) <= 1 && parseFloat(NDVIdata[ind][2]) > ndviThreshold[0] && parseFloat(NDVIdata[ind][2]) < ndviThreshold[1]) {
                total_pixel++;
                between_range++;
                avg_ndvi += parseFloat(NDVIdata[ind][2]);
            }
        }
        
        if(total_pixel != 0) {
            ndviResponseData.avg_ndvi = avg_ndvi/total_pixel;
            ndviResponseData.total_pixel = total_pixel;
        }
        
        ndviResponseData.above_range = above_range;
        ndviResponseData.below_range = below_range;
        ndviResponseData.between_range = between_range;
    }
    
    

    //forming the disease string for the message
    let disease_string = '';
    for(let i = 0; i < ansArr.length; i++) {
        console.log(ansArr[i]);
        var tempArr = ansArr[i].disease.split("_");
        var tempString = '';
        for(let j = 0; j < tempArr.length; j++) {
            if(j == 0) {
                tempString += capitalizeFirstLetter(tempArr[0]);
            }
            else 
                tempString += tempArr[j];
            
            tempString += ' ';
        }
        if( i != ansArr.length - 1)
            disease_string = disease_string + tempString + ' ' + ansArr[i].percentage + '%' + ', ';
        else
            disease_string = disease_string + tempString + ' ' + ansArr[i].percentage + '%';
        
        console.log(disease_string);
    }
    
    console.log(disease_string);
    console.log(ndviResponseData);
    
    
    responseObj.ndviResponseData = ndviResponseData;
    responseObj.disease_string = disease_string;
    responseObj.disArray = ansArr;
    responseObj.agroTableDisData = agroDisData;
    responseObj.ndvi = ndviThreshold;
    responseObj.avgData = [averageVal[0].avg_atmospheric_temp, averageVal[0].avg_humidity, averageVal[0].avg_soil_temp, averageVal[0].avg_rainfall];
    
    console.log(responseObj);
    
    const response = {
        statusCode: 200,
        body: {statusCode: 200, data: responseObj},
    };
    return response;
};