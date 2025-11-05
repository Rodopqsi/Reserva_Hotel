# Allow using PyMySQL as MySQLdb on Windows where mysqlclient is hard to install
try:
    import pymysql  # type: ignore
    pymysql.install_as_MySQLdb()
except Exception:
    # It's fine if PyMySQL isn't present during initial scaffolding
    pass
