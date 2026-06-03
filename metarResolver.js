const resolvers = {
    'metar_1':  (o) => {
        return "METAR";
    },
    'metar_2':  (o) => {
        return "HKNC";
    },
    'metar_3':  (o) => {
        if (!o.date || !o.time_utc || o.date === '—' || o.time_utc === '—') {
            return '';
        }

        const dateParts = o.date.split('-');
        const day = dateParts.length === 3 ? dateParts[2] : '01';

        const timeClean = o.time_utc.replace(':', '');

        return `${day}${timeClean}Z`;
    },
    'metar_4':  (o) => {
        if (o.wind_dir === undefined || o.wind_speed === undefined || 
            o.wind_dir === '' || o.wind_speed === '' || 
            o.wind_dir === '—' || o.wind_speed === '—') {
            return '';
        }

        const dirRaw = parseInt(o.wind_dir, 10);
        const speedRaw = parseInt(o.wind_speed, 10);

        // Fail-safe check for parsing errors
        if (isNaN(dirRaw) || isNaN(speedRaw)) {
            return '';
        }

        // Standard Aviation Rule: Calm Wind
        if (speedRaw === 0) {
            return '00000KT';
        }

        let roundedDir = Math.round(dirRaw / 10) * 10;
        
        if (roundedDir === 0) roundedDir = 360;
        if (roundedDir > 360) roundedDir = 360;

        const ddd = String(roundedDir).padStart(3, '0');
        const ff = String(speedRaw).padStart(2, '0');

        return `${ddd}${ff}KT`;
        
    },
    'metar_5':  (o) => {
        if (!o.visibility || o.visibility === '—' || o.visibility.trim() === '') {
            return '';
        }

        const kmMatch = o.visibility.match(/(\d+(\.\d+)?)\s*km/i);
        
        if (!kmMatch) {
            return '';
        }

        const visibilityKm = parseFloat(kmMatch[1]);

        if (visibilityKm < 0.05) {
            return "9990";
        } else if (visibilityKm >= 0.05 && visibilityKm <= 0.19) {
            return "9991";
        } else if (visibilityKm >= 0.2 && visibilityKm <= 0.49) {
            return "9992";
        } else if (visibilityKm >= 0.5 && visibilityKm <= 0.9) {
            return "9993";
        } else if (visibilityKm >= 1.0 && visibilityKm <= 1.9) {
            return "9994";
        } else if (visibilityKm >= 2.0 && visibilityKm <= 3.9) {
            return "9995";
        } else if (visibilityKm >= 4.0 && visibilityKm <= 9.9) {
            return "9996";
        } else if (visibilityKm >= 10.0 && visibilityKm <= 19.9) {
            return "9997";
        } else if (visibilityKm >= 20.0 && visibilityKm <= 49.9) {
            return "9998"; 
        } else if (visibilityKm >= 50.0) {
            return "9999";
        }

        return '';
    },
    'metar_6':  (o) => {
        return "";
    },
    'metar_7':  (o) => {
        if (!o.present_weather || o.present_weather === '—' || o.present_weather.trim() === '') {
            return ""; 
        }

        const wxInput = o.present_weather.toLowerCase().trim();

        if (wxInput.includes('light rain'))       return "-RA";
        if (wxInput.includes('heavy rain'))       return "+RA";
        if (wxInput.includes('thunderstorm'))     return "TSRA"; 
        if (wxInput.includes('drizzle'))          return "DZ";
        if (wxInput.includes('fog'))              return "FG";
        if (wxInput.includes('haze'))             return "HZ";
        if (wxInput.includes('mist'))             return "BR";
        if (wxInput.includes('rain'))             return "RA"; 

        return o.present_weather.toUpperCase().trim();
    },
    'metar_8':  (o) => {
        const cloudAmt = (o.cloud_amount || '').trim();
        const visStr = (o.visibility || '').toLowerCase();
        const presentWx = (o.present_weather || '').trim();

        // 1. Check Visibility for CAVOK Conditions
        let isVisHigh = false;
        const kmMatch = visStr.match(/(\d+(\.\d+)?)\s*km/i);
        if (kmMatch) {
            const km = parseFloat(kmMatch[1]);
            if (km >= 10.0) isVisHigh = true;
        }

        // CAVOK Bypass Rule
        if (isVisHigh && (!presentWx || presentWx === '—') && (cloudAmt === '0' || cloudAmt === '—' || cloudAmt === 'Sky Clear' || cloudAmt.toLowerCase().includes('clear'))) {
            return "CAVOK";
        }

        // SKC Bypass Rule
        if (cloudAmt === '0' || cloudAmt === 'Sky Clear' || cloudAmt.toLowerCase().includes('clear')) {
            return "SKC";
        }

        // 2. Parse Cloud Layer Amount Group (Oktas Translation)
        let layerAmount = "FEW"; 
        if (cloudAmt.includes('1') || cloudAmt.includes('2') || cloudAmt.toLowerCase().includes('few')) layerAmount = "FEW";
        if (cloudAmt.includes('3') || cloudAmt.includes('4') || cloudAmt.toLowerCase().includes('scattered')) layerAmount = "SCT";
        if (cloudAmt.includes('5') || cloudAmt.includes('6') || cloudAmt.includes('7') || cloudAmt.toLowerCase().includes('broken')) layerAmount = "BKN";
        if (cloudAmt.includes('8') || cloudAmt.toLowerCase().includes('overcast')) layerAmount = "OVC";

        // 3. Cloud Base Height Calculation: (Dry Bulb Integer) + 1
        let layerHeight = "020"; 

        if (o.temp_dry && o.temp_dry !== '—' && o.temp_dry.trim() !== '') {
            const dryBulbFloat = parseFloat(o.temp_dry);

            if (!isNaN(dryBulbFloat)) {
                const dryBulbInt = Math.floor(dryBulbFloat);
                
                let calculatedHeight = dryBulbInt + 1;

                if (calculatedHeight < 0) calculatedHeight = 0;

                layerHeight = String(calculatedHeight).padStart(3, '0');
            }
        }

        return `${layerAmount}${layerHeight}`;
    },
    'metar_9':  (o) => "metar",
    'metar_10':  (o) => "metar",
    'metar_11':  (o) => "metar",
    'metar_12':  (o) => {
        // If either temperature is missing, return standard empty placeholder
        if (!o.temp_dry || !o.temp_dew || o.temp_dry === '—' || o.temp_dew === '—') {
            return '';
        }

        const formatTemp = (rawVal) => {
            const num = Math.round(parseFloat(rawVal));
            if (isNaN(num)) return '';

            const absNum = Math.abs(num);
            const padded = String(absNum).padStart(2, '0');

            // If temperature is negative, prefix with 'M'. Otherwise, just return the padded digits.
            return num < 0 ? `M${padded}` : padded;
        };

        const TT = formatTemp(o.temp_dry);
        const TdTd = formatTemp(o.temp_dew);

        return `${TT}/${TdTd}`;
    },
    'metar_13':  (o) => {
        if (!o.altitude_msl || o.altitude_msl === '—' || o.altitude_msl.trim() === '') {
            return '';
        }

        const altMslFloat = parseFloat(o.altitude_msl);

        if (isNaN(altMslFloat)) {
            return '';
        }

        const wholePressure = Math.floor(altMslFloat);

        return `Q${String(wholePressure).padStart(4, '0')}`;
    },
    'metar_14':  (o) => {
        if (!o.past_weather || o.past_weather === '—' || o.past_weather.trim() === '') {
            return ""; 
        }

        const pastWxInput = o.past_weather.toLowerCase().trim();

        if (pastWxInput.includes('rain'))          return "RERA";  
        if (pastWxInput.includes('thunderstorm'))  return "RETS"; 
        if (pastWxInput.includes('drizzle'))       return "REDZ";  
        if (pastWxInput.includes('shower'))        return "RESHRA";

        return `RE${o.past_weather.toUpperCase().trim()}`;
    },
    'metar_15_top': (o) => {
        if (!o.altitude_msl || o.altitude_msl === '—' || o.altitude_msl.trim() === '') {
            return '';
        }

        const altMslFloat = parseFloat(o.altitude_msl);
        if (isNaN(altMslFloat)) {
            return '';
        }

        return String(altMslFloat);
    },

    'metar_15_bottom': (o) => {
        if (!o.altitude_msl || o.altitude_msl === '—' || o.altitude_msl.trim() === '') {
            return '';
        }

        const altMslFloat = parseFloat(o.altitude_msl);
        if (isNaN(altMslFloat)) {
            return '';
        }

        const wholePressure = Math.floor(altMslFloat);

        return String(wholePressure);
    },
    'metar_16':  (o) => {
        return ""
    },
    'metar_17':  (o) => {
        if (!o.pressure || o.pressure === '—' || o.pressure.trim() === '') {
            return '';
        }

        return o.pressure.trim();
    },
    'metar_18':  (o) => {
        return ""
    },
}


export function populateMetarForm(userInput) {

    Object.entries(resolvers).forEach(([id, resolver]) => {
        const el = document.getElementById(id);
        if (!el) return; 

        try {
            const value = resolver(userInput);
            console.log("user",userInput)
            el.textContent = value ?? '—';
        } catch (err) {
            console.warn(`Resolver failed for "${id}":`, err);
            el.textContent = '—';
        }
    });

}