package com.vinaya_journal.app.Service;

import com.vinaya_journal.app.DTO.JournalEntryRecordDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class JournalRangeService {

    /**
     * Returns every entry whose entry_date falls within [start, end] (inclusive),
     * ordered chronologically. Dates are ISO strings (YYYY-MM-DD), which compare
     * correctly as text in SQLite.
     */
    public static List<JournalEntryRecordDTO> retrieveRange(String start, String end) {
        List<JournalEntryRecordDTO> entries = new ArrayList<>();
        String sql = "SELECT entry_date, content FROM entries " +
                "WHERE entry_date BETWEEN ? AND ? " +
                "AND content IS NOT NULL AND trim(content) != '' " +
                "ORDER BY entry_date ASC";
        try(Connection conn = JournalDatabase.getConnection()){
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, start);
            pstmt.setString(2, end);
            ResultSet rs = pstmt.executeQuery();
            while(rs.next()){
                entries.add(new JournalEntryRecordDTO(
                        rs.getString("entry_date"),
                        rs.getString("content")
                ));
            }
        } catch (SQLException e) {
            return entries;
        }
        return entries;
    }
}
