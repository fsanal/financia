import pymysql


def get_session():
    return pymysql.connect(host='cis450.czwf6yzxfpm1.us-east-1.rds.amazonaws.com', port=3306, user='admin', password='BoombaZombie', db='data', cursorclass=pymysql.cursors.DictCursor)


def scan_headline():
    items = None
    connection = get_session()

    try:
        with connection.cursor() as cursor:
            sql = '''
                    SELECT *
                    FROM Headline
                    ORDER BY date ASC
                    LIMIT 27;     
                  '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items


def search_headlines_database(searchQuery, startdate, enddate):
    items = None
    connection = get_session()

    try:
        with connection.cursor() as cursor:
            sql = '''
                    SELECT *
                    FROM Headline
                    WHERE MATCH(headline) AGAINST ('{}' IN NATURAL LANGUAGE MODE)
                  '''.format(searchQuery)
            if startdate:
                sql = sql + " AND DATE(date) > '{}'".format(startdate)
            if enddate:
                sql = sql + " AND DATE(date) < '{}'".format(enddate)
            sql = sql + " LIMIT 27;"
            print(sql)
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')
    print(items)
    return items


def scan_events():
    items = None
    connection = get_session()

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


def get_headlines_for_event(event):
    items = None
    connection = get_session()

    try:
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT date, headline, sentiment_score
                    FROM Event_Association e JOIN Headline h
                    ON e.headline_id = h.id
                    WHERE event_id = {event}
                  '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items


def get_ids_with_term_year(term, year):
    items = None
    connection = get_session()

    try:
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT id
                    FROM Headline
                    WHERE headline LIKE "%{term}%"
                    AND YEAR(date) = "{year}"
                  '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    ids = []
    for item in items:
        ids.append(item['id'])

    return ids


def create_associations(event_id, headline_ids):
    connection = get_session()

    for headline_id in headline_ids:
        try:
            with connection.cursor() as cursor:
                sql = f'''
                        INSERT INTO Event_Association (event_id, headline_id)
                        VALUES ("{event_id}", "{headline_id}")
                      '''
                cursor.execute(sql)
                connection.commit()
        finally:
            print('Success!')


def get_impactful_events(sentiment_threshold):
    connection = get_session()
    items = None

    try:
        with connection.cursor() as cursor:
            sql = f'''
                    WITH temp AS (
                        SELECT COUNT(*) as number, Month(h.date) as month, Year(h.date) as year
                        FROM Headline h
                        WHERE h.sentiment_score > {sentiment_threshold}
                        GROUP BY Month(h.date), Year(h.date)
                    )
                    SELECT DISTINCT temp.month, temp.year, number, ev.name as name
                    FROM temp JOIN Headline h ON Month(h.date) = temp.month AND Year(h.date) = temp.year JOIN Event_Association eva ON h.id = eva.headline_id JOIN Economic_Event ev ON ev.id = eva.event_id 
                    WHERE temp.Number = (SELECT MAX(Number) FROM temp);
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items


def get_events_min_volumes():
    connection = get_session()
    items = None

    try:
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT ev.name as name, MIN(Volume) as min_volume
                    FROM Headline h JOIN Event_Association eva ON h.id = eva.headline_id JOIN Economic_Event ev ON ev.id = eva.event_id JOIN Intraday_Turnout It ON h.date = It.date
                    GROUP BY ev.name;
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items


def get_closings_dji():
    connection = get_session()
    items = None

    try: 
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT date AS x, close AS y
                    FROM Intraday_Turnout
                    WHERE index_symbol = 'DJI'
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items

def get_closings_gspc():
    connection = get_session()
    items = None

    try: 
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT date AS x, close AS y
                    FROM Intraday_Turnout
                    WHERE index_symbol = 'GSPC'
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items

def get_closings_ixic():
    connection = get_session()
    items = None

    try: 
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT date AS x, close AS y
                    FROM Intraday_Turnout
                    WHERE index_symbol = 'IXIC'
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items

def get_closings_rut():
    connection = get_session()
    items = None

    try: 
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT date AS x, close AS y
                    FROM Intraday_Turnout
                    WHERE index_symbol = 'RUT'
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items

def get_daily_change_dji():
    connection = get_session()
    items = None

    try: 
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT date, high - low as diff
                    FROM Intraday_Turnout
                    WHERE index_symbol = 'DJI'
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items

def get_volume_dji():
    connection = get_session()
    items = None

    try: 
        with connection.cursor() as cursor:
            sql = f'''
                    SELECT volume
                    FROM Intraday_Turnout
                    WHERE index_symbol = 'DJI'
                   '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items