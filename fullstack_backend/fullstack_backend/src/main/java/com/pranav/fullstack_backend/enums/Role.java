package com.pranav.fullstack_backend.enums;

import com.pranav.fullstack_backend.enums.Permission;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.pranav.fullstack_backend.enums.Permission.*;

/**
 * Class for defining different roles and permissions associated with them.<br>
 * Contains a method for getting all the authorities associated by that role.
 * @author ferio
 */
@RequiredArgsConstructor
public enum Role {
    USER(Collections.emptySet()),
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_CREATE,
                    ADMIN_DELETE,
                    ADMIN_UPDATE,
                    MANAGER_READ,
                    MANAGER_CREATE,
                    MANAGER_DELETE,
                    MANAGER_UPDATE
            )
    ),
    MANAGER(
            Set.of(
                    MANAGER_READ,
                    MANAGER_CREATE,
                    MANAGER_DELETE,
                    MANAGER_UPDATE
            )
    )

    ;

    @Getter
    private final Set<Permission> permissions;

    /**
     * Method to get the authorities in the form of list containing {@link SimpleGrantedAuthority}<br>
     * @return List of {@link SimpleGrantedAuthority}
     */
    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());

        authorities.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
        return authorities;
    }
}
