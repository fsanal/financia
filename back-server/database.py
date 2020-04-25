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
            sql = '''
                    SELECT *
                    FROM Economic_Event    
                  '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')
    
    return items





