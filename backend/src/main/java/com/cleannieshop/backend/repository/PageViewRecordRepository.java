package com.cleannieshop.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cleannieshop.backend.model.PageViewRecord;

public interface PageViewRecordRepository extends JpaRepository<PageViewRecord, String> {
    List<PageViewRecord> findAllByOrderByViewedAtDesc();
}
