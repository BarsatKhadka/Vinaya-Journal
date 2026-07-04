package com.vinaya_journal.app.Controller;

import com.vinaya_journal.app.DTO.JournalEntryRecordDTO;
import com.vinaya_journal.app.Service.JournalRangeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class JournalRangeController {

    // Single-segment path (not /entries/range) so it matches the existing
    // SecurityConfig "/*" permitAll matcher without touching security config.
    @GetMapping("/retrieveRange")
    public List<JournalEntryRecordDTO> retrieveRange(@RequestParam String start,
                                                     @RequestParam String end) {
        return JournalRangeService.retrieveRange(start, end);
    }
}
