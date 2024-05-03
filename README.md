Database Dump

    We assume that you already have the PostgreSQL server set up.
    On Windows
        0. Make sure PostgreSQL is running
        1. Add PostgreSQL/{version}/bin to PATH
        2. Add PostgreSQL/{version}/lib to PATH
        3. Open Windows PowerShell
        4. cd into a directory you want the database to export to
        5. Run the command "pg_dump -U postgres PromptLibrary > database.txt" without quotation marks
        6. Type your password for the server

    To load the database from a dump
    On Windows
        0. Delete your current database if you have one
        1. Remake a new one with the name PromptLibrary
        2. Open Windows PowerShell
        3. cd into the directory with the db dump
        4. Run the command "cat dump.txt | psql PromptLibrary postgres"
