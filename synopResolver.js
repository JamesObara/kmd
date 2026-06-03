import { mslLookupTable } from "./rules/decodeWeatherCode.js";
import { windDirectionLookup } from "./rules/decodeWeatherCode.js";
import { calculateAdjustedDepression, calculateVapourPressure, calculateDepression } from "./rules/formular.js";

function encodeH(ft) {
    if (ft < 165)   return '0';
    if (ft < 330)   return '1';
    if (ft < 660)   return '2';
    if (ft < 1000)  return '3';
    if (ft < 1650)  return '4';
    if (ft < 3300)  return '5';
    if (ft < 6600)  return '6';
    if (ft < 16500) return '7';
    if (ft < 33000) return '8';
    return '9';
}

function encodeVV(km) {
    if (km < 0.1)  return '00';
    if (km < 0.5)  return String(Math.round(km * 10)).padStart(2, '0');
    if (km <= 5)   return String(Math.round(km) + 50).padStart(2, '0');
    if (km <= 30)  return String(Math.round(km / 5) + 74).padStart(2, '0');
    if (km <= 70)  return String(Math.round(km / 10) + 80).padStart(2, '0');
    return '89';
}

function encodePressure(hpa) {
    return String(Math.round(hpa * 10) % 10000).padStart(4, '0');
}

function encodeTempGroup(tempC) {
    return String(Math.round(Math.abs(tempC) * 10)).padStart(3, '0');
}

const getCloudSymbol = (cloudField) => {
    if (!cloudField || cloudField === '—' || cloudField.trim() === '') return '—';
    const prefixPart = cloudField.split(' - ')[0].trim();
    const tokens = prefixPart.split(/\s+/);
    return tokens[0] ? tokens[0].trim() : '—';
};

const getCloudCode = (cloudField) => {
    if (!cloudField || cloudField === '—' || cloudField.trim() === '') return '';
    const prefixPart = cloudField.split(' - ')[0].trim();
    const tokens = prefixPart.split(/\s+/);
    return tokens[1] ? tokens[1].trim() : '';
};

const hasRainData = (o) => o.rainfall_amount !== undefined && o.rainfall_amount !== '' && o.rainfall_amount !== '—';
const hasWeatherData = (o) => (o.present_weather && o.present_weather !== '—') || (o.past_weather && o.past_weather !== '—');

const isMainSynopticHour = (timeStr) => {
    if (!timeStr || timeStr === '—') return false;
    return ['00:00', '06:00', '12:00', '18:00'].includes(timeStr.trim());
};

function calculateDdCode(o) {
    const speed = o.wind_speed ? parseFloat(o.wind_speed) : 0;
    const direction = o.wind_dir ? parseFloat(o.wind_dir) : 0;

    if (speed < 2) {
        return '00';
    }

    let roundedDir = Math.round(direction / 10) * 10;

    if (roundedDir > 360 || roundedDir <= 0) {
        roundedDir = 360;
    }

    const ddCode = roundedDir / 10;
    return String(ddCode).padStart(2, '0');
}

function getWindMappings(ddInput) {
    const formattedDd = String(ddInput).padStart(2, '0');
    const match = windDirectionLookup.find(row => row.dd === formattedDd);
    
    return match ? match : { dd: formattedDd, DD: '—', D: '—' };
}

const resolvers = {

    'date_day_number':  (d) => {
        if (!d.date) return '—';

        const dateObj = new Date(`${d.date}T${d.time_utc || '00:00'}:00Z`);
        return isNaN(dateObj.getTime()) ? '—' : dateObj.getUTCDate();
    },
    'date_day_name':    (d) => {
        if (!d.date) return '—';

        const dateObj = new Date(`${d.date}T${d.time_utc || '00:00'}:00Z`);
        return isNaN(dateObj.getTime()) ? '—' : dateObj.toLocaleDateString('en', { weekday: 'long', timeZone: 'UTC' });
    },
    'date_month':       (d) => {
        if (!d.date) return '—';

        const dateObj = new Date(`${d.date}T${d.time_utc || '00:00'}:00Z`);
        return isNaN(dateObj.getTime()) ? '—' : dateObj.toLocaleDateString('en', { month: 'long', timeZone: 'UTC' });
    },
    'date_year':        (d) => {
        if (!d.date) return '—';

        const dateObj = new Date(`${d.date}T${d.time_utc || '00:00'}:00Z`);
        return isNaN(dateObj.getTime()) ? '—' : String(dateObj.getUTCFullYear()).slice(-2);
    },

    'obs_cloud_height':     (d) => {
        const hasCloudLayer = (field) => {
            return field && field !== '—' && field.trim() !== '' && !field.toLowerCase().includes('no cloud');
        };

        if (hasCloudLayer(d.obs_low_cloud_type)) {
            if (!d.temp_dry || d.temp_dry.trim() === '') return '—';

            const rawTemp = parseFloat(d.temp_dry);
            const roundedTemp = Math.round(rawTemp);
            
            const symbol = getCloudSymbol(d.obs_low_cloud_type);

            let calculatedHeight = 0;

            if (symbol === 'Cb') {
                calculatedHeight = roundedTemp * 100;
            } 
            else if (symbol === 'St') {
                calculatedHeight = (roundedTemp / 2) * 100;
            } 
            else {
                calculatedHeight = (roundedTemp + 1) * 100;
            }

            return `${Math.round(calculatedHeight)}'`;
        }
        else if (hasCloudLayer(d.obs_medium_cloud_type)) {
            return "8000'";
        } 
        else if (hasCloudLayer(d.obs_high_cloud_type)) {
            return "25000'";
        }

        return '—';

    },
    'obs_visibility':       (d) => {
        if (!d.visibility || d.visibility === '—' || d.visibility.trim() === '' || d.visibility === '-') {
            console.log("Visibility is empty or placeholder, skipping calculation.");
            return '—';
        }

        const parts = d.visibility.split(' - ');
        if (!parts[1]) {
            return '—';
        }

        const rawDistance = parseFloat(parts[1]);
        const wholeKm = Math.floor(rawDistance);
        
        return `${wholeKm} Km`;

    },
    'obs_cloud_amount':     (d) => {
        if (!d.cloud_amount || d.cloud_amount === '—') return '—';

        const oktaNumber = d.cloud_amount.trim().charAt(0);
        return `${oktaNumber}/8`;
    },
    'obs_wind_direction':   (d) => {
        const speed = d.wind_speed ? parseFloat(d.wind_speed) : 0;
        const direction = d.wind_dir ? parseFloat(d.wind_dir) : 0;

        if (speed < 2) {
            return "000°";
        }

        let roundedDir = Math.round(direction / 10) * 10;

        if (roundedDir > 360) roundedDir = 360;
        if (roundedDir <= 0) roundedDir = 360; 

        return `${String(roundedDir).padStart(3, '0')}°`;
    },
    'obs_wind_speed':       (d) => {
        if (!d.wind_speed || d.wind_speed.trim() === '') return '—';

        const speed = parseFloat(d.wind_speed);

        const roundedSpeed = Math.round(speed);

        return `${roundedSpeed} kts`;
    },
    'obs_temp_sign':        (d) => {
        if (!d.temp_dry || d.temp_dry.trim() === '') return '—';
        
        const temp = parseFloat(d.temp_dry);

        return temp >= 0 ? '+' : '-';
    },
    'obs_temperature':      (d) => {
        if (!d.temp_dry || d.temp_dry.trim() === '') return '—';
        
        const temp = parseFloat(d.temp_dry);

        return Math.abs(temp).toFixed(1);
    },
    'obs_dewpoint_sign':    (d) => {
        if (!d.temp_dew || d.temp_dew.trim() === '') return '—';
        
        const dewpoint = parseFloat(d.temp_dew);

        return dewpoint >= 0 ? '+' : '-';
    },
    'obs_dewpoint':         (d) => {
        if (!d.temp_dew || d.temp_dew.trim() === '') return '—';
        
        const dewpoint = parseFloat(d.temp_dew);

        return Math.abs(dewpoint).toFixed(1);

    },
    'obs_station_pressure': (d) => {
        if (!d.pressure || d.pressure.trim() === '') return '—';
        
        const stationPressure = parseFloat(d.pressure);

        return stationPressure.toFixed(1);
    },
    'obs_msl_pressure':     (d) => {
        if (!d.temp_dry || !d.pressure) return '—';

        const rawTemp = parseFloat(d.temp_dry);
        const roundedTemp = Math.round(rawTemp);

        const rawPressure = parseFloat(d.pressure);
        const intPressure = Math.floor(rawPressure);

        const decimalDigitStr = String(rawPressure).includes('.') ? String(rawPressure).split('.')[1].charAt(0) : '0';
        const decimalAsInteger = parseInt(decimalDigitStr, 10);

        if (roundedTemp < 5 || roundedTemp > 30) return '';
        if (intPressure < 811 || intPressure > 830) return '';

        const columnIndex = intPressure - 811;
        const baseMslValue = mslLookupTable[roundedTemp][columnIndex];

        const finalizedMsl = 1000 + baseMslValue + decimalAsInteger;

        return String(finalizedMsl);
    },
    'obs_rainfall_amount':  (o) => {
        if (!o.time_utc || o.time_utc === '—' || !o.rainfall_amount || o.rainfall_amount === '—') {
            return '';
        }

        const rainNum = parseFloat(o.rainfall_amount);

        if (isNaN(rainNum)) return '';

        const cylinderThreshold = 0.1;

        if (rainNum >= 0 && rainNum < cylinderThreshold) {
            return 'Trace';
        }

        return o.rainfall_amount;

    },
    'obs_rainfall_period':  (o) => {
        if (!o.time_utc || o.time_utc === '—' || !o.rainfall_amount || o.rainfall_amount === '—') return '';
        
        const time = o.time_utc.trim();

        if (time === '06:00') return '24';
        if (time === '18:00') return '12';
        if (time === '00:00') return '6';
        if (time === '12:00') return '6';

        return '';
    },
    'obs_present_weather':  (o) => {},
    'obs_past_weather':     (o) => {},
    'obs_low_cloud_amount': (d) => {
        if (!d.obs_low_cloud_type || d.obs_low_cloud_type === '—') return '—';
        
        return (d.low_cloud_amount && d.low_cloud_amount !== '—') ? d.low_cloud_amount : '—';
    },
    'obs_low_cloud_type':   (d) => {
       return getCloudSymbol(d.obs_low_cloud_type);
    },
    'obs_medium_cloud_type':(d) => {
        return getCloudSymbol(d.obs_medium_cloud_type);
    },
    'obs_high_cloud_type':  (d) => {
       return getCloudSymbol(d.obs_high_cloud_type);
    },
    'obs_wetbulb':          (d) => {
        if (!d.temp_wet || d.temp_wet.trim() === '' || d.temp_wet === '—') return '';
        
        const wetBulbTemp = parseFloat(d.temp_wet);
        
        return wetBulbTemp.toFixed(1);

    },

    'synop_YY': (o) => {
        if (!o.date || o.date === '—') return '—';
        
        const dateParts = o.date.split('-');
        const day = dateParts[2]; 
        
        return day; 
    },
    'synop_GG':         (o) => {
        if (!o.time_utc || o.time_utc === '—') return '—'; 
    
        const timeParts = o.time_utc.split(':');
        const hour = timeParts[0]; 
        
        return hour;
    },
    'synop_iw':         (o) => {
        const isAutomated = false; 
        const isMeasured = true;         
        
        if (isAutomated) {
            return isMeasured ? '8' : '7';
        } else {
            return isMeasured ? '4' : '3'; 
        }
    },
    'synop_iii':        (o) => {
        return '741';
    },
    'synop_iR':         (o) => {
        const isMain = isMainSynopticHour(o.time_utc);
        const hasRain = hasRainData(o);

        if (isMain) {
            if (hasRain) return '1';     
            return '3';
        } else {
            if (hasRain) return '1';      
            return '4'; 
        }
    },
    'synop_iX':         (o) => {
        const hasWeather = hasWeatherData(o);

        if (hasWeather) {
            return '1'; 
        } else {
            return '2'; 
        }
    },
    'synop_h':          (o) => {
        const hasCloudLayer = (field) => {
            return field && field !== '—' && field.trim() !== '' && !field.toLowerCase().includes('no cloud');
        };

        if (!hasCloudLayer(o.obs_low_cloud_type)) {
            return '9'; 
        }

        if (!o.temp_dry || o.temp_dry.trim() === '') return '/';

        const rawTemp = parseFloat(o.temp_dry);
        const roundedTemp = Math.round(rawTemp);
        const symbol = getCloudSymbol(o.obs_low_cloud_type);

        let calculatedHeight = 0;
        if (symbol === 'Cb') {
            calculatedHeight = roundedTemp * 100;
        } else if (symbol === 'St') {
            calculatedHeight = (roundedTemp / 2) * 100;
        } else {
            calculatedHeight = (roundedTemp + 1) * 100;
        }

        const heightInFeet = Math.round(calculatedHeight);

        if (heightInFeet >= 0 && heightInFeet <= 149) return '0';
        if (heightInFeet >= 150 && heightInFeet <= 299) return '1';
        if (heightInFeet >= 300 && heightInFeet <= 599) return '2';
        if (heightInFeet >= 600 && heightInFeet <= 999) return '3';
        if (heightInFeet >= 1000 && heightInFeet <= 1999) return '4';
        if (heightInFeet >= 2000 && heightInFeet <= 2999) return '5';
        if (heightInFeet >= 3000 && heightInFeet <= 4999) return '6';
        if (heightInFeet >= 5000 && heightInFeet <= 6499) return '7';
        if (heightInFeet >= 6500 && heightInFeet <= 7999) return '8';
        if (heightInFeet >= 8000) return '9';

        return '/';
    },
    'synop_VV':         (o) => {
        if (!o.visibility || o.visibility === '—' || o.visibility.trim() === '' || o.visibility === '-') {
            return '—'; 
        }

        const parts = o.visibility.split(' - ');
        
        const codeFigure = parts[0].trim();

        return codeFigure ? codeFigure : '—';
    },
    'synop_N':          (o) => {
        if (!o.cloud_amount || o.cloud_amount === '—') return '—';

        const oktaNumber = o.cloud_amount.trim().charAt(0);
        return `${oktaNumber}`;
    },
    'synop_dd':         (o) => {
        return calculateDdCode(o);
    },
    'synop_ff':         (o) => {
        if (!o.wind_speed || o.wind_speed.trim() === '') {
            return '00';
        }

        const speed = parseFloat(o.wind_speed);
        const roundedSpeed = Math.round(speed);

        return String(roundedSpeed).padStart(2, '0');
    },
    'synop_Sn_temp':    (o) => {
        if (!o.temp_dry || o.temp_dry.trim() === '' || o.temp_dry === '—') return '—';
        
        const temp = parseFloat(o.temp_dry);
        
        return temp >= 0 ? '0' : '1';
    },
    'synop_TTT':        (o) => {
        if (!o.temp_dry || o.temp_dry.trim() === '' || o.temp_dry === '—') return '——';
        
        const temp = parseFloat(o.temp_dry);
        
        const tempTenths = Math.round(Math.abs(temp) * 10);
        
        return String(tempTenths).padStart(3, '0');
    },
    'synop_Sn_dewpoint':(o) => {
        if (!o.temp_dew || o.temp_dew.trim() === '' || o.temp_dew === '—') return '—';
        
        const dewpoint = parseFloat(o.temp_dew);
        
        return dewpoint >= 0 ? '0' : '1';
    },
    'synop_TdTdTd':     (o) => {
        if (!o.temp_dew || o.temp_dew.trim() === '' || o.temp_dew === '—') return '——';
        
        const dewpoint = parseFloat(o.temp_dew);
        
        const dewpointTenths = Math.round(Math.abs(dewpoint) * 10);
        
        return String(dewpointTenths).padStart(3, '0');
    },
    'synop_PoPoPoP':    (o) => {
        if (!o.pressure || o.pressure.trim() === '' || o.pressure === '—') return '—';
        
        const stationPressure = parseFloat(o.pressure);
        
        const pressureWithoutDecimal = Math.round(stationPressure * 10);
        
        return String(pressureWithoutDecimal);
        
    },
    'synop_PPPP':       (o) => {
        const mslValue = resolvers['obs_msl_pressure'](o);
        
        if (!mslValue || mslValue === '—' || mslValue === '') return '—';

        const modifiedMsl = '8' + mslValue.slice(1);
        
        return modifiedMsl;
    },
    'synop_RRR':        (o) => {
        const amount = resolvers['obs_rainfall_amount'](o);

        if (amount === '' || amount === '—') return '///';

        if (amount === 'Trace') {
            return '990';
        }

        const rainNum = parseFloat(amount);
        if (isNaN(rainNum)) return '///';

        if (rainNum === 0) {
            return '990';
        }

        if (rainNum >= 0.1 && rainNum <= 0.9) {
            const tenthsCode = Math.round(rainNum * 10) + 990;
            return String(tenthsCode);
        }

        const wholeMm = Math.round(rainNum);
        return String(wholeMm).padStart(3, '0');
    },
    'synop_tR':         (o) => {
        if (!o.time_utc || o.time_utc === '—' || !o.rainfall_amount || o.rainfall_amount === '—') return '';
        
        const time = o.time_utc.trim();

        if (time === '06:00') return '4'; 
        if (time === '18:00') return '2'; 
        if (time === '00:00') return '1'; 
        if (time === '12:00') return '1'; 

        return '';
    },
    'synop_WW':         (o) => {
        if (!o.present_weather || o.present_weather === '—' || o.present_weather.trim() === '') {
            return ''; 
        }

        const match = o.present_weather.match(/^\d+/);
        
        return match ? match[0].padStart(2, '0') : '';
    },
    'synop_W1W2':       (o) => {
        if (!o.past_weather || o.past_weather === '—' || o.past_weather.trim() === '') {
            return ''; 
        }

        const match = o.past_weather.match(/^\d+/);
        
        return match ? match[0].padStart(2, '0') : '';
    },
    'synop_Nh':         (d) => {
        if (!d.obs_low_cloud_type || d.obs_low_cloud_type === '—') return '—';
        
        return (d.low_cloud_amount && d.low_cloud_amount !== '—') ? d.low_cloud_amount : '—';
    },
    'synop_CL':         (o) => {
        const code = getCloudCode(o.obs_low_cloud_type);
        
        return code !== '' ? code : '0';
    },
    'synop_CM':         (o) => {
        const code = getCloudCode(o.obs_medium_cloud_type);
        if (code !== '') return code;

        const nh = parseInt(o.low_cloud_amount, 10);
        if (!isNaN(nh) && nh >= 6) {
            return '/';
        }

        return '0';
    },
    'synop_CH':         (o) => {
        const code = getCloudCode(o.obs_high_cloud_type);
        if (code !== '') return code;

        const nh = parseInt(o.low_cloud_amount, 10);
        if (!isNaN(nh) && nh >= 6) {
            return '/';
        }

        return '0';
    },

    's333_max_temp_sign': (d) => {
        if (!d.temp_max || d.temp_max === '—' || d.temp_max.trim() === '') return '—';

        const temp = parseFloat(d.temp_max);

        return temp >= 0 ? '+' : '-';
        
    },
    's333_max_temp':      (d) => {
        if (!d.temp_max || d.temp_max === '—' || d.temp_max.trim() === '') return '—';
        const temp = parseFloat(d.temp_max);
        return Math.abs(temp).toFixed(1);
    },
    's333_min_temp_sign': (d) => {
        if (!d.temp_min || d.temp_min === '—' || d.temp_min.trim() === '') return '—';
        const temp = parseFloat(d.temp_min);
        return temp >= 0 ? '+' : '-';
    },
    's333_min_temp':      (d) => {
        if (!d.temp_min || d.temp_min === '—' || d.temp_min.trim() === '') return '—';
        const temp = parseFloat(d.temp_min);
        return Math.abs(temp).toFixed(1);
    },
    's333_tendency_sign': (d) => {
        if (!d.pressure || d.pressure === '—' || !d.pressure_yesterday || d.pressure_yesterday === '—') {
            return '—';
        }

        const currentPressure = parseFloat(d.pressure);
        const pastPressure = parseFloat(d.pressure_yesterday);
        
        const change = currentPressure - pastPressure;

        return change >= 0 ? '+' : '-';
    },
    's333_tendency_24h':  (d) => {
        if (!d.pressure || d.pressure === '—' || !d.pressure_yesterday || d.pressure_yesterday === '—') {
            return '—';
        }

        const currentPressure = parseFloat(d.pressure);
        const pastPressure = parseFloat(d.pressure_yesterday);
        
        const change = currentPressure - pastPressure;

        return Math.abs(change).toFixed(1);
    },
    's333_Sn_max':        (o) => {
        if (!o.temp_max || o.temp_max.trim() === '' || o.temp_max === '—') return '';
        
        const temp = parseFloat(o.temp_max);
        
        return temp >= 0 ? '0' : '1';
    
    },
    's333_TxTxTx':        (o) => {
        if (!o.temp_max || o.temp_max.trim() === '' || o.temp_max === '—') return '';
        
        const temp = parseFloat(o.temp_max);
        
        const tempTenths = Math.round(Math.abs(temp) * 10);
        
        return String(tempTenths).padStart(3, '0');
    },
    's333_Sn_min':        (o) => {
        if (!o.temp_min || o.temp_min.trim() === '' || o.temp_min === '—') return '';
        
        const temp = parseFloat(o.temp_min);
        
        return temp >= 0 ? '0' : '1';
    },
    's333_TnTnTn':        (o) => {
        if (!o.temp_min || o.temp_min.trim() === '' || o.temp_min === '—') return '';
        
        const temp = parseFloat(o.temp_min);
        
        const tempTenths = Math.round(Math.abs(temp) * 10);
        
        return String(tempTenths).padStart(3, '0');
    },
    's333_a9':            (o) => {
        if (!o.pressure || o.pressure === '—' || !o.pressure_yesterday || o.pressure_yesterday === '—') {
            return '';
        }

        const currentPressure = parseFloat(o.pressure);
        const pastPressure = parseFloat(o.pressure_yesterday);
        const change = currentPressure - pastPressure;

        return change >= 0 ? '8' : '9';
    },
    's333_P24P24P24':     (o) => {
        if (!o.pressure || o.pressure === '—' || !o.pressure_yesterday || o.pressure_yesterday === '—') {
            return '';
        }

        const currentPressure = parseFloat(o.pressure);
        const pastPressure = parseFloat(o.pressure_yesterday);
        const change = currentPressure - pastPressure;

        const changeTenths = Math.round(Math.abs(change) * 10);

        return String(changeTenths).padStart(3, '0');
        
    },

    's333_vp': (o) => {
        if (!o.temp_dry || o.temp_dry === '—' || o.temp_dry.trim() === '' ||
            !o.temp_wet || o.temp_wet === '—' || o.temp_wet.trim() === '') {
            return '—';
        }

        const adjDepression = calculateAdjustedDepression(o.temp_dry, o.temp_wet);

        const rawVapourPressure = calculateVapourPressure(o.temp_wet, adjDepression);

        if (isNaN(rawVapourPressure)) return '—';

        return rawVapourPressure.toFixed(1);

    },

    'ref_GG':           (o) => {
        if (!o.time_utc || o.time_utc === '—') return '—'; 
    
        const timeParts = o.time_utc.split(':');
        const hour = timeParts[0]; 
        
        return hour;
    },
    'ref_iii':          (o) => {
        return '741';
    },
    'ref_h':            (o) => {
        const hasCloudLayer = (field) => {
            return field && field !== '—' && field.trim() !== '' && !field.toLowerCase().includes('no cloud');
        };

        if (!hasCloudLayer(o.obs_low_cloud_type)) {
            return '9'; 
        }

        if (!o.temp_dry || o.temp_dry.trim() === '') return '/';

        const rawTemp = parseFloat(o.temp_dry);
        const roundedTemp = Math.round(rawTemp);
        const symbol = getCloudSymbol(o.obs_low_cloud_type);

        let calculatedHeight = 0;
        if (symbol === 'Cb') {
            calculatedHeight = roundedTemp * 100;
        } else if (symbol === 'St') {
            calculatedHeight = (roundedTemp / 2) * 100;
        } else {
            calculatedHeight = (roundedTemp + 1) * 100;
        }

        const heightInFeet = Math.round(calculatedHeight);

        if (heightInFeet >= 0 && heightInFeet <= 149) return '0';
        if (heightInFeet >= 150 && heightInFeet <= 299) return '1';
        if (heightInFeet >= 300 && heightInFeet <= 599) return '2';
        if (heightInFeet >= 600 && heightInFeet <= 999) return '3';
        if (heightInFeet >= 1000 && heightInFeet <= 1999) return '4';
        if (heightInFeet >= 2000 && heightInFeet <= 2999) return '5';
        if (heightInFeet >= 3000 && heightInFeet <= 4999) return '6';
        if (heightInFeet >= 5000 && heightInFeet <= 6499) return '7';
        if (heightInFeet >= 6500 && heightInFeet <= 7999) return '8';
        if (heightInFeet >= 8000) return '9';

        return '—';
    },
    'ref_VV':           (o) => {
        if (!o.cloud_amount || o.cloud_amount === '—') return '—';

        const oktaNumber = o.cloud_amount.trim().charAt(0);
        return `${oktaNumber}`;
        
    },
    'ref_dd':           (o) => {
        const speed = o.wind_speed ? parseFloat(o.wind_speed) : 0;
        const direction = o.wind_dir ? parseFloat(o.wind_dir) : 0;

        if (speed < 2) {
            return '00';
        }

        let roundedDir = Math.round(direction / 10) * 10;

        if (roundedDir > 360 || roundedDir <= 0) {
            roundedDir = 360;
        }

        const ddCode = roundedDir / 10;

        return String(ddCode).padStart(2, '0');
    },
    'ref_ff_tens':      (o) => {
        const ddInput = calculateDdCode(o);
        
        if (ddInput === '00') {
            return '00'; 
        }

        const mapping = getWindMappings(ddInput);
        
        return mapping.DD;
    },
    'ref_ff_units':     (o) => {
        const ddInput = calculateDdCode(o);
        
        if (ddInput === '00') {
            return '0'; 
        }

        const mapping = getWindMappings(ddInput);
        
        return mapping.D;
    },
    'ref_fff':          (o) => {
        if (!o.wind_speed || o.wind_speed.trim() === '') {
            return '000';
        }

        const speed = parseFloat(o.wind_speed);
        const roundedSpeed = Math.round(speed);

        return String(roundedSpeed).padStart(3, '0');
    },
    'ref_Sn_temp':      (o) => {
        if (!o.temp_dry || o.temp_dry.trim() === '' || o.temp_dry === '—') return '—';
        
        const temp = parseFloat(o.temp_dry);
        
        return temp >= 0 ? '0' : '1';
    },
    'ref_TTT':          (o) => {
        if (!o.temp_dry || o.temp_dry.trim() === '' || o.temp_dry === '—') return '——';
        
        const temp = parseFloat(o.temp_dry);
        
        const tempTenths = Math.round(Math.abs(temp) * 10);
        
        return String(tempTenths).padStart(3, '0');
    },
    'ref_Sn_dewpoint':  (o) => {
        if (!o.temp_dew || o.temp_dew.trim() === '' || o.temp_dew === '—') return '—';
        
        const dewpoint = parseFloat(o.temp_dew);
        
        return dewpoint >= 0 ? '0' : '1';
    },
    'ref_TdTdTd':       (o) => {
        if (!o.temp_dew || o.temp_dew.trim() === '' || o.temp_dew === '—') return '——';
        
        const dewpoint = parseFloat(o.temp_dew);
        
        const dewpointTenths = Math.round(Math.abs(dewpoint) * 10);
        
        return String(dewpointTenths).padStart(3, '0');
    },
    'ref_PoPoPoP':      (o) => {
        if (!o.pressure || o.pressure.trim() === '' || o.pressure === '—') return '—';
        
        const stationPressure = parseFloat(o.pressure);
        const pressureWithoutDecimal = Math.round(stationPressure * 10);
        
        return String(pressureWithoutDecimal);
    },
    'ref_PPPP':         (o) => {
        const mslValue = resolvers['obs_msl_pressure'](o);
        
        if (!mslValue || mslValue === '—' || mslValue === '') return '—';

        const modifiedMsl = 'x' + mslValue;
        
        return modifiedMsl;
    },
    'ref_TwTwTw':       (d) => {
        if (!d.temp_wet || d.temp_wet.trim() === '' || d.temp_wet === '—') return '';
        
        const wetBulbTemp = parseFloat(d.temp_wet) * 10;
        
        return wetBulbTemp.toFixed(0);
    },
    'ref_uuu_station': (o) => {
        return ""
    },
    'ref_uuu_msl':      (o) => {
        if (!o.relative_humidity || o.relative_humidity.trim() === '' || o.relative_humidity === '—') {
            return '';
        }

        const rhValue = parseFloat(o.relative_humidity);

        const roundedRh = Math.round(rhValue);

        return String(roundedRh).padStart(3, '0');
        
    },
    'ref_Nh':           (d) => {
        if (!d.obs_low_cloud_type || d.obs_low_cloud_type === '—') return '—';
        
        return (d.low_cloud_amount && d.low_cloud_amount !== '—') ? d.low_cloud_amount : '—';
    },
    'ref_CL':           (o) => {
        const code = getCloudCode(o.obs_low_cloud_type);
        
        return code !== '' ? code : '0';
    },
    'ref_CM':           (o) => {
        const code = getCloudCode(o.obs_medium_cloud_type);
        if (code !== '') return code;

        const nh = parseInt(o.low_cloud_amount, 10);
        if (!isNaN(nh) && nh >= 6) return '/';

        return '0';
    },
    'ref_CH':           (o) => {
        const code = getCloudCode(o.obs_high_cloud_type);
        if (code !== '') return code;

        const nh = parseInt(o.low_cloud_amount, 10);
        if (!isNaN(nh) && nh >= 6) return '/';

        return '0';
    },
    'ref_clp_pressure': (o) => {
        if (!o.pressure || o.pressure.trim() === '' || o.pressure === '—') {
            return '—';
        }

        return o.pressure;
    },
    'ref_NL':           (d) => {
        if (!d.obs_low_cloud_type || d.obs_low_cloud_type === '—') return '—';
        
        return (d.low_cloud_amount && d.low_cloud_amount !== '—') ? d.low_cloud_amount : '—';
    },
    'ref_vis_VV':           (o) => {
        if (!o.visibility || o.visibility === '—' || o.visibility.trim() === '' || o.visibility === '-') {
            return '—'; 
        }

        const parts = o.visibility.split(' - ');
        
        const codeFigure = parts[0].trim();

        return codeFigure ? codeFigure : '—';

    },
    'ref_vis_V9V9':           (o) => {
        if (!o.visibility || o.visibility === '—' || o.visibility.trim() === '') {
            return '';
        }

        const kmMatch = o.visibility.match(/(\d+(\.\d+)?)\s*km/i);
        
        if (!kmMatch) {
            return '';
        }

        const visibilityKm = parseFloat(kmMatch[1]);

        if (visibilityKm < 0.05) {
            return "90";
        } else if (visibilityKm >= 0.05 && visibilityKm <= 0.19) {
            return "91";
        } else if (visibilityKm >= 0.2 && visibilityKm <= 0.49) {
            return "92";
        } else if (visibilityKm >= 0.5 && visibilityKm <= 0.9) {
            return "93";
        } else if (visibilityKm >= 1.0 && visibilityKm <= 1.9) {
            return "94";
        } else if (visibilityKm >= 2.0 && visibilityKm <= 3.9) {
            return "95";
        } else if (visibilityKm >= 4.0 && visibilityKm <= 9.9) {
            return "96";
        } else if (visibilityKm >= 10.0 && visibilityKm <= 19.9) {
            return "97";
        } else if (visibilityKm >= 20.0 && visibilityKm <= 49.9) {
            return "98"; 
        } else if (visibilityKm >= 50.0) {
            return "99";
        }

        return '';

    },
    'ref_PcPcPcPcPc':           (o) => {
        if (!o.pressure || o.pressure.trim() === '' || o.pressure === '—') {
            return '';
        }

        const stationPressure = parseFloat(o.pressure);
        
        const pressureWithoutDecimal = Math.round(stationPressure * 10);
        
        const formattedPressure = '0' + pressureWithoutDecimal;
        
        return formattedPressure;

    },
    'ref_sig1_Ns':           (o) => {
        if (!o.pressure || o.pressure === '—' || !o.pressure_yesterday || o.pressure_yesterday === '—') {
            return '';
        }

        const currentPressure = parseFloat(o.pressure);
        const pastPressure = parseFloat(o.pressure_yesterday);
        const change = currentPressure - pastPressure;

        return change >= 0 ? '8' : '9';
    },
    'ref_sig1_C':           (o) => {
        if (!o.pressure || o.pressure === '—' || !o.pressure_yesterday || o.pressure_yesterday === '—') {
            return '———';
        }

        const currentPressure = parseFloat(o.pressure);
        const pastPressure = parseFloat(o.pressure_yesterday);
        const change = currentPressure - pastPressure;

        const changeTenths = Math.round(Math.abs(change) * 10);

        return String(changeTenths).padStart(3, '0');
    },
    'ref_corrn_up':           (o) => {
        if (!o.temp_dry || o.temp_dry === '—' || o.temp_dry.trim() === '' ||
            !o.temp_wet || o.temp_wet === '—' || o.temp_wet.trim() === '') {
            return '';
        }

        const depression = calculateDepression(o.temp_dry, o.temp_wet);

        return depression.toFixed(1);

    },
    'ref_corrn_down':           (o) => {
        if (!o.temp_dry || o.temp_dry === '—' || o.temp_dry.trim() === '' ||
            !o.temp_wet || o.temp_wet === '—' || o.temp_wet.trim() === '') {
            return '';
        }

        const adjDepression = calculateAdjustedDepression(o.temp_dry, o.temp_wet);

        return adjDepression.toFixed(1);

    }
};

export function populateForm(userInput) {
    console.log("Passing user input straight to resolvers: ", userInput);

    Object.entries(resolvers).forEach(([id, resolver]) => {
        const el = document.getElementById(id);
        if (!el) return;             

        try {
            const value = resolver(userInput);
            el.textContent = value ?? '';
        } catch (err) {
            console.warn(`resolver failed for dynamic target element "${id}":`, err);
            el.textContent = '';
        }
    });
}