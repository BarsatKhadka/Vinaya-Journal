package com.vinaya_journal.app.Controller;

import com.vinaya_journal.app.DTO.InsertServiceResultDTO;
import com.vinaya_journal.app.DTO.JournalEntryDTO;
import com.vinaya_journal.app.Service.JournalInsertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JournalController {
    @PostMapping("/journalEntry")
    public ResponseEntity<String> journalEntry(@RequestBody JournalEntryDTO journalEntryDTO){
        InsertServiceResultDTO result = JournalInsertService.insertJournal(journalEntryDTO);
        if (result.isSuccess()) {
            return ResponseEntity.ok(result.getModified_at());
        } else {
            return ResponseEntity.status(500).body(result.getModified_at());
        }
    }
}
