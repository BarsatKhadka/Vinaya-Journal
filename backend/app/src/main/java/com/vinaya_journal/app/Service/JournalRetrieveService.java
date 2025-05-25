package com.vinaya_journal.app.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JournalRetrieveService {
    public static String retrieveJournal(String date)  {
        String sql = "SELECT content FROM entries WHERE entry_date = ?";
        try(Connection conn = JournalDatabase.getConnection()){
            PreparedStatement ptsmt = conn.prepareStatement(sql);
            ptsmt.setString(1, date);
            ResultSet rs = ptsmt.executeQuery();
            while(rs.next()){
                String content = rs.getString("content");
                return content;
            }

        } catch (SQLException e) {
            return "Nothing found";
        }
        return "Nothing found";
    }
}
