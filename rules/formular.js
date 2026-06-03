export function calculateDepression(dry, wet) {
    const dryNum = parseFloat(dry);
    const wetNum = parseFloat(wet);
    
    if (isNaN(dryNum) || isNaN(wetNum)) return 0;
    
    return dryNum - wetNum;
}

export function calculateAdjustedDepression(dry, wet) {
    const dryNum = parseFloat(dry);
    const wetNum = parseFloat(wet);
    
    if (isNaN(dryNum) || isNaN(wetNum)) return 0;
    
    const depression = dryNum - wetNum;
    
    const adjusted = (depression * 850) / 1000;
    
    return adjusted;
}

export function calculateVapourPressure(wet, adjustedDepression) {
    const wetNum = parseFloat(wet);
    const adjDepNum = parseFloat(adjustedDepression);
    
    if (isNaN(wetNum) || isNaN(adjDepNum)) return 0;
    
    const H5 = 273 + wetNum;
    
    const numerator = wetNum * 2500000;
    const denominator = 273 * 466.8 * H5;
    const J5 = 6.11 * Math.exp(numerator / denominator);
    
    const vapourPressure = J5 - ((7.99 / 10000) * 1010 * adjDepNum);
    
    return vapourPressure;
}

export function validateFlatData(flatData) {
    const requiredKeys = [
        'date', 
        'time_utc', 
        'temp_dry', 
        'temp_wet',
        'pressure', 
        'wind_dir', 
        'wind_speed',
        'altitude_msl',

    ];
    
    const missingFields = [];

    requiredKeys.forEach(key => {
        const value = flatData[key];
        
        if (value === undefined || value === null || String(value).trim() === '' || value === '—') {
            const humanReadableName = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            missingFields.push(humanReadableName);
        }
    });

    return {
        isValid: missingFields.length === 0,
        missingFields: missingFields
    };
}