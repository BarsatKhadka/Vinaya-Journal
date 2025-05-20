package com.vinaya_journal.app.Service;

import java.io.File;

public class JournalDatabase {
    private static String DBFolder = System.getProperty("user.home") + "/.vinaya";
    private static String DBFile = DBFolder + "/journalEntries.db";
    private static String finalDbUrl = "jdbc:sqlite:" + DBFile;

    public static void initialize(){
        try{
            File folder = new File(DBFolder);
            if(!folder.exists()){
                folder.mkdirs();
            }
        }
        catch(Exception e){
            System.out.println(e);
        }
        System.out.println(finalDbUrl);
    }

}
