package com.vinaya_journal.app.Controller;

import com.vinaya_journal.app.DTO.JournalEntryDTO;
import com.vinaya_journal.app.Service.JournalInsertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JournalController {
    @PostMapping("/jounralEntry")
    public ResponseEntity<String> journalEntry(@RequestBody JournalEntryDTO journalEntryDTO){
        String result = JournalInsertService.insertJournal(journalEntryDTO);
        if (result.equals("success")) {
            return ResponseEntity.ok("Journal entry inserted successfully.");
        } else {
            return ResponseEntity.status(500).body("Error inserting journal entry: " + result);
        }
    }
}
