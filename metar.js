function buildTitleRow(d) {
  return `
    <div style="display:grid; grid-template-columns: 1fr 280px 160px; padding: 7px 0px">

      <div style="padding:6px 8px; display:flex; align-items:center; justify-content:flex-start;">
        <span style="font-weight:600;">FORM No. 646 (Rev. 5/95)</span>
      </div>

      <div style=" padding:6px 8px; display:flex; align-items:center; gap:6px;">
        <span style="font-weight:600;">STATION</span>
        <span style="display:inline-block; border-bottom:1px solid #333; width:180px;">${d.station || ''}</span>
      </div>

      <div style="padding:6px 8px; display:flex; align-items:center; gap:6px;">
        <span style="font-weight:600;">Date</span>
        <span style="display:inline-block; border-bottom:1px solid #333; width:90px;">${d.date || ''}</span>
      </div>

    </div>
  `;
}




function buildRaw2(d) {
  return `
    <div style="
      display: grid; 
      grid-template-columns: repeat(18, 1fr); 
      border-top: 1px solid #aaa; 
      border-left: 1px solid #aaa;
    ">
      <div style=" border-bottom: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
      
      </div>
      <div style=" border-bottom: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
      
      </div>
      <div style="border-right: 1px solid #aaa; border-bottom: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
      
      </div>
      <div style="border-right: 1px solid #aaa; border-bottom: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
        <span style="font-weight:600;">ddddff-<br>Gf<sub>m</sub>f<sub>m</sub></span>
      </div>
      <div style="border-right: 1px solid #aaa; border-bottom: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
        <span style="font-weight:600;">VV-<br>VD<sub>s</sub></span>
      </div>
      <div style="border-right: 1px solid #aaa; border-bottom: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
        <span style="font-weight:600;">RD<sub>R</sub>D<sub>R</sub>/V<sub>R</sub>-<br>V<sub>R</sub>V<sub>R</sub>V<sub>R</sub>i</span>
      </div>
      <div style="border-right: 1px solid #aaa; border-bottom: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;align-items: center;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">QTY WX</span>
        </div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">INDICATOR</span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa; border-bottom: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
            <span style="font-weight:600;">N<sub>s</sub>N<sub>s</sub>N<sub>s</sub><br>h<sub>s</sub>h<sub>s</sub>h<sub>s</sub></span>
      </div>
      <div style="  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;border-right: 1px solid #aaa;">
            <span style="font-weight:600;">N<sub>s</sub>N<sub>s</sub>N<sub>s</sub><br>h<sub>s</sub>h<sub>s</sub>h<sub>s</sub></span>
        </div>
      </div>
      <div style=" height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;border-right: 1px solid #aaa;">
            <span style="font-weight:600;">N<sub>s</sub>N<sub>s</sub>N<sub>s</sub><br>h<sub>s</sub>h<sub>s</sub>h<sub>s</sub></span>
        </div>
      </div>
      <div style="  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;border-right: 1px solid #aaa;">
            <span style="font-weight:600;">N<sub>s</sub>N<sub>s</sub>N<sub>s</sub><br>h<sub>s</sub>h<sub>s</sub>h<sub>s</sub></span>
        </div>
      </div>
      <div style=" height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;border-right: 1px solid #aaa;">
            <span style="font-weight:600;">S<sub>n</sub>T T/-<br>S<sub>n</sub>T<sub>d</sub>T<sub>d</sub></span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">QP<sub>H-</sub><br>P<sub>H</sub>P<sub>H</sub>P<sub>H</sub></span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa; border-bottom: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">RECENT</span>
        </div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">WX</span>
        </div>
      </div>
      <div style="border-bottom: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: flex-end;">
            <span style="font-weight:600;">PRESSURE </span>
        </div>
        <div style="height: 50%; width: 100%;border-right: 1px solid #aaa;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">QNH(01)</span>
        </div>
      </div>
      <div style="border-bottom: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: flex-end;">
          <span style="font-weight:600;">(METAR </span>
        </div>
        <div style="height: 50%; width: 100%;border-right: 1px solid #aaa;align-items: center;display: flex;justify-content: center;">
        <span style="font-weight:600;">As read</span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa; border-bottom: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: flex-start;">
            <span style="font-weight:600;margin-left: 2px;">ONLY)</span>
        </div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">Attd Thermo</span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;border-right: 1px solid #aaa;">
            <span style="font-weight:600;">OBS/-<br>INTS</span>
        </div>
      </div>
    </div>
  `;
}

function buildRaw3(d) {
  return `
    <div style="
      display: grid; 
      grid-template-columns: repeat(18, 1fr); 
      border-left: 1px solid #aaa;
    ">
      <div style="border-right: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">METAR</span>
        </div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">SPECI</span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">CCCC</span>
        </div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">GGggZ</span>
        </div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
        <span style="font-weight:600;">d<sub>n</sub>d<sub>n</sub>d<sub>n</sub><br>Vd<sub>X</sub>d<sub>X</sub>d<sub>X</sub></span>
      </div>
      <div style="border-right: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
        <span style="font-weight:600;">V<sub>X</sub>V<sub>X</sub>V<sub>X</sub>-<br>V<sub>X</sub>V<sub>X</sub>d<sub>X</sub></span>
      </div>
      <div style="border-right: 1px solid #aaa; height: 60px; display: flex; align-items: center; justify-content: center;">
        <span style="font-weight:600;">RD<sub>R</sub>/V<sub>R</sub>V<sub>R</sub>V<sub>R</sub>-<br>V<sub>R</sub>V<sub>RVRVRVRi</sub></span>
      </div>
      <div style="border-right: 1px solid #aaa; height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">IP/DEW<sup>3</sup>W<sup>3</sup></span>
        </div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">(W<sup>3</sup>W<sup>3</sup>)</span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">CC(C)</span>
        </div>
        <div style="height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">SKC/CAVOK</span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">REW<sup>3</sup>W<sup>3</sup></span>
        </div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa; height: 60px; display: flex; align-items: flex-start; justify-content: center;padding-top: 7px">
        <span style="font-weight:600;">QNH(Wh<br>ole)Hpa</span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">Correction</span>
        </div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;align-items: center;display: flex;justify-content: center;">
            <span style="font-weight:600;">CLP</span>
        </div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; flex-direction: column;">
        <div style="border-bottom: 1px solid #aaa; height: 50%; width: 100%;"></div>
        <div style="height: 50%; width: 100%;"></div>
      </div>
    </div>
  `;
}

function buildRaw4(d) {
  return `
    <div style="
      display: grid; 
      grid-template-columns: repeat(18, 1fr); 
      border-top: 1px solid #aaa; 
      border-left: 1px solid #aaa;
    ">
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;">
        <span style="font-weight:600;">V Vh<sub>x</sub>h<sub>x</sub>h<sub>x</sub></span>
      </div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
      <div style="border-right: 1px solid #aaa; height: 30px; display: flex; align-items: center; justify-content: center;"></div>
    </div>
  `;
}

function buildRaw5(d) {
  return `
    <div style="
      display: grid; 
      grid-template-columns: repeat(18, 1fr); 
      border-top: 1px solid #aaa; 
      border-left: 1px solid #aaa;
    ">
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_1"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_2"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_3"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_4"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_5"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_6"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_7"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_8"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_9"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_10"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_11"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_12"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_13"></span>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_14"></span>
      </div>
      <div style="
        border-right: 1px solid #aaa; 
        height: 60px; 
        display: flex; 
        flex-direction: column;
      ">
        <div style="
          flex: 1; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border-bottom: 1px solid #aaa;
        ">
          <span class="table-fill" id="metar_15_top"></span>
        </div>
        
        <div style="
          flex: 1; 
          display: flex; 
          align-items: center; 
          justify-content: center;
        ">
          <span class="table-fill" id="metar_15_bottom"></span>
        </div>
      </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_16"></span>
      </div>
        
      <div style="
          border-right: 1px solid #aaa; 
          height: 60px; 
          display: flex; 
          flex-direction: column;
        ">
          <div style="
            flex: 1; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            
          ">
          </div>
          
          <div style="
            flex: 1; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            border-top: 1px solid #aaa;
          ">
            <span class="table-fill" id="metar_17"></span>
          </div>
        </div>
      <div style="border-right: 1px solid #aaa;  height: 60px; display: flex; align-items: center; justify-content: center;">
        <span class="table-fill" id="metar_18"></span>
      </div>
    </div>
  `;
}

export function buildMetarTable(d) {
    // console.log("--- buildMetarTable received data ---", d);
    return `
    <div style="overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%;">
        <div class="mt-form">
            ${buildTitleRow(d)}
            ${buildRaw2(d)}
            ${buildRaw3(d)}
            ${buildRaw4(d)}
            ${buildRaw5(d)}
        </div>
    </div>
    `;
}