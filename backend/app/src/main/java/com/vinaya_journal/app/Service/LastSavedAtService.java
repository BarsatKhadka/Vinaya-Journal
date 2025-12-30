package com.vinaya_journal.app.Service;

import java.sql.*;
import java.time.LocalDate;



public class LastSavedAtService {
    private static String finalDBUrl = "jdbc:sqlite:"+System.getProperty("user.home")+"/vinayadb"+"/journalEntries.db";
    public static String getLastSavedAt(String date) {
        String sql = "SELECT modified_at FROM entries WHERE entry_date = ? LIMIT 1";
        try (Connection conn = DriverManager.getConnection(finalDBUrl)) {
            PreparedStatement ptsmt = conn.prepareStatement(sql);
            ptsmt.setString(1, date);
            ResultSet rs = ptsmt.executeQuery();
            if (rs.next()) {
                return rs.getString("modified_at");
            }
        } catch (SQLException e) {
            System.out.println(date);
            return "";
        }
        return "";
    }

}
