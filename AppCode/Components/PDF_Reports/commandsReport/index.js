export const commandsReportPDF = (data, dateTime, company) => {
    const { dateTimeTo, dateTimeFrom, currentTime } = dateTime;
    const { Summery: SummeryData, pr_rpt_commands } = data;
    const Summery = (SummeryData?.length && SummeryData[0]) || {}
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Command Report</title>
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
            <h2 style="background-color: lightgray; margin-top: 0; height: 30px;">Asset Commands Report</h2>
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
                <br />
            </div>
        </div>
        <table border="1" style="text-align: center !important;">
            <tr style="background-color: lightgray;">
                <th>Sr.#</th>
                <th>Send DateTime<br />(dd/mm/yyyy)</th>
                <th>Command</th>
                <th>Channel</th>
                <th>Response</th>
                <th>Sent By</th>
                <th>Workstation</th>
            </tr>
            ${pr_rpt_commands?.length ? pr_rpt_commands.map((e, i) => {
                return (
                    `<tr key={${i}}>
                                                        <td>${i + 1}</td>
                                                        <td>${e.cmd_send_datetime || "--"}</td>
                                                        <td>${e.cmd_name || "--"}</td>
                                                        <td>${e.cmd_channel || "--"}</td>
                                                        <td>${e.cmd_response || "--"}</td>
                                                        <td>${e.cmd_send_by || "--"}</td>
                                                        <td>${e.cmd_host_name || "--"}</td>
                                                    </tr>`
                )
            }).join("") : <></>}
            <tr key={0}>
                 <td>1</td>
                 <td>2023-06-12T07:36:31.74</td>
                 <td>On</td>
                 <td>Idle</td>
                 <td>--</td>
                 <td>88299.696</td>
                 <td>29.61294,71.518272</td>
             </tr>
        </table>
        <h2>Summery</h2>
        <table border="1">
         <tr>
             <td>${Summery?.remarks || "--"}</td>
         </tr>
        </table>
    </body>
    </html>`
}