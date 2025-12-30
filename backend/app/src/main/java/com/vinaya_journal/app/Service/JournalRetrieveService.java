package com.vinaya_journal.app.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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

    public static List<String> getDatesWithEntries() {
        List<String> dates = new ArrayList<>();
        String sql = "SELECT entry_date FROM entries";
        try(Connection conn = JournalDatabase.getConnection()){
            PreparedStatement ptsmt = conn.prepareStatement(sql);
            ResultSet rs = ptsmt.executeQuery();
            while(rs.next()){
                dates.add(rs.getString("entry_date"));
            }
        } catch (SQLException e) {
            return new ArrayList<>();
        }
        return dates;
    }
}
