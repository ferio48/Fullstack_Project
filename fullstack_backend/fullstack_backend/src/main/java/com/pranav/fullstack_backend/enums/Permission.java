package com.pranav.fullstack_backend.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Class for the type of permissions one can have.
 * @author ferio
 */
@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_DELETE("admin:delete"),
    ADMIN_CREATE("admin:create"),
    MANAGER_READ("manager:read"),
    MANAGER_CREATE("manager:create"),
    MANAGER_UPDATE("admin:update"),
    MANAGER_DELETE("admin:delete"),

    ;

    @Getter
    private final String permission;
}
