package com.gabriel.repository;

import com.gabriel.entity.ProductData;
import com.gabriel.model.ProductCategory;
import org.springframework.data.repository.CrudRepository;

public interface ProductDataRepository extends CrudRepository<ProductCategory, Integer> {
}
