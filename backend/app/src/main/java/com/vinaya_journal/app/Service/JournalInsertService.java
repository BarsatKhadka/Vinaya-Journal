package com.vinaya_journal.app.Service;

import com.vinaya_journal.app.DTO.InsertServiceResultDTO;
import com.vinaya_journal.app.DTO.JournalEntryDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.time.LocalDateTime;

public class JournalInsertService {
    public static InsertServiceResultDTO insertJournal(JournalEntryDTO journalEntryDTO){
        String sql = """
        INSERT INTO entries (content, entry_date, created_at, modified_at) 
        VALUES (?, date('now','localtime'), datetime('now','localtime'), datetime('now','localtime'))
        ON CONFLICT(entry_date) DO UPDATE SET
        content = excluded.content,
        modified_at = datetime('now', 'localtime')
        """;

        try(Connection conn = JournalDatabase.getConnection()){
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,journalEntryDTO.getContent());
            pstmt.executeUpdate();
            return new InsertServiceResultDTO(true, LocalDateTime.now().toString());
        }
        catch(Exception e){
            return new InsertServiceResultDTO(false, e.getMessage());
        }
    }
}
