package com.vinaya_journal.app.Service;

import com.vinaya_journal.app.DTO.JournalEntryDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class JournalInsertService {
    public static String insertJournal(JournalEntryDTO journalEntryDTO){
        String sql = "INSERT INTO entries (title,content,created_at) VALUES(?,?,datetime('now'))";
        try(Connection conn = JournalDatabase.getConnection()){
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, journalEntryDTO.getTitle());
            pstmt.setString(2,journalEntryDTO.getContent());
            pstmt.executeUpdate();
            return "success";
        }
        catch(Exception e){
            System.out.println("Hello");
            return e.getMessage();
        }
    }
}
