//Find total page views per day for December 2013
db.web_traffic.aggregate(
[
    {
            $match: {visited_at: {$gte: new Date(2013, 11, 1), $lt: new Date(2014, 0, 1)}}
    },
    {
        $project: {
                    _id: 0,
                    day_of_month: {$dayOfMonth: "$visited_at"}
                },
    },
    {
        $group: {
                _id: {day_of_month: "$day_of_month"},
                hits: {$sum: 1}
            }
    }, { $sort: {hits: -1}}
]);

//Find average, maximum and minimum response times (in seconds)
db.web_traffic.aggregate(
[
    {
        $group:{
                    _id:null,
                    avg_response_time_ms: {$avg: "$response_time_ms"},
                    max_response_time_ms: {$max: "$response_time_ms"},
                    min_response_time_ms: {$min: "$response_time_ms"}
                }
    },
    {
        $project:{
                    _id: 0,
                    avg_response_time_s: {$divide: ["$avg_response_time_ms", 1000]},
                    max_response_time_s: {$divide: ["$max_response_time_ms", 1000]},
                    min_response_time_s: {$divide: ["$min_response_time_ms", 1000]}
        }
    }
]);

//Find percentage share of users' browsers
var total = db.web_traffic.find({user_agent: {$exists:true}}).count();

var pipeline = [
    {
        $group: {_id: "$user_agent", count: {$sum: 1}}
    },
    {
        $project: {percentage: {$multiply: ["$count", 100 / total]}}
    },
    {
        $sort: {percentage: -1}
    }
];

db.web_traffic.aggregate(pipeline);

//Find weekly visit pattern of each user on the site.
db.web_traffic.aggregate([
{
    $project: {
                _id: 0,
                page: 1,
                ip_address: 1,
                visited_weekday: {$dayOfWeek: "$visited_at"}
    }
},
{
    $group: {
                _id: {visited_weekday: "$visited_weekday", ip_address: "$ip_address"},
                visits: {$sum: 1},
                pages_visited: {$addToSet: "$page"}
    }
},
{
    $sort: {"_id.visited_weekday": 1}
}
]);

//Find time spent on the site by each user
db.web_traffic.aggregate([
{
    $match: {visited_at: {$gte: new Date(2013, 11, 7),
                         $lt: new Date(2013, 11, 8)}}
},
{
    $sort: {visited_at: 1}
},
{
    $group: {
                _id: "$ip_address",
                first_visit: {$first: "$visited_at"},
                last_visit: {$last: "$visited_at"},
                total_visits: {$sum: 1}
    }
},
{
    $match: {
        total_visits: {$gt: 1}
    }
},
{
    $project: {
        duration_hours: {$subtract: [{$hour: "$last_visit"}, {$hour: "$first_visit"}]}
    }
},
{
    $sort: {duration_hours: -1}
}
]);