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
                    ORDER BY date DESC
                    LIMIT 9;     
                  '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items

def search_headlines_database(searchQuery):
    items = None
    connection = get_session()
    
    try:
        with connection.cursor() as cursor:
            sql = '''
                    SELECT *
                    FROM Headline
                    WHERE MATCH(headline) AGAINST ('{}' IN NATURAL LANGUAGE MODE)
                    LIMIT 9;     
                  '''.format(searchQuery)
            print(sql)
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items





