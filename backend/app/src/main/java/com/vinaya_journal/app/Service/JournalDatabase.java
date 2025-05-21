package com.vinaya_journal.app.Service;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class JournalDatabase {
    private static String DBFolder = System.getProperty("user.home") + "/vinayadb";
    private static String DBFile = DBFolder + "/journalEntries.db";
    private static String finalDbUrl = "jdbc:sqlite:" + DBFile;

    public static void initialize(){
        try{
            File folder = new File(DBFolder);
            if(!folder.exists()){
                folder.mkdirs();
            }
            try(Connection conn = DriverManager.getConnection(finalDbUrl)){
                if(conn !=null){
                    System.out.println("Connected to sql lite" + finalDbUrl);
                    createTables(conn);
                }
            }
        }
        catch(Exception e){
            System.out.println(e);
        }
        System.out.println(finalDbUrl);
    }

    public static void createTables(Connection conn) throws SQLException {
        String sql = """
                CREATE TABLE IF NOT EXISTS entries(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT,
                entry_date TEXT UNIQUE DEFAULT CURRENT_DATE,
                created_at TEXT DEFAULT (datetime('now','localtime')),
                modified_at TEXT DEFAULT (datetime('now','localtime'))
                );
                """;
        try(Statement stmt = conn.createStatement()){
                stmt.execute(sql);
        }
    }

    public static Connection getConnection() throws SQLException{
        return DriverManager.getConnection(finalDbUrl);
    }

}
