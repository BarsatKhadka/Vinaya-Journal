package com.vinaya_journal.app.Service;

import com.vinaya_journal.app.DTO.JournalEntryDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class JournalInsertService {
    public static String insertJournal(JournalEntryDTO journalEntryDTO){
        String sql = """
        INSERT INTO entries (content) VALUES(?)
        ON CONFLICT(entry_date) DO UPDATE SET
            content = excluded.content
        """;
        try(Connection conn = JournalDatabase.getConnection()){
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,journalEntryDTO.getContent());
            pstmt.executeUpdate();
            return "success";
        }
        catch(Exception e){
            return e.getMessage();
        }
    }
}
