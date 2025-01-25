package com.pranav.fullstack_backend.model;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity(name = "_user")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private String name;

//    @ElementCollection
//    @CollectionTable(name = "user_addresses", joinColumns = @JoinColumn(name = "user_id"))
//    private List<Address> addressList;

}
