package com.vinaya_journal.app.Service;

import com.vinaya_journal.app.DTO.JournalEntryDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class JournalInsertService {
    private void insertJournal(JournalEntryDTO journalEntryDTO){
        String sql = "INSERT INTO entries (title,content,created_at) VALUES(?,?,datetime('now'))";
        try(Connection conn = JournalDatabase.getConnection()){
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, journalEntryDTO.getTitle());
            pstmt.setString(2,journalEntryDTO.getContent());
            pstmt.executeUpdate();
        }
        catch(Exception e){
            System.out.println("Hello");
        }
    }
}
