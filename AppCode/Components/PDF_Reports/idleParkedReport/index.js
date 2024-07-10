export const idleParkedReportPDF = (data, dateTime, company) => {
    const { dateTimeTo, dateTimeFrom, currentTime } = dateTime;
    const { Summary: SummeryData, Detail } = data;
    const Summery = (SummeryData?.length && SummeryData[0]) || {}
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>IDLE PARKED Report</title>
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
    
            .borderNone {
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
        <div class="header">
            <h1>${company || "NA"}</h1>
            <h2 style="background-color: lightgray; margin-top: 0; height: 30px;">Asset Idle Parked Report</h2>
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
            </div>
        </div>
        <div style="margin-top: -50px; margin-bottom: 10px;">
            <table>
                <tr class="borderNone">
                    <td class="borderNone" colspan="8"></td>
                    <th class="borderNone" style="color: red;">Time Filter</th>
                    <td class="borderNone" style="color: red;">${Summery?.reportFilter || "--"}</td>
                </tr>
                <tr class="borderNone">
                    <td class="borderNone" colspan="8"></td>
                    <th class="tableBorder">Report Time</th>
                    <td class="tableBorder">${Summery?.totalTime || "--"}</td>
                </tr>
                <tr class="tableBorder">
                    <th class="tableBorder">Total Mileage :</th>
                    <td class="tableBorder">${Summery?.total_mileage || "--"}</td>
                    <th class="tableBorder">Trip Mileage :</th>
                    <td class="tableBorder">${Summery?.trip_mileage || "--"}</td>
                    <th class="tableBorder">OffSet Mileage :</th>
                    <td class="tableBorder">${Summery?.ofset_mileage || "--"}</td>
                    <th class="tableBorder">Trips :</th>
                    <td class="tableBorder">${Summery?.trip_count || "--"}</td>
                    <th class="tableBorder">Park Time</th>
                    <td class="tableBorder">${Summery?.stopTime || "--"}</td>
                </tr>
                <tr class="tableBorder">
                    <th class="tableBorder">First Stop At :</th>
                    <td class="tableBorder" colspan="7">${Detail[0]?.stop_at || "--"}</td>
                    <th class="tableBorder">Idle Time</th>
                    <td class="tableBorder">${Summery?.idleTime || "--"}</td>
                </tr>
                <tr class="tableBorder">
                    <th class="tableBorder">Last Stop At :</th>
                    <td class="tableBorder" colspan="7">${Detail[Detail.length - 1]?.stop_at || "--"}</td>
                    <th class="tableBorder">Drive Time</th>
                    <td class="tableBorder">${Summery?.driveTime || "--"}</td>
                </tr>
            </table>
        </div>
        <table border="1" style="text-align: center !important;">
            <tr style="background-color: lightgray;">
                <th>Sr.#</th>
                <th>Stop At</th>
                <th>Move At</th>
                <th>Idle Duration</th>
                <th>Parked Duration</th>
                <th>Site</th>
            </tr>
            ${Detail?.length ? Detail.map((e, i) => {
        return (
            `<tr key={${i}}>
                                                        <td>${i + 1}</td>
                                                        <td>${e.stop_at || "--"}</td>
                                                        <td>${e.move_at || "--"}</td>
                                                        <td>${e.Idle_duration || "--"}</td>
                                                        <td>${e.stop_duration || "--"}</td>
                                                        <td>${e.ref_loc || "--"}</td>
                                                    </tr>`
        )
    }).join("") : <></>}
        </table>
    </body>
    
    </html>`
}