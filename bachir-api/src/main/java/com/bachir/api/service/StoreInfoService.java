package com.bachir.api.service;

import com.bachir.api.entity.StoreInfo;
import com.bachir.api.repository.StoreInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StoreInfoService {

    private final StoreInfoRepository storeInfoRepository;

    public StoreInfo get() {
        return storeInfoRepository.findAll().stream().findFirst()
                .orElseGet(() -> {
                    StoreInfo info = new StoreInfo();
                    info.setName("Boucherie Bachir");
                    return storeInfoRepository.save(info);
                });
    }

    @Transactional
    public StoreInfo update(StoreInfo updated) {
        StoreInfo info = get();
        info.setName(updated.getName());
        info.setDescription(updated.getDescription());
        info.setAddress(updated.getAddress());
        info.setPhone(updated.getPhone());
        info.setEmail(updated.getEmail());
        info.setMapUrl(updated.getMapUrl());
        info.setOpeningHours(updated.getOpeningHours());
        info.setFacebookUrl(updated.getFacebookUrl());
        info.setInstagramUrl(updated.getInstagramUrl());
        return storeInfoRepository.save(info);
    }
}
