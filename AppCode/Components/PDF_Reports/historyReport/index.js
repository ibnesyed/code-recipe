export const assetHistoryReportPDF = (data, dateTime) => {
    const {dateTimeTo, dateTimeFrom, currentTime} = dateTime;
    const { Summery: SummeryData, History } = data;
    const Summery = (SummeryData?.length && SummeryData[0]) || {}
    return `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>assetHistoryReport</title>
       <style>
           .header, .row, .headerTables{
               display: flex;
               flex-direction: row;
               justify-content: space-between;
           }
           .tableBorder{
               border: 1px solid;
           }
           table {
           border-collapse: collapse;
           width: 100%;
           text-align: left;
       }
       .rightNone{
           border-right: none;
       }
       .leftNone{
           border-left: none;
       }
       th, td {
           padding: 0.5em; /* Adjust this value as per your preference */
       }
       </style>
   </head>
   <body>
       <div class="header">
           <h1>Timeline Telematics</h1>
           <h2 style="background-color: lightgray; margin-top: 0; height: 30px;">Asset History Report</h2>
       </div>
       <div class="headerTables">
           <div>
               <table border="1">
                   <tr>
                       <th>Asset Name</th>
                       <td class="rightNone">${Summery?.assetName || "--"}</td>
                       <td class="leftNone">Group : ${Summery?.assetGroup || "--"}</td>
                   </tr>
                   <tr>
                       <th>Report Period</th>
                       <td colspan="2">${dateTimeFrom || "--"} to ${dateTimeTo || "--"}</td>
                   </tr>
                   <tr>
                       <th>Report Run Time</th>
                       <td colspan="2">${currentTime || "--"}</td>
                   </tr>
               </table>
               <div><span style="color: red;">*Note : </span>Mileage calculation based on Software, do not consider the starting mileage reading.</div>
               <br />
           </div>
           <div>
               <table border="1">
                   <tr>
                       <td>Total Mileage : ${Summery?.total_mileage || "--"}</th>
                       <td>Trip Mileage : ${Summery?.trip_mileage || "--"}</td>
                       <td>Off Set Mileage : ${Summery?.ofset_mileage || "--"}</td>
                       <td>Trip : ${Summery?.trip_count || "--"}</td>
                   </tr>
                   <tr>
                       <th>Start Location</th>
                       <td colspan="3">${Summery?.start_location || "--"}</td>
                   </tr>
                   <tr>
                       <th>End Location</th>
                       <td colspan="3">${Summery?.end_location || "--"}</td>
                   </tr>
               </table>
           </div>
       </div>
       <table border="1" style="text-align: center !important;">
           <tr style="background-color: lightgray;">
               <th rowspan="2">Sr.#</th>
               <th rowspan="2">GPS Datetime<br />(dd/mm/yyyy)</th>
               <th rowspan="2">ACC</th>
               <th rowspan="2">Status</th>
               <th rowspan="2">Speed<br />Km/Hr</th>
               <th rowspan="2">Mileage<br />Km</th>
               <th rowspan="2">Point<br /> ( Lat,Lng )</th>
               <th rowspan="2">LandMark</th>
               <th rowspan="2">Rec. Datetime<br />(dd/mm/yyyy)</th>
               <th rowspan="2">Gps</th>
               <th colspan="2">Battery Voltage</th>
           </tr>
           <tr style="background-color: lightgray;">
               <th>Int.</th>
               <th>Ext.</th>
           </tr>
           ${History?.length ? History.map((e, i) => {
        return (
            `<tr key={${i}}>
                <td>${i + 1}</td>
                <td>${e.gps_datetime || "--"}</td>
                <td>${e.acc_status || "--"}</td>
                <td>${e.veh_status || "--"}</td>
                <td>${e.speed || "--"}</td>
                <td>${e.mileage || "--"}</td>
                <td>${e.Point || "--"}</td>
                <td>${e.ref_loc || "--"}</td>
                <td>${e.rec_datetime || "--"}</td>
                <td>${e.gps_status || "--"}</td>
                <td>${e.int_bat_voltage || "--"}</td>
                <td>${e.ext_bat_voltage || "--"}</td>
            </tr>`
        )
    }).join("") : <></>}
       </table>
   </body>
   </html>`
} 