export const summeryReportPDF = (data, dateTime) => {
    const { dateTimeTo, dateTimeFrom, currentTime } = dateTime;
    const { Summery: SummeryData, Summery_Idle, Summery_Parked, Summery_Speed, Summery_Status, pr_Trip } = data;
    const Summery = (SummeryData?.length && SummeryData[0]) || {}
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Summery Report</title>
        <style>
            .header,
            .row,
            .headerTables {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
    
            .tableBorder {
                border: 1px solid;
            }
    
            table {
                border-collapse: collapse;
                width: 100%;
                text-align: left;
            }
    
            .rightNone {
                border-right: none;
            }
    
            .leftNone {
                border-left: none;
            }
    
            .bordernone {
                border: none;
            }
    
            th,
            td {
                padding: 0.5em;
                /* Adjust this value as per your preference */
            }
        </style>
    </head>
    
    <body>
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
                        <td colspan="2">${dateTimeFrom} to ${dateTimeTo}</td>
                    </tr>
                    <tr>
                        <th>Report Run Time</th>
                        <td colspan="2">${currentTime}</td>
                    </tr>
                </table>
                <div><span style="color: red;">*Note : </span>Mileage calculation based on Device.</div>
                <br />
                <div class="headerTables">
                    <div>
    
                        <table border="1">
                            <tr>
                                <th>Total Trip Time</th>
                                <td>${Summery?.tripTime || "--"}</td>
                            </tr>
                            <tr>
                                <th>Total Drive Time</th>
                                <td>${Summery?.driveTime || "--"}</td>
                            </tr>
                            <tr>
                                <th>Total Idle Time</th>
                                <td>${Summery?.idleTime || "--"}</td>
                            </tr>
                            <tr>
                                <th>Total Stop Time</th>
                                <td>${Summery?.stopTime || "--"}</td>
                            </tr>
                            <tr>
                                <th>Speed Limit</th>
                                <td>${Summery?.nothing || "--"}</td>
                            </tr>
                            <tr>
                                <th>Over Speed</th>
                                <td>${Summery?.nothing || "--"}</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <table border="1">
                            <tr>
                                <th>Total Mileage</th>
                                <td>${Summery?.total_mileage || "--"}</td>
                            </tr>
                            <tr>
                                <th>Trip Mileage</th>
                                <td>${Summery?.trip_mileage || "--"}</td>
                            </tr>
                            <tr>
                                <th>OffSet Mileage</th>
                                <td>${Summery?.ofset_mileage || "--"}</td>
                            </tr>
                            <tr>
                                <th>Trips Count</th>
                                <td>${Summery?.trip_count || "--"}</td>
                            </tr>
                            <tr>
                                <th>Stops Count</th>
                                <td>${Summery?.stops_count || "--"}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <br />
                <div style="margin-bottom: 20px;">
                    <table border="1">
                        <tr>
                            <th>First Trip Start At</th>
                            <td>${pr_Trip[0]?.start_at || "--"}</td>
                        </tr>
                        <tr>
                            <th>Last Trip End At</th>
                            <td>${pr_Trip[pr_Trip.length - 1]?.end_at || "--"}</td>
                        </tr>
                    </table>
                </div>
                <h2 style="background-color: lightgray; padding-left: 25px;padding-right: 25px; display: inline;">Trips
                    Detail</h2>
    
            </div>
            <div>
                <h2 style="background-color: lightgray; padding-left: 25px;padding-right: 25px; display: inline;">Asset
                    Summery Report</h2>
                <div style="margin: 75px;">
                    <table border="1">
                    ${!!Summery_Status?.length && Summery_Status.map((item, index) => `
    <tr class="bordernone" key={${index}}>
      <td class="bordernone">
        <div style="height: 10px; width: 10px; background-color: ${(item.vehStatus === "Idle" && "blue") || (item.vehStatus === "Moving" && "green") || (item.vehStatus === "Parked" && "orange")};"></div>
      </td>
      <td class="bordernone">${item.vehStatus}</td>
      <td class="bordernone">${item.val + "%" || "--"}</td>
    </tr>
  `).join('')}
                        
                        <tr>
                            <td class="bordernone"></td>
                            <td class="bordernone">Total</td>
                                <td class="bordernone">${Summery_Status.reduce((total, item) => total + (item.val || 0), 0)}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <table border="1" style="text-align: center !important;">
            <tr style="background-color: lightgray;">
                <th>Sr.#</th>
                <th>Start At<br />(dd/mm/yyyy)</th>
                <th>End At<br />(dd/mm/yyyy)</th>
                <th>Trip Time</th>
                <th>Drive Time</th>
                <th>Idle Time</th>
                <th>Start<br />Km</th>
                <th>End<br />Km</th>
                <th>Dist.<br />Km</th>
                <th>Start Location</th>
                <th>End Location</th>
            </tr>
            ${pr_Trip?.length ? pr_Trip.map((e, i) => {
        return (
            `<tr key={${i}}>
                                <td>${i + 1}</td>
                                <td>${e.start_at || "--"}</td>
                                <td>${e.end_at || "--"}</td>
                                <td>${e.trip_time || "--"}</td>
                                <td>${e.drive_time || "--"}</td>
                                <td>${e.idle_time || "--"}</td>
                                <td>${e.start_km || "--"}</td>
                                <td>${e.end_km || "--"}</td>
                                <td>${e.distance || "--"}</td>
                                <td>${e.start_loc || "--"}</td>
                                <td>${e.end_loc || "--"}</td>
                            </tr>`
        )
    }).join("") : <></>}
            </table>
    </body>
    
    </html>`
}