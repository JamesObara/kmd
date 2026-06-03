import { presentweathercodes,pastweathercodes } from "./rules/decodeWeatherCode.js";

const isMainSynopticHour = (timeStr) => {
    if (!timeStr || timeStr === '—') return false;
    return ['00:00', '06:00', '12:00', '18:00'].includes(timeStr.trim());
};

const isMaxTempHour = (timeStr) => {
    if (!timeStr || timeStr === '—') return false;
    return timeStr.trim() === '18:00';
};

const isMinTempHour = (timeStr) => {
    if (!timeStr || timeStr === '—') return false;
    return timeStr.trim() === '06:00';
};

export const steps = [
    {
        id: 'time',
        label: 'Time',
        icon: 'ti-clock',
        title: 'Observation Date & Time',
        hint: 'UTC time of observation',
        fields: [
            { key: 'date', label: 'Date', type: 'date' },
            { 
                key: 'time_utc', 
                label: 'Time (UTC/GMT)', 
                type: 'select', 
                options: [
                    '—', 
                    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', 
                    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
                    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
                    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
                ] 
            },
        ],
        chipIcon: 'ti-clock',
        chipFn: d => d.date && d.time_utc ? `${d.date} ${d.time_utc}Z` : null,
    },
    {
        id: 'air_temperature',
        label: 'Air Temp',
        icon: 'ti-temperature',
        title: 'Air Temperature Readings',
        hint: 'Direct thermometer observations from the screen',
        fields: [
            { key: 'temp_dry', label: 'Dry bulb (°C)', type: 'number', placeholder: 'e.g. 25.4', step: '0.1' },
            { key: 'temp_wet', label: 'Wet bulb (°C)', type: 'number', placeholder: 'e.g. 19.1', step: '0.1' },
            { key: 'temp_max', label: 'Max temp (°C)', type: 'number', placeholder: 'e.g. 28.2', step: '0.1',visibleFn: d => isMaxTempHour(d.time_utc) },
            { key: 'temp_min', label: 'Min temp (°C)', type: 'number', placeholder: 'e.g. 14.5', step: '0.1', visibleFn: d => isMinTempHour(d.time_utc) },
        ],
        chipIcon: 'ti-temperature',
        chipFn: d => d.temp_dry ? `Dry: ${d.temp_dry}°C | Wet: ${d.temp_wet || '—'}°C` : null,
    },
    {
        id: 'humidity_moisture',
        label: 'Humidity',
        icon: 'ti-droplet', 
        title: 'Atmospheric Moisture',
        hint: 'Values derived from dry and wet bulb temperature comparisons',
        fields: [
            { key: 'temp_dew', label: 'Dew point (°C)', type: 'number', placeholder: 'e.g. 15.8', step: '0.1' },
            { key: 'relative_humidity', label: 'Relative humidity (%)', type: 'number', placeholder: 'e.g. 65', min: '0', max: '100', step: '1' },
        ],
        chipIcon: 'ti-droplet',
        chipFn: d => d.relative_humidity ? `RH: ${d.relative_humidity}% | DP: ${d.temp_dew || '—'}°C` : null,
    },
    {
        id: 'moisture_hydrology',
        label: 'Water',
        icon: 'ti-droplet',
        title: 'Precipitation',
        hint: 'Accumulated rainfall totals',
        visibleFn: d => isMainSynopticHour(d.time_utc),
        fields: [
            { key: 'rainfall_amount', label: 'Rainfall amount (mm)', type: 'number', placeholder: 'e.g. 12.4', min: '0', step: '0.1' },
        ],
        chipIcon: 'ti-droplet',
        chipFn: d => d.rainfall_amount !== '' && d.rainfall_amount !== undefined ? `Rain: ${d.rainfall_amount}mm` : null,
    },
    {
        id: 'pressure_altitude',
        label: 'Pressure',
        icon: 'ti-gauge',
        title: 'Atmospheric Pressure ',
        hint: 'Station pressure relative to Mean Sea Level elevation',
        fields: [
            { key: 'pressure', label: 'Current pressure', type: 'number', placeholder: 'e.g. 1013.2', step: '0.1' },
            { key: 'pressure_yesterday', label: 'Pressure 24 hours ago', type: 'number', placeholder: 'e.g. 1013.2', step: '0.1' },
            { key: 'altitude_msl', label: 'Altitude (MSL) (m)', type: 'number', placeholder: 'e.g. 250', step: '1' },
        ],
        chipIcon: 'ti-gauge',
        chipFn: d => d.pressure ? `${d.pressure} hPa @ ${d.altitude_msl || '—'}m` : null,
    },
    {
        id: 'wind',
        label: 'Wind',
        icon: 'ti-wind',
        title: 'Wind Observations',
        hint: 'Direction and current speed',
        fields: [
            { key: 'wind_dir', label: 'Wind direction (°)', type: 'number', placeholder: 'e.g. 270', min: '0', max: '360' },
            { key: 'wind_speed', label: 'Wind speed (knots)', type: 'number', placeholder: 'e.g. 12', step: '1' },
            { 
                key: 'visibility', 
                label: 'Visibility', 
                type: 'select', 
                options: [
                    '—',
                    '00 - Less than 100 meters (< 0.1 km)',
                    '01 - 100 meters (0.1 km)',
                    '02 - 200 meters (0.2 km)',
                    '05 - 500 meters (0.5 km)',
                    '10 - 1,000 meters (1.0 km)',
                    '20 - 2,000 meters (2.0 km)',
                    '30 - 3,000 meters (3.0 km)',
                    '40 - 4,000 meters (4.0 km)',
                    '50 - 5,000 meters (5.0 km)',
                    
                    '56 - 6.0 km',
                    '57 - 7.0 km',
                    '58 - 8.0 km',
                    '59 - 9.0 km',
                    '60 - 10.0 km',
                    '65 - 15.0 km',
                    '70 - 20.0 km',
                    '75 - 25.0 km',
                    '80 - 30.0 km',
                    
                    '81 - 35.0 km',
                    '82 - 40.0 km',
                    '83 - 45.0 km',
                    '84 - 50.0 km',
                    '85 - 55.0 km',
                    '86 - 60.0 km',
                    '87 - 65.0 km',
                    '88 - 70.0 km',                    
                    '89 - Greater than 70 km (> 70.0 km)'
                ] 
            },
        ],
        chipIcon: 'ti-wind',
        chipFn: d => {
            const hasWind = d.wind_speed !== '' && d.wind_speed !== undefined;
            const hasVis = d.visibility && d.visibility !== '—';
            
            if (!hasWind && !hasVis) return null;
            
            const windPart = hasWind ? `${d.wind_dir || '000'}° @ ${d.wind_speed}kt` : 'No Wind';

            let visPart = '—';
            if (hasVis) {
                const matches = d.visibility.match(/\(([^)]+)\)/);
                visPart = matches ? matches[1] : d.visibility.substring(5);
            }

            return `${windPart} | Vis: ${visPart}`;
        },
    },
    {
        id: 'weather',
        label: 'Weather',
        icon: 'ti-eye',
        title: 'Weather Conditions',
        hint: 'Structural weather phenomena',
        fields: [
            
            { 
                key: 'present_weather', 
                label: 'Present Weather', 
                type: 'select', 
                searchable: true,
                options: [
                    '—', 
                    ...presentweathercodes.map(item => `${item.ww} - ${item.description}`)
                ]
            },
            { 
                key: 'past_weather', 
                label: 'Past Weather (last hour)', 
                type: 'select', 
                searchable: true,
                options: [
                    '—',
                   ...pastweathercodes.map(item => `${item.code} - ${item.specification}`)
                ] 
            }
        ],
        chipIcon: 'ti-eye',
        chipFn: d => {
            const hasPresent = d.present_weather && d.present_weather !== '—';
            const hasPast = d.past_weather && d.past_weather !== '—';
            if (!hasPresent && !hasPast) return null;

            const presentStr = hasPresent ? d.present_weather.split(' - ')[1] : '—';
            const pastStr = hasPast ? d.past_weather.split(' - ')[1] : '—';

            return `Wx: ${presentStr} | Past: ${pastStr}`;
        }
    },
    {
        id: 'clouds',
        label: 'Clouds',
        icon: 'ti-cloud',
        title: 'Cloud Cover & Cloud Types',
        hint: 'Total sky cover and cloud classification by level',
        fields: [
            { 
                key: 'cloud_amount', 
                label: 'Amount of all clouds (oktas)', 
                type: 'select', 
                options: ['—', '0', '1', '2', '3', '4', '5', '6', '7', '8 (sky obscured)'] 
            },
            { 
                key: 'low_cloud_amount', 
                label: 'Total amount of low clouds', 
                type: 'select', 
                options: ['—', '0', '1', '2', '3', '4', '5', '6', '7', '8'] 
            },
            { 
                key: 'obs_low_cloud_type', 
                label: 'Low cloud type', 
                type: 'select', 
                options: [
                    '—',
                    'Cu 1 - Cumulus (humilis/fractus)',
                    'Cu 2 - Cumulus (mediocris/congestus)',
                    'Cb 3 - Cumulonimbus (without anvil)',
                    'Sc 4 - Stratocumulus (from cumulus)',
                    'Sc 5 - Stratocumulus (not from cumulus)',
                    'St 6 - Stratus (nebulosus)',
                    'St 7 - Stratus (fractus/bad weather)',
                    'Cb 9 - Cumulonimbus (active / rain / thunderstorm / with anvil)'
                ] 
            },
            { 
                key: 'obs_medium_cloud_type', 
                label: 'Medium cloud type', 
                type: 'select', 
                options: [
                    '—',
                    'As 1 - Altostratus (altostratus translucidus)',
                    'As 2 - Altostratus (opacus / nimbostratus-like)',
                    'Ac 3 - Altocumulus (translucidus at single level)',
                    'Ac 4 - Altocumulus (patches/continually changing)',
                    'Ac 5 - Altocumulus (banded or spreading)',
                    'Ac 6 - Altocumulus (from cumulonimbus/cumulus)',
                    'Ac 7 - Altocumulus (duplicate layers/with altostratus)',
                    'Ns 2 - Nimbostratus'
                ] 
            },
            { 
                key: 'obs_high_cloud_type', 
                label: 'High cloud type', 
                type: 'select', 
                options: [
                    '—',
                    'Ci 1 - Cirrus (fibratus/uncinus)',
                    'Ci 2 - Cirrus (spissatus/dense)',
                    'Ci 3 - Cirrus (from cumulonimbus)',
                    'Ci 4 - Cirrus (hooked/progressively invading)',
                    'Cs 5 - Cirrostratus (low on horizon)',
                    'Cs 6 - Cirrostratus (high in sky, not covering completely)',
                    'Cs 7 - Cirrostratus (covering whole sky)',
                    'Cs 8 - Cirrostratus (not invading/not increasing)',
                    'Cc 9 - Cirrocumulus'
                ] 
            },
        ],
        chipIcon: 'ti-cloud',
        chipFn: d => {
            if (!d.cloud_amount || d.cloud_amount === '—') return null;
            
            const low = d.obs_low_cloud_type && d.obs_low_cloud_type !== '—' ? d.obs_low_cloud_type.split(' ')[0] : '';
            const med = d.obs_medium_cloud_type && d.obs_medium_cloud_type !== '—' ? d.obs_medium_cloud_type.split(' ')[0] : '';
            const high = d.obs_high_cloud_type && d.obs_high_cloud_type !== '—' ? d.obs_high_cloud_type.split(' ')[0] : '';
            
            const types = [low, med, high].filter(Boolean).join('/');
            return `${d.cloud_amount} oktas ${types ? `(${types})` : ''}`.trim();
        },
    },
];