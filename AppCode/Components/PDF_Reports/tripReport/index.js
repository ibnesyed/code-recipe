export const tripReportPDF = (data, dateTime, company) => {
    const { dateTimeTo, dateTimeFrom, currentTime } = dateTime;
    const { Summery: SummeryData, TripsDetail } = data;
    const Summery = (SummeryData?.length && SummeryData[0]) || {}
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Asset Trip Report</title>
        <style>
            .header, .row, .headerTables{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 10px;
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
            <h1>${company || "NA"}</h1>
            <h2 style="background-color: lightgray; margin-top: 0; height: 30px;">Asset Trip Report</h2>
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
                <div><span style="color: red;">*Note : </span>Mileage calculation based on Device.</div>
                <br />
            </div>
            <div>
                <table border="1">
                    <tr>
                        <!-- <td colspan="6"> -->
                            <td colspan="2">Total Mileage :</td>
                            <td>${Summery?.total_mileage || "--"}</td>
                            <td>Trip Mileage :</td>
                            <td>${Summery?.trip_mileage || "--"}</td>
                            <td>Off Set Mileage :</td>
                            <td>${Summery?.ofset_mileage || "--"}</td>
                            <td>Trip :</td>
                            <td>${Summery?.trip_count || "--"}</td>
                        <!-- </td> -->
                    </tr>
                    <tr>
                        <th colspan="2">Total Trip Time</th>
                        <td>01 days:02:26:23${Summery?.tripTime || "--"}</td>
                        <th colspan="2">Total Drive Time</th>
                        <td>02:26:23 ${Summery?.driveTime || "--"}</td>
                        <th colspan="2">Total Idle Time</th>
                        <td>02:26:23 ${Summery?.idleTime || "--"}</td>
                    </tr>
                    <tr>
                        <th colspan="2">Start Location</th>
                        <td colspan="7">${Summery?.start_location || "--"}</td>
                    </tr>
                    <tr>
                        <th colspan="2">End Location</th>
                        <td colspan="7">${Summery?.end_location || "--"}</td>
                    </tr>
                </table>
            </div>
        </div>
        <table border="1" style="text-align: center !important;">
            <tr style="background-color: lightgray;">
                <th>Sr.#</th>
                <th>Start At<br />(dd/mm/yyyy)</th>
                <th>End At</th>
                <th>Trip Time</th>
                <th>Drive Time</th>
                <th>Idle Time</th>
                <th>Start<br />Km</th>
                <th>End<br />Km</th>
                <th>Dist.<br />Km</th>
                <th>Start Location</th>
                <th>End Location</th>
            </tr>
            ${TripsDetail?.length ? TripsDetail.map((e, i) => {
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