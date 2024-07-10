export const kilometerReportPDF = (data, dateTime, company) => {
    const { dateTimeTo, dateTimeFrom, currentTime } = dateTime;
    const { Summery: SummeryData, pr_rpt_Mileage } = data;
    const Summery = (SummeryData?.length && SummeryData[0]) || {}
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kilometer Report</title>
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
            <h1>${company || "NA"}</h1>
            <h2 style="background-color: lightgray; margin-top: 0; height: 30px;">Asset Kilometer Report</h2>
        </div>
        <div class="headerTables">
            <div>
                <table border="1">
                    <tr>
                        <th>Asset Name</th>
                        <td class="rightNone">${Summery?.assetGroup || "--"}</td>
                        <td class="leftNone">Group : ${Summery?.assetName || "--"}</td>
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
                <div><span style="color: red;">*Note : </span>Mileage calculation based on Device mileage.</div>
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
                    <td colspan="3">${pr_rpt_Mileage[0]?.loc_start || "--"}</td>
                    </tr>
                    <tr>
                        <th>End Location</th>
                    <td colspan="3">${pr_rpt_Mileage[pr_rpt_Mileage.length - 1]?.loc_end || "--"}</td>
                    </tr>
                </table>
            </div>
        </div>
        <table border="1" style="text-align: center !important;">
            <tr style="background-color: lightgray;">
                <th>Sr.#</th>
                <th>GPS Date<br />(dd/mm/yyyy)</th>
                <th>Start Km</th>
                <th>End Km</th>
                <th>Total Mileage<br />Km/Hr</th>
                <th>Trip Mileage<br />Km</th>
                <th>Offset Mileage<br />Km</th>
                <th>Starting Location</th>
                <th>Ending Location</th>
            </tr>
            ${pr_rpt_Mileage?.length ? pr_rpt_Mileage.map((e, i) => {
        return (
            `<tr key={${i}}>
                                                <td>${i + 1}</td>
                                                <td>${e.gps_datetime || "--"}</td>
                                                <td>${e.KmStart || "--"}</td>
                                                <td>${e.KmEnd || "--"}</td>
                                                <td>${e.TotalKm || "--"}</td>
                                                <td>${e.TripKm || "--"}</td>
                                                <td>${e.OffsetKm || "--"}</td>
                                                <td>${e.loc_start || "--"}</td>
                                                <td>${e.loc_end || "--"}</td>
                                            </tr>`
        )
    }).join("") : <></>}
        </table>
    </body>
    </html>`
}