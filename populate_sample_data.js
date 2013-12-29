var COLLECTION_NAME = 'web_traffic';

var getRandomInteger = function(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

var getRandomTimeStamp = function(){
    
    var day = getRandomInteger(1, 31);
    var hour = getRandomInteger(9, 20);
    var minute = getRandomInteger(1, 60);
    var second = getRandomInteger(1, 60);
    
    return new Date(2013, 11, day, hour, minute, second);
};

var getRandomArrayElement = function(array) {
    return array[getRandomInteger(0, array.length - 1)];
};

var ipAddress =
                [
                    '184.73.184.88',
                    '23.22.63.122',
                    '54.242.96.212',
                    '75.101.212.19',
                    '107.21.140.17',
                    '174.129.138.103',
                    '46.137.12.28',
                    '2.44.59.239',
                    '4.242.114.0',
                    '50.17.117.28'
                ];

var pageLinks = [
                    '/2008/12/17/a-pair-of-simple-but-useful-code-conventions-in-javascript',
                    '/2012/03/26/tab-completion-for-fabric-tasks-on-os-x',
                    '/2011/11/24/random-snaps-from-thailand-tour',
                    '/2011/10/03/learn-core-python-from-stackoverflow',
                    '/2011/05/06/making-chrome-canary-the-default-browser-os-x',
                    '/2011/03/04/getting-started-with-pipvirtualenv',
                    '/2011/01/29/on-programming-and-craftsmanship',
                    '/2011/01/02/blog-stats-2010/',
                    '/2010/05/07/moments-from-darjeeling',
                    '/2010/02/05/modifying-pdf-files-with-php'
];

var userAgents = [
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1309.0 Safari/537.17',
                    'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.15 (KHTML, like Gecko) Chrome/24.0.1295.0 Safari/537.15',
                    'Mozilla/6.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1',
                    'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:15.0) Gecko/20100101 Firefox/15.0.1',
                    'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
                    'Mozilla/5.0 (compatible; MSIE 10.0; Macintosh; Intel Mac OS X 10_7_3; Trident/6.0)',
                    'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25',
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2'
];

/*
fields: page, visited_at, user_agent, ip_address, response_time 
*/


var collection = db.getCollection(COLLECTION_NAME);

//drop existing data
collection.remove();

for (var i = 0; i < 1000; i += 1){
    var doc = {
                page : getRandomArrayElement(pageLinks),
                visited_at : getRandomTimeStamp(),
                user_agent : getRandomArrayElement(userAgents),
                ip_address : getRandomArrayElement(ipAddress),
                response_time_ms : getRandomInteger(175, 225) + getRandomInteger(25, 75) / 100
            };

    collection.insert(doc);
};