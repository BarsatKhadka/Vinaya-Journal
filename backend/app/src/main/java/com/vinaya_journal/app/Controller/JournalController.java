package com.vinaya_journal.app.Controller;

import com.vinaya_journal.app.DTO.InsertServiceResultDTO;
import com.vinaya_journal.app.DTO.JournalEntryDTO;
import com.vinaya_journal.app.Service.JournalDatabase;
import com.vinaya_journal.app.Service.JournalInsertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Connection;
import java.sql.SQLException;

@RestController
public class JournalController {
    @GetMapping("/test")
    public String test(){
        return "yes";
    }

    @PostMapping("/journalEntry")
    public ResponseEntity<String> journalEntry(@RequestBody JournalEntryDTO journalEntryDTO){
        InsertServiceResultDTO result = JournalInsertService.insertJournal(journalEntryDTO);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result.getModified_at());
        } else {
            return ResponseEntity.status(500).body(result.getModified_at());
        }
    }

    @GetMapping("/sqlite")
    public String GetSqliteConnection()  {

        try {
            Connection connection = JournalDatabase.getConnection();
            if (connection != null && !connection.isClosed()) {
                return "true";
            }
        }
        catch(Exception e){
            return "false";
        }
        return "false";

    }


}
