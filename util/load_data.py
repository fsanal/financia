import pymysql
from textblob import TextBlob

connection = pymysql.connect(host='cis450.czwf6yzxfpm1.us-east-1.rds.amazonaws.com',
                             port=3306, user='admin', password='BoombaZombie', db='data')


def put_dji():
    count = len(open('^DJI.csv', 'r').readlines()) - 1
    f = open('^DJI.csv', 'r')

    f.readline()
    line = f.readline()
    i = 1
    while line:
        contents = line.split(',')
        date = contents[0]
        price_open = contents[1]
        price_high = contents[2]
        price_low = contents[3]
        price_close = contents[4]
        volume = contents[6]
        symbol = 'DJI'

        try:
            with connection.cursor() as cursor:
                sql = f'''
                        INSERT INTO Intraday_Turnout
                        VALUES ("{date}", {price_open}, {price_high}, {price_low}, {price_close}, {volume}, "{symbol}")
                       '''
                cursor.execute(sql)
                connection.commit()
        finally:
            print(f'{i}/{count}')
            i += 1

        line = f.readline()

    f.close()


def put_gspc():
    count = len(open('^GSPC.csv', 'r').readlines()) - 1
    f = open('^GSPC.csv', 'r')

    f.readline()
    line = f.readline()
    i = 1
    while line:
        contents = line.split(',')
        date = contents[0]
        price_open = contents[1]
        price_high = contents[2]
        price_low = contents[3]
        price_close = contents[4]
        volume = contents[6]
        symbol = 'GSPC'

        try:
            with connection.cursor() as cursor:
                sql = f'''
                        INSERT INTO Intraday_Turnout
                        VALUES ("{date}", {price_open}, {price_high}, {price_low}, {price_close}, {volume}, "{symbol}")
                       '''
                cursor.execute(sql)
                connection.commit()
        finally:
            print(f'{i}/{count}')
            i += 1

        line = f.readline()


def put_ixic():
    count = len(open('^IXIC.csv', 'r').readlines()) - 1
    f = open('^IXIC.csv', 'r')

    f.readline()
    line = f.readline()
    i = 1
    while line:
        contents = line.split(',')
        date = contents[0]
        price_open = contents[1]
        price_high = contents[2]
        price_low = contents[3]
        price_close = contents[4]
        volume = contents[6]
        symbol = 'IXIC'

        try:
            with connection.cursor() as cursor:
                sql = f'''
                        INSERT INTO Intraday_Turnout
                        VALUES ("{date}", {price_open}, {price_high}, {price_low}, {price_close}, {volume}, "{symbol}")
                       '''
                cursor.execute(sql)
                connection.commit()
        finally:
            print(f'{i}/{count}')
            i += 1

        line = f.readline()

    f.close()


def put_rut():
    count = len(open('^RUT.csv', 'r').readlines()) - 1
    f = open('^RUT.csv', 'r')

    f.readline()
    line = f.readline()
    i = 1
    while line:
        contents = line.split(',')
        date = contents[0]
        price_open = contents[1]
        price_high = contents[2]
        price_low = contents[3]
        price_close = contents[4]
        volume = contents[6]
        symbol = 'RUT'

        try:
            with connection.cursor() as cursor:
                sql = f'''
                        INSERT INTO Intraday_Turnout
                        VALUES ("{date}", {price_open}, {price_high}, {price_low}, {price_close}, {volume}, "{symbol}")
                       '''
                cursor.execute(sql)
                connection.commit()
        finally:
            print(f'{i}/{count}')
            i += 1

        line = f.readline()

    f.close()


def put_news():
    count = len(open('RedditNews.csv', 'r').readlines()) - 1
    f = open('RedditNews.csv', 'r')

    f.readline()
    line = f.readline()
    i = 1
    while line:
        contents = line.split(',')
        date = contents[0]
        headline = contents[1]
        headline = headline.replace('"', '')
        headline = headline.replace("'", '')

        try:
            with connection.cursor() as cursor:
                sql = f'''
                        INSERT INTO Headline (`date`, `headline`)
                        VALUES ("{date}", "{headline}")
                       '''
                cursor.execute(sql)
                connection.commit()
        finally:
            print(f'{i}/{count}')
            i += 1

        line = f.readline()

    f.close()


def get_events():
    items = None
    try:
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT *
                    FROM Economic_Event
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items


def get_headlines(keyword):
    items = None
    try:
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT *
                    FROM Headline
                    WHERE headline LIKE "%{keyword}%"
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items


def put_event_association(event_id, headline_id):
    try:
        with connection.cursor() as cursor:
            sql = f'''
                    INSERT INTO Event_Association (`event_id`, `headline_id`)
                    VALUES ({event_id}, {headline_id})
                   '''
            cursor.execute(sql)
            connection.commit()
    finally:
        print('Success!')


def find_associations():
    events = get_events()

    for event in events:
        id = event[0]
        print(f'Event: {id}')
        name = event[1]
        headlines = get_headlines(name)
        i = 1
        for headline in headlines:
            put_event_association(id, headline[0])
            print(f'{i}/{len(headlines)}')
            i += 1


def compute_sentiments():
    items = None
    try:
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT *
                    FROM Headline
                    WHERE sentiment_score IS NULL
                    LIMIT 10000                 
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    tuples = ''
    i = 1
    for row in items:
        sentiment = 0
        sentiment = TextBlob(str(row[1])).sentiment.polarity
        headline = row[1]
        headline = headline.replace('"', '')
        headline = headline.replace("'", '')
        headline = headline.replace("\\", '')
        tuples += f'({row[0]}, "{headline}", "{row[2]}", {sentiment}),'
        print(f'{i}/{len(items)}')
        i += 1
    tuples = tuples[:-1]

    try:
        with connection.cursor() as cursor:
            sql = f'''
                    INSERT INTO Headline (id, headline, date, sentiment_score)
                    VALUES
                    {tuples}
                    ON DUPLICATE KEY UPDATE
                    headline = VALUES(headline),
                    date = VALUES(date),
                    sentiment_score = VALUES(sentiment_score)
                   '''
            cursor.execute(sql)
            connection.commit()
    finally:
        print('Success!')
