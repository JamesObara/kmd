import { populateForm } from "./synopResolver.js";
export function buildSynop(d) {
    // console.log("--- buildSynop received data ---", d);

    return `
    <div class="synop-container">
        <div class="synop-table">
            <table>
                <tr>
                   <th colspan="4" style="height: 100px; vertical-align: middle; padding: 5px;">
                        <div class="header-content">
                            
                            <!-- Line BEFORE Date: [15] Date -->
                            <div class="form-row">
                                <span class="fill-line" id="date_day_number" style="margin-left:0; margin-right:4px;">15</span>
                                <span>Day</span>
                            </div>
                            
                            <!-- Line AFTER: Day [Friday] -->
                            <div class="form-row">
                                <span>Day</span>
                                <span class="fill-line" id="date_day_name">Friday</span>
                            </div>
                            
                            <div class="form-row">
                                <span>Month</span>
                                <span class="fill-line" id="date_month">May</span>
                            </div>
                            
                            <div class="form-row">
                                <span>Year 20</span>
                                <span class="fill-line" id="date_year">26</span>
                            </div>
                            
                        </div>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Height of <Br> lowest clouds</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Visibility</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Amount of all <Br>clouds</span>
                    </th>
                    <th class="vertical-th">
                     <span class="vertical-text-content">Wind direction</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Wind speed</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Sign of Temperature</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Surface<Br>Temperature</span>
                    </th>
                    <th class="vertical-th">
                     <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                     <span class="vertical-text-content">Sign of Dew - point</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Dew - point <Br>Temperature</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Station Level<Br>Pressure <Br> (CLP / QFE)</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                     <span class="vertical-text-content">M.S.L Pressure<Br>of <Br> Height of 850mb(gpm)</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Rainfall Amount</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Period of Rainfall</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Present Weather</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Past Weather</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Amounts of <Br>Low clouds</span>
                    </th>
                    <th rowspan="3" style="padding: 0;" >
                     <div style="display: flex; flex-direction: column; height: 100%; width: 100%; align-items: center;">
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center;
                             writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap;">
                            <span class="vertical-text-content">Types of low clouds</span>
                        </div>
                        <div style="height: 22px; display: flex; align-items: center; justify-content: center;">
                            <span class="vertical-text-content">C<sub>L</sub></span>
                        </div>
                        <div style="height: 40px; display: flex; align-items: center; justify-content: center; gap: 4px;flex-direction: column">
                            <span class="vertical-text-content">48</span>
                            <span class="vertical-text-content">C<sub>L</sub></span>
                        </div>
                     </div>
                    </th>
                    <th rowspan="3" style="padding: 0;">
                      <div style="display: flex; flex-direction: column; height: 100%; width: 100%; align-items: center;">
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center;
                             writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap;">
                            <span class="vertical-text-content">Type of Medium <Br> clouds</span>
                        </div>
                        <div style="height: 22px; display: flex; align-items: center; justify-content: center;">
                            <span class="vertical-text-content">C<sub>L</sub></span>
                        </div>
                        <div style="height: 40px; display: flex; align-items: center; justify-content: center; gap: 4px;flex-direction: column">
                            <span class="vertical-text-content">48</span>
                            <span class="vertical-text-content">C<sub>L</sub></span>
                        </div>
                     </div>
                    </th>
                    <th rowspan="3" style="padding: 0;">
                     <div style="display: flex; flex-direction: column; height: 100%; width: 100%; align-items: center;">
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center;
                             writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap;">
                            <span class="vertical-text-content">Type of High clouds</span>
                        </div>
                        <div style="height: 22px; display: flex; align-items: center; justify-content: center;">
                            <span class="vertical-text-content">C<sub>L</sub></span>
                        </div>
                        <div style="height: 40px; display: flex; align-items: center; justify-content: center; gap: 4px;flex-direction: column">
                            <span class="vertical-text-content">48</span>
                            <span class="vertical-text-content">C<sub>L</sub></span>
                        </div>
                     </div>
                    </th>
                    <th colspan="2" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                     <span class="vertical-text-content">Sign of Max <Br>Temperature</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Maximum <Br>Temparature</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Sign of Minimum <Br>Temparature</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Minimum <Br>Temparature</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                    <span class="vertical-text-content">Minimum wind <Br>Temparature</span>
                    </th>
                    <th class="vertical-th">
                    <span class="vertical-text-content">ime since obsd</span>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Sign of Tendency</span>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">24 hour Tendency</span>
                    </th>
                    <th colspan="4" style="padding: 0;">
                    <div style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: space-between;">
                      <div style="width: 100%; height: 30%;border-bottom: 1px solid black; display: flex; align-items: center; justify-content: center;">
                       <span class="vertical-text-content">1st significant<Br>cloud</span>
                      </div>
                      <div style="width: 100%; height: 70%; display: flex; flex-direction: row;overflow: hidden;">
                            <div class="vertical-th" style="flex: 1;">
                                <svg class="bg-svg" style="width: 100%; height: 100%;" preserveAspectRatio="none">
                                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                                </svg>
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Amount
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Type
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Height
                            </div>
                        </div>
                        </div>
                    </th>
                    <th colspan="4" style="padding: 0;">
                    <div style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: space-between;overflow: hidden;">
                      <div style="width: 100%; height: 30%;border-bottom: 1px solid black; display: flex; align-items: center; justify-content: center;">
                       <span class="vertical-text-content">2nd significant<Br>cloud</span>
                      </div>
                      <div style="width: 100%; height: 70%; display: flex; flex-direction: row;">
                            <div class="vertical-th" style="flex: 1;">
                                <svg class="bg-svg" style="width: 100%; height: 100%;" preserveAspectRatio="none">
                                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                                </svg>
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Amount
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Type
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Height
                            </div>
                        </div>
                        </div>
                    </th>
                    <th colspan="4" style="padding: 0;">
                    <div style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: space-between;">
                      <div style="width: 100%; height: 30%;border-bottom: 1px solid black; display: flex; align-items: center; justify-content: center;">
                       <span class="vertical-text-content">3rd significant<Br>cloud</span>
                      </div>
                      <div style="width: 100%; height: 70%; display: flex; flex-direction: row;overflow: hidden;">
                            <div class="vertical-th" style="flex: 1;">
                                <svg class="bg-svg" style="width: 100%; height: 100%;" preserveAspectRatio="none">
                                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                                </svg>
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Amount
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Type
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Height
                            </div>
                        </div>
                        </div>
                    </th>
                    <th colspan="4" style="padding: 0;">
                    <div style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: space-between;">
                      <div style="width: 100%; height: 30%;border-bottom: 1px solid black; display: flex; align-items: center; justify-content: center;">
                       <span class="vertical-text-content">4th significant<Br>cloud</span>
                      </div>
                      <div style="width: 100%; height: 70%; display: flex; flex-direction: row;overflow: hidden;">
                            <div class="vertical-th" style="flex: 1;">
                                <svg class="bg-svg" style="width: 100%; height: 100%;" preserveAspectRatio="none">
                                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                                </svg>
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Amount
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Type
                            </div>
                            <div style="flex: 1;writing-mode: vertical-rl;
                                transform: rotate(180deg);
                                text-align: center;
                                white-space: nowrap;border-right: 1px solid black;">
                                Height
                            </div>
                        </div>
                        </div>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <span class="vertical-text-content">Direction of <Br>Low clouds</span>
                    </th>
                   <th style="padding: 0;">
                        <div style="display: flex; flex-direction: column; width: 100%; height: 100%;">
                            <div style="width: 100%; height: 50%; border-bottom: 1px solid #555; display: flex; align-items: center; justify-content: center;">
                                <span>Press<br>as<br>Read</span>
                            </div>
                            <div style="width: 100%; height: 50%;  display: flex; align-items: center; justify-content: center;">
                                <span>Corrn</span>
                            </div>
                        </div>
                    </th>
                    <th style="padding: 0;">
                        <div style="display: flex; flex-direction: column; width: 100%; height: 100%;">
                            <div style="writing-mode: vertical-rl;transform: rotate(180deg);text-align: center;white-space: nowrap;padding: 0;vertical-align: middle;display: flex; align-items: center; justify-content: center;width: 100%; height: 55px;">
                                <span>Afrd<br>Thermo</span>
                            </div>
                            <div style="border-top: 1px solid #555;width: 100%; height: 50%;  display: flex; align-items: center; justify-content: center;">
                                <span>W.B.</span>
                            </div>
                        </div>
                    </th>
                    <th class="vertical-th" colspan="2" rowspan="3">
                        <span class="vertical-text-content">REMARKS</span>
                    </th>
                    <th class="vertical-th" colspan="2" rowspan="3">
                        <span class="vertical-text-content">OBSERVERS INITIALS</span>
                    </th>
                </tr>
               <tr>
                    <td><span>AAXX</span></td>
                    <td><span>YY</span></td>
                    <td><span>GG</span></td>
                    <td><span>i<sub>w</sub></span></td>
                    <td><span>iii</span></td>
                    <td><span>i<sub>R</sub></span></td>
                    <td><span>i<sub>X</sub></span></td>
                    <td><span>h</span></td>
                    <td><span>VV</span></td>
                    <td><span>N</span></td>
                    <td><span>dd</span></td>
                    <td><span>ff</span></td>
                    <td><span>1</span></td>
                    <td><span>S<sub>n</sub></span></td>
                    <td><span>TTT</span></td>
                    <td><span>2</span></td>
                    <td><span>S<sub>n</sub></span></td>
                    <td><span>T<sub>d</sub>T<sub>d</sub>T<sub>d</sub></span></td>
                    <td><span>3</span></td>
                    <td><span>P<sub>o</sub>P<sub>o</sub>P<sub>o</sub>P<sub>o</sub></span></td>
                    <td><span>4</span></td>
                    <td>
                        <span>PPPP</span>
                        <span>8hhh</span>
                    </td>
                    <td><span>6</span></td>
                    <td><span>RRR</span></td>
                    <td><span>t<sub>R</sub></span></td>
                    <td><span>7</span></td>
                    <td><span>W W</span></td>
                    <td><span>W<sub>1</sub> W<sub>2</sub></span></td>
                    <td><span>8</span></td>
                    <td><span>N<sub>h</sub></span></td>
                    <td colspan="2"><span>333</span></td>
                    <td><span>1</span></td>
                    <td><span>S<sub>n</sub></span></td>
                    <td><span>T<sub>x</sub>T<sub>x</sub>T<sub>x</sub></span></td>
                    <td><span>2</span></td>
                    <td><span>S<sub>n</sub></span></td>
                    <td><span>T<sub>n</sub>T<sub>n</sub>T<sub>n</sub></span></td>
                    <td><span>55</span></td>
                    <td><span>f<sub>x</sub>f<sub>x</sub></span></td>
                    <td><span>S<sub>o</sub></span></td>
                    <td><span>5</span></td>
                    <td><span>8<sub>9</sub></span></td>
                    <td><span>P<sub>24</sub>P<sub>24</sub>P<sub>24</sub></span></td>
                    <td><span>8</span></td>
                    <td><span>N<sub>s</sub></span></td>
                    <td><span>C</span></td>
                    <td><span>h<sub>s</sub>h<sub>s</sub></span></td>
                    <td><span>8</span></td>
                    <td><span>N<sub>s</sub></span></td>
                    <td><span>C</span></td>
                    <td><span>h<sub>s</sub>h<sub>s</sub></span></td>
                    <td><span>8</span></td>
                    <td><span>N<sub>s</sub></span></td>
                    <td><span>C</span></td>
                    <td><span>h<sub>s</sub>h<sub>s</sub></span></td>
                    <td><span>8</span></td>
                    <td><span>N<sub>s</sub></span></td>
                    <td><span>C</span></td>
                    <td><span>h<sub>s</sub>h<sub>s</sub></span></td>
                    <td><span>943</span></td>
                    <td><span>D<sub>L</sub>D<sub>L</sub></span></td>
                    <td rowspan="2"><span>C.L.P.</span></td>
                    <td rowspan="2" style="position: relative; padding: 0;outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="100%" y1="0" x2="0%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                        
                        <span style="position: absolute; top: 5px; left: 2px;">
                            W.B. <Br> CEP
                        </span>
                        
                        <span style="position: absolute; bottom: 5px; right: 2px;">
                            ADJ
                        </span>
                    </td>
                </tr>

                <tr>
                    <td colspan="2" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>7,&nbsp;&nbsp; 8</span>
                            <span>GG</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>9&nbsp;-&nbsp; 11</span>
                            <span>iii</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>12</span>
                            <span>h</span>
                       </div>
                    </td>
                    <td colspan="2" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>13</span>
                            <span>h</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>14&nbsp;,&nbsp; 15</span>
                            <span>dd</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>16&nbsp;,&nbsp; 17</span>
                            <span>D D</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>18</span>
                            <span>D</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>19&nbsp;,&nbsp; 20</span>
                            <span>fff</span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>21</span>
                            <span>S<sub>n</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>22&nbsp;-&nbsp; 24</span>
                            <span>TTT</span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>25</span>
                            <span>S<sub>n</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>26&nbsp;-&nbsp; 28</span>
                            <span>T<sub>d</sub>T<sub>d</sub>T<sub>d</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>29&nbsp;-&nbsp; 31</span>
                            <span>uuu</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>32&nbsp;-&nbsp; 35</span>
                            <span>P<sub>o</sub>P<sub>o</sub>P<sub>o</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>36&nbsp;-&nbsp; 38</span>
                            <span>uuu</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>39&nbsp;-&nbsp;43</span>
                            <span>ppppp</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>44&nbsp;-&nbsp;46</span>
                            <span>T<sub>w</sub>T<sub>w</sub>T<sub>w</sub></span>
                       </div>
                    </td>
                    <td style="position: relative; padding: 0;outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="100%" y1="0" x2="0%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td style="position: relative; padding: 0; outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="0%" y1="0" x2="100%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td style="position: relative; padding: 0;outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="100%" y1="0" x2="0%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td style="position: relative; padding: 0; outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="0%" y1="0" x2="100%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td style="position: relative; padding: 0;outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="100%" y1="0" x2="0%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td></td>
                    <td colspan="2" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td colspan="6" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>51&nbsp;-&nbsp;52</span>
                            <span>f<sub>x</sub>f<sub>x</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>53</span>
                            <span>S<sub>n</sub></span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>54</span>
                            <span>S<sub>n</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>55&nbsp;-&nbsp;57</span>
                            <span>ppp</span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>58</span>
                            <span>N<sub>s</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>59</span>
                            <span>C</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>60&nbsp;-&nbsp;62</span>
                            <span>h<sub>s</sub>h<sub>s</sub>h<sub>s</sub></span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>63</span>
                            <span>N<sub>s</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>64</span>
                            <span>C</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>65&nbsp;-&nbsp;67</span>
                            <span>h<sub>s</sub>h<sub>s</sub>h<sub>s</sub></span>
                       </div>
                    </td>
                    <td colspan="4" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    
                    <td colspan="3" >
                        <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>68&nbsp;---&nbsp;72</span>
                            <span>P<sub>c</sub>P<sub>c</sub>P<sub>c</sub>P<sub>c</sub>P<sub>c</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>73&nbsp;-&nbsp;74</span>
                            <span>VV</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>75&nbsp;-&nbsp;76</span>
                            <span>V<sub>9</sub>V<sub>9</sub></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span>77</span>
                            <span>N<sub>L</sub></span>
                       </div>
                    </td>
                </tr>

                <tr>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <th class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </th>
                    <td><span class="table-fill" id="obs_cloud_height">1800<sup>'</sup></span></td>
                    <td><span class="table-fill" id="obs_visibility">30 Km</span></td>
                    <td><span class="table-fill" id="obs_cloud_amount">5/8</span></td>
                    <td><span class="table-fill" id="obs_wind_direction">160<sup>o</sup></span></td>
                    <td><span class="table-fill" id="obs_wind_speed" >3</span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="obs_temp_sign" >+</span></td>
                    <td><span class="table-fill" id="obs_temperature">16.8</span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="obs_dewpoint_sign">+</span></td>
                    <td><span class="table-fill" id="obs_dewpoint" >17.0</span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="obs_station_pressure">825.7</span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="obs_msl_pressure">1553</span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="obs_rainfall_amount"></span></td>
                    <td><span class="table-fill" id="obs_rainfall_period"></span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="obs_present_weather"></span></td>
                    <td><span class="table-fill" id="obs_past_weather"></span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="obs_low_cloud_amount">1</span></td>
                    <td><span class="table-fill" id="obs_low_cloud_type">SC</span></td>
                    <td><span class="table-fill" id="obs_medium_cloud_type">AC</span></td>
                    <td><span class="table-fill" id="obs_high_cloud_type">-</span></td>
                    <td colspan="2" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="s333_max_temp_sign"></span></td>
                    <td><span class="table-fill" id="s333_max_temp"></span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="s333_min_temp_sign"></span></td>
                    <td><span class="table-fill" id="s333_min_temp"></span></td>
                    <td><span class="table-fill"></span></td>
                    <td><span class="table-fill" id="s333_min_wind_temp"></span></td>
                    <td><span class="table-fill" id="s333_time_since_obs"></span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="s333_tendency_sign">+</span></td>
                    <td><span class="table-fill" id="s333_tendency_24h">0.6</span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="s333_sig_cloud1_amount">1</span></td>
                    <td><span class="table-fill" id="s333_sig_cloud1_type">SC</span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="s333_sig_cloud2_amount">5</span></td>
                    <td><span class="table-fill" id="s333_sig_cloud2_type">AC</span></td>
                    <td><span class="table-fill" id="s333_sig_cloud2_height">8000<sup>'</sup></span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="s333_sig_cloud3_amount"></span></td>
                    <td><span class="table-fill" id="s333_sig_cloud3_type"></span></td>
                    <td><span class="table-fill" id="s333_sig_cloud3_height"></span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                   <td><span class="table-fill" id="s333_sig_cloud4_amount"></span></td>
                    <td><span class="table-fill" id="s333_sig_cloud4_type"></span></td>
                    <td><span class="table-fill" id="s333_sig_cloud4_height"></span></td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td><span class="table-fill" id="s333_low_cloud_direction"></span></td>
                    <td><span class="table-fill"></span></td>
                    <td><span class="table-fill"></span></td>
                    <th class="vertical-text-content" colspan="2" rowspan="3" >
                        <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: center;">
                            <span class="table-fill">VP</span>
                            <span class="table-fill" id="s333_vp"></span>
                        </div>
                    </th>
                   <th class="vertical-th" colspan="2" rowspan="3">
                        <span class="vertical-text-content"></span>
                    </th>
                </tr>

                <tr>
                    <td><span>AAXX</span></td>
                    <td><span class="table-fill" id="synop_YY" >14</span></td>
                    <td><span class="table-fill" id="synop_GG">05</span></td>
                    <td><span class="table-fill" id="synop_iw">4</span></td>
                    <td><span class="table-fill" id="synop_iii">741</span></td>
                    <td><span class="table-fill" id="synop_iR">4</span></td>
                    <td><span class="table-fill" id="synop_iX">2</span></td>
                    <td><span class="table-fill" id="synop_h">4</span></td>
                    <td><span class="table-fill" id="synop_VV">80</span></td>
                    <td><span class="table-fill" id="synop_N">5</span></td>
                    <td><span class="table-fill" id="synop_dd">00</span></td>
                    <td><span class="table-fill" id="synop_ff">00</span></td>
                    <td><span>1</span></td>
                    <td><span class="table-fill" id="synop_Sn_temp">0</span></td>
                    <td><span class="table-fill" id="synop_TTT" >168</span></td>
                    <td><span>2</span></td>
                    <td><span class="table-fill" id="synop_Sn_dewpoint">0</span></td>
                    <td><span class="table-fill" id="synop_TdTdTd">170</span></td>
                    <td><span>3</span></td>
                    <td><span class="table-fill" id="synop_PoPoPoP">8257</span></td>
                    <td><span>4</span></td>
                    <td><span class="table-fill" id="synop_PPPP">8553</span></td>
                    <td><span>6</span></td>
                    <td><span class="table-fill" id="synop_RRR"></span></td>
                    <td><span class="table-fill" id="synop_tR"></span></td>
                    <td><span>7</span></td>
                    <td><span class="table-fill" id="synop_WW"></span></td>
                    <td><span class="table-fill" id="synop_W1W2"></span></td>
                    <td><span>8</span></td>
                    <td><span class="table-fill" id="synop_Nh"  >1</span></td>
                    <td><span class="table-fill" id="synop_CL">5</span></td>
                    <td><span class="table-fill" id="synop_CM">3</span></td>
                    <td><span class="table-fill" id="synop_CH">0</span></td>
                    <td colspan="2"><span>333</span></td>
                    <td><span>1</span></td>
                    <td><span class="table-fill" id="s333_Sn_max"></span></td>
                    <td><span class="table-fill" id="s333_TxTxTx"></span></td>
                    <td><span>2</span></td>
                    <td><span class="table-fill" id="s333_Sn_min"></span></td>
                    <td><span class="table-fill" id="s333_TnTnTn"></span></td>
                    <td><span>55</span></td>
                    <td><span class="table-fill" id="s333_fxfx"></span></td>
                    <td><span class="table-fill" id="s333_So"></span></td>
                    <td><span>5</span></td>
                    <td><span class="table-fill" id="s333_a9">8</span></td>
                    <td><span class="table-fill" id="s333_P24P24P24">006</span></td>
                    <td><span>8</span></td>
                    <td><span class="table-fill" id="s333_sig1_Ns">1</span></td>
                    <td><span class="table-fill" id="s333_sig1_C">6</span></td>
                    <td><span class="table-fill" id="s333_sig1_hshs">18</span></td>
                    <td><span>8</span></td>
                    <td><span class="table-fill" id="s333_sig2_Ns">5</span></td>
                    <td><span class="table-fill" id="s333_sig2_C">3</span></td>
                    <td><span class="table-fill" id="s333_sig2_hshs">58</span></td>
                    <td><span>8</span></td>
                    <td><span class="table-fill" id="s333_sig3_Ns"></span></td>
                    <td><span class="table-fill" id="s333_sig3_C"></span></td>
                    <td><span class="table-fill" id="s333_sig3_hshs"></span></td>
                    <td><span>8</span></td>
                    <td><span class="table-fill" id="s333_sig4_Ns"></span></td>
                    <td><span class="table-fill" id="s333_sig4_C"></span></td>
                    <td><span class="table-fill" id="s333_sig4_hshs"></span></td>
                    <td><span>943</span></td>
                    <td><span class="table-fill" id="s333_DLDL"></span></td>
                    <td><span class="table-fill" id="obs_press_corrn"></span></td>
                    <td><span class="table-fill" id="obs_wetbulb">14.7</span></td>
                </tr>

                 <tr>
                    <td colspan="2" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_GG">05</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_iii">741</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_h">4</span>
                       </div>
                    </td>
                    <td colspan="2" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_VV">5</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_dd">00</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_ff_tens">00</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_ff_units">0</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_fff">000</span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_Sn_temp">0</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_TTT">168</span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_Sn_dewpoint">0</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_TdTdTd">170</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_uuu_station"></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_PoPoPoP">8257</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_uuu_msl"></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_PPPP">x1553</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_TwTwTw"></span>
                       </div>
                    </td>
                    <td style="position: relative; padding: 0;outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="100%" y1="0" x2="0%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td style="position: relative; padding: 0; outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="0%" y1="0" x2="100%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td style="position: relative; padding: 0;outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="100%" y1="0" x2="0%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td style="position: relative; padding: 0; outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="0%" y1="0" x2="100%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td style="position: relative; padding: 0;outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="100%" y1="0" x2="0%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_Nh">1</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_CL">5</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_CM">3</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_CH">0</span>
                       </div>
                    </td>
                    <td colspan="2" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td colspan="6" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_fxfx"></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_Sn_min"></span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_sig1_Ns"></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_sig1_C"></span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_sig2_Ns">1</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_sig2_C">6</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_sig2_hshs">018</span>
                       </div>
                    </td>
                    <td class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_sig3_Ns">5</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_sig3_C">3</span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_sig3_hshs">080</span>
                       </div>
                    </td>
                    <td colspan="4" class="vertical-th">
                        <svg class="bg-svg" preserveAspectRatio="none">
                            <line x1="0" y1="0" x2="100%" y2="100%" stroke="gray" stroke-width="1" />
                            <line x1="100%" y1="0" x2="0" y2="100%" stroke="gray" stroke-width="1" />
                        </svg>
                    </td>
                    
                    <td colspan="3" >
                        <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_PcPcPcPcPc"></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_vis_VV"></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_vis_V9V9"></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_NL"></span>
                       </div>
                    </td>
                    <td>
                       <div style="flex-direction: column;display: flex;width: 100%;height: 100%;justify-content: space-evenly;">
                            <span class="table-fill" id="ref_clp_pressure"></span>
                       </div>
                    </td>
                    <td style="position: relative; padding: 0;outline: 1px solid #555;">
                        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                            preserveAspectRatio="none">
                            <line x1="100%" y1="0" x2="0%" y2="100%" 
                                stroke="#555" stroke-width="1"/>
                        </svg>
                        <span class="table-fill" style="position: absolute; top: 0; left: 0;" id="ref_corrn_up"></span>
                        <span class="table-fill" style="position: absolute; bottom: 0; right: 0;" id="ref_corrn_down"></span>
                    </td>
                </tr>
                
            </table>
          
        </div>
    </div>
    `
} 

export function buildSynopTable(d) {
    return `
        <div>
            ${buildSynop(d)}
        </div> 
    `;
}