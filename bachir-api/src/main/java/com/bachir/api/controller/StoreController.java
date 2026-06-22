package com.bachir.api.controller;

import com.bachir.api.entity.StoreInfo;
import com.bachir.api.service.StoreInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoreController {

    private final StoreInfoService storeInfoService;

    @GetMapping
    public StoreInfo get() {
        return storeInfoService.get();
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public StoreInfo update(@RequestBody StoreInfo info) {
        return storeInfoService.update(info);
    }
}
