import pymysql

def get_session():
    return pymysql.connect(host='cis450.czwf6yzxfpm1.us-east-1.rds.amazonaws.com', port=3306, user='admin', password='BoombaZombie', db='data')

def scan_headline():
    items = None
    connection = get_session()
    
    try:
        with connection.cursor() as cursor:
            sql = '''
                    SELECT *
                    FROM Headline
                    ORDER BY date DESC;     
                  '''
            cursor.execute(sql)
            items = cursor.fetchall()
    finally:
        print('Success!')

    return items

