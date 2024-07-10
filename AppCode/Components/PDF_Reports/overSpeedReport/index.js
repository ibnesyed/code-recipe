export const overSpeedReportPDF = (data, dateTime, company) => {
    const { dateTimeTo, dateTimeFrom, currentTime, speedLimit } = dateTime;
    const { Summery: SummeryData, pr_report_design_over_speed } = data;
    const Summery = (SummeryData?.length && SummeryData[0]) || {}
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Over Speed Report</title>
        <style>
            .header,
            .row,
            .headerTables {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 10px;
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
    
            th,
            td {
                padding: 0.5em;
                /* Adjust this value as per your preference */
            }
        </style>
    </head>
    
    <body>
        <div class="header">
            <h1>${company || "NA"}</h1>
            <h2 style="background-color: lightgray; margin-top: 0; height: 30px;">Asset Over Speed Report</h2>
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
                        <td colspan="2">${dateTimeFrom} to ${dateTimeTo}</td>
                    </tr>
                    <tr>
                        <th>Report Run Time</th>
                        <td colspan="2">${currentTime}</td>
                    </tr>
                </table>
                <!-- <div><span style="color: red;">*Note : </span>Mileage calculation based on Device.</div> -->
                <br />
            </div>
            <div>
                <table>
                    <tr>
                        <td>Print By : sysadmin</td>
                    </tr>
                    <tr>
                        <td style="color: red;">*Remarks : ${Summery?.remarks || "--"}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="margin-bottom: 10px;">
    
            <table border="1">
                <tr>
                    <th>Total Mileage</th>
                    <td>${Summery?.total_mileage || "--"}</td>
                    <th>Trip Mileage</th>
                    <td>${Summery?.trip_mileage || "--"}</td>
                    <th>OffSet Mileage</th>
                    <td>${Summery?.trip_mileage || "--"}</td>
                    <th>Trips</th>
                    <td>${Summery?.trip_count || "--"}</td>
                    <th>Park Time</th>
                    <td>${Summery?.stopTime || "--"}</td>
                </tr>
                <tr>
                    <th colspan="2">Start Over Speed At :</th>
                    <td colspan="6">${pr_report_design_over_speed[0]?.startAtLoc || "--"}</td>
                    <th>Idle Time</th>
                    <td>${Summery?.idleTime || "--"}</td>
                </tr>
                <tr>
                    <th colspan="2">End Over Speed At :</th>
                    <td colspan="6">${pr_report_design_over_speed[pr_report_design_over_speed.length - 1]?.endAtLoc || "--"}</td>
                    <th>Drive Time</th>
                    <td>${Summery?.driveTime || "--"}</td>
                </tr>
            </table>
        </div>
        <table border="1" style="text-align: center !important;">
            <tr style="background-color: lightgray;">
                <th>Sr.#</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Max<br />Speed</th>
                <th>Avg<br />Speed</th>
                <th>Mileage</th>
                <th>Duration</th>
                <th>Start At Location</th>
                <th>End At Location</th>
            </tr>
            ${pr_report_design_over_speed?.length ? pr_report_design_over_speed.map((e, i) => {
        return (
            `<tr key={${i}}>
                                                                <td>${i + 1}</td>
                                                                <td>${e.startTime || "--"}</td>
                                                                <td>${e.endTime || "--"}</td>
                                                                <td>${e.maxSpeed || "--"}</td>
                                                                <td>${e.avgSpeed || "--"}</td>
                                                                <td>${e.mileage || "--"}</td>
                                                                <td>${e.duration || "--"}</td>
                                                                <td>${e.startAtLoc || "--"}</td>
                                                                <td>${e.endAtLoc || "--"}</td>
                                                            </tr>`
        )
    }).join("") : <></>}
        </table>
    
    </body>
    
    </html>`
}